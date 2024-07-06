import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Container from '@material-ui/core/Container';
import { useAuth } from '../Auth/AuthContext'; 

const Main = ({ children }) => {
  const { isAuthenticated, logout, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // Visa en laddningsindikator medan autentiseringen pågår
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header isAuthenticated={isAuthenticated} logout={logout} />
      <Container style={{ flex: 1, padding: 0, marginTop: 0 }}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default Main;