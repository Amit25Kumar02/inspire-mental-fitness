// src/services/translationService.js

/**
 * Enhanced translation service with dynamic content handling
 * Specifically handles React router navigation and dynamic content loading
 */
class TranslationService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY || "";
    this.defaultLanguage = "en";
    this.supportedLanguages = ["en", "es", "sr", "pt", "sv", "de", "it"];
    this.cache = {}; // Cache for translated text
    this.currentLanguage = this.defaultLanguage;
    this.elementRegistry = new WeakMap(); // Track elements safely
    this.initialized = false;
    this.pendingTranslations = false;
    this.observer = null; // Mutation observer for dynamic content

    // Load cached translations from localStorage
    try {
      const savedCache = localStorage.getItem("translationCache");
      if (savedCache) {
        this.cache = JSON.parse(savedCache);
      }
    } catch (e) {
      console.warn("Could not load translation cache", e);
    }

    // Load the saved language from localStorage
    const savedLanguage = localStorage.getItem("appLanguage");
    if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
      this.currentLanguage = savedLanguage;
    }
  }

  /**
   * Initialize the translation service
   * @returns {Promise} Promise that resolves when initialized
   */
  initialize() {
    if (this.initialized) {
      return Promise.resolve();
    }

    // Validate the API key
    if (!this.apiKey) {
      console.warn("No Google Cloud Translation API key provided");
      return Promise.reject(new Error("No API key provided"));
    }

    // Setup mutation observer to detect dynamic content
    this._setupMutationObserver();

    // Mark as initialized
    this.initialized = true;

    // If not in default language, translate the page
    if (this.currentLanguage !== this.defaultLanguage) {
      // Wait a bit for the DOM to stabilize
      return new Promise((resolve) => {
        setTimeout(() => {
          this._storeOriginalContent()
            .then(() => this._translatePage(this.currentLanguage))
            .then(resolve)
            .catch((err) => {
              console.error("Initial translation error:", err);
              resolve(); // Still mark as initialized even if there's an error
            });
        }, 500);
      });
    }

    return Promise.resolve();
  }

  /**
   * Set up mutation observer to watch for dynamic content changes
   * @private
   */
  _setupMutationObserver() {
    // Cleanup any existing observer
    if (this.observer) {
      this.observer.disconnect();
    }

    // Create a new mutation observer
    this.observer = new MutationObserver((mutations) => {
      // Skip if we're in default language or translation is in progress
      if (
        this.currentLanguage === this.defaultLanguage ||
        this.pendingTranslations
      ) {
        return;
      }

      let hasNewContent = false;
      let elementsToProcess = new Set();

      // Process mutations to find new content
      for (const mutation of mutations) {
        // Handle added nodes
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if this is translatable content
              if (this._isTranslatableElement(node)) {
                elementsToProcess.add(node);
                hasNewContent = true;
              }

              // Also check children of added nodes
              const children = node.querySelectorAll("*");
              for (const child of children) {
                if (this._isTranslatableElement(child)) {
                  elementsToProcess.add(child);
                  hasNewContent = true;
                }
              }
            }
          }
        }
      }

      // If we found new content, store and translate it
      if (hasNewContent) {
        // Debounce translations to avoid too many API calls
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
          // console.log('Processing new content from mutations:', elementsToProcess.size, 'elements');
          for (const element of elementsToProcess) {
            if (
              element.isConnected &&
              !element.hasAttribute("data-original-text")
            ) {
              element.setAttribute("data-original-text", element.innerHTML);
            }
          }

          // Translate all new elements
          this._translateNewElements(this.currentLanguage);
        }, 500);
      }
    });

    // Start observing the entire document
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  }

  /**
   * Check if an element should be translated
   * @param {Element} element - Element to check
   * @returns {boolean} - Whether the element should be translated
   * @private
   */
  _isTranslatableElement(element) {
    // Skip if not connected or already processed
    if (
      !element.isConnected ||
      element.hasAttribute("data-original-text") ||
      element.hasAttribute("data-no-translate") ||
      element.closest("[data-no-translate]")
    ) {
      return false;
    }

    // Skip script, style, and code elements
    if (
      element.tagName === "SCRIPT" ||
      element.tagName === "STYLE" ||
      element.tagName === "CODE" ||
      element.tagName === "PRE" ||
      element.closest("script") ||
      element.closest("style") ||
      element.closest("code") ||
      element.closest("pre")
    ) {
      return false;
    }

    // Check if it's one of our translatable element types
    const translatableSelectors = [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "a",
      "span",
      "button",
      "label",
      "li",
      "td",
      "th",
      ".nav-link",
      ".menu-item",
      ".btn",
      ".card-title",
      ".card-text",
    ];

    if (translatableSelectors.some((selector) => element.matches(selector))) {
      // Only translate if it has text content
      return element.textContent.trim().length > 0;
    }

    return false;
  }

  /**
   * Translate new elements that have appeared
   * @param {string} languageCode - Language to translate to
   * @returns {Promise} - Promise that resolves when translation is complete
   * @private
   */
  async _translateNewElements(languageCode) {
    // Find all elements with original content that haven't been translated yet
    const elements = document.querySelectorAll(
      "[data-original-text]:not([data-translated])"
    );
    if (!elements.length) {
      return Promise.resolve();
    }

    // Process in batches to be gentle on the API
    const batchSize = 10;
    const batches = Math.ceil(elements.length / batchSize);

    for (let i = 0; i < batches; i++) {
      const start = i * batchSize;
      const end = Math.min(start + batchSize, elements.length);
      const batch = Array.from(elements).slice(start, end);

      // Process each element in the batch
      await Promise.all(
        batch.map((element) => {
          if (!element.isConnected) return Promise.resolve();

          return this._translateElement(element, languageCode).catch((err) => {
            console.error("Translation error for element:", err);
          });
        })
      );

      // Small delay between batches
      if (i < batches - 1) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    return Promise.resolve();
  }

  /**
   * Change the current language and translate the page
   * @param {string} languageCode - Language code to switch to
   * @returns {Promise} Promise that resolves when language is changed
   */
  changeLanguage(languageCode) {
    // Don't proceed if a translation is already in progress
    if (this.pendingTranslations) {
      return Promise.reject(new Error("Translation already in progress"));
    }

    if (!this.supportedLanguages.includes(languageCode)) {
      return Promise.reject(new Error(`Unsupported language: ${languageCode}`));
    }

    // If same language, nothing to do
    if (languageCode === this.currentLanguage) {
      return Promise.resolve();
    }

    // Save the new language
    this.currentLanguage = languageCode;
    localStorage.setItem("appLanguage", languageCode);

    // Mark translation as in progress
    this.pendingTranslations = true;

    // If switching to default language, just reset
    if (languageCode === this.defaultLanguage) {
      return this._resetTranslation().finally(() => {
        this.pendingTranslations = false;
      });
    }

    // Initialize the service if not already done
    if (!this.initialized) {
      return this.initialize()
        .then(() => {
          return this._storeOriginalContent().then(() => {
            return this._translatePage(languageCode);
          });
        })
        .finally(() => {
          this.pendingTranslations = false;
        });
    }

    // Store original content then translate
    return this._storeOriginalContent()
      .then(() => {
        return this._translatePage(languageCode);
      })
      .finally(() => {
        this.pendingTranslations = false;
      });
  }

  /**
   * Get current language
   * @returns {string} Current language code
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Translate a single text string
   * @param {string} text - Text to translate
   * @param {string} targetLanguage - Target language code
   * @returns {Promise<string>} Promise that resolves to translated text
   */
  async translateText(text, targetLanguage = this.currentLanguage) {
    // Don't translate if already in target language or empty
    if (targetLanguage === this.defaultLanguage || !text || !text.trim()) {
      return text;
    }

    // Check cache first
    const cacheKey = `${text}:${targetLanguage}`;
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    try {
      const url = `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          source: this.defaultLanguage,
          target: targetLanguage,
          format: "html", // Use 'html' to preserve HTML tags
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`);
      }

      const data = await response.json();
      const translatedText = data.data.translations[0].translatedText;

      // Cache the result
      this.cache[cacheKey] = translatedText;
      this._saveCache();

      return translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Fallback to original text
    }
  }

  /**
   * Save the translation cache to localStorage
   * @private
   */
  _saveCache() {
    try {
      // Limit cache size to avoid localStorage limits
      const cacheEntries = Object.entries(this.cache);
      if (cacheEntries.length > 500) {
        // Keep only the most recent 500 entries
        this.cache = Object.fromEntries(cacheEntries.slice(-500));
      }

      localStorage.setItem("translationCache", JSON.stringify(this.cache));
    } catch (e) {
      console.warn("Could not save translation cache", e);
    }
  }

  /**
   * Translate the page content
   * @param {string} languageCode - Target language code
   * @returns {Promise} Promise that resolves when page is translated
   * @private
   */
  async _translatePage(languageCode) {
    // Don't translate if already in target language
    if (languageCode === this.defaultLanguage) {
      return this._resetTranslation();
    }

    // Get all translatable elements - fresh query each time
    const elements = document.querySelectorAll(
      "[data-original-text]:not([data-translation-failed])"
    );
    if (!elements.length) {
      return Promise.resolve();
    }

    // Add a class to the body during translation
    document.body.classList.add("translating");

    // Process in smaller batches
    const batchSize = 10;
    const batches = Math.ceil(elements.length / batchSize);

    try {
      for (let i = 0; i < batches; i++) {
        const start = i * batchSize;
        const end = Math.min(start + batchSize, elements.length);
        const batch = Array.from(elements).slice(start, end);

        // Process batch with individual error handling
        await Promise.all(
          batch.map((element) => {
            if (!element.isConnected) return Promise.resolve();

            return this._translateElement(element, languageCode).catch(
              (err) => {
                console.error(`Translation error for element ${i}:`, err);
                // Mark as failed to prevent retries
                if (element.isConnected) {
                  element.setAttribute("data-translation-failed", "true");
                }
              }
            );
          })
        );

        // Small delay between batches
        if (i < batches - 1) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
    } finally {
      document.body.classList.remove("translating");
    }

    return Promise.resolve();
  }

  /**
   * Translate a single element
   * @param {Element} element - Element to translate
   * @param {string} languageCode - Language code to translate to
   * @returns {Promise} Promise that resolves when element is translated
   * @private
   */
  async _translateElement(element, languageCode) {
    // Skip if element is not connected to DOM
    if (!element || !element.isConnected) {
      return Promise.resolve();
    }

    const originalText = element.getAttribute("data-original-text");
    if (!originalText) {
      return Promise.resolve();
    }

    try {
      const translatedText = await this.translateText(
        originalText,
        languageCode
      );

      // Double-check element is still in DOM
      if (element.isConnected) {
        element.innerHTML = translatedText;
        element.setAttribute("data-translated", languageCode);
        // Register this element
        this.elementRegistry.set(element, {
          original: originalText,
          translated: translatedText,
          language: languageCode,
        });
      }
    } catch (error) {
      console.error("Translation error for element:", error);
      // Only set attribute if still connected
      if (element.isConnected) {
        element.setAttribute("data-translation-failed", "true");
      }
      throw error;
    }
  }

  /**
   * Store original content for all translatable elements
   * @returns {Promise} Promise that resolves when original content is stored
   * @private
   */
  async _storeOriginalContent() {
    return new Promise((resolve) => {
      // Use requestAnimationFrame for better timing with rendering
      requestAnimationFrame(() => {
        const selectors = [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "p",
          "a",
          "span",
          "button",
          "label",
          "li",
          "td",
          "th",
          ".nav-link",
          ".menu-item",
          ".btn",
          ".card-title",
          ".card-text",
        ];

        try {
          // Get all potential elements
          const allElements = document.querySelectorAll(selectors.join(","));

          // Filter to only valid translatable elements
          for (const element of allElements) {
            if (
              element.isConnected &&
              !element.closest("script") &&
              !element.closest("style") &&
              !element.closest("code") &&
              !element.closest("pre") &&
              !element.hasAttribute("data-original-text") &&
              !element.hasAttribute("data-no-translate") &&
              !element.closest("[data-no-translate]") &&
              element.textContent.trim().length > 0
            ) {
              element.setAttribute("data-original-text", element.innerHTML);
            }
          }
        } catch (error) {
          console.error("Error storing original content:", error);
        }

        resolve();
      });
    });
  }

  /**
   * Reset translation back to original content
   * @returns {Promise} Promise that resolves when reset is complete
   * @private
   */
  _resetTranslation() {
    return new Promise((resolve) => {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        try {
          // Get a fresh list of elements each time
          const elements = document.querySelectorAll("[data-original-text]");

          for (const element of elements) {
            try {
              // Skip if not connected to DOM
              if (!element || !element.isConnected) {
                continue;
              }

              const originalText = element.getAttribute("data-original-text");
              if (originalText) {
                element.innerHTML = originalText;
              }

              // Remove markers
              element.removeAttribute("data-translated");
              element.removeAttribute("data-translation-failed");
            } catch (innerError) {
              console.error("Error resetting element:", innerError);
            }
          }
        } catch (error) {
          console.error("Error during translation reset:", error);
        } finally {
          document.body.classList.remove("translating");
          resolve();
        }
      });
    });
  }

  /**
   * Clean up resources
   */
  cleanup() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.elementRegistry = new WeakMap();
    this.pendingTranslations = false;
  }

  /**
   * Force translate the current page (useful after route changes)
   * @returns {Promise} Promise that resolves when translation is complete
   */
  forceTranslate() {
    if (this.currentLanguage === this.defaultLanguage) {
      return Promise.resolve();
    }

    return this._storeOriginalContent().then(() => {
      return this._translatePage(this.currentLanguage);
    });
  }
}

// Create and export a singleton instance
const translationService = new TranslationService();
export default translationService;
