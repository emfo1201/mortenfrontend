import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AUTH } from '../../constants/actionTypes';
import { validateToken } from '../../actions/auth.js';
import { signIn } from '../../api/index.js';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('jwtToken');
      console.log("in auth context");
      if (token) {
        console.log("is token");
        try {
          console.log("before isValid");
          const isValid = await validateToken(); // Notera användning av await här
          console.log("after isValid ", isValid);
          setIsAuthenticated(isValid);
        } catch (error) {
          console.error('Error validating token:', error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);  

  const login = async (formData, navigate, dispatch) => {
    try {
      const { data } = await signIn(formData);
      console.log("Sign in successful, token:", data.token);
      const expirationTime = new Date(Date.now() + 60 * 60 * 1000);
      Cookies.set('jwtToken', data.token, { expires: expirationTime });
  
      dispatch({ type: AUTH, data });
      navigate('/'); // Navigera till önskad sida efter inloggning
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    // Ta bort JWT-token från cookies
    console.log("removed cookie");
    Cookies.remove('jwtToken');
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};