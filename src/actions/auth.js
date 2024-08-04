// auth.js (actions)
import Cookies from 'js-cookie';
import { AUTH, START_LOADING, END_LOADING, AUTH_ERROR } from '../constants/actionTypes';
import * as api from '../api';

export const validateToken = async () => {
  console.log("In validateToken action");
  try {
    const { data } = await api.validateToken();
    console.log("validateToken response:", data);
    return data.isValid; // Return true om token är giltig, annars false
  } catch (error) {
    console.error('Error validating token:', error);
    return false; // Vid fel, anta att token inte är giltig
  }
};

export const signin = (formData, router) => async (dispatch) => {
  console.log("In signin action with formData:", formData);
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.signIn(formData);
    console.log("Signin response data:", data);
    
    const expirationTime = new Date(Date.now() + 60 * 60 * 1000);
    Cookies.set('jwtToken', data.token, { expires: expirationTime });

    dispatch({ type: AUTH, data });
    dispatch({ type: END_LOADING });
    router('/'); // Navigera efter inloggning
  } catch (error) {
    console.error("Error in signin action:", error);
    dispatch({ type: AUTH_ERROR, payload: error.message });
    dispatch({ type: END_LOADING });
    throw new Error('Login failed'); // Skicka ett tydligt felmeddelande
  }
};

export const signup = (formData, router) => async (dispatch) => {
  console.log("In signup action with formData:", formData);
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.signUp(formData);
    console.log("Signup response data:", data);

    Cookies.set('jwtToken', data.token, { expires: 7 });

    dispatch({ type: AUTH, data });
    dispatch({ type: END_LOADING });
    router('/'); // Navigera efter registrering
  } catch (error) {
    console.error("Error in signup action:", error);
    dispatch({ type: AUTH_ERROR, payload: error.message });
    dispatch({ type: END_LOADING });
    throw new Error('Signup failed'); // Skicka ett tydligt felmeddelande
  }
};