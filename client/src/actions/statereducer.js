// reducers/miSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cargando: false,
  error: false,
  message: "",
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    // Define las acciones y cómo se actualizará el estado
    cargando: (state) => {
      return {
        ...state,
        cargando: true,
      };
    },
    refresh: (state) => {
      return {
        ...state,
        cargando: false,
      };
    },
    setError: (state, action) => {
      return {
        ...state,
		cargando:false,
        error: true,
        message: action.payload,
      };
    },
    clearError: (state) => {
      return {
        ...state,
		cargando:false,
        error: false,
        message: "",
      };
    },
  },
});

export const { cargando, refresh, setError, clearError } = stateSlice.actions;
export default stateSlice.reducer;
