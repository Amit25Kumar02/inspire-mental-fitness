import { createSlice } from "@reduxjs/toolkit";

const deleteLibrarySlice = createSlice({
  name: "deleteLibrary",
  initialState: {
    loading: false,
    error: null,
    data: null,
    deleted: false,
  },
  reducers: {
    deleteUserLibraryFilesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserLibraryFilesSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.deleted = true;
    },
    deleteUserLibraryFilesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetDeletedState: (state) => {
      state.deleted = false;
    },
  },
});

export const {
  deleteUserLibraryFilesRequest,
  deleteUserLibraryFilesSuccess,
  deleteUserLibraryFilesFailure,
  resetDeletedState,
} = deleteLibrarySlice.actions;

export default deleteLibrarySlice.reducer;
