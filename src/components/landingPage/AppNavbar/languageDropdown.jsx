import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Spinner } from "react-bootstrap";
import ReactCountryFlag from "react-country-flag";
import "./dropdown.css";
import translationService from "../../../services/translationService";
import { setLanguage } from "../../../redux/slice/LanguageSlice";

const countryCodeMap = {
  en: "US",
  es: "ES",
  sr: "RS",
  pt: "PT",
  sv: "SE",
  de: "DE",
  it: "IT",
};

const LanguageDropdown = () => {
  const dispatch = useDispatch();
  const { currentLanguage, languages } = useSelector((state) => state.language);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // setIsLoading(true);
    translationService
      .initialize()
      .then(() => {
        if (isMounted) {
          setIsLoading(false);

          const serviceLanguage = translationService.getCurrentLanguage();
          if (serviceLanguage !== currentLanguage) {
            dispatch(setLanguage(serviceLanguage));
          }
        }
      })
      .catch((err) => {
        console.error("Translation service initialization error:", err);
        if (isMounted) {
          setIsLoading(false);
          setError("Could not initialize translation service");
        }
      });

    // Cleanup function to avoid state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [dispatch, currentLanguage]);

  // Handle language change
  const changeLanguage = (langCode) => {
    if (langCode === currentLanguage || isLoading) return;

    // setIsLoading(true);
    setError(null);

    setTimeout(() => {
      window.location.reload();
    }, 1000);

    // Update Redux state first
    dispatch(setLanguage(langCode));

    // Use translation service to change language
    translationService
      .changeLanguage(langCode)
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error changing language:", err);
        setIsLoading(false);
        setError("Could not change language");

        // Revert Redux state back to previous language
        dispatch(setLanguage(translationService.getCurrentLanguage()));

        // Log detailed error info for debugging
        console.debug("Language change error details:", {
          requestedLanguage: langCode,
          currentServiceLanguage: translationService.getCurrentLanguage(),
          error: err.message,
        });
      });
  };

  // Get current flag for the dropdown button
  const getCurrentFlag = () => {
    if (isLoading) {
      return (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="language-spinner"
        />
      );
    }

    const countryCode = countryCodeMap[currentLanguage] || "GB";

    return (
      <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{
          width: "1.5em",
          height: "1.5em",
        }}
        title={
          languages.find((lang) => lang.code === currentLanguage)?.label || "EN"
        }
      />
    );
  };

  return (
    <div className="language-dropdown-container">
      <Dropdown>
        <Dropdown.Toggle
          variant="light"
          id="language-dropdown"
          className={`language-toggle ${error ? "language-toggle-error" : ""}`}
          disabled={isLoading}
          title={error || ""}
        >
          {getCurrentFlag()}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {languages.map((language) => {
            const countryCode = countryCodeMap[language.code] || "GB";

            return (
              <Dropdown.Item
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                active={currentLanguage === language.code}
                disabled={isLoading}
                className="language-dropdown-item"
              >
                <ReactCountryFlag
                  countryCode={countryCode}
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    marginRight: "8px",
                  }}
                  title={language.label}
                />
                <span className="language-name">{language.label}</span>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>

      {/* Error message display */}
      {error && <div className="language-error-message">{error}</div>}
    </div>
  );
};

export default LanguageDropdown;
