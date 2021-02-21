import {
    GET_ALERTS,
    ADD_ALERT,
    DELETE_ALERT
} from '../actions/types';
  
const initialState = {
    alerts: []
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case GET_ALERTS:
            return {
                ...state,
                alerts: [...action.payload]
            };
        case ADD_ALERT:
            return {
                ...state,
                alerts: [...state.alerts, action.payload]
            }
        case DELETE_ALERT:
            const index = state.alerts.findIndex((alert:any) => alert.id === action.payload)
            return {
                ...state,
                alerts: [...state.alerts.slice(0, index), ...state.alerts.slice(index+1)]
            }
        default:
            return state;
    }
}