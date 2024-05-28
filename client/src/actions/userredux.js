// reducers/miSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  token: "",
  profile: [],
  order: [],
  cargando: false,
  public_profile: [],
  movement: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    cargarUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
        cargando: false,
      };
    },
    getUserT: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    getUserI: (state, action) => {
      return {
        ...state,
        profile: action.payload,
        user: action.payload.result,
      };
    },
    getUserO: (state, action) => {
      return {
        ...state,
        order: action.payload,
      };
    },
    getM: (state, action) => {
      return {
        ...state,
        movement: action.payload,
      };
    },
    getSeller: (state, action) => {
      return {
        ...state,
        public_profile: action.payload,
      };
    },
    dislog: (state) => {
      return {
        ...state,
        user: [],
        profile: [],
        public_profile: [],
      };
    },
    editU: (state, action) => {
      return {
        ...state,
        user: action.payload,
        profile: action.payload,
      };
    },
  },
});

export const {
  cargarUser,
  getUserT,
  getUserI,
  getUserO,
  getM,
  getSeller,
  dislog,
  editU,
} = userSlice.actions;
export default userSlice.reducer;
