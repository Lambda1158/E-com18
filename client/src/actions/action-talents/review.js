import { getR, getQa, getQp } from "../revqareducer";
import axios from "axios";
import { PROXY } from "../index";
export const getReviewbyId = (id) => async (dispatch) => {
  axios
    .get(`${PROXY}/review/all/` + id)
    .then((response) => dispatch(getR(response.data)))
    .catch((error) => console.log(error));
};
export const getQAbyId = (idUser) => async (dispatch) => {
  axios
    .get(`${PROXY}/question/all/` + idUser)
    .then((response) => dispatch(getQa(response.data)))
    .catch((error) => console.log(error));
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
  axios
    .put(`${PROXY}/question/answer`, answer)
    .then((response) => dispatch(getQa(response.data)))
    .catch((error) => console.log(error));
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
