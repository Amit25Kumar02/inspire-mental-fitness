import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userReducer from "../slice/UserSlice";
import userLoginReducer from "../slice/UserLoginSlice";
import otpVerificationReducer from "../slice/OtpVerificationSlice";
import uploadLibraryReducer from "../slice/UploadLibrarySlice";
import getAllLibraryReducer from "../slice/GetAllLibrarySlice";
import deleteLibraryReducer from "../slice/DeleteUserLibrarySlice";
import journalReducer from "../slice/JournalSlice";
import userJournalReducer from "../slice/userJournalSlice";
import journalDetailsReducer from "../slice/JournalDetailsSlice";
import allJournalsReducer from "../slice/AllJournalsSlice";
import gamesReducer from "../slice/GamesSlice";
import game2Reducer from "../slice/Game2Slice";
import languageReducer from "../slice/LanguageSlice"; // Import the new language reducer
import rootSaga from "../rootsaga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    userLogin: userLoginReducer,
    otpVerification: otpVerificationReducer,
    uploadLibrary: uploadLibraryReducer,
    getAllLibrary: getAllLibraryReducer,
    deleteLibrary: deleteLibraryReducer,
    journal: journalReducer,
    userJournal: userJournalReducer,
    journalDetails: journalDetailsReducer,
    allJournals: allJournalsReducer,
    language: languageReducer,
    games: gamesReducer,
    game2: game2Reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
      sagaMiddleware
    ),
});

sagaMiddleware.run(rootSaga);

export default store;
