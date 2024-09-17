//Footer.js
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";

function Footer() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <footer className={classes.rootFooter}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.h} component="h6">
            {t("welcome_message")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" component="h2" className={classes.colSm}>
            &copy;{new Date().getFullYear()}{" "}
            <Link to="https://www.limestoneweb.se" className={classes.link}>
              LIMESTONEWEB.SE
            </Link>{" "}
            | All rights reserved | Terms Of Service | Privacy |
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
