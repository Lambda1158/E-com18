import { getR, getQa, getQp, getOr } from "../revqareducer";
import axios from "axios";
import { cargando, setError, clearError } from "../statereducer";
import { PROXY } from "../index";
export const getReviewbyId = (id) => async (dispatch) => {
  dispatch(cargando);
  axios
    .get(`${PROXY}/review/all/` + id)
    .then((response) => dispatch(getR(response.data)))
    .then(() => dispatch(clearError()))
    .catch((error) =>
      dispatch(setError(error.message))
    );
};
export const getQAbyId = (idUser) => async (dispatch) => {
  dispatch(cargando());
  axios
    .get(`${PROXY}/question/all/` + idUser)
    .then((response) => dispatch(getQa(response.data)))
    .then(() => dispatch(clearError()))
    .catch((error) => dispatch(setError("No se pudo ejecutar getqabyid")));
};
export const postQuestion = (body) => async (dispatch) => {
  axios
    .post(`${PROXY}/question`, body)
    .then((response) => dispatch(getQp(response.data)))
    .catch((error) => console.log(error));
};

export const getUserofReviewbyId = (id) => async (dispatch) => {
  axios
    .get(`${PROXY}/review/` + id)
    .then((response) => dispatch(getR(response.data)))
    .catch((error) => console.log(error));
};

export const createAnswer = (answer) => async (dispatch) => {
  cargando();
  axios({
    method: "put",
    url: `${PROXY}/question/answer`,
    data: answer,
  })
    .then((response) => dispatch(getQa(response.data)))
    .then(() => dispatch(clearError()))
    .catch((error) => dispatch(setError(error.message)));
};

export const getPostQuestion = (idPost) => async (dispatch) => {
  axios
    .get(`${PROXY}/question/` + idPost)
    .then((response) => {
      dispatch(cargando(false));
      dispatch(getQp(response.data));
    })
    .catch((error) => console.log(error));
};

export const getPostReview = (idPost) => async (dispatch) => {
  axios
    .get(`${PROXY}/review/` + idPost)
    .then((response) => dispatch(getR(response.data)))
    .catch((error) => console.log(error));
};

export const postNewReview = (body) => async (dispatch) => {
  axios
    .post(`${PROXY}/review`, body)
    .then((response) => dispatch(getR(response.data)))
    .catch((error) => {
      throw new Error(error);
    });
};

export const getOrderbyId = (id) => async (dispatch) => {
  dispatch(cargando());
  axios
    .get(`${PROXY}/orden/` + id)
    .then((res) => dispatch(getOr(res.data)))
    .then(() => dispatch(clearError()))
    .catch((error) =>
      dispatch(() => setError("no se pudo ejecutar get orden by id"))
    );
};
