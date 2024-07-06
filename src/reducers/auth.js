import { AUTH, LOGOUT } from '../constants/actionTypes'
import Cookies from 'js-cookie'

export default (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            // Uppdatera autentiseringstillståndet när inloggning sker
            return { ...state, authData: action.data, loading: false, errors: null };
        case LOGOUT:
            // Återställ autentiseringstillståndet när utloggning sker
            return { ...state, authData: null, loading: false, errors: null };
        default:
            return state;
    }
};