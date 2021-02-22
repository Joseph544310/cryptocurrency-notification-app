import Axios from 'axios';

import {
    USER_LOADED,
    USER_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ALERTS,
} from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch:any, getState:any) => {
    // User Loading
    dispatch({ type: USER_LOADING });

    Axios({
        method: 'GET',
        url: 'http://localhost:8000/api/auth/user',
        headers: setHeaders(getState)
    }).then((res) => {
        dispatch({
        type: USER_LOADED,
        payload: res.data,
        });
    })
    .catch((err) => console.log(err));
};

// LOGIN USER
export const login = (username:string, password:string) => (dispatch: any) => {
    Axios({
        method:'POST',
        url: 'http://localhost:8000/api/auth/login',
        data: {
            username,
            password
        },
        headers: {
        'Content-Type': 'application/json',
        }
    }).then((res) => {
        dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
        });
    })
    .catch((err) => console.log(err));
};

// REGISTER USER
export const register = (username: string, password: string, email:string) => (dispatch:any) => {

    Axios({
        method: 'POST',
        data: {
            username,
            email,
            password
        },
        headers: {
            'Content-Type': 'application/json',
        },
        url: 'http://localhost:8000/api/users/'
    })
    .then((res) => {
        Axios({
            method:'POST',
            url: 'http://localhost:8000/api/auth/login',
            data: {
                username,
                password
            },
            headers: {
            'Content-Type': 'application/json',
            }
        }).then((res) => {
            dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
            });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

// LOGOUT USER
export const logout = () => (dispatch: any, getState: any) => {
    Axios({
        method: 'POST',
        headers: setHeaders(getState),
        url: 'http://localhost:8000/api/auth/logout'
    })
    .then((res) => {
        dispatch({ type: CLEAR_ALERTS });
        dispatch({
        type: LOGOUT_SUCCESS,
        });
    })
    .catch((err) => console.log(err));
};

// Setup config with token - helper function
export const setHeaders = (getState: any) => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const headers= {
        'Content-Type': 'application/json',
        'Authorization': ''
    };

    // If token, add to headers config
    if (token) {
    headers['Authorization'] = `Token ${token}`;
    }

    return headers;
};