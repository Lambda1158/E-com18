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
    .then((response) => {
      dispatch(refresh());
      dispatch(getUserT(response.data));
    })
    .catch((error) => {
      dispatch(setError("fallo get user by token"));
      console.log(error + "fallo get token by id");
    });
};

export const getUserbyId = (id) => async (dispatch) => {
  dispatch(cargando());
  axios
    .get(`${PROXY}/user/` + id)
    .then((response) => {
      dispatch(refresh());
      dispatch(getUserI(response.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setError("no se pudo ejecutar get user by id"));
    });
};

export const getOrderbyId = (id) => async (dispatch) => {
  dispatch(cargando());
  axios
    .get(`${PROXY}/user/` + id)
    .then((response) => {
      dispatch(refresh());
      dispatch(getUserO(response.data));
    })
    .catch((error) =>
      dispatch(setError("no se pudo ejecutar get orden by id"))
    );
};
export const getComprasTalentos = () => async (dispatch) => {
  dispatch(cargando());
  axios
    .get(`${PROXY}/user/` + id)
    .then((response) => {
      dispatch(refresh());
      dispatch(getM(response.data));
    })
    .catch((error) =>
      dispatch(setError("no se pudo ejecutar get compras talentos"))
    );
};

export const publicProfile = (id) => async (dispatch) => {
  dispatch(cargando());
  axios
    .get(`${PROXY}/user/` + id)
    .then((response) => {
      dispatch(refresh());
      dispatch(getSeller(response.data));
    })
    .catch((error) => {
      dispatch(setError("no se pudo ejecutar public profile"));
      console.log(error);
    });
};

export const desloguear = () => dislog();

export const editarUsuario = (body) => async (dispatch) => {
  dispatch(cargando());
  axios({
    method: "put",
    url: `${PROXY}/user`,
    data: body,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => {
      dispatch(refresh());
      dispatch(editU(res.data));
      dispatch(clearError());
    })
    .catch((error) => {
      console.log(error);
      dispatch(setError("no se pudo editar usuario"));
    });
};

export const logearUsuario = (body) => async (dispatch) => {
  try {
    dispatch(cargando());
    const sesion = await axios.post(`${PROXY}/user/loggin/`, body);
    dispatch(cargarUser(sesion.data));
    dispatch(refresh());
  } catch {
    dispatch(setError("No se pudo cargar usuario"));
  }
};

export const crearUsuario = (body) => async (dispatch) => {
  dispatch(cargando());
  axios
    .post(`${PROXY}/user/`, body)
    .then((res) => {
      dispatch(refresh());
      dispatch(cargarUser(res.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setError("fallo crear usuario"));
    });
};
