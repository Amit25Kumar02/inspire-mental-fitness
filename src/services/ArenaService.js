import axios from "axios";
const baseurl = process.env.REACT_APP_API_URL;

export const getArenaFile = async () => {
  const token = localStorage.getItem("token");
  const res = await axios({
    method: "get",
    url: baseurl + `/getAllArenaFile`,
    headers: {
      token: token,
    },
  });
  return res?.data;
};
