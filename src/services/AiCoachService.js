import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const openAiService = async (messageData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/chat-with-ai`,
      messageData, // body
      {
        headers: {
          token: token,
        },
      }
    );
    return response.data?.aiResponse;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
