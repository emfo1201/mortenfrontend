import React, { useCallback, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useStyles } from "./styles";

/**
 * LanguageToggle component allows users to switch between different languages.
 *
 * @returns {JSX.Element} The rendered LanguageToggle component.
 */
const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    // When the component mounts, check if a language cookie exists
    const savedLanguage = Cookies.get("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      // Default to Norwegian if no language cookie is found
      i18n.changeLanguage("no");
    }
  }, [i18n]);

  /**
   * Toggles the language between Norwegian and English.
   * If the user has accepted cookies, the selected language is saved in a cookie.
   */
  const toggleLanguage = useCallback(() => {
    const newLanguage = i18n.language === "no" ? "en" : "no";
    i18n.changeLanguage(newLanguage);

    // Check if cookies have been accepted before setting the language cookie
    const consent = Cookies.get("cookieConsent");
    if (consent === "true") {
      Cookies.set("language", newLanguage, { expires: 365 });
    }
  }, [i18n]);

  return (
    <Button className={classes.button} onClick={toggleLanguage}>
      {i18n.language === "no" ? "En" : "No"}
    </Button>
  );
};

export default LanguageToggle;
