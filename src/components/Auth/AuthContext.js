import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { signin } from '../../actions/auth'; // Importera din auth-funktion

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // Lägg till en state för felmeddelanden
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('jwtToken'));
  const dispatch = useDispatch();

  const login = async (formData, history) => {
    try {
      setError(null); // Återställ eventuella tidigare fel
      await dispatch(signin(formData, history));
      setIsAuthenticated(true);
      setUser({ username: formData.username }); // Sätt användaren i staten om inloggningen är framgångsrik
    } catch (error) {
      setError(error.message); // Fånga och sätt andra typer av felmeddelanden
    }
  };

  const logout = () => {
    // Rensa autentiseringstoken från cookies
    Cookies.remove('jwtToken');
    // Uppdatera isAuthenticated till false
    setIsAuthenticated(false);
  };

  const value = {
    user,
    login,
    logout,
    error,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};