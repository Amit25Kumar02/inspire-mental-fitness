import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const createDiscoveryCallRequest = async (data) => {
  const token = localStorage.getItem("token");
  const res = await axios({
    method: "post",
    url: `${API_BASE_URL}/create-request`,
    data: data,
    headers: {
      token: token,
    },
  });
  return res?.data;
};
export const createUserContactRequest = async (data) => {
  const token = localStorage.getItem("token");
  const res = await axios({
    method: "post",
    url: `${API_BASE_URL}/user-contact-request`,
    data: data,
    headers: {
      token: token,
    },
  });
  return res?.data;
};

export const sendAiFeedbackToBackend = async (
  username,
  userEmail,
  suggestions
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai-feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail, username, aiSuggestions: suggestions }),
    });

    if (!response.ok) {
      throw new Error("Failed to send AI feedback to backend");
    }

    console.log("AI feedback successfully sent to backend");
  } catch (error) {
    console.error("Error sending AI feedback:", error);
  }
};
