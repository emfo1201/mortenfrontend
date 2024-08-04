// actions/auth.js

import Cookies from 'js-cookie';
import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const validateToken = async () => {
  console.log("in validateToken")
  try {
    const { data } = await api.validateToken();
    return data.isValid; // Returnera true om cookien är giltig, annars false
  } catch (error) {
    console.error('Error validating token:', error);
    return false; // Vid fel antar vi att cookien inte är giltig
  }
};

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    console.log("token: ", data.token)
    // Sätt en cookie när användaren loggar in
    // Beräkna expiration time för cookien, 1 timme från nu
    const expirationTime = new Date(Date.now() + 60 * 60 * 1000);

    // Sätt cookien med den nya expiration timen
    Cookies.set('jwtToken', data.token, { expires: expirationTime }); // 'authToken' är namnet på cookien, och 'data.token' är värdet

    dispatch({ type: AUTH, data });

    router('/'); // Du kan nu använda cookien i ditt api-anrop eller andra delar av din applikation
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    // Sätt en cookie när användaren loggar in
    Cookies.set('jwtToken', data.token, { expires: 7 }); // 'authToken' är namnet på cookien, och 'data.token' är värdet

    dispatch({ type: AUTH, data });

    router('/'); // Du kan nu använda cookien i ditt api-anrop eller andra delar av din applikation
  } catch (error) {
    console.log(error);
  }
};
