import React from "react";
import { Grid } from "@mui/material";
import { HomeContainer, HeroImage, HeroImagePhone } from "./styles";
import ImageFadeTransition from "./Home/Image"; // Importera ImageFadeTransition

import LandingImage from "../../images/nfdmheroimage.png";
import LandingImagePhone from "../../images/nfdmheroimagemobile.png";

const Home = () => {
  return (
    <HomeContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeroImage style={{ position: "relative" }}>
            {" "}
            {/* Lägg till position relative här */}
            <img
              src={LandingImage} // Desktop-version av bilden
              alt="Soccer Jersey Collection"
            />
            {/* Lägg till ImageFadeTransition ovanpå HeroImage */}
            <ImageFadeTransition />
          </HeroImage>

          <HeroImagePhone>
            <img
              src={LandingImagePhone} // Mobilversion av bilden
              alt="Soccer Jersey Collection"
            />
          </HeroImagePhone>
        </Grid>
      </Grid>
    </HomeContainer>
  );
};

export default Home;
