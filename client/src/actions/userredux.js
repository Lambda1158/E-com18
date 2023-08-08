// reducers/miSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: [],
  token: "",
  profile: [],
  order: [],
  review: [],
  questionsPost: [],
  ownerQuestion: "",
  cargando: false,
  public_profile: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Define las acciones y cómo se actualizará el estado
    cargarUser:(state,action)=>{
      state.user=action.payload
    },
    getUserT:(state,action)=>{
      state.token=action.payload
    },
    getUserI:(state,action)=>{
      state.profile=action.payload
    }

  },
});


export const { cargarUser,getUserT } = userSlice.actions;
export default userSlice.reducer;