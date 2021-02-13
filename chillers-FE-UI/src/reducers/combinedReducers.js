import { combineReducers } from 'redux';
import chillerReducer from './chillerReducer';
import userReducer from './userReducer';
import countersReducer from './counterReducer';

export default combineReducers({
    chiller: chillerReducer,
    counters: countersReducer,
    user: userReducer
});
