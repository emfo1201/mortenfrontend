import Cookies from 'js-cookie';
import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    // Sätt en cookie när användaren loggar in
    Cookies.set('jwtToken', data.token, { expires: 7 }); // 'authToken' är namnet på cookien, och 'data.token' är värdet

    dispatch({ type: AUTH, data });

    router('/'); // Du kan nu använda cookien i ditt api-anrop eller andra delar av din applikation
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    console.log("inside signup ", formData)
    const { data } = await api.signUp(formData);

    // Sätt en cookie när användaren loggar in
  //  Cookies.set('jwtToken', data.token, { expires: 7 }); // 'authToken' är namnet på cookien, och 'data.token' är värdet

    dispatch({ type: AUTH, data });

    router('/'); // Du kan nu använda cookien i ditt api-anrop eller andra delar av din applikation
  } catch (error) {
    console.log(error);
  }
};