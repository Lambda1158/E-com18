// reducers/miSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cargando: false,
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    // Define las acciones y cómo se actualizará el estado
    cargando: (state, actions) => {
      return {
        ...state,
        cargando: actions.payload,
      };
    },
    refreshT: (state) => {
      return {
        ...state,
        cargando: true,
      };
    },
  },
});

export const { cargando, refreshT } = stateSlice.actions;
export default stateSlice.reducer;
