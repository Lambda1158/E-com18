import { configureStore } from '@reduxjs/toolkit'
import misliceReducer from "../actions/logicredux"

// const composeEnhancers =
//     ( typeof window !== 'undefined' && window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ ) || compose;




export const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: misliceReducer
  })