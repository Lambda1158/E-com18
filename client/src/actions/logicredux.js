// reducers/miSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  talents: [],
  filteredTalents: [],
  moreTalent: [],
  categories: [],
  sales:[]
};

const miSlice = createSlice({
  name: 'talento',
  initialState,
  reducers: {
    // Define las acciones y cómo se actualizará el estado
    getT:  (state,action) => {
      state.talents=action.payload
    },
    getTbyId: (state,action)=>{
      state.moreTalent=action.payload
      state.qa=action.payload
    },
    searchT:(state,action)=>{
      state.filteredTalents=action.payload
    },
    getC:(state,action)=>{
      state.categories=action.payload
    },
    cargar:(state,action)=>{
      state.cargar=action.payload
    },
    sortPrice:(state,action)=>{
      let talentPrice = state.filteredTalents
      talentPrice = talentPrice.sort((a, b) => {
        if (a.cost < b.cost) {
          return action.payload === "ASCENDENTE" ? -1 : 1;
        }
        if (a.cost > b.cost) {
          return action.payload === "ASCENDENTE" ? 1 : -1;
        }
        return 0;
      })
      state.filteredTalents=talentPrice
    },
    filterCategory:(state,action)=>{
      let allCat = state.talents;
      let fil =
        action.payload === "All"
          ? allCat
          : allCat.filter((el) => el?.category?.title === action.payload);
      state.filteredTalents=fil
    },
    filterRating:(state,action)=>{
      let aux=state.filteredTalents
      if(action.payload==="asc"){
        aux.sort(function (a, b) {
          if (a.rating > b.rating) return 1;
          if (b.rating > a.rating) return -1;
          return 0;
        })
      }else if(action.payload==="desc"){
        aux.sort(function (a, b) {
          if (a.rating > b.rating) return -1;
          if (b.rating > a.rating) return 1;
          return 0;
        })}
        state.filteredTalents=aux
      },
    getS:(state,action)=>{

    }
  },
});


export const { getTbyId,getT,searchT,getC,cargar,sortPrice,filterCategory,filterRating,getS} = miSlice.actions;
export default miSlice.reducer;