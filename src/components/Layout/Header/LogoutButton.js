// LogoutButton.js
import React from "react";
import Button from "@material-ui/core/Button";
import useStyles from "../styles";

const LogoutButton = ({ handleLogout }) => {
  const classes = useStyles();
  return (
    <Button
      onClick={handleLogout}
      className={classes.logoutButton}
      color="inherit"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
