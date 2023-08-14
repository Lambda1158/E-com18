import { configureStore } from '@reduxjs/toolkit'
import misliceReducer from "../actions/logicredux"
import userSliceReducer from "../actions/userredux"
import reviewSliceReducer from "../actions/revqueredux"
import stateSliceReducer from "../actions/statereducer"


// const composeEnhancers =
//     ( typeof window !== 'undefined' && window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ ) || compose;




export const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
      stateSliceReducer,
      misliceReducer,
      userSliceReducer,
      reviewSliceReducer,
    }
  })