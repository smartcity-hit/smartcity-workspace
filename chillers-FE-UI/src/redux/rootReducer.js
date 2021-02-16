import { combineReducers } from 'redux';
import chillerReducer from './Chiller-Details/chiller-details-reducer';
import userReducer from './User-Details/user-details-reducer';
import countersListReducer from './Counters-List/counters-list-reducer';
import counterDetailsReducer from './Counter-Details/counter-details-reducer';

export default combineReducers({
    chiller: chillerReducer,
    countersList: countersListReducer,
    counterDetails: counterDetailsReducer,
    user: userReducer
});
