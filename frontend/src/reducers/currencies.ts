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
                currencies: [...state.currencies]
            };
        default:
            return state;
    }
}