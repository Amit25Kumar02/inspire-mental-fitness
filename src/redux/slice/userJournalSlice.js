import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  data: null,
  loading: false,
  error: null,
};

// Create slice
const userJournalSlice = createSlice({
  name: "userJournal",
  initialState,
  reducers: {
    getUserJournalRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserJournalSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getUserJournalFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getUserJournalRequest,
  getUserJournalSuccess,
  getUserJournalFailure,
} = userJournalSlice.actions;

export default userJournalSlice.reducer;
