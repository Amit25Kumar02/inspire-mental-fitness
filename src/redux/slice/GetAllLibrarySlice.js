import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const getAllLibrarySlice = createSlice({
  name: "getalllibrary",
  initialState,
  reducers: {
    getAllLibraryFileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllLibraryFileSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getAllLibraryFileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getUserLibraryFileRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const {
  getAllLibraryFileRequest,
  getAllLibraryFileSuccess,
  getAllLibraryFileFailure,
  getUserLibraryFileRequest,
} = getAllLibrarySlice.actions;

export default getAllLibrarySlice.reducer;
