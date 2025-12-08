import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const getAllAlbums = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios({
      method: "get",
      url: `${API_URL}/albums-user`,
      headers: {
        token: token,
      },
    });
    return res?.data; // Return the album data from the API
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
};

export const getAlbumsSongs = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios({
      method: "get",
      url: `${API_URL}/albums/${id}/songs`,
      headers: {
        token: token,
      },
    });
    return res?.data; // Return the album data from the API
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
};
