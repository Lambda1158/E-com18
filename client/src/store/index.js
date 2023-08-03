import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducers } from '../reducer/combineReducers';

import { persistStore } from 'redux-persist';
import persistReducer from '../reducer/combineReducers'
// const composeEnhancers =
//     ( typeof window !== 'undefined' && window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ ) || compose;



export const store = createStore(persistReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store)

export default {store, persistor}