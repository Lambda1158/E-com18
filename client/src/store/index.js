import { configureStore } from "@reduxjs/toolkit";
import misliceReducer from "../actions/talentreducer";
import userSliceReducer from "../actions/userreducer";
import reviewSliceReducer from "../actions/revqareducer";
import stateSliceReducer from "../actions/statereducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import cartreducer from "../actions/cartreducer";

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
  cart: cartreducer,
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
      serializableCheck: false, // error con redux-persist non serializable solucion
    }),
});
