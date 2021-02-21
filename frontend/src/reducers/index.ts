import { combineReducers } from 'redux';
import auth from './auth';
import currencies from './currencies'

export default combineReducers({
    auth,
    currencies
});