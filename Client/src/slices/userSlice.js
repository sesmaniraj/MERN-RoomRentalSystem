import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSucess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    signInFaliure: (state) => {
      state.error = action.payload;
      state.loading = false;
    },
    logoutStart: (state) => {
      state.loading = true;
    },
    logoutSucess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    logoutFaliure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSucess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    updateUserFaliure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSucess,
  signInFaliure,
  logoutStart,
  logoutFaliure,
  logoutSucess,
  updateUserStart,
  updateUserFaliure,
  updateUserSucess,
} = userSlice.actions;

export default userSlice.reducer;
