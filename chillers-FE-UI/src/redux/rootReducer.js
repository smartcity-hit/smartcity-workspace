import { combineReducers } from 'redux';
import chillerReducer from './Chiller-Details/chiller-details-reducer';
import userReducer from './User-Details/user-details-reducer';
import countersListReducer from './Counters-List/counters-list-reducer';
import counterDetailsReducer from './Counter-Details/counter-details-reducer';
import chillersListReducer from './Chillers-List/chillers-list-reducer';

export default combineReducers({
    chiller: chillerReducer,
    chillersList: chillersListReducer,
    countersList: countersListReducer,
    counterDetails: counterDetailsReducer,
    user: userReducer
});
