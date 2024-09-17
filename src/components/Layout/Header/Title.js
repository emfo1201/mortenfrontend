// Title.js
import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import useStyles from "../styles";

const Title = () => {
  const classes = useStyles();
  return (
    <Typography
      variant="h6"
      color="inherit"
      className={classes.title}
      component={Link}
      to="./../"
    >
      Norsk Fotballdraktmuseum
    </Typography>
  );
};

export default Title;
