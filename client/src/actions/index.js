import axios from "axios";
import {getT,getTbyId,searchT,getC,sortPrice,filterCategory,filterRating,getS} from "../actions/logicredux"
import { cargarUser,getUserT,getUserI,getUserO,getM,getSeller,dislog} from "./userredux";
import { getR,getQa,getQp } from "./revqueredux"
import { cargando,refreshT} from "./statereducer";
export const PROXY = "http://localhost:3001"||"https://hitalent-project.herokuapp.com";
export const SEARCH_TALENT = "SEARCH_TALENT";
export const CARGAR_USUARIO = "CARGAR_USUARIO";
export const POST_USER = "POST_USER";
export const GET_USER_TOKEN = "GET_USER_TOKEN";
export const GET_TALENT = "GET_TALENT";
export const GET_USER_ID = "GET_USER_ID";
export const GET_ORDER_ID = "GET_ORDER_ID";
export const GET_REVIEW_ID = "GET_REVIEW_ID";
export const GET_MOVE_ID = "GET_MOVE_ID";
export const GET_QA_ID = "GET_QA_ID";
export const GET_TALENT_BY_ID = "GET_TALENT_BY_ID";
export const LOGUEAR_USUARIO = "LOGUEAR_USUARIO";
export const PUT_ANSWER = "PUT_ANSWER";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const POST_QUESTION = "POST_QUESTION";
export const GET_POST_QUESTION = "GET_POST_QUESTION";
export const SORT_BY_PRICE = "SORT_BY_PRICE";
export const GET_POST_REVIEW = "GET_POST_REVIEW";
export const FILTRO_CAT = "FILTRO_CAT";
export const TALENT_BY_RATING = "TALENT_BY_RATING";
export const POST_ORDER = "POST_ORDER";
export const CARGANDO = "CARGANDO";
export const SELLER_PROFILE = "SELLER_PROFILE";
export const REFRESH = "REFRESH";
export const GET_SALES = "GET_SALES"
export const DESLOGUEAR = "DESLOGUEAR"



export const getTalents = () => async (dispatch) => {
  try {
    const talents = await axios.get(`${PROXY}/post`);

    dispatch(getT(talents.data)); // Dispatch the action with the talents array
  } catch (error) {
    console.log(error)
  }
};

export const getTalentById=(id)=> async (dispatch)=> {
  try{
    let respuesta= await axios.get(`${PROXY}/post/` + id);
    dispatch(getTbyId(respuesta.data))
  }catch(error){
    console.log(error)
  }

}
export const searchTalent=(search)=> async(dispatch)=>{
  console.log("entre")
  axios
      .get(`${PROXY}/post/title/` + search)
      .then((talents) => {
        dispatch(searchT(talents.data));
      })
      .catch((error) => {
        console.log("no se encontró el curso");
      });

  }


export const cargarUsuario=(payload)=>  (dispatch)=>{
  dispatch(cargarUser(payload))
}
// export function cargarUsuario(payload) {
//   return {
//     type: CARGAR_USUARIO,
//     payload: payload,
//   };
// }


export function createUser(payload) {
  return async function (dispatch) {
    const newUser = await axios.post(`${PROXY}/user`, payload);
    dispatch(cargarUser(newUser.data))
  };
}


export const getUserbyToken=(token)=> async(dispatch)=>{
  axios
  .post(`${PROXY}/user/confirm/` + token)
  .then((response)=>{dispatch(getUserT(response.data))})
  .catch((error)=>{console.log(error+"fallo get token by id")})
}
// export function getUserbyToken(token) {
//   return async function (dispatch) {
//     try {
//       var json = await axios.post(`${PROXY}/user/confirm/` + token);
//       return dispatch({
//         type: GET_USER_TOKEN,
//         payload: json.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }
export const getUserbyId=(id)=>async(dispatch)=>{
  axios
  .get(`${PROXY}/user/` + id)
  .then((response)=>{dispatch(getUserI(response.data))})
  .catch((error)=>{console.log(error)})
}

// export function getUserbyId(id) {
//   return async function (dispatch) {
//     try {
//       var user = await axios.get(`${PROXY}/user/` + id);
//       return dispatch({
//         type: GET_USER_ID,
//         payload: user.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export const getOrderbyId=(id)=>async(dispatch)=>{
  axios
  .get(`${PROXY}/user/` + id)
  .then(response=>dispatch(getUserO(response.data)))
  .catch((error)=>console.log(error))
}

// export function getOrderbyId(id) {
//   return async function (dispatch) {
//     try {
//       var order = await axios.get(`${PROXY}/user/` + id); //Aquí hay que cambiarle
//       // console.log(order)
//       return dispatch({
//         type: GET_ORDER_ID,
//         payload: order.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export const getReviewbyId=(id)=>async(dispatch)=>{
  axios
  .get(`${PROXY}/review/all/` + id)
  .then(response=>dispatch(getR(response.data)))
  .catch(error=>console.log(error))
}

// export function getReviewbyId(id) {
//   return async function (dispatch) {
//     try {
//       var review = await axios.get(`${PROXY}/review/all/` + id); //el id es el del usuario(perfil)
//       return dispatch({
//         type: GET_REVIEW_ID,
//         payload: review.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export const getUserofReviewbyId=(id)=>async(dispatch)=>{
  axios
  .get(`${PROXY}/review/` + id)
  .then(response=>dispatch(getR(response.data)))
  .catch(error=>console.log(error))
}

// export function getUserofReviewbyId(id) {
//   return async function (dispatch) {
//     try {
//       var review = await axios.get(`${PROXY}/review/` + id);
//       return dispatch({
//         type: GET_REVIEW_ID,
//         payload: review.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export const getMovebyId=(id)=>async(dispatch)=>{
  axios
  .get(`${PROXY}/user/` + id)
  .then(response=>dispatch(getM(response.data)))
  .catch(error=>console.log(error))
}

