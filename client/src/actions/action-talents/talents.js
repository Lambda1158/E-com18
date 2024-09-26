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
} from "../talentreducer";
import { PROXY } from "../index";

export const getTalents = () => async (dispatch) => {
  try {
    const talents = await axios.get(`${PROXY}/post`);

    dispatch(getT(talents.data)); // Dispatch the action with the talents array
  } catch (error) {
    console.log(error);
  }
};

export const getTalentById = (id) => async (dispatch) => {
  try {
    let respuesta = await axios.get(`${PROXY}/post/` + id);
    dispatch(getTbyId(respuesta.data));
  } catch (error) {
    console.log(error);
  }
};
export const searchTalent = (search) => async (dispatch) => {
  console.log("entre");
  axios
    .get(`${PROXY}/post/title/` + search)
    .then((talents) => {
      dispatch(searchT(talents.data));
    })
    .catch((error) => {
      console.log("no se encontró el curso" + error);
    });
};

export const getCategories = () => async (dispatch) => {
  axios
    .get(`${PROXY}/categories`)
    .then((response) => dispatch(getC(response.data)))
    .catch((error) => console.log(error));
};

export const sortByPrice = (order) => async (dispatch) =>
  dispatch(sortPrice(order));

export const filteredCat = (payload) => async (dispatch) =>
  dispatch(filterCategory(payload));

export const getTalentByRating = (rating) => async (dispatch) =>
  dispatch(filterRating(rating));

export const getSales = (id) => async (dispatch) => {
  axios
    .get(`${PROXY}/orden/ventas/` + id)
    .then((response) => dispatch(getS(response.data)))
    .catch((error) => console.log(error));
};

export const getComprasTalentos = (id) => async (dispatch) => {
  axios
    .get(`${PROXY}/user/` + id)
    .then((response) => dispatch(getM(response.data)))
    .catch((error) => console.log(error));
};


