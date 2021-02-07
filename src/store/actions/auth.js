import axios from 'axios';

import * as actionTypes from './actionTypes';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

const authSuccess = (userId, idToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId,
        idToken
    }
};

const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => dispatch(authLogout()), expirationTime * 1000);
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
            localStorage.setItem('token', response.data.idToken);
            const expDate = new Date().getTime() + response.data.expiresIn * 1000;
            localStorage.setItem('expirationDate', expDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.localId, response.data.idToken));
            dispatch(checkTimeout(response.data.expiresIn));
        } catch (err) {
            console.log(err);
            dispatch(authFail(err.response.data.error));
        }
    };
};

export const setPathRedirect = path => {
    return {
        type: actionTypes.SET_PATH_REDIRECT,
        path
    }
}

export const authCheckState = () => {
 return dispatch => {
     const token = localStorage.getItem('token');
     if (!token) {
         dispatch(authLogout);
     } else {
         const expirationDate = localStorage.getItem('expirationDate');
         const userId = localStorage.getItem('userId');
         if (expirationDate < new Date()) {
             dispatch(authLogout());
         } else {
             dispatch(authSuccess(userId, token));
             dispatch(checkTimeout((expirationDate - new Date().getTime()) / 1000 ));
         }
     }
 }
};