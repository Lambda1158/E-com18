import { configureStore } from '@reduxjs/toolkit'
import misliceReducer from "../actions/logicredux"
import userSliceReducer from "../actions/userredux"
import reviewSliceReducer from "../actions/revqueredux"

// const composeEnhancers =
//     ( typeof window !== 'undefined' && window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ ) || compose;




export const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
      misliceReducer,
      userSliceReducer,
      reviewSliceReducer
    }
  })