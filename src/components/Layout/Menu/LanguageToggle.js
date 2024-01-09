import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: theme.spacing(2), // Adjust the border radius as needed
    backgroundColor: theme.palette.primary.light, // Use the desired color from your theme
    color: theme.palette.primary.contrastText, // Use the text color based on your theme
    padding: theme.spacing(1, 2), // Adjust padding as needed
  },
}));

const LanguageToggle = () => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'no' ? 'en' : 'no';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Button className={classes.button} onClick={toggleLanguage}>
      {i18n.language === 'no' ? 'En' : 'No'}
    </Button>
  );
};

export default LanguageToggle;