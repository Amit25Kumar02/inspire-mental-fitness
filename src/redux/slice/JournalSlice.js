import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
  uploadedSuccessfully: false, // New state
};

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    addJournalRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.uploadedSuccessfully = false;
    },
    addJournalSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.uploadedSuccessfully = true;
    },
    addJournalFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.uploadedSuccessfully = false;
    },
    resetUploadStatus: (state) => {
      state.uploadedSuccessfully = false;
    },
    updateJournalRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.uploadedSuccessfully = false;
    },
    updateJournalSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.uploadedSuccessfully = true;
    },
    updateJournalFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.uploadedSuccessfully = false;
    },
    deleteJournalRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    deleteJournalSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    deleteJournalFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addJournalRequest,
  addJournalSuccess,
  addJournalFailure,
  resetUploadStatus,
  updateJournalRequest,
  updateJournalSuccess,
  updateJournalFailure,
  deleteJournalRequest,
  deleteJournalSuccess,
  deleteJournalFailure,
} = journalSlice.actions;

export default journalSlice.reducer;
