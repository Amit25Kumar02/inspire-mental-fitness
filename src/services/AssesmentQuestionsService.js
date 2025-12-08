import axios from "axios";
const baseurl = process.env.REACT_APP_API_URL;

export const getAssesmentQuestions = async () => {
  const token = localStorage.getItem("token");
  const res = await axios({
    method: "get",
    url: baseurl + `/questions-group`,
    headers: {
      token: token,
    },
  });
  return res?.data;
};
