import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useTranslation } from "react-i18next";

const FooterMessage = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Typography variant="h6" className={classes.h} component="h6">
      {t("welcome_message")}
    </Typography>
  );
};

const FooterLinks = () => {
  const classes = useStyles();
  return (
    <Typography variant="body2" component="h2" className={classes.colSm}>
      &copy;{new Date().getFullYear()}{" "}
      <Link to="https://www.limestoneweb.se" className={classes.link}>
        LIMESTONEWEB.SE
      </Link>{" "}
      | All rights reserved | Terms Of Service | Privacy |
    </Typography>
  );
};

export { FooterMessage, FooterLinks };
