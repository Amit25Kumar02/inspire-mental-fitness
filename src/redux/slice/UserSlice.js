import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null,
  signupStatus: "idle",
  error: null,
  redirectPath: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSignup(state) {
      state.signupStatus = "loading";
      state.error = null;
    },

    userSignupSuccess(state, action) {
      state.signupStatus = "succeeded";
      state.role = action.payload.role;
      state.redirectPath = "";
      state.error = null;
    },

    userSignupFailure(state, action) {
      state.signupStatus = "failed";
      state.error = action.payload;
      state.redirectPath = null;
    },

    setRole(state, action) {
      state.role = action.payload;
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
  setRole,
  userSignup,
  userSignupSuccess,
  userSignupFailure,
  setRedirectPath,
  resetRedirectPath,
} = userSlice.actions;

export default userSlice.reducer;
