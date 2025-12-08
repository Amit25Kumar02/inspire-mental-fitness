import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const getAllTopSongs = async () => {
  const res = await axios({
    method: "get",
    url: `${API_URL}/songs/top`,
  });
  return res?.data;
};
export const getAllSongs = async () => {
  const res = await axios({
    method: "get",
    url: `${API_URL}/songs`,
  });
  return res?.data;
};
