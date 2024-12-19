// reducers/miSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  talentosUsuario: [],
  talents: [],
  filteredTalents: [],
  moreTalent: [],
  categories: [],
  sales: [],
};

const miSlice = createSlice({
  name: "talento",
  initialState,
  reducers: {
    getTalentUser: (state, action) => {
      return {
        ...state,
        talentosUsuario: action.payload,
      };
    },
    getT: (state, action) => {
      return {
        ...state,
        talents: action.payload,
        filteredTalents: action.payload,
      };
    },
    getTbyId: (state, action) => {
      return {
        ...state,
        moreTalent: action.payload,
      };
    },
    searchT: (state, action) => {
      return {
        ...state,
        filteredTalents: action.payload,
      };
    },
    getC: (state, action) => {
      return {
        ...state,
        categories: action.payload,
      };
    },
    cargar: (state, action) => {
      return {
        ...state,
        cargar: action.payload,
      };
    },
    sortPrice: (state, action) => {
      let talentPrice = [...state.filteredTalents];
      talentPrice.sort((a, b) => {
        if (action.payload === "ascendente") {
          return a.cost - b.cost;
        } else if (action.payload === "descendente") {
          return b.cost - a.cost;
        }
        return 0;
      });
      return {
        ...state,
        filteredTalents: talentPrice,
      };
    },
    filterCategory: (state, action) => {
      let allCat = [...state.talents];
      let fil =
        action.payload === "All"
          ? allCat
          : allCat.filter((el) => el?.category?.title === action.payload);
      return {
        ...state,
        filteredTalents: fil,
      };
    },
    filterRating: (state, action) => {
      let aux = [...state.filteredTalents];
      aux.sort((a, b) => {
        if (action.payload === "asc") {
          return a.rating - b.rating;
        } else if (action.payload === "desc") {
          return b.rating - a.rating;
        }
        return 0;
      });
      return {
        ...state,
        filteredTalents: aux,
      };
    },
    getS: (state, action) => {
      return {
        ...state,
        sales: action.payload,
      };
    },
    clearT: (state) => {
      return {
        ...state,
        moreTalent: [],
      };
    },
  },
});

export const {
  getTbyId,
  getT,
  searchT,
  getC,
  cargar,
  sortPrice,
  filterCategory,
  filterRating,
  getS,
  getTalentUser,
  clearT,
} = miSlice.actions;
export default miSlice.reducer;
