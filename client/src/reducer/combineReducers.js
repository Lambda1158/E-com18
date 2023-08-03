import { combineReducers } from 'redux';
import { authReducer } from '../reducer/auth';
import rootReducer from '../reducer';
import shoppingReducer from '../reducer/shoppingReducer'

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: 'root',
    storage,
    whitelist : ['index', 'cart']
}

const rootReducers = combineReducers ({
    auth: authReducer,
    index : rootReducer,
    cart: shoppingReducer
});


export default persistReducer(persistConfig, rootReducers)
