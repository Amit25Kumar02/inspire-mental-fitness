import { createSlice } from "@reduxjs/toolkit";

const journalDetailsSlice = createSlice({
  name: "journalDetails",
  initialState: {
    details: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchJournalDetailsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchJournalDetailsSuccess: (state, action) => {
      state.details = action.payload;
      state.loading = false;
    },
    fetchJournalDetailsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchJournalDetailsRequest,
  fetchJournalDetailsSuccess,
  fetchJournalDetailsFailure,
} = journalDetailsSlice.actions;

export default journalDetailsSlice.reducer;
