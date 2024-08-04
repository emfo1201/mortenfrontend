import { AUTH, LOGOUT, START_LOADING, END_LOADING, AUTH_ERROR } from '../constants/actionTypes';

export default (state = { authData: null, loading: false, errors: null }, action) => {
    switch (action.type) {
        case AUTH:
            return { ...state, authData: action.data, loading: false, errors: null };
        case LOGOUT:
            return { ...state, authData: null, loading: false, errors: null };
        case START_LOADING:
            return { ...state, loading: true };
        case END_LOADING:
            return { ...state, loading: false };
        case AUTH_ERROR:
            return { ...state, loading: false, errors: action.payload };
        default:
            return state;
    }
};