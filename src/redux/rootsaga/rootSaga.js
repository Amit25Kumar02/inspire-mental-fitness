import { all } from "redux-saga/effects";
import { watchUserLogin, watchUserSignup } from "../saga/AuthSaga";
import {
  watchUploadFile,
  watchGetAllLibraryFile,
  watchGetUserLibraryFile,
  watchDeleteUserLibraryFiles,
} from "../saga/UserLibrarySaga";
import {
  watchDeleteJournal,
  watchFetchAllJournals,
  watchGetUserJournal,
  watchJournalDetailsSaga,
  watchJournalSubmission,
  watchUpdateJournal,
} from "../saga/JournalSaga";
import {
  watchCurrentLevel,
  watchGameVoice,
  watchLevel2Data,
  watchNegativeData,
  watchPositiveData,
  watchQuestions,
  watchVictoryLevel2,
  watchVictoryStep,
  watchVictoryVoice,
  watchXPDetails,
} from "../saga/GameSaga";
import { watchGame2Questions, watchGame2Submissions, watchSubmittedData } from "../saga/Game2Saga";

export default function* rootSaga() {
  yield all([
    watchUserSignup(),
    watchUserLogin(),
    watchUploadFile(),
    watchGetAllLibraryFile(),
    watchGetUserLibraryFile(),
    watchDeleteUserLibraryFiles(),
    watchJournalSubmission(),
    watchGetUserJournal(),
    watchJournalDetailsSaga(),
    watchFetchAllJournals(),
    watchUpdateJournal(),
    watchDeleteJournal(),
    watchCurrentLevel(),
    watchVictoryVoice(),
    watchVictoryStep(),
    watchNegativeData(),
    watchPositiveData(),
    watchGameVoice(),
    watchQuestions(),
    watchLevel2Data(),
    watchVictoryLevel2(),
    watchGame2Questions(),
    watchGame2Submissions(),
    watchSubmittedData(),
    watchXPDetails(),
  ]);
}
