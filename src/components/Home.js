// Home.js

import React from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './Layout/styles';
// import { useTranslation } from 'react-i18next';
import LandingImage from '../images/UllevaalStadion.png';
import Welcome from './Layout/Home/Welcome'
import About from './Layout/Home/About'
import Image from './Layout/Home/Image'
import Footer from './Layout/Footer';

const Home = () => {
  const classes = useStyles();
/*  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  // Update the selected language when it changes
  i18n.on('languageChanged', (lng) => {
    setSelectedLanguage(lng);
  }); */

  return (
    <div className={classes.homeContainer}>
      {/* homeContainer using Grid */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <img
            className={classes.heroImage}
            src={LandingImage}
            alt="Soccer Jersey Collection"
          />
        </Grid>
        <Welcome />
        <Grid item xs={12}>
          <About />
        </Grid>
        <Grid item xs={12}>
          <Image />
        </Grid>
        <Grid item xs={12}>
          <About />
        </Grid>
        <Grid item xs={12}>
          <About />
        </Grid>
          <Footer />
      </Grid>
      
    </div>
  );
};

export default Home;