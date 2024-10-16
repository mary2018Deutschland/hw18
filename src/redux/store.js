import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; 
import shopReducer from './redusers';

// хранилищe с применением redux-thunk
const store = createStore(shopReducer, applyMiddleware(thunk));
export default store;
