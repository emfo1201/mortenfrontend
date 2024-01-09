import React from 'react';
import Button from '@material-ui/core/Button';

const UserActions = ({ user, logout, signin }) => {
  return (
    <>
      {user ? (
        <Button variant="contained" color="secondary" size="small" onClick={logout}>
          Logout
        </Button>
      ) : (
        <Button variant="contained" color="primary" size="small" onClick={signin}>
          Sign in
        </Button>
      )}
    </>
  );
};

export default UserActions;