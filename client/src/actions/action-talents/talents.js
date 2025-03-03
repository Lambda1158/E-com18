import axios from "axios";
import {
  getT,
  getTbyId,
  searchT,
  getC,
  sortPrice,
  filterCategory,
  filterRating,
  getS,
  getTalentUser,
} from "../talentreducer";
import { setError, clearError, cargando } from "../statereducer";
import { PROXY } from "../index";

export const getTalents = () => async (dispatch) => {
  cargando();
  axios
    .get(`${PROXY}/post`)
    .then((response) => dispatch(getT(response.data)))
    .then(() => dispatch(clearError()))
    .catch((error) => dispatch(setError("no se pudo ejecutar el get Talents")));
};

export const getTalentById = (id) => async (dispatch) => {
  cargando();
  axios
    .get(`${PROXY}/post/` + id)
    .then((response) => dispatch(getTbyId(response.data)))
    .then(() => dispatch(clearError()))
    .catch((error) => dispatch(setError(error.message)));
};
export const searchTalent = (search) => async (dispatch) => {
  cargando();
  axios
    .get(`${PROXY}/post/title?title=` + search)
    .then((talents) => {
      dispatch(searchT(talents.data));
    })
    .then(() => dispatch(clearError()))
    .catch((error) => dispatch(setError(error.message)));
};

export const getCategories = () => async (dispatch) => {
  cargando();
  axios
    .get(`${PROXY}/categories`)
    .then((response) => dispatch(getC(response.data)))
    .then(() => dispatch(clearError()))
    .catch((error) => dispatch(setError("no se pudo traer categorias")));
};

export const sortByPrice = (order) => async (dispatch) =>
  dispatch(sortPrice(order));

export const filteredCat = (payload) => async (dispatch) =>
  dispatch(filterCategory(payload));

export const getTalentByRating = (rating) => async (dispatch) =>
  dispatch(filterRating(rating));

export const getSales = (id) => async (dispatch) => {
  cargando();
  axios
    .get(`${PROXY}/orden/ventas/` + id)
    .then((response) => dispatch(getS(response.data)))
    .then(() => dispatch(clearError()))
    .catch((error) => dispatch(setError(error.message)));
};

export const getTalentsfromUser = (id) => async (dispatch) => {
  cargando();
  axios
    .get(`${PROXY}/post/user/` + id)
    .then((response) => dispatch(getTalentUser(response.data)))
    .then(() => dispatch(clearError()))
    .catch((error) =>
      dispatch(setError("No se pudo ejecutar get compras talentos"))
    );
};

export const createTalent = (payload) => async () => {
  cargando();
  axios({
    method: "post",
    url: `${PROXY}/post`,
    data: payload,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => console.log(res))
    .then(() => clearError())
    .catch((err) => setError("no se pudo crear tu post", err));
};

export const deletTalent = (payload) => async (dispatch) => {
  cargando();
  axios
    .delete(`${PROXY}/post/` + payload)
    .then((response) => dispatch(getTalentUser(response.data)))
    .then(() => dispatch(clearError()))
    .catch((error) => dispatch(setError("No se pudo borrar el talento")));
};

export const updateTalent = (payload) => async (dispatch) => {
  cargando();
  axios({
    method: "put",
    url: `${PROXY}/post`,
    data: payload,
  })
    .then((response) => dispatch(getTalentUser(response.data)))
    .then(() => dispatch(clearError()))
    .catch((error) => dispatch(setError("No se pudo editar")));
};
