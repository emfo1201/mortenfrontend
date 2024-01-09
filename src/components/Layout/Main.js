import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Container from '@material-ui/core/Container';

const Main = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Container style={{ flex: 1, padding: 0, marginTop: 0 }}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default Main;