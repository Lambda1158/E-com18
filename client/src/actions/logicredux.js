// reducers/miSlice.js
import { createSlice } from '@reduxjs/toolkit';
import  axios  from 'axios';
export const PROXY = "http://localhost:3001"||"https://hitalent-project.herokuapp.com";
const initialState = {
  user: [],
  talents: [],
  filteredTalents: [],
  token: "",
  profile: [],
  order: [],
  review: [],
  movement: [],
  qa: [],
  moreTalent: [],
  categories: [],
  questionsPost: [],
  ownerQuestion: "",
  cargando: false,
  public_profile: [],
  sales: []
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

  },
});

export const { getTbyId,getT } = miSlice.actions;
export default miSlice.reducer;