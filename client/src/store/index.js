import { configureStore } from '@reduxjs/toolkit'
import redux1 from '../reducer';
import shoppingReducer from '../reducer/shoppingReducer'


// const composeEnhancers =
//     ( typeof window !== 'undefined' && window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ ) || compose;




export const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
      posts: redux1,
      users: shoppingReducer
    }
  })