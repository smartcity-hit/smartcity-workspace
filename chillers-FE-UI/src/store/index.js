import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers/combinedReducers';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
