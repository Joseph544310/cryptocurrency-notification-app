import {
    GET_CURRENCIES
} from '../actions/types';
  
const initialState = {
    currencies: []
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case GET_CURRENCIES:
            return {
                ...state,
                currencies: [...action.payload]
            };
        default:
            return state;
    }
}