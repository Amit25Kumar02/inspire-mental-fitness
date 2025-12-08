import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const raiseCounselingTicket = async (data) => {
  const token = localStorage.getItem("token");
  const res = await axios({
    method: "post",
    url: `${API_URL}/create-counseling-ticket`,
    data: data,
    headers: {
      token: token,
    },
  });
  return res?.data;
};

export const createPaymentIntent = async (amount, date) => {
  const token = localStorage.getItem("token");
  const res = await axios({
    method: "post",
    url: `${API_URL}/create-payment-intent`,
    data: JSON.stringify({ amount, date }),
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });

  return res?.data;
};

export const createPaymentIntentForUserSignup = async (amount, date) => {
  const res = await axios({
    method: "post",
    url: `${API_URL}/create-payment-intent-user-signup`,
    data: JSON.stringify({ amount, date }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res?.data;
};

export const checkIfSessionScheduled = async (date) => {
  const token = localStorage.getItem("token");
  const res = await axios({
    method: "post",
    url: `${API_URL}/check-session`,
    data: { date: date },
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });

  return res?.data;
};

export const patientDemographicData = async (data) => {
  const token = localStorage.getItem("token");
  const res = await axios({
    method: "post",
    url: `${API_URL}/patient-demographic-data`,
    data: data,
    headers: {
      token: token,
    },
  });
  return res?.data;
};

export const getAvailableSlots = async (date) => {
  const token = localStorage.getItem("token");
  const res = await axios({
    method: "get",
    url: `${API_URL}/available-slots?date=${date}`,
    headers: {
      token: token,
    },
  });
  console.log("res", res);
  return res?.data;
};

export const getAllAvailableSlots = async () => {
  const token = localStorage.getItem("token");
  const res = await axios({
    method: "get",
    url: `${API_URL}/athlete/counselor-time-slot`,
    headers: {
      token: token,
    },
  });
  return res?.data;
};

export const getAllSessions = async () => {
  const token = localStorage.getItem("token");
  const res = await axios({
    method: "get",
    url: `${API_URL}/all-tickets`,
    headers: {
      token: token,
    },
  });
  return res?.data;
};
