// reducers/miSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: [],
  token: "",
  profile: [],
  order: [],
  cargando: false,
  public_profile: [],
  movement:[]
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
    },
    getUserO:(state,action)=>{
      state.order=action.payload
    },
    getM:(state,action)=>{
      state.movement=action.payload
    }

  },
});


export const { cargarUser,getUserT,getUserI,getUserO } = userSlice.actions;
export default userSlice.reducer;