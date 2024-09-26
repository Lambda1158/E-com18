// reducers/miSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  review: [],
  questionsPost: [],
  ownerQuestion: "",
  qa: [],
};

const reviewSlice = createSlice({
  name: "reviewandquestion",
  initialState,
  reducers: {
    // Define las acciones y cómo se actualizará el estado
    getR: (state, action) => {
      return {
        ...state,
        review: action.payload,
      };
    },
    getQ: (state, action) => {
      return {
        ...state,
        questionsPost: action.payload,
      };
    },
    getQa: (state, action) => {
      return {
        ...state,
        qa: action.payload,
      };
    },
    getQp: (state, action) => {
      return {
        ...state,
        questionsPost: action.payload,
      };
    },
  },
});

export const { getR, getQ, getQa, getQp } = reviewSlice.actions;
export default reviewSlice.reducer;
