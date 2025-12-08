import { createSlice } from "@reduxjs/toolkit";

export const UPLOAD_FILE_WITH_TITLE_REQUEST =
  "uploadLibrary/uploadFileWithTitleRequest";
export const UPLOAD_FILE_WITH_TITLE_SUCCESS =
  "uploadLibrary/uploadFileWithTitleSuccess";
export const UPLOAD_FILE_WITH_TITLE_FAILURE =
  "uploadLibrary/uploadFileWithTitleFailure";
export const UPLOAD_FILE_PROGRESS = "uploadLibrary/uploadFileProgress";
export const CLOSE_MODAL = "uploadLibrary/closeModal";

const uploadLibrarySlice = createSlice({
  name: "uploadLibrary",
  initialState: {
    uploading: false,
    file: null,
    error: null,
    progress: 0,
    title: null,
    loading: false,
    modalVisible: false,
  },
  reducers: {
    uploadFileWithTitleRequest: (state, action) => {
      state.uploading = true;
      state.error = null;
      state.progress = 0;
      state.title = action.payload.title;
      state.loading = true;
    },
    uploadFileWithTitleSuccess: (state, action) => {
      state.uploading = false;
      state.file = action.payload.file;
      state.title = action.payload.title;
      state.progress = 100;
      state.loading = false;
      state.modalVisible = false;
    },
    uploadFileWithTitleFailure: (state, action) => {
      state.uploading = false;
      state.error = action.payload;
      state.progress = 0;
      state.loading = false;
    },
    uploadFileProgress: (state, action) => {
      state.progress = action.payload;
    },
    openModal: (state) => {
      state.modalVisible = true;
    },
    closeModal: (state) => {
      state.modalVisible = false;
    },
  },
});

export const {
  uploadFileWithTitleRequest,
  uploadFileWithTitleSuccess,
  uploadFileWithTitleFailure,
  uploadFileProgress,
  closeModal,
  openModal,
} = uploadLibrarySlice.actions;

export default uploadLibrarySlice.reducer;
