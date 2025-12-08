import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const counselingAttendeesList = async (data) => {
  const token = localStorage.getItem("token");

  const res = await axios({
    method: "post",
    url: `${API_URL}/counseling-attendees`,
    headers: {
      token: token,
    },
  });
  console.log(res?.data);
  return res?.data;
};

export const updateNotesofAttendee = async (ticketId, notes) => {
  const token = localStorage.getItem("token");
  const res = await axios({
    method: "post",
    url: `${API_URL}/updateCounselingNotes`,
    data: {
      ticketId: ticketId,
      notes: notes,
    },
    headers: {
      token: token,
    },
  });
  console.log(res?.data);
  return res?.data;
};

export const getNotesofAttendee = async (ticketId) => {
  const token = localStorage.getItem("token");
  const res = await axios({
    method: "get",
    url: `${API_URL}/getCounselingNotes/${ticketId}`,
    headers: {
      token: token,
    },
  });
  console.log(res?.data);
  return res?.data?.data;
};
