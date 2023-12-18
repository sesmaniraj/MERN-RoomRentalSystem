import { createSlice } from "react";

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
  },
});

export const { signInStart, signInSucess, signInFaliure } = userSlice.actions;

export default userSlice.reducer;
