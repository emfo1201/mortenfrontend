//Main.js
import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer";
import Container from "@material-ui/core/Container";
import { useAuth } from "../Auth/AuthContext";
import useStyles from "./styles";

const Main = ({ children }) => {
  const { isAuthenticated, logout, loading } = useAuth();
  const classes = useStyles();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.rootHeader}>
      <Header isAuthenticated={isAuthenticated} logout={logout} />
      <Container className={classes.container}>{children}</Container>
      <Footer />
    </div>
  );
};

export default Main;
