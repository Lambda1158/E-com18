// reducers/miSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    // Define las acciones y cómo se actualizará el estado
    getT: (state, action) => {
      state.talents = action.payload;
      state.filteredTalents = action.payload;
    },
    getTbyId: (state, action) => {
      state.moreTalent = action.payload;
      state.qa = action.payload;
    },
    searchT: (state, action) => {
      state.filteredTalents = action.payload;
    },
    getC: (state, action) => {
      state.categories = action.payload;
    },
    cargar: (state, action) => {
      state.cargar = action.payload;
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
      state.filteredTalents = talentPrice;
    },
    filterCategory: (state, action) => {
      let allCat = [...state.talents];
      let fil =
        action.payload === "All"
          ? allCat
          : allCat.filter((el) => el?.category?.title === action.payload);
      state.filteredTalents = fil;
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
      state.filteredTalents = aux;
    },
    getS: (state, action) => {
      state.sale = action.payload;
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
} = miSlice.actions;
export default miSlice.reducer;
