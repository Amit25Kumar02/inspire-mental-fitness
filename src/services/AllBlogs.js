import axios from "axios";
const baseurl = process.env.REACT_APP_API_URL;

export const getAllBlogs = async () => {
  const res = await axios({
    method: "get",
    url: baseurl + `/get-blogs`,
  });
  return res?.data?.data;
};
export const getBlogDetails = async (id) => {
  const res = await axios({
    method: "get",
    url: baseurl + `/get-blogs/${id}`,
  });
  return res?.data?.data;
};
