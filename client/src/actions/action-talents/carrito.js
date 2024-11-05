import {
  addCarrito,
  clearCarrito,
  eliminarCarrito,
  removeCarrito,
} from "../cartreducer";

export const agregarCarrito = (item) => (dispatch) => {
  return dispatch(addCarrito(item));
};

export const limpearCarrito = () => (dispatch) => {
  dispatch(clearCarrito());
};

export const restarCarrito = (item) => (dispatch) => {
  dispatch(removeCarrito(item));
};

export const removerCarrito = (item) => (dispatch) => {
  dispatch(eliminarCarrito(item));
};
