import { combineReducers } from 'redux';
import userReducer from './User-Details/user-details-reducer';
import countersListReducer from './Counters-List/counters-list-reducer';
import counterDetailsReducer from './Counter-Details/counter-details-reducer';
import chillerDetailsReducer from './Chiller-Details/chiller-details-reducer';
import chillersListReducer from './Chillers-List/chillers-list-reducer';

export default combineReducers({
    chillersList: chillersListReducer,
    counterDetails: counterDetailsReducer,
    countersList: countersListReducer,
    chillerDetails: chillerDetailsReducer,
    user: userReducer
});
