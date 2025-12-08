import { call, put, takeLatest } from "redux-saga/effects";
import axios, { all } from "axios";
import { toast } from "react-toastify";
import {
  createVictoryVoiceRequest,
  createVictoryVoiceSuccess,
  createXpRequest,
  gamesFailure,
  getCurrentLevel,
  getCurrentRequest,
  getCurrentSuccess,
  getGameNegativeData,
  getGamePerformance,
  getGamePerformanceData,
  getGamePositiveData,
  getLeve2Data,
  getLevel2Questions,
  getLevel2Status,
  getQuestionsData,
  getVictoryVoice,
  getVictoryVoiceNegativeData,
  getVictoryVoicePositiveData,
  getVictoryVoiceRequest,
  getXPData,
  getLeaderShipData,
  level2RequestSuccess,
  moveLevel2Request,
  submitRequest,
} from "../slice/GamesSlice";

const API_URL = process.env.REACT_APP_API_URL;

function* getCurrentData(action) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(axios.get, `${API_URL}/get-game-status`, {
      headers: {
        token: token,
      },
    });
    yield put(
      getCurrentLevel({
        nextLevel: response.data.level + 1 ?? 1,
      })
    );
    yield call(getCurrentSuccess());
  } catch (error) {
    yield put(gamesFailure(error.message));
  }
}

function* getVictoryData(action) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(axios.get, `${API_URL}/get-victory-voice`, {
      headers: {
        token: token,
      },
    });
    yield put(
      getVictoryVoice({
        gameData: response.data.data ?? null,
        level: response.data.data.currentLevel ?? 1,
        step: response.data.data.step ?? null,
        gameId: response.data.data._id ?? null,
        negativeIds: response.data.data.negative_thoughts ?? [],
        thoughts: response.data.data.positive_thoughts ?? [],
        stage: response.data.data.stage ?? null,
        date: response.data.data.date ?? null,
        stepNumber: response.data.data.step
          ? response.data.data.step === 7
            ? null
            : response.data.data.step
          : null,
        stageNumber: response.data.data.stage ?? 1,
        // levelNumber: response.data.data.currentLevel ?? 1,
        isLevel1:
          response.data.data.step === 7 && response.data.data.stage === 3
            ? true
            : false,
      })
    );
  } catch (error) {
    yield put(gamesFailure(error.message));
  }
}

function* getGameData(action) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(
      axios.get,
      `${API_URL}/get-user-performance-details`,
      { headers: { token: token } }
    );
    yield put(
      getGamePerformanceData({
        data: response.data.data ?? [],
      })
    );
  } catch (error) {
    yield put(gamesFailure(error.message));
  }
}

function* moveVictoryStep(action) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(
      axios.post,
      `${API_URL}/victoryvoice`,
      action.payload,
      {
        headers: {
          token: token,
        },
      }
    );
    yield put(createVictoryVoiceSuccess());
    window.scrollTo({ top: 100, behavior: 'smooth' });
    yield put({ type: "games/getVictoryVoiceRequest" });
  } catch (error) {
    toast.error(error.response.data.error, {
      toastId: "nexterr",
      autoClose: 2000,
    });
    yield put(gamesFailure(error.message));
  }
}

function* getNegativeData(action) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(axios.get, `${API_URL}/get-thought`, {
      headers: {
        token: token,
      },
    });
    yield put(
      getGameNegativeData({
        data: response.data.data,
      })
    );
  } catch (error) {
    yield put(gamesFailure(error.message));
  }
}

function* getPositiveData(action) {
  try {
    const { ids } = action.payload;
    const token = localStorage.getItem("token");
    const res1 = yield call(
      axios.get,
      `${API_URL}/get-positive-thought?parent_id=${ids[0]}`,
      { headers: { token: token } }
    );
    const res2 = yield call(
      axios.get,
      `${API_URL}/get-positive-thought?parent_id=${ids[1]}`,
      { headers: { token: token } }
    );
    const res3 = yield call(
      axios.get,
      `${API_URL}/get-positive-thought?parent_id=${ids[2]}`,
      { headers: { token: token } }
    );

    const data = {
      [ids[0]]: res1.data.data,
      [ids[1]]: res2.data.data,
      [ids[2]]: res3.data.data,
    };
    yield put(getGamePositiveData({ data: data }));
  } catch (error) {
    yield put(gamesFailure(error.message));
  }
}

