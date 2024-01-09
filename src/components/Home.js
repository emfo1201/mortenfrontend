import React, { useState } from 'react';
import useStyles from './Layout/styles';
import { useTranslation } from 'react-i18next';
import LandingImageNorwegian from '../images/landingImageNorwegian.jpg'
import LandingImageEnglish from '../images/landingImageEnglish.jpg'

const Home = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  // Update the selected language when it changes
  i18n.on('languageChanged', (lng) => {
    setSelectedLanguage(lng);
  });

  const getImageSource = () => {
    // Conditionally return the appropriate image source based on the selected language
    return selectedLanguage === 'en' ? LandingImageEnglish : LandingImageNorwegian;
  };

  return (
    <div>
      <div className={classes.hero}>
      {/* Background Image */}
      <div className={classes.heroImageContainer}>
        <img
          className={classes.heroImage}
          src={getImageSource()}
          alt="Soccer Jersey Collection"
        />
      </div>
    </div>

      {/* Featured Collection */}
      <section className={classes.featuredCollection}>
        {/* Your featured collection content goes here */}
      </section>

      {/* About the Collector */}
      <section className={classes.aboutCollector}>
        {/* Your about collector content goes here */}
      </section>

      {/* Collection Categories */}
      <section className={classes.collectionCategories}>
        {/* Your collection categories content goes here */}
      </section>

      {/* Testimonials */}
      <section className={classes.testimonials}>
        {/* Your testimonials content goes here */}
      </section>

      {/* Newsletter Signup */}
      <section className={classes.newsletter}>
        {/* Your newsletter signup content goes here */}
      </section>

      {/* Social Media Integration */}
      <section className={classes.socialMedia}>
        {/* Your social media integration content goes here */}
      </section>

      {/* Contact Information */}
      <section className={classes.contact}>
        {/* Your contact information content goes here */}
      </section>
    </div>
  );
};

export default Home;