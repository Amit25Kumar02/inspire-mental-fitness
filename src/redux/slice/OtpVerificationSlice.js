import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  otpStatus: "idle",
  verificationSuccess: false,
  error: null,
  redirectPath: null,
};

const otpVerificationSlice = createSlice({
  name: "otpVerification",
  initialState,
  reducers: {
    otpVerification(state) {
      state.otpStatus = "loading";
      state.error = null;
    },
    otpVerificationSuccess(state) {
      state.otpStatus = "succeeded";
      state.verificationSuccess = true;
      state.error = null;
    },
    otpVerificationFailure(state, action) {
      state.otpStatus = "failed";
      state.error = action.payload;
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
  otpVerification,
  otpVerificationSuccess,
  otpVerificationFailure,
  setRedirectPath,
  resetRedirectPath,
} = otpVerificationSlice.actions;

export default otpVerificationSlice.reducer;
