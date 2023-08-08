// reducers/miSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  talents: [],
  filteredTalents: [],
  qa: [],
  moreTalent: [],
  categories: [],
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
    }

  },
});


export const { getTbyId,getT,searchT,getC } = miSlice.actions;
export default miSlice.reducer;