import { takeLatest, put, call, all } from "redux-saga/effects";
import axios from "axios";
import {
  uploadFileWithTitleRequest,
  uploadFileWithTitleSuccess,
  uploadFileWithTitleFailure,
  closeModal,
} from "../slice/UploadLibrarySlice";
import {
  getAllLibraryFileRequest,
  getAllLibraryFileSuccess,
  getAllLibraryFileFailure,
  getUserLibraryFileRequest,
} from "../slice/GetAllLibrarySlice";
import {
  deleteUserLibraryFilesFailure,
  deleteUserLibraryFilesRequest,
  deleteUserLibraryFilesSuccess,
} from "../slice/DeleteUserLibrarySlice";
import { toast } from "react-toastify";

function* uploadFileWithTitleSaga(action) {
  const token = localStorage.getItem("token");
  try {
    const formData = new FormData();
    formData.append("file", action.payload.file);
    formData.append("title", action.payload.title);

    const response = yield call(
      axios.post,
      `${process.env.REACT_APP_API_URL}/libraryfile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      }
    );

    yield put(
      uploadFileWithTitleSuccess({
        file: response.data.file,
        title: action.payload.title,
      })
    );

    yield put(
      getUserLibraryFileRequest({
        pageLimit: 8,
        fileType: "",
        selectedDate: "",
      })
    );

    yield put(closeModal());
  } catch (error) {
    yield put(uploadFileWithTitleFailure(error.message));
  }
}

function* getAllLibraryFileSaga() {
  const token = localStorage.getItem("token");
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_API_URL}/getAllLibraryFile`,
      {
        headers: {
          token: token,
        },
      }
    );

    yield put(getAllLibraryFileSuccess(response.data));
  } catch (error) {
    yield put(getAllLibraryFileFailure(error.message));
  }
}

function* getUserLibraryFileSaga({ payload }) {
  const { pageLimit, fileType, selectedDate } = payload;
  const token = localStorage.getItem("token");

  try {
    const response = yield call(
      axios.get,
      `${
        process.env.REACT_APP_API_URL
      }/getlibraryfile?page=1&limit=${pageLimit}&fileType=${
        fileType || ""
      }&uploadDate=${selectedDate || ""}`,
      {
        headers: {
          token: token,
        },
      }
    );

    yield put(getAllLibraryFileSuccess(response.data));
  } catch (error) {
    yield put(getAllLibraryFileFailure(error.message));
  }
}

function* deleteUserLibraryFilesSaga(action) {
  const token = localStorage.getItem("token");
  const { fileIds } = action.payload;

  try {
    const responses = yield all(
      fileIds.map((fileId) =>
        call(
          axios.post,
          `${process.env.REACT_APP_API_URL}/deletelibraryfile`,
          { fileId },
          { headers: { token } }
        )
      )
    );

    yield put(
      deleteUserLibraryFilesSuccess(responses.map((response) => response.data))
    );
    console.log("responses", responses[0]?.data?.status);
    if (responses[0]?.data?.status === "success") {
      toast.success(responses[0]?.data?.message);
    }
  } catch (error) {
    yield put(deleteUserLibraryFilesFailure(error.message));
  }
}

export function* watchGetAllLibraryFile() {
  yield takeLatest(getAllLibraryFileRequest().type, getAllLibraryFileSaga);
}

export function* watchGetUserLibraryFile() {
  yield takeLatest(getUserLibraryFileRequest().type, getUserLibraryFileSaga);
}

export function* watchUploadFile() {
  yield takeLatest(uploadFileWithTitleRequest().type, uploadFileWithTitleSaga);
}

export function* watchDeleteUserLibraryFiles() {
  yield takeLatest(
    deleteUserLibraryFilesRequest.type,
    deleteUserLibraryFilesSaga
  );
}
