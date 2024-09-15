// auth.js (actions)
import Cookies from 'js-cookie';
import { AUTH, START_LOADING, END_LOADING, AUTH_ERROR } from '../constants/actionTypes';
import * as api from '../api';

export const validateToken = async () => {
  try {
    const response = await api.validateToken();
    return response.data; // Return the whole response data object
  } catch (error) {
    console.error('Error validating token:', error);
    return null; // Return null or an appropriate value if there's an error
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