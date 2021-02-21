import Axios from 'axios';

import {
    GET_ALERTS,
    ADD_ALERT,
    DELETE_ALERT
} from './types';

export const getAlerts = () => (dispatch:any, getState:any) => {
    Axios({
        method: 'GET',
        url: 'http://localhost:8000/api/alerts/',
        withCredentials:true
    }).then((res) => {
        dispatch({
        type: GET_ALERTS,
        payload: res.data,
        });
    }).catch((err) => console.log(err));
};

export const addAlert = (currency: string, direction: string, type: string, amount: number) => (dispatch:any, getState:any) => {
    Axios({
        method: 'POST',
        url: 'http://localhost:8000/api/alerts/',
        withCredentials:true,
        data: {
            currency,
            direction,
            type,
            amount
        }
    }).then((res) => {
        dispatch({
        type: ADD_ALERT,
        payload: res.data,
        });
    }).catch((err) => console.log(err));
}

export const deleteAlert = (id: string) => (dispatch:any, getState:any) => {
    Axios({
        method: 'DELETE',
        url: `http://localhost:8000/api/alerts/${id}`,
        withCredentials:true,
    }).then((res) => {
        dispatch({
        type: DELETE_ALERT,
        payload: id,
        });
    }).catch((err) => console.log(err));
}