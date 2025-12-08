import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const token = localStorage.getItem("token");

export const submitReactionTimeScore = async (bestTime) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/reaction-time/submit`,
      { bestTime },
      { headers: { token } }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting reaction time:", error);
    throw error;
  }
};

export const getReactionTimeDailyLeaderBoard = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/reaction-time/daily-leaderboard`,
      { headers: { token } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reaction time leaderboard:", error);
    throw error;
  }
};
