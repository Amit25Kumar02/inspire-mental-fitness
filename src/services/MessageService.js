import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

export const sendMessageAPI = async (messageData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/messages/send`,
      messageData,
      {
        headers: {
          token: token,
        },
      }
    );
    console.log("response", response);
    console.log("messageData", messageData);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${API_BASE_URL}/files/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const fetchMessages = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/messages/671f661e1e50dce585490b67`,
      {
        headers: {
          token: token,
        },
      }
    );
    if (response.data.success) {
      return response.data.messages;
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};
