import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null, 
            userId: null, 
            error: null,
            loading: false,
            authRedirect: '/'
        });
    });

    it('should store a token upon login', () => {
        expect(reducer({
            token: null, 
            userId: null, 
            error: null,
            loading: false,
            authRedirect: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            userId: 'chuj',
            idToken: 'kurwa'
        })).toEqual({
            token: 'kurwa', 
            userId: 'chuj', 
            error: null,
            loading: false,
            authRedirect: '/'
        });
    });
});