// export function getMovebyId(id) {
//   return async function (dispatch) {
//     try {
//       var movement = await axios.get(`${PROXY}/user/` + id);
//       // console.log(movement)
//       return dispatch({
//         type: GET_MOVE_ID,
//         payload: movement.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export const getQAbyId=(idUser)=> async(dispatch)=>{
  axios
  .get(`${PROXY}/question/all/` + idUser)
  .then(response=>dispatch(getQa(response.data)))
  .catch(error=>console.log(error))
}

// export function getQAbyId(idUser) {
//   return async function (dispatch) {
//     try {
//       var qa = await axios.get(`${PROXY}/question/all/` + idUser);
//       return dispatch({
//         type: GET_QA_ID,
//         payload: qa.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export const createAnswer=(answer)=>async(dispatch)=>{
  axios
  .put(`${PROXY}/question/answer`, answer)
  .then(response=>dispatch(getQa(response.data)))
  .catch(error=>console.log(error))
}

// export function createAnswer(answer) {
//   return async function (dispatch) {
//     try {
//       var info = await axios.put(`${PROXY}/question/answer`, answer);
//       console.log(info.data);
//       return dispatch({
//         type: PUT_ANSWER,
//         payload: info.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export const postQuestion=(body)=>async(dispatch)=>{
  axios
  .post(`${PROXY}/question`, body)
  .then(response=>dispatch(getQp(response.data)))
  .catch(error=>console.log(error))
}

// export function postQuestion(body) {
//   console.log("body de la action", body);
//   return async function (dispatch) {
//     const question = await axios.post(`${PROXY}/question`, body);
//     console.log("data", question.data);
//     return dispatch({
//       type: POST_QUESTION,
//       payload: question.data,
//     });
//   };
// }

export const getPostQuestion=(idPost)=>async(dispatch)=>{
  axios
  .get(`${PROXY}/question/` + idPost)
  .then(response=>{
    dispatch(cargando(false))
    dispatch(getQp(response.data))})
  .catch(error=>console.log(error))
}

// export function getPostQuestion(idPost) {
//   return async function (dispatch) {
//     const questions = await axios.get(`${PROXY}/question/` + idPost);
//     return dispatch({
//       type: GET_POST_QUESTION,
//       payload: questions.data,
//     });
//   };
// }

export const getCategories=()=>async(dispatch)=>{
  axios
  .get(`${PROXY}/categories`)
  .then(response=>dispatch(getC(response.data)))
  .catch(error=>console.log(error))
}

// export function getCategories() {
//   return async function (dispatch) {
//     const allCategories = await axios.get(`${PROXY}/categories`);
//     return dispatch({
//       type: GET_CATEGORIES,
//       payload: allCategories.data,
//     });
//   };
// }


export const sortByPrice=(order)=>async(dispatch)=>dispatch(sortPrice(order))


// export function sortByPrice(order) {
//   return {
//     type: SORT_BY_PRICE,
//     payload: order,
//   };
// }

export const getPostReview=(idPost)=>async(dispatch)=>{
  axios
    .get(`${PROXY}/review/` + idPost)
    .then(response=>dispatch(getR(response.data)))
    .catch(error=>console.log(error))
}

// export function getPostReview(idPost) {
//   return async function (dispatch) {
//     try {
//       var review = await axios.get(`${PROXY}/review/` + idPost); //el id es el del usuario(perfil)
//       return dispatch({
//         type: GET_POST_REVIEW,
//         payload: review.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export const filteredCat=(payload)=>async(dispatch)=>dispatch(filterCategory(payload))

// export function filteredCat(payload) {
//   return {
//     type: FILTRO_CAT,
//     payload,
//   };
// }

export const getTalentByRating=(rating)=>async(dispatch)=>dispatch(filterRating(rating))

// export function getTalentByRating(rating) {
//   return async function (dispatch) {

//       return dispatch({
//         type: TALENT_BY_RATING,
//         payload: rating,
//       });

//   };
// }


// export function postOrder(payload) {
//   console.log('action', payload)
//   return async function() {
//     try {
//       let order = axios.post(`${PROXY}/orden`, payload)
//       return {
//         type: "POST_ORDER",
//         payload: order.payload
//       }
//     }
//     catch(err) {
//       console.log(err)
//     }
//   }
// }

export const publicProfile=(id)=>async dispatch=>{
  axios
  .get(`${PROXY}/user/` + id)
  .then(response=>dispatch(getSeller(response.data)))
  .catch(error=>console.log(error))
}


// export function publicProfile(id) {
//   return async function (dispatch) {
//     try {
//       let publicProf = await axios.get(`${PROXY}/user/` + id);
//       return dispatch({
//         type: SELLER_PROFILE,
//         payload: publicProf.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export const refresh=(dispatch)=>dispatch(refreshT())

// export function refresh() {
//   return {
//     type: REFRESH,
//   };
// }

export const getSales=(id)=>async(dispatch)=>{
  axios
  .get(`${PROXY}/orden/ventas/` + id)
  .then(response=>dispatch(getS(response.data)))
  .catch(error=>console.log(error))
}

// export function getSales(id) {
//   return async function(dispatch) {
//     try {
//       console.log("ID GET SALES", id)
//       let sales = await axios.get(`${PROXY}/orden/ventas/` + id)
//       return dispatch ({
//         type: GET_SALES,
//         payload: sales.data
//       })
//     }
//     catch(err) {
//       console.log(err)
//     }
//   }
// }

export const desloguear=(dispatch)=>dispatch(dislog())

// export function desloguear(){
//   return{
//     type: DESLOGUEAR,
//   }
// }