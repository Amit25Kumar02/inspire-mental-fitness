import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const otpVerify = async (data) => {
  const res = await axios({
    method: "post",
    url: `${API_URL}/verifyotp`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res?.data;
};

export const saveUser = async (data) => {
  const res = await axios({
    method: "post",
    url: `${API_URL}/usersave`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res?.data;
};

export const updateSubscriptionPlan = async (data) => {
  const res = await axios({
    method: "post",
    url: `${API_URL}/update-subscription-plan`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res?.data;
};
