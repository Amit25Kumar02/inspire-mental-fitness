import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/aim-trainer`;

export const submitAimTrainerScore = async (score) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${API_URL}/submit`,
      { score },
      {
        headers: {
          token: `${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error submitting Aim Trainer score:", err);
    throw err;
  }
};

export const getAimTrainerDailyLeaderboard = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/daily-leaderboard`, {
      headers: {
        token: `${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching Aim Trainer leaderboard:", err);
    throw err;
  }
};
