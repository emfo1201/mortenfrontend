//Image.js

import React from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import Soccer2 from "../../../images/soccer2.jpg";

const Image = () => {
  const classes = useStyles();

  const backgroundImageStyle = {
    backgroundImage: `url(${Soccer2})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    width: "100%",
    height: "100vh",
  };

  return (
    <Grid container spacing={3} className={classes.outerContainer}>
      <div className={classes.heroImage} style={backgroundImageStyle}></div>
    </Grid>
  );
};

export default Image;
