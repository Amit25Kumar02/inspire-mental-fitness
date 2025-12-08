import { call, put, takeLatest } from "redux-saga/effects";
import axios, { all } from "axios";
import { toast } from "react-toastify";

import {
  game2Failure,
  getQuestionData,
  getLevelQuestions,
  getSubmissionData,
  submitDataRequest,
  setSubmit,
  levelSubmissions,
} from "../slice/Game2Slice";

const API_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = () => ({
  headers: { token: localStorage.getItem("token") },
});

const groupedQuestions = (questions) => {
  // console.log("questions",questions)
  const levels = { 1: 3, 2:3, 3:3, 4:4, 5:5, 6:5 ,7:6,8:6 ,9:6,10:6};    //levels and day wise questions
  const grouped = {};
  Object.entries(levels).forEach(([level, totalDays]) => {
    for (let day = 1; day <= totalDays; day++) {
      grouped[`level${level}Day${day}`] = questions.filter((q) => q.level === Number(level) && q.day === day)
     
    }
  });
  return grouped;
};

function* getQuestions() {
  try {
    const response = yield call(axios.get, `${API_URL}/get-mind-questions`, getAuthHeaders());
    const allQuestions = response.data?.data ?? [];

    const groupedData = groupedQuestions(allQuestions);
    // console.log("questions start ======>", groupedData);

    yield put(getLevelQuestions(groupedData));
  } catch (error) {
    yield put(game2Failure(error.message));
  }
}

