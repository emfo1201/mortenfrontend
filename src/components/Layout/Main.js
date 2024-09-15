import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Container from '@material-ui/core/Container';
import { useAuth } from '../Auth/AuthContext';
import useStyles from './styles'; // Justera sökvägen efter behov

const Main = ({ children }) => {
  const { isAuthenticated, logout, loading } = useAuth();
  const classes = useStyles(); // Använd stilarna från useStyles

  // Visa en laddningsindikator medan autentiseringen pågår
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.rootHeader}>
      <Header isAuthenticated={isAuthenticated} logout={logout} />
      <Container className={classes.container}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default Main;
