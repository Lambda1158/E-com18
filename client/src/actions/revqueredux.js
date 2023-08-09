// reducers/miSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    review: [],
    questionsPost: [],
    ownerQuestion: "",
    qa:[]
};

const reviewSlice = createSlice({
  name: 'reviewandquestion',
  initialState,
  reducers: {
    // Define las acciones y cómo se actualizará el estado
    getR:(state,action)=>{
        state.review=action.payload
    },
    getQ:(state,action)=>{
        state.questionsPost=action.payload
    },
    getQa:(state,action)=>{
      state.qa=action.payload
    },
    getQp:(state,action)=>{
      state.questionsPost=action.payload
    }

  },
});


export const { getR,getQ,getQa,getQp } = reviewSlice.actions;
export default reviewSlice.reducer;