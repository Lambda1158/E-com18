import { configureStore } from "@reduxjs/toolkit";
import misliceReducer from "../actions/logicredux";
import userSliceReducer from "../actions/userredux";
import reviewSliceReducer from "../actions/revqueredux";
import stateSliceReducer from "../actions/statereducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

// export const store = configureStore({
//   // Automatically calls `combineReducers`
//   reducer: {
//     stateSliceReducer,
//     misliceReducer,
//     userSliceReducer,
//     reviewSliceReducer,
//   },
// });

const favReducer = combineReducers({
  state: stateSliceReducer,
  mislice: misliceReducer,
  user: userSliceReducer,
  review: reviewSliceReducer,
});

const persistConfig = {
  key: "root",
  storage,
  expire: 10 * 60 * 1000,
};

const persistedReducer = persistReducer(persistConfig, favReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // error con redux-persist non serializable
    }),
});
