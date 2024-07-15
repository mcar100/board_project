import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from './modules/user.js';

const rootReducer = combineReducers({user: userReducer});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;