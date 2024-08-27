import { AUTH, LOGOUT, START_LOADING, END_LOADING, AUTH_ERROR } from '../constants/actionTypes';

const authReducer = (state = { authData: null, isLoading: false, errors: null }, action) => {
    switch (action.type) {
        case AUTH:
            return { ...state, authData: action.data, isLoading: false, errors: null };
        case LOGOUT:
            return { ...state, authData: null, isLoading: false, errors: null };
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case AUTH_ERROR:
            return { ...state, isLoading: false, errors: action.payload };
        default:
            return state;
    }
};

export default authReducer;