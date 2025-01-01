import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

// Styled Component for the background image container
const OuterContainer = styled(Grid)({
  flexGrow: 1,
});

const HeroImage = styled("div")({
  backgroundImage: `url(../../../images/soccer2.jpg)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  width: "100%",
  height: "100vh",
});

/**
 * Image component used to display a full-screen background image.
 *
 * This component applies a fixed soccer-themed background image to a grid container,
 * utilizing Material-UI's Grid system for layout.
 *
 * @returns {JSX.Element} - The rendered Image component with a full-screen background image.
 */
const Image = () => {
  return (
    <OuterContainer container spacing={3}>
      <HeroImage />
    </OuterContainer>
  );
};

export default Image;