function* getGame2Submissions() {
  try {
    const response = yield call(axios.get, `${API_URL}/get-mind-submissions`, getAuthHeaders());

    const allData = response.data.data || [];
    const levels = [1,2,3,4,5,6,7,8,9,10];
    const levelData = {};

    levels.forEach((lvl) => {
      levelData[lvl] = allData.filter((item) => item.level === lvl);
    });

    const getCreatedAt = (data, level, day, step) =>
      data.find((item) => item.level === level && item.day === day && item.step === step)?.createdAt ?? null;

    const getStep = (data, totalDays, todaySteps) => {
      if (!data.length) return 1;
      for (let day = 1; day <= totalDays; day++) {
        if (!data.some((i) => i.day === day && i.step === todaySteps)) {
          return data.filter((i) => i.day === day).length + 1;
        }
      }
      return 1;
    };

    const getActiveDay = (data, totalDays, todaySteps) => {
      for (let day = 1; day <= totalDays; day++) {
        if (
          data.some((i) => i.day === day && i.step === todaySteps) &&
          !data.some((i) => i.day === day + 1 && i.step === todaySteps)
        ) {
          return day + 1;
        }
      }
      return 1;
    };

    // for level6 different days
    // For level 6 with different question counts per day
const getLevel6Day = (data, totalDays) => {
  for (let day = 1; day <= totalDays; day++) {
    // Day 1 & 2 have 10 questions, Day 3-5 have 20 questions
    let todaySteps = (day === 1 || day === 2) ? 10 : 20;
    let nextDaySteps = (day + 1 === 1 || day + 1 === 2) ? 10 : 20;
    
    if (
      data.some((i) => i.day === day && i.step === todaySteps) &&
      !data.some((i) => i.day === day + 1 && i.step === nextDaySteps)
    ) {
      return day + 1;
    }
  }
  return 1;
};

const getLevel6Step = (data, totalDays) => {
  if (!data.length) return 1;
  for (let day = 1; day <= totalDays; day++) {
    // Day 1 & 2 have 10 questions, Day 3-5 have 20 questions
    let todaySteps = (day === 1 || day === 2) ? 10 : 20;
    
    if (!data.some((i) => i.day === day && i.step === todaySteps)) {
      return data.filter((i) => i.day === day).length + 1;
    }
  }
  return 1;
};
    const checkLevel = (data, level, totalDays) => {
      const formatDate = (d) => {
        if (!d) return null;
        const parsed = new Date(d);
        return isNaN(parsed) ? null : parsed.toLocaleDateString("en-CA");
      };

      const today = formatDate(new Date());
      if (!Array.isArray(data) || data.length === 0) return false;

      let date1 = getCreatedAt(data, level, 1, 1);
      let date2 = getCreatedAt(data, level, 2, 1);
      let date3 = getCreatedAt(data, level, 3, 1);

      if (date1 && !date2 && !date3) { return date1 === today; }

      if (date1 && date2 && !date3) { return date2 === today; }

      if (date1 && date2 && date3) { return date3 === today; }

      return false;
    };


    const payload = {
      level1Data: levelData[1],
      level1Step: getStep(levelData[1], 3, 20),
      level1Date1: getCreatedAt(levelData[1], 1, 1, 20),
      level1Date2: getCreatedAt(levelData[1], 1, 2, 20),
      level1Date3: getCreatedAt(levelData[1], 1, 3, 20),
      activeDay: getActiveDay(levelData[1], 3, 20),
      isLevel1: levelData[1].some((i) => i.day === 3 && i.step === 20),
      startNow: checkLevel(levelData[1], 1, 3),

      level2Data: levelData[2],
      level2Step: getStep(levelData[2], 3, 20),
      level2Date1: getCreatedAt(levelData[2], 2, 1, 20),
      level2Date2: getCreatedAt(levelData[2], 2, 2, 20),
      level2Date3: getCreatedAt(levelData[2], 2, 3, 20),
      activeDayLevel2: getActiveDay(levelData[2], 3, 20),
      isLevel2: levelData[2].some((i) => i.day === 3 && i.step === 20),

      level3Data: levelData[3],
      level3Step: getStep(levelData[3], 3, 20),
      level3Date1: getCreatedAt(levelData[3], 3, 1, 20),
      level3Date2: getCreatedAt(levelData[3], 3, 2, 20),
      level3Date3: getCreatedAt(levelData[3], 3, 3, 20),
      activeDayLevel3: getActiveDay(levelData[3], 3, 20),
      isLevel3: levelData[3].some((i) => i.day === 3 && i.step === 20),

      level4Data: levelData[4],
      level4Step: getStep(levelData[4], 4, 40),
      level4Date1: getCreatedAt(levelData[4], 4, 1, 40),
      level4Date2: getCreatedAt(levelData[4], 4, 2, 40),
      level4Date3: getCreatedAt(levelData[4], 4, 3, 40),
      level4Date4: getCreatedAt(levelData[4], 4, 4, 40),
      activeDayLevel4: getActiveDay(levelData[4], 4, 40),
      isLevel4: levelData[4].some((i) => i.day === 4 && i.step === 40),

      level5Data: levelData[5],
      level5Step: getStep(levelData[5], 5, 20),
      level5Date1: getCreatedAt(levelData[5], 5, 1, 20),
      level5Date2: getCreatedAt(levelData[5], 5, 2, 20),
      level5Date3: getCreatedAt(levelData[5], 5, 3, 20),
      level5Date4: getCreatedAt(levelData[5], 5, 4, 20),
      level5Date5: getCreatedAt(levelData[5], 5, 5, 20),
      activeDayLevel5: getActiveDay(levelData[5], 5, 20),
      isLevel5: levelData[5].some((i) => i.day === 5 && i.step === 20),

      level6Data: levelData[6],
      level6Step: getLevel6Step(levelData[6], 5),
      level6Date1: getCreatedAt(levelData[6],6, 1, 10),
      level6Date2: getCreatedAt(levelData[6], 6, 2, 10),
      level6Date3: getCreatedAt(levelData[6], 6, 3, 20),
      level6Date4: getCreatedAt(levelData[6], 6, 4, 20),
      level6Date5: getCreatedAt(levelData[6], 6, 5, 20),
      activeDayLevel6: getLevel6Day(levelData[6], 5),
      isLevel6: levelData[6].some((i) => i.day === 5 && i.step === 20),


  level7Data: levelData[7],
      level7Step: getStep(levelData[7], 6, 20),
      level7Date1: getCreatedAt(levelData[7], 7, 1, 20),
      level7Date2: getCreatedAt(levelData[7], 7, 2, 20),
      level7Date3: getCreatedAt(levelData[7], 7, 3, 20),
      level7Date4: getCreatedAt(levelData[7], 7, 4, 20),
      level7Date5: getCreatedAt(levelData[7], 7, 5, 20),
      level7Date6: getCreatedAt(levelData[7], 7, 6, 20),
      activeDayLevel7: getActiveDay(levelData[7], 6, 20),
      isLevel7: levelData[7].some((i) => i.day === 6 && i.step === 20),


       level8Data: levelData[8],
      level8Step: getStep(levelData[8], 6, 20),
      level8Date1: getCreatedAt(levelData[8], 8, 1, 20),
      level8Date2: getCreatedAt(levelData[8], 8, 2, 20),
      level8Date3: getCreatedAt(levelData[8], 8, 3, 20),
      level8Date4: getCreatedAt(levelData[8], 8, 4, 20),
      level8Date5: getCreatedAt(levelData[8], 8, 5, 20),
       level8Date6: getCreatedAt(levelData[8], 8, 6, 20),
      activeDayLevel8: getActiveDay(levelData[8], 6, 20),
      isLevel8: levelData[8].some((i) => i.day === 6 && i.step === 20),

       level9Data: levelData[9],
      level9Step: getStep(levelData[9], 6, 20),
      level9Date1: getCreatedAt(levelData[9], 9, 1, 20),
      level9Date2: getCreatedAt(levelData[9], 9, 2, 20),
      level9Date3: getCreatedAt(levelData[9], 9, 3, 20),
      level9Date4: getCreatedAt(levelData[9], 9, 4, 20),
      level9Date5: getCreatedAt(levelData[9], 9, 5, 20),
       level9Date6: getCreatedAt(levelData[9], 9, 6, 20),
      activeDayLevel9: getActiveDay(levelData[9], 6, 20),
      isLevel9: levelData[9].some((i) => i.day === 6 && i.step === 20),


       level10Data: levelData[10],
      level10Step: getStep(levelData[10], 6, 15),
      level10Date1: getCreatedAt(levelData[10], 10, 1, 15),
      level10Date2: getCreatedAt(levelData[10], 10, 2, 15),
      level10Date3: getCreatedAt(levelData[10], 10, 3, 15),
      level10Date4: getCreatedAt(levelData[10], 10, 4, 15),
      level10Date5: getCreatedAt(levelData[10], 10, 5, 15),
       level10Date6: getCreatedAt(levelData[10], 10, 6, 15),
      activeDayLevel10: getActiveDay(levelData[10], 6, 15),
      isLevel10: levelData[10].some((i) => i.day === 6 && i.step === 15)
    };

    yield put(levelSubmissions(payload));

  } catch (error) {
    yield put(game2Failure(error.message));
  }
}

function* game2Submit(action) {
  try {
    const response = yield call(axios.post, `${API_URL}/mind-submission`, action.payload, getAuthHeaders());
    yield put(setSubmit(true));
  } catch (error) {
    yield put(game2Failure(error.message));
  }
}


export function* watchGame2Questions() {
  yield takeLatest(getQuestionData.type, getQuestions);
}

export function* watchGame2Submissions() {
  yield takeLatest(getSubmissionData.type, getGame2Submissions);
}

export function* watchSubmittedData() {
  yield takeLatest(submitDataRequest.type, game2Submit);
}