import {
  addCarrito,
  clearCarrito,
  eliminarCarrito,
  removeCarrito,
} from '../cartreducer';
import axios from 'axios';
import { PROXY } from '../index';
import { clearError, setError } from '../statereducer';
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

export const comprarCarrito = (item) => async (dispatch) => {
  try {
    const response = await axios.post(`${PROXY}/checkout/`, item);
    window.location.href = response.data.redirectUrl;
    dispatch(clearError());
  } catch (error) {
    console.log(error);
    dispatch(setError(error.message));
  }
};
