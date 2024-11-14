import {
  cargarUser,
  getUserT,
  getUserI,
  getUserO,
  getM,
  getSeller,
  dislog,
  editU,
} from "../userreducer";
import axios from "axios";
import { setError, cargando, refresh, clearError } from "../statereducer";
import { PROXY } from "../index";

export const cargarUsuario = (payload) => (dispatch) => {
  dispatch(cargando());
  dispatch(cargarUser(payload));
  dispatch(refresh());
};

export const getUserbyToken = (token) => async (dispatch) => {
  dispatch(cargando());
  axios
    .post(`${PROXY}/user/confirm/` + token)
    .then((res) => dispatch(getUserT(res.data)))
    .then(() => dispatch(clearError()))
    .catch((error) => {
      dispatch(setError("fallo get user by token"));
      console.log(error + "fallo get token by id");
    });
};

export const getUserbyId = (id) => async (dispatch) => {
  dispatch(cargando());
  axios
    .get(`${PROXY}/user/` + id)
    .then((res) => dispatch(getUserI(res.data)))
    .then(() => dispatch(clearError()))
    .catch((error) => {
      console.log(error);
      dispatch(setError("no se pudo ejecutar get user by id"));
    });
};

export const getOrderbyId = (id) => async (dispatch) => {
  dispatch(cargando());
  axios
    .get(`${PROXY}/user/` + id)
    .then((res) => dispatch(getUserO(res.data)))
    .then(() => dispatch(clearError()))
    .catch((error) =>
      dispatch(setError("no se pudo ejecutar get orden by id"))
    );
};
export const getComprasTalentos = () => async (dispatch) => {
  dispatch(cargando());
  axios
    .get(`${PROXY}/user/` + id)
    .then((res) => dispatch(getM(res.data)))
    .then(() => dispatch(clearError()))
    .catch((error) =>
      dispatch(setError("no se pudo ejecutar get compras talentos"))
    );
};

export const publicProfile = (id) => async (dispatch) => {
  dispatch(cargando());
  axios
    .get(`${PROXY}/user/` + id)
    .then((res) => dispatch(getSeller(res.data)))
    .then(() => dispatch(clearError()))
    .catch((error) => {
      dispatch(setError("no se pudo ejecutar public profile"));
      console.log(error);
    });
};

export const desloguear = () => {
  clearError();
  return dislog();
};

export const editarUsuario = (body) => async (dispatch) => {
  dispatch(cargando());
  axios({
    method: "put",
    url: `${PROXY}/user`,
    data: body,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => dispatch(editU(res.data)))
    .then(() => dispatch(clearError()))
    .catch((error) => {
      console.log(error);
      dispatch(setError("no se pudo editar usuario"));
    });
};

export const logearUsuario = (body) => async (dispatch) => {
  dispatch(cargando());
  axios
    .post(`${PROXY}/user/loggin/`, body)
    .then((res) => dispatch(cargarUser(res.data)))
    .then(() => dispatch(clearError()))
    .catch(() => dispatch(setError("No se pudo cargar usuario")));
};

export const crearUsuario = (body) => async (dispatch) => {
  dispatch(cargando());
  axios
    .post(`${PROXY}/user/`, body)
    .then((res) => dispatch(cargarUser(res.data)))
    .then(() => dispatch(clearError()))
    .catch(() => dispatch(setError("fallo crear usuario")));
};
