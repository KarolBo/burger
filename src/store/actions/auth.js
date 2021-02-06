import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (userId, idToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId,
        idToken
    }
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
};

export const authenticate = (email, password, isSignIn) => {
    return async dispatch => {
        const api_key = 'AIzaSyByUhzjJUR9YNzvBifP6tkDLbCfGwk6ENk';
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + api_key;
        if (isSignIn)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + api_key;
        const authBody = {
            email,
            password, 
            returnSecureToken: true
        }
        dispatch(authStart());
        try {
            const response = await axios.post(url, authBody);
            dispatch(authSuccess(response.data.localId, response.data.idToken));
        } catch (err) {
            console.log(err);
            dispatch(authFail(err));
        }
    };
};