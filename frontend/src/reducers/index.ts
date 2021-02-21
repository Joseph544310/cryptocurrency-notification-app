import { combineReducers } from 'redux';
import auth from './auth';
import currencies from './currencies'
import alerts from './alerts'

export default combineReducers({
    auth,
    currencies,
    alerts
});