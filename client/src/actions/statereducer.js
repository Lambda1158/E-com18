// reducers/miSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cargando:false
};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    // Define las acciones y cómo se actualizará el estado
    cargando:(state,actions)=>{
        state.cargando=actions.payload
    }
  },
});


export const {cargando} = stateSlice.actions;
export default stateSlice.reducer;