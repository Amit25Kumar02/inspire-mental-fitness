import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  journals: [],
  totalJournals: 0,
  loading: false,
  error: null,
  page: 1,
};

const allJournalsSlice = createSlice({
  name: "allJournals",
  initialState,
  reducers: {
    fetchAllJournalsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllJournalsSuccess(state, action) {
      const { journals, totalJournals, page } = action.payload;

      if (page === 1) {
        state.journals = journals;
      } else {
        state.journals = [...state.journals, ...journals];
      }

      state.totalJournals = totalJournals;
      state.loading = false;
      state.error = null;
    },
    fetchAllJournalsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    incrementPage(state) {
      state.page += 1;
    },
  },
});

export const {
  fetchAllJournalsRequest,
  fetchAllJournalsSuccess,
  fetchAllJournalsFailure,
  incrementPage,
} = allJournalsSlice.actions;

export default allJournalsSlice.reducer;
