import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const carritoSlice = createSlice({
  name: "carrito",
  initialState,
  reducers: {
    addCarrito: (state, action) => {
      const { id } = action.payload;
      const producto = state.findIndex((item) => item.id === id);
      if (producto >= 0) {
        const newState = [
          ...state.slice(0, producto),
          { ...state[producto], quantity: state[producto].quantity + 1 },
          ...state.slice(producto + 1),
        ];
        return newState;
      }

      return [{ ...state, ...action.payload, quantity: 1 }];
    },
    clearCarrito: (state, action) => {
      return [];
    },
    removeCarrito: (state, action) => {
      const { id } = action.payload;
      const producto = state.findIndex((element) => element.id === id);
      if (producto >= 0) {
        if (state[producto].quantity > 1) {
          return [
            ...state.slice(0, producto),
            { ...state[producto], quantity: state[producto].quantity - 1 },
            ...state.slice(producto + 1),
          ];
        }
        return state.filter((element) => element.id != id);
      }
      return state;
    },
  },
});

export default carritoSlice.reducer;
export const { addCarrito, clearCarrito, removeCarrito } = carritoSlice.actions;
