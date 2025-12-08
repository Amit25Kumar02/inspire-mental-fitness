import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const token = localStorage.getItem("token");

export const sendFocusFieldBestTime = async (bestTime) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/submit-focus-field-time`,
      { bestTime },
      {
        headers: {
          token: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending best time:", error);
    throw error;
  }
};

export const getFocusFieldDailyLeaderBoard = async () => {
  const res = await axios({
    method: "get",
    url: API_BASE_URL + `/focus-field-daily-leaderboard`,
    headers: {
      token: token,
    },
  });
  return res?.data;
};

export const getFocusFieldWeeklyLeaderBoard = async () => {
  const res = await axios({
    method: "get",
    url: API_BASE_URL + `/focus-field-weekly-leaderboard`,
    headers: {
      token: token,
    },
  });
  return res?.data;
};