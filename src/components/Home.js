import React from "react";
import { Grid } from "@mui/material"; // Uppdaterat till @mui/material
import { HomeContainer, HeroImage } from "./Layout/styles"; // Importera styles

import LandingImage from "../images/nfdmheroimage.png";

/**
 * Home component for the main landing page.
 * Displays a hero image, welcome message, about sections, an image, and the footer.
 *
 * @component
 */
const Home = () => {
  return (
    <HomeContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeroImage>
            <img
              src={LandingImage}
              alt="Soccer Jersey Collection"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </HeroImage>
        </Grid>
      </Grid>
    </HomeContainer>
  );
};

export default Home;
