import React from "react";
import { Grid } from "@mui/material";
import { HomeContainer, Hero, HeroImage, HeroImagePhone } from "./styles";
import TextGenerateEffectDemo from "../effects/TextGenerateEffectDemo";

import LandingImage from "../../images/nfdmheroimage.png";
import LandingImagePhone from "../../images/nfdmheroimagemobile.png";

const Home = () => {
  return (
    <HomeContainer>
      <Hero>
        <HeroImage>
          <img src={LandingImage} alt="Soccer Jersey Collection" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center text-5xl z-50">
            <TextGenerateEffectDemo />
          </div>
        </HeroImage>

        <HeroImagePhone>
          <img src={LandingImagePhone} alt="Soccer Jersey Collection" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center text-4xl z-50">
            <TextGenerateEffectDemo />
          </div>
        </HeroImagePhone>
      </Hero>
    </HomeContainer>
  );
};

export default Home;
