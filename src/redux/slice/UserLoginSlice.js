import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: "idle",
  user: null,
  error: null,
  redirectPath: null,
};

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    userLogin(state, action) {
      state.emailOrPhone = action.payload.emailOrPhone;
      state.otpStatus = "loading";
      state.error = null;
      state.loginStatus = "loading";
    },
    userLoginSuccess(state, action) {
      state.loginStatus = "succeeded";
      state.user = action.payload;
      state.error = null;
      state.redirectPath = "";
    },
    userLoginFailure(state, action) {
      state.loginStatus = "failed";
      state.error = action.payload;
      state.redirectPath = null;
    },
    setRedirectPath(state, action) {
      state.redirectPath = action.payload;
    },
    resetRedirectPath(state) {
      state.redirectPath = null;
    },
  },
});

export const {
  userLogin,
  userLoginSuccess,
  userLoginFailure,
  setRedirectPath,
  resetRedirectPath,
} = userLoginSlice.actions;

export default userLoginSlice.reducer;
