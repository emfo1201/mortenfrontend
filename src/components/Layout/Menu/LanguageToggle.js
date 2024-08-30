import React, { useEffect } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: theme.spacing(2), // Adjust the border radius as needed
    backgroundColor: theme.palette.primary.light, // Use the desired color from your theme
    color: theme.palette.primary.contrastText, // Use the text color based on your theme
    padding: theme.spacing(1, 2), // Adjust padding as needed
  },
}));

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    const savedLanguage = Cookies.get('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'no' ? 'en' : 'no';
    i18n.changeLanguage(newLanguage);
    Cookies.set('language', newLanguage, { expires: 365 }); // Store language cookie for 1 year
  };

  return (
    <Button className={classes.button} onClick={toggleLanguage}>
      {i18n.language === 'no' ? 'En' : 'No'}
    </Button>
  );
};

export default LanguageToggle;