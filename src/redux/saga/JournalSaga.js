import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  addJournalRequest,
  addJournalSuccess,
  addJournalFailure,
  updateJournalRequest,
  updateJournalSuccess,
  updateJournalFailure,
  deleteJournalSuccess,
  deleteJournalFailure,
  deleteJournalRequest,
} from "../slice/JournalSlice";
import {
  getUserJournalRequest,
  getUserJournalSuccess,
  getUserJournalFailure,
} from "../slice/userJournalSlice";
import {
  fetchJournalDetailsFailure,
  fetchJournalDetailsRequest,
  fetchJournalDetailsSuccess,
} from "../slice/JournalDetailsSlice";
import {
  fetchAllJournalsFailure,
  fetchAllJournalsRequest,
  fetchAllJournalsSuccess,
} from "../slice/AllJournalsSlice";

import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

function* submitJournalSaga(action) {
  const token = localStorage.getItem("token");
  try {
    const formData = new FormData();
    formData.append("title", action.payload.title);
    formData.append("description", action.payload.description);
    if (action.payload.journalImg) {
      formData.append("journalImg", action.payload.journalImg);
    }

    const response = yield call(axios.post, `${API_URL}/journal`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: token,
      },
    });

    console.log("API Response:", response);

    yield put(
      addJournalSuccess({
        journal: response.data.journal,
        title: action.payload.title,
      })
    );
    if (response.data.status !== "success") {
      toast.error("Something went wrong");
    }
  } catch (error) {
    yield put(addJournalFailure(error.message));
  }
}

function* getUserJournalSaga() {
  const token = localStorage.getItem("token");

  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_API_URL}/userjournal`,
      {
        headers: {
          token: token,
        },
      }
    );

    yield put(getUserJournalSuccess(response.data));
  } catch (error) {
    yield put(getUserJournalFailure(error.message));
  }
}

function* fetchJournalDetailsSaga(action) {
  try {
    const id = action.payload;
    const token = localStorage.getItem("token");

    const response = yield call(axios.get, `${API_URL}/journal/${id}`, {
      headers: {
        token: `${token}`,
      },
    });

    yield put(fetchJournalDetailsSuccess(response.data));
  } catch (error) {
    yield put(fetchJournalDetailsFailure(error.message));
  }
}

function* fetchAllJournalsSaga(action) {
  const token = localStorage.getItem("token");
  const { limit = 10, page = 1 } = action.payload;

  console.log("Fetching journals with limit:", limit, "and page:", page);

  try {
    const response = yield call(
      axios.get,
      `${API_URL}/journal?limit=${limit}&page=${page}`,
      {
        headers: {
          token: token,
        },
      }
    );

    console.log("response", response.data.data);

    yield put(
      fetchAllJournalsSuccess({
        journals: response.data.data.journals,
        totalJournals: response.data.data.totalJournals,
        page,
      })
    );
  } catch (error) {
    console.error("Fetch journals error:", error);
    yield put(fetchAllJournalsFailure(error.message));
  }
}

function* updateJournalSaga(action) {
  const token = localStorage.getItem("token");
  const { id, title, description, journalImg } = action.payload;

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (journalImg) {
      formData.append("journalImg", journalImg);
    }

    const response = yield call(
      axios.post,
      `${API_URL}/updatejournal/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      }
    );

    yield put(updateJournalSuccess(response.data));
    if (response.data.status === "success") {
      // Dispatch the getUserJournalRequest action to fetch updated user journal
      yield put(getUserJournalRequest());
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    yield put(updateJournalFailure(error.message));
  }
}

function* deleteJournalSaga(action) {
  const token = localStorage.getItem("token");
  const { id } = action.payload;

  try {
    const response = yield call(
      axios.post,
      `${API_URL}/deletejournal/${id}`,
      {},
      {
        headers: {
          token: token,
        },
      }
    );
    console.log("response", response);
    if (response.data.status === "success") {
      toast.success("Journal Deleted Successfully");
    }

    yield put(deleteJournalSuccess());

    yield put(getUserJournalRequest());
  } catch (error) {
    yield put(deleteJournalFailure(error.message));
  }
}

export function* watchDeleteJournal() {
  yield takeLatest(deleteJournalRequest.type, deleteJournalSaga);
}

export function* watchUpdateJournal() {
  yield takeLatest(updateJournalRequest.type, updateJournalSaga);
}

export function* watchJournalDetailsSaga() {
  yield takeLatest(fetchJournalDetailsRequest.type, fetchJournalDetailsSaga);
}

export function* watchGetUserJournal() {
  yield takeLatest(getUserJournalRequest.type, getUserJournalSaga);
}

export function* watchJournalSubmission() {
  yield takeLatest(addJournalRequest.type, submitJournalSaga);
}

export function* watchFetchAllJournals() {
  yield takeLatest(fetchAllJournalsRequest.type, fetchAllJournalsSaga);
}
