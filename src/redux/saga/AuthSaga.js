import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";
import {
  userSignupSuccess,
  userSignupFailure,
  setRedirectPath as setUserRedirectPath,
  setRedirectPath,
} from "../slice/UserSlice";
import {
  userLoginSuccess,
  userLoginFailure,
  setRedirectPath as setUserLoginRedirectPath,
} from "../slice/UserLoginSlice";

const API_URL = process.env.REACT_APP_API_URL;
function* userSignupSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_URL}/usersignup`,
      action.payload
    );

    const { status, message } = response.data;

    if (status === "success") {
      yield put(userSignupSuccess({ role: action.payload.role }));
      const dataToSend = {
        ...action.payload,
      };

      toast.success("Otp Sent Successfully!");
      yield call(delay, 500);

      yield put(setRedirectPath({ path: "/otp-verification", dataToSend }));
    } else {
      console.log("Error message from response:", message);
      toast.error(message);
    }
  } catch (error) {
    console.log("Error caught in saga:", error);
    yield put(userSignupFailure(error.message));
    toast.error("An error occurred during signup.");
  }
}

function* userLoginSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_URL}/usersignin`,
      action.payload
    );

    const { data } = response;

    console.log("Response Data:", data);

    if (data.status === "success") {
      const token = data?.token;

      yield put(userLoginSuccess(data));

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(data?.data));

        const redirectPath =
          data?.data?.role === "Athlete"
            ? "/fieldhouse-dashboard"
            : "/coaching-dashboard";

        toast.success("Sign in Successful");

        yield call(delay, 1000);

        yield put(setUserLoginRedirectPath(redirectPath));
      } else {
        if (
          data?.data?.role === "Athlete" &&
          data?.data?.subscriptionValid === false
        ) {
          toast.error(
            "Your subscription has expired. Please renew to continue."
          );
          console.log("Subscription valid:", data?.data?.subscriptionValid);
          yield call(delay, 2000);
          const email = data?.data?.email;
          const redirect = "/choose-plan";
          yield put(setUserLoginRedirectPath({ redirect, email }));
        } else if (data?.data?.role === "Coach") {
          if (data?.data?.coachRequest === "Pending") {
            toast.info(`Your request is pending. Please wait for the approval`);
          } else if (data?.data?.coachRequest === "Rejected") {
            toast.error(`Your request for has been rejected`);
          }
          yield call(delay, 1000);
        }
      }
    } else {
      console.log("Login failed:", data.message);
      toast.error(`${data.message}`);

      yield put(userLoginFailure(data.message));
    }
  } catch (error) {
    console.log("Error during login:", error);
    yield put(userLoginFailure(error.message));

    toast.error("Something went wrong during login!");
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function* watchUserSignup() {
  yield takeLatest("user/userSignup", userSignupSaga);
}

export function* watchUserLogin() {
  yield takeLatest("userLogin/userLogin", userLoginSaga);
}