function* getQuestions(action) {
  try {
    const token = localStorage.getItem("token");
    const headers = { headers: { token } };

    const response = yield call(axios.get, `${API_URL}/questions`, headers);

    const allQuestions = response.data?.data ?? [];

    const result = {
      day1: allQuestions.filter((q) => q.level === 2 && q.day === 1),
      day2: allQuestions.filter((q) => q.level === 2 && q.day === 2),
      day3: allQuestions.filter((q) => q.level === 2 && q.day === 3),
      level3Day1: allQuestions.filter((q) => q.level === 3 && q.day === 1),
      level3Day2: allQuestions.filter((q) => q.level === 3 && q.day === 2),
      level3Day3: allQuestions.filter((q) => q.level === 3 && q.day === 3),
      level3Day4: allQuestions.filter((q) => q.level === 3 && q.day === 4),
      level3Day5: allQuestions.filter((q) => q.level === 3 && q.day === 5),
      level3Day6: allQuestions.filter((q) => q.level === 3 && q.day === 6),
      level4Day1: allQuestions.filter((q) => q.level === 4 && q.day === 1),
      level4Day2: allQuestions.filter((q) => q.level === 4 && q.day === 2),
      level4Day3: allQuestions.filter((q) => q.level === 4 && q.day === 3),
      level4Day4: allQuestions.filter((q) => q.level === 4 && q.day === 4),
      level4Day5: allQuestions.filter((q) => q.level === 4 && q.day === 5),
      level5Day1: allQuestions.filter((q) => q.level === 5 && q.day === 1),
      level5Day2: allQuestions.filter((q) => q.level === 5 && q.day === 2),
      level5Day3: allQuestions.filter((q) => q.level === 5 && q.day === 3),
      level5Day4: allQuestions.filter((q) => q.level === 5 && q.day === 4),
      level5Day5: allQuestions.filter((q) => q.level === 5 && q.day === 5),
      level6Day1: allQuestions.filter((q) => q.level === 6 && q.day === 1),
      level6Day2: allQuestions.filter((q) => q.level === 6 && q.day === 2),
      level6Day3: allQuestions.filter((q) => q.level === 6 && q.day === 3),
      level6Day4: allQuestions.filter((q) => q.level === 6 && q.day === 4),
      level6Day5: allQuestions.filter((q) => q.level === 6 && q.day === 5),
    };

    yield put(getLevel2Questions(result));
  } catch (error) {
    yield put(gamesFailure(error.message));
  }
}

function* getLevel2(action) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(axios.get, `${API_URL}/get-submissions`, {
      headers: { token },
    });

    const data = response.data.data || [];
    const level2Data = data.filter((item) => item.level === 2);
    const level3Data = data.filter((item) => item.level === 3);
    const level4Data = data.filter((item) => item.level === 4);
    const level5Data = data.filter((item) => item.level === 5);
    const level6Data = data.filter((item) => item.level === 6);

    const L3D5 = level3Data?.filter((itm) => itm.day === 5);
    const L3D6 = level3Data?.filter((itm) => itm.day === 6);

    const levl3dy5 = level3Data?.filter((itm) => itm.day === 5 && itm.step === 30)[0]?.answers?.[0]?.selectedOption?.["0"];
    const levl3dy6 = level3Data?.filter((itm) => itm.day === 6 && itm.step === 20)[0]?.answers?.[0]?.selectedOption?.["0"];

    // Helper function to compute level2step
    const getLevel2Step = (data, totalDays, todaySteps) => {
      if (!data.length) return 1;
      for (let day = 1; day <= totalDays; day++) {
        if (
          !data.some((item) => item.day === day && item.step === todaySteps)
        ) {
          return data.filter((item) => item.day === day).length + 1;
        }
      }
      return 1;
    };

    // Helper function to get createdAt for a specific level, day, and step
    const getCreatedAt = (data, level, day, step) =>
      data.find((item) => item.level === level && item.day === day && item.step === step)?.createdAt ?? null;

    // Helper function to compute activeDay
    const getActiveDay = (data, totalDays, todaySteps) => {
      for (let day = 1; day <= totalDays; day++) {
        if (
          data.some((item) => item.day === day && item.step === todaySteps) &&
          !data.some((item) => item.day === day + 1 && item.step === todaySteps)
        ) {
          return day + 1;
        }
      }
      return 1;
    };

    //function for level3Step
    const getLevel3Step = (data, totalDays, todaySteps) => {
      if (!data.length) return 1;

      for (let day = 1; day <= totalDays; day++) {
        if (
          !data.some((item) => item.day === day && item.step === todaySteps)
        ) {
          return data.filter((item) => item.day === day).length + 1;
        }
      }
      return 1;
    };

    //function to check level3 each day
    const checkLevel3 = (data) => {
      const formatDate = (d) => {
        if (!d) return null;
        const parsed = new Date(d);
        if (isNaN(parsed)) return null;
        return parsed.toLocaleDateString("en-CA");
      };
      const today = formatDate(new Date());

      if (!data.length) return false;
      for (let day = 1; day <= 6; day++) {
        const createdAt = getCreatedAt(data, 3, day, 1);
        // console.log("checkng0943095954",day,formatDate(createdAt), today);
        
        if (formatDate(createdAt) === today) {
          return true;
        }
      }
      return false;
    };

    //function for level4Step
    const getLevel4Step = (data, totalDays, todaySteps) => {
      if (!data.length) return 1;
      for (let day = 1; day <= totalDays; day++) {
        if (
          !data.some((item) => item.day === day && item.step === todaySteps)
        ) {
          return data.filter((item) => item.day === day).length + 1;
        }
      }
      return 1;
    };

    //function for level5Step
    const getLevel5Step = (data, totalDays, todaySteps) => {
      if (!data.length) return 1;
      for (let day = 1; day <= totalDays; day++) {
        if (
          !data.some((item) => item.day === day && item.step === todaySteps)
        ) {
          return data.filter((item) => item.day === day).length + 1;
        }
      }
      return 1;
    };

    //function for level6Step
    const getLevel6Step = (data, totalDays) => {
      if (!data.length) return 1;

      let todaySteps = 20;
      for (let day = 1; day <= totalDays; day++) {
        todaySteps = day !== 5 ? 20 : 50;
        if (
          !data.some((item) => item.day === day && item.step === todaySteps)
        ) {
          return data.filter((item) => item.day === day).length + 1;
        }
      }
      return 1;
    };

    yield put(
      getLeve2Data({
        data: level2Data,
        level2step: getLevel2Step(level2Data, 3, 31),
        date1: getCreatedAt(data, 2, 1, 31),
        date2: getCreatedAt(data, 2, 2, 31),
        date3: getCreatedAt(data, 2, 3, 31),
        activeDay: getActiveDay(level2Data, 3, 31),
        isLevel2: !!level2Data.find(
          (item) => item.day === 3 && item.step === 31
        ),
        level3Data,
        level3Date1: getCreatedAt(data, 3, 1, 30),
        level3Date2: getCreatedAt(data, 3, 2, 30),
        level3Date3: getCreatedAt(data, 3, 3, 30),
        level3Date4: getCreatedAt(data, 3, 4, 30),
        level3Date5: levl3dy5?.length !== 3 ? null : getCreatedAt(data, 3, 5, 30),
        level3Date6: levl3dy6?.length !== 3 ? null : getCreatedAt(data, 3, 6, 20),
        level3step: L3D5?.length === 30 && levl3dy5?.length !== 3 ? 30 : L3D6?.length === 20 && levl3dy6?.length !== 3 ? 20 : getLevel3Step(level3Data, 6, 30),
        //level3step: getLevel3Step(level3Data, 6, 30),
        activeDayLevel3: L3D5?.length === 30 && levl3dy5?.length !== 3  ? 5 : L3D6?.length === 20 && levl3dy6?.length !== 3 ? 6 : getActiveDay(level3Data, 6, 30),
        startstep: checkLevel3(level3Data),
        level3Sub5: level3Data.filter((item) => item.level === 3 && item.day === 5),
        level3Sub6: level3Data.filter((item) => item.level === 3 && item.day === 6),
        isLevel3: L3D6?.length === 20 && levl3dy6?.length === 3 && !!level3Data.find((item) => item.day === 6 && item.step === 20),
        level4Data,
        level4Date1: getCreatedAt(data, 4, 1, 20),
        level4Date2: getCreatedAt(data, 4, 2, 20),
        level4Date3: getCreatedAt(data, 4, 3, 20),
        level4Date4: getCreatedAt(data, 4, 4, 20),
        level4Date5: getCreatedAt(data, 4, 5, 20),
        level4step: getLevel4Step(level4Data, 5, 20),
        activeDayLevel4: getActiveDay(level4Data, 5, 20),
        isLevel4: !!level4Data.find(
          (item) => item.day === 5 && item.step === 20
        ),
        level5Data,
        level5Date1: getCreatedAt(data, 5, 1, 20),
        level5Date2: getCreatedAt(data, 5, 2, 20),
        level5Date3: getCreatedAt(data, 5, 3, 20),
        level5Date4: getCreatedAt(data, 5, 4, 20),
        level5Date5: getCreatedAt(data, 5, 5, 20),
        level5step: getLevel5Step(level5Data, 5, 20),
        activeDayLevel5: getActiveDay(level5Data, 5, 20),
        isLevel5: !!level5Data.find(
          (item) => item.day === 5 && item.step === 20
        ),
        level6Data,
        level6Date1: getCreatedAt(data, 6, 1, 20),
        level6Date2: getCreatedAt(data, 6, 2, 20),
        level6Date3: getCreatedAt(data, 6, 3, 20),
        level6Date4: getCreatedAt(data, 6, 4, 20),
        level6Date5: getCreatedAt(data, 6, 5, 50),
        level6step: getLevel6Step(level6Data, 5),
        activeDayLevel6: getActiveDay(level6Data, 5, 20),
        isLevel6: !!level6Data.find(
          (item) => item.day === 5 && item.step === 50
        ),
      })
    );
    yield put(submitRequest(false));
  } catch (error) {
    yield put(gamesFailure(error.message));
  }
}

// function* getLevel2(action) {
//     try {
//         const token = localStorage.getItem("token");
//         const response = yield call(axios.get, `${API_URL}/get-submissions`, { headers: { "token": token } });
//         // console.log(response.data.data.filter((item) => item.level ===3), "response.data.data");
//         yield put(getLeve2Data({
//             data: response.data.data ? response.data.data.filter((item) => item.level === 2) : [],
//             level2step: response.data.data
//                 ? (
//                     response.data.data.find((item) => item.day === 1 && item.step === 31)?.createdAt
//                         ? (
//                             response.data.data.find((item) => item.day === 2 && item.step === 31)?.createdAt
//                                 ? (
//                                     response.data.data.find((item) => item.day === 3 && item.step === 31)?.createdAt
//                                         ? 1
//                                         : response.data.data.filter((item) => item.day === 3).length + 1
//                                 )
//                                 : response.data.data.filter((item) => item.day === 2).length + 1
//                         )
//                         : response.data.data.filter((item) => item.day === 1).length + 1
//                 )
//                 : 1,
//             date1: response.data.data ? (response.data.data.filter((item) => item.level===2 && item.day === 1 && item.step === 31)[0]?.createdAt ?? null) : null,
//             date2: response.data.data ? (response.data.data.filter((item) => item.level===2 && item.day === 2 && item.step === 31)[0]?.createdAt ?? null) : null,
//             date3: response.data.data ? (response.data.data.filter((item) => item.level===2 && item.day === 3 && item.step === 31)[0]?.createdAt ?? null) : null,
//             activeDay: response.data.data
//                 ? (
//                     (
//                         response.data.data.find((item) => item.day === 1 && item.step === 31)?.createdAt
//                         &&
//                         !response.data.data.find((item) => item.day === 2 && item.step === 31)?.createdAt
//                     ) ? 2
//                         : (
//                             response.data.data.find((item) => item.day === 2 && item.step === 31)?.createdAt
//                             &&
//                             !response.data.data.find((item) => item.day === 3 && item.step === 31)?.createdAt
//                         ) ?
//                             3
//                             : 1
//                 )
//                 : 1,
//             isLevel2: response.data.data.find((item) => item.day === 3 && item.step === 31)?.createdAt ? true : false,
//             level3Data: response.data.data ? response.data.data.filter((item) => item.level === 3) : [],
//             level3Date1: response.data.data ? (response.data.data.filter((item) => item.level===3 && item.day === 1 && item.step === 30)[0]?.createdAt ?? null) : null,
//             level3Date2: response.data.data ? (response.data.data.filter((item) => item.level===3 && item.day === 2 && item.step === 30)[0]?.createdAt ?? null) : null,
//             level3Date3: response.data.data ? (response.data.data.filter((item) => item.level===3 && item.day === 3 && item.step === 30)[0]?.createdAt ?? null) : null,
//             level3Date4: response.data.data ? (response.data.data.filter((item) => item.level===3 && item.day === 4 && item.step === 30)[0]?.createdAt ?? null) : null,
//             level3Date5: response.data.data ? (response.data.data.filter((item) => item.level===3 && item.day === 5 && item.step === 30)[0]?.createdAt ?? null) : null,
//             level3Date6: response.data.data ? (response.data.data.filter((item) => item.level===3 && item.day === 6 && item.step === 30)[0]?.createdAt ?? null) : null,
//         }));
//         yield put(submitRequest(false));

//     } catch (error) {
//         yield put(gamesFailure(error.message));
//     }
// }

function* victory2Step(action) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(
      axios.post,
      `${API_URL}/submission`,
      action.payload,
      {
        headers: {
          token: token,
        },
      }
    );
    yield put(level2RequestSuccess());
    window.scrollTo({ top: 100, behavior: 'smooth' });
    yield put(submitRequest(true));
  } catch (error) {
    toast.error(error.response.data.error, {
      toastId: "nexterr",
      autoClose: 2000,
    });
    yield put(gamesFailure(error.message));
  }
}

function* getUserXPData(action) {
  try {
    const token = localStorage.getItem("token");
    const res1 = yield call(axios.get, `${API_URL}/get-xp`, { headers: { token: token } });
    const res2 = yield call(axios.get, `${API_URL}/get-leaderboard`, { headers: { token: token } });

    yield put(
      getXPData({ data: res1.data.data ?? null, })
    );


    yield put(
      getLeaderShipData({ data: res2?.data?.data ?? null })
    )

  } catch (error) {
    yield put(gamesFailure(error.message));
  }
}

export function* watchCurrentLevel() {
  yield takeLatest(getCurrentRequest.type, getCurrentData);
}

export function* watchVictoryVoice() {
  yield takeLatest(getVictoryVoiceRequest.type, getVictoryData);
}

export function* watchGameVoice() {
  yield takeLatest(getGamePerformance.type, getGameData);
}

export function* watchVictoryStep() {
  yield takeLatest(createVictoryVoiceRequest.type, moveVictoryStep);
}

export function* watchNegativeData() {
  yield takeLatest(getVictoryVoiceNegativeData.type, getNegativeData);
}

export function* watchPositiveData() {
  yield takeLatest(getVictoryVoicePositiveData.type, getPositiveData);
}

export function* watchQuestions() {
  yield takeLatest(getQuestionsData.type, getQuestions);
}

export function* watchLevel2Data() {
  yield takeLatest(getLevel2Status.type, getLevel2);
}

export function* watchVictoryLevel2() {
  yield takeLatest(moveLevel2Request.type, victory2Step);
}

export function* watchXPDetails() {
  yield takeLatest(createXpRequest.type, getUserXPData);
}