import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button, Snackbar, SnackbarContent } from "@material-ui/core";
import useStyles from "./styles";

/**
 * CookieConsent component displays a snackbar for cookie consent.
 *
 * @returns {JSX.Element} The rendered CookieConsent component.
 */
const CookieConsent = () => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    // Check if consent cookie exists
    if (!consent) {
      setIsVisible(true); // Show snackbar if no consent found
    }
  }, []);

  // Handle cookie acceptance
  const handleAccept = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 });
    setIsVisible(false);
  };

  // Handle cookie decline
  const handleDecline = () => {
    Cookies.set("cookieConsent", "false", { expires: 365 });
    setIsVisible(false);
  };

  // Handle snackbar close
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return; // Prevent closing on clickaway
    setIsVisible(false);
  };

  return (
    <Snackbar
      open={isVisible}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleClose}
    >
      <SnackbarContent
        className={classes.snackbar}
        message={
          <span style={{ fontSize: "inherit" }}>
            We use cookies to improve your experience. Do you accept?
          </span>
        }
        action={[
          <Button
            className={classes.button}
            color="inherit"
            onClick={handleAccept}
          >
            Accept
          </Button>,
          <Button
            className={classes.button}
            color="inherit"
            onClick={handleDecline}
          >
            Decline
          </Button>,
        ]}
      />
    </Snackbar>
  );
};

export default CookieConsent;
