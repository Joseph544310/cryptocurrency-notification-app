import Axios from 'axios';

import {
    GET_CURRENCIES
} from './types';

// CHECK TOKEN & LOAD USER
export const getCurrencies = () => (dispatch:any, getState:any) => {
    Axios({
        method: 'GET',
        url: 'http://localhost:8000/api/currencies',
        withCredentials:true
    }).then((res) => {
        dispatch({
        type: GET_CURRENCIES,
        payload: res.data,
        });
    }).catch((err) => console.log(err));
};