import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setLanguage } from "../redux/slice/LanguageSlice";
import translationService from "../services/translationService";

const RouteAwareTranslationProvider = ({ children }) => {
  const { currentLanguage } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const initialized = useRef(false);
  const languageChangeTimeout = useRef(null);

  // Get current location from React Router
  const location = useLocation();
  const previousPathRef = useRef(location.pathname);

  // Initialize translation service on mount
  useEffect(() => {
    if (initialized.current) return;

    const initTimer = setTimeout(() => {
      translationService
        .initialize()
        .then(() => {
          // Sync service language with Redux store
          const serviceLanguage = translationService.getCurrentLanguage();
          if (serviceLanguage !== currentLanguage) {
            dispatch(setLanguage(serviceLanguage));
          }
          initialized.current = true;
        })
        .catch((error) => {
          console.error("Failed to initialize translation service:", error);
        });
    }, 500);

    return () => {
      clearTimeout(initTimer);
      translationService.cleanup();
    };
  }, [dispatch]);

  // Handle language changes from Redux
  useEffect(() => {
    if (languageChangeTimeout.current) {
      clearTimeout(languageChangeTimeout.current);
    }

    languageChangeTimeout.current = setTimeout(() => {
      if (translationService.getCurrentLanguage() !== currentLanguage) {
        translationService.changeLanguage(currentLanguage).catch((error) => {
          console.error("Failed to change language:", error);
        });
      }
    }, 100);

    return () => {
      if (languageChangeTimeout.current) {
        clearTimeout(languageChangeTimeout.current);
      }
    };
  }, [currentLanguage]);

  // Handle route changes
  useEffect(() => {
    // Check if we actually changed routes
    if (location.pathname !== previousPathRef.current) {
      console.log(
        "Route changed from",
        previousPathRef.current,
        "to",
        location.pathname
      );
      previousPathRef.current = location.pathname;

      // Wait for new route content to render
      const retranslateTimer = setTimeout(() => {
        if (currentLanguage !== translationService.defaultLanguage) {
          console.log("Retranslating after route change");
          // First store original content of new elements
          translationService._storeOriginalContent().then(() => {
            // Then translate the page
            translationService
              ._translatePage(currentLanguage)
              .catch((err) =>
                console.error("Translation error after route change:", err)
              );
          });
        }
      }, 300); // Adjust timing as needed

      return () => clearTimeout(retranslateTimer);
    }
  }, [location, currentLanguage]); // Re-run when route or language changes

  return <>{children}</>;
};

export default RouteAwareTranslationProvider;
