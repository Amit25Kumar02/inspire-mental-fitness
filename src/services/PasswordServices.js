import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const fogotPassword = async (data) => {
  const res = await axios({
    method: "post",
    url: `${API_URL}/forgot-password`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res?.data;
};

export const resetPassword = async (data) => {
  const res = await axios({
    method: "post",
    url: `${API_URL}/reset-password`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res?.data;
};
