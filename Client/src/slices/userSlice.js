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
    logoutSucess: (state, action) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    logoutFaliure: (state) => {
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
} = userSlice.actions;

export default userSlice.reducer;
