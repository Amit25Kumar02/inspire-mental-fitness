import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLanguage: localStorage.getItem('appLanguage') || "en", // Default language is English
  languages: [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
    { code: "sr", label: "SR" },
    { code: "pt", label: "PT" },
    { code: "sv", label: "SV" },
    { code: "de", label: "DE" },
    { code: "it", label: "IT" }
  ],
  isTranslating: false,
  error: null
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
    startTranslating: (state) => {
      state.isTranslating = true;
      state.error = null;
    },
    finishTranslating: (state) => {
      state.isTranslating = false;
    },
    setTranslationError: (state, action) => {
      state.isTranslating = false;
      state.error = action.payload;
    }
  }
});

export const { 
  setLanguage, 
  startTranslating, 
  finishTranslating,
  setTranslationError
} = languageSlice.actions;

export default languageSlice.reducer;