// src/services/languageService.js

/**
 * Language service for managing translation functionality
 */
class LanguageService {
    constructor() {
      this.initialized = false;
      this.initializing = false;
      this.defaultLanguage = 'en';
      this.supportedLanguages = ['en', 'es', 'sr'];
      this.apiKey = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY || '';
      this.maxRetries = 10;
      this.retryDelay = 500; // ms
    }
  
    /**
     * Initialize the Google Translate API
     * @returns {Promise} Promise that resolves when Google Translate is loaded
     */
    initialize() {
      if (this.initialized) {
        return Promise.resolve();
      }
  
      if (this.initializing) {
        return new Promise((resolve, reject) => {
          const checkInterval = setInterval(() => {
            if (this.initialized) {
              clearInterval(checkInterval);
              resolve();
            }
          }, 100);
          
          // Set a timeout to avoid infinite waiting
          setTimeout(() => {
            clearInterval(checkInterval);
            if (!this.initialized) {
              reject(new Error('Initialization timed out'));
            }
          }, 10000);
        });
      }
  
      this.initializing = true;
  
      return new Promise((resolve, reject) => {
        // Add hidden div for Google Translate if it doesn't exist
        if (!document.getElementById('google_translate_element')) {
          const translateDiv = document.createElement('div');
          translateDiv.id = 'google_translate_element';
          translateDiv.style.display = 'none';
          document.body.appendChild(translateDiv);
        }
  
        // Define the callback function that Google will call
        window.googleTranslateElementInit = () => {
          try {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: this.defaultLanguage,
                includedLanguages: this.supportedLanguages.join(','),
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              },
              'google_translate_element'
            );
            
            // Wait for the selector to be available
            this.waitForSelector('.goog-te-combo')
              .then(() => {
                console.log('Google Translate initialized successfully');
                this.initialized = true;
                this.initializing = false;
                resolve();
              })
              .catch((error) => {
                console.error('Failed to find translation selector:', error);
                this.initializing = false;
                reject(error);
              });
          } catch (error) {
            console.error('Error initializing Google Translate:', error);
            this.initializing = false;
            reject(error);
          }
        };
  
        // Add Google Translate script
        const googleTranslateScript = document.createElement('script');
        googleTranslateScript.src = 
          `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
        googleTranslateScript.async = true;
        googleTranslateScript.defer = true;
        googleTranslateScript.onerror = (error) => {
          console.error('Error loading Google Translate script:', error);
          this.initializing = false;
          reject(error);
        };
        
        document.body.appendChild(googleTranslateScript);
      });
    }
  
    /**
     * Wait for a selector to be available in the DOM
     * @param {string} selector - CSS selector to wait for
     * @param {number} retries - Number of retries left
     * @returns {Promise} Promise that resolves when selector is found
     * @private
     */
    waitForSelector(selector, retries = this.maxRetries) {
      return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);
        if (element) {
          return resolve(element);
        }
        
        if (retries <= 0) {
          return reject(new Error(`Selector not found: ${selector}`));
        }
        
        setTimeout(() => {
          this.waitForSelector(selector, retries - 1)
            .then(resolve)
            .catch(reject);
        }, this.retryDelay);
      });
    }
  
    /**
     * Change the current language
     * @param {string} languageCode - Language code to switch to
     * @returns {Promise} Promise that resolves when language is changed
     */
    changeLanguage(languageCode) {
      if (!this.supportedLanguages.includes(languageCode)) {
        console.warn(`Language ${languageCode} is not supported`);
        return Promise.reject(new Error(`Unsupported language: ${languageCode}`));
      }
  
      if (!this.initialized) {
        console.warn('Google Translate not initialized. Initializing now...');
        return this.initialize().then(() => this._doChangeLanguage(languageCode));
      }
  
      return this._doChangeLanguage(languageCode);
    }
  
    /**
     * Internal method to perform the language change
     * @param {string} languageCode - Language code to switch to
     * @returns {Promise} Promise that resolves when language is changed
     * @private
     */
    _doChangeLanguage(languageCode) {
      return new Promise((resolve, reject) => {
        try {
          // Special handling for English to reset to original
          if (languageCode === this.defaultLanguage) {
            const iframe = document.querySelector('.goog-te-menu-frame');
            if (iframe) {
              try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                const resetLink = iframeDoc.querySelector('a[id=":1.reset"]');
                if (resetLink) {
                  resetLink.click();
                  return resolve();
                }
              } catch (e) {
                console.warn('Could not access iframe content, falling back to combo box');
              }
            }
          }
  
          // Find the Google Translate dropdown
          this.waitForSelector('.goog-te-combo')
            .then((select) => {
              select.value = languageCode;
              select.dispatchEvent(new Event('change'));
              
              // Give time for the translation to take effect
              setTimeout(resolve, 1000);
            })
            .catch((error) => {
              console.error('Error finding translation selector:', error);
              
              // Try another approach - look for the skiptranslate div and force a rebuild
              const translateElement = document.getElementById('google_translate_element');
              if (translateElement) {
                // Clear and reinitialize
                translateElement.innerHTML = '';
                window.googleTranslateElementInit();
                
                // Try again after reinitialization
                setTimeout(() => {
                  const select = document.querySelector('.goog-te-combo');
                  if (select) {
                    select.value = languageCode;
                    select.dispatchEvent(new Event('change'));
                    resolve();
                  } else {
                    reject(new Error('Could not find Google Translate selector after reinitialization'));
                  }
                }, 1000);
              } else {
                reject(error);
              }
            });
        } catch (error) {
          console.error('Error changing language:', error);
          reject(error);
        }
      });
    }
  
    /**
     * Get current language from Google Translate
     * @returns {string} Current language code
     */
    getCurrentLanguage() {
      // Try to detect from Google Translate
      const frame = document.querySelector('.goog-te-menu-frame');
      if (frame) {
        try {
          const doc = frame.contentDocument || frame.contentWindow.document;
          const items = doc.querySelectorAll('.goog-te-menu2-item');
          
          for (let i = 0; i < items.length; i++) {
            if (items[i].querySelector('.goog-te-menu2-item-selected')) {
              const text = items[i].textContent;
              for (const lang of this.supportedLanguages) {
                if (text.includes(lang)) {
                  return lang;
                }
              }
            }
          }
        } catch (e) {
          // Ignore cross-origin errors
        }
      }
      
      // Try to get from the select element
      const select = document.querySelector('.goog-te-combo');
      if (select && select.value) {
        return select.value;
      }
      
      // Fallback to HTML lang attribute
      const htmlLang = document.documentElement.lang;
      if (htmlLang && this.supportedLanguages.includes(htmlLang)) {
        return htmlLang;
      }
      
      return this.defaultLanguage;
    }
  }
  
  // Create and export a singleton instance
  const languageService = new LanguageService();
  export default languageService;