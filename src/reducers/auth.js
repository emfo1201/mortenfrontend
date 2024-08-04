// auth reducer
import { AUTH, LOGOUT } from '../constants/actionTypes';

const initialState = { authData: null, loading: true, errors: null };

export default (state = initialState, action) => {
    console.log('Reducer action:', action);
    console.log('Reducer state before:', state);

    switch (action.type) {
        case AUTH:
            console.log('Handling AUTH action');
            const newStateAuth = { ...state, authData: action.data, loading: false, errors: null };
            console.log('Reducer state after AUTH:', newStateAuth);
            return newStateAuth;
        case LOGOUT:
            console.log('Handling LOGOUT action');
            const newStateLogout = { ...state, authData: null, loading: false, errors: null };
            console.log('Reducer state after LOGOUT:', newStateLogout);
            return newStateLogout;
        default:
            console.log('Reducer state after default:', state);
            return state;
    }
};