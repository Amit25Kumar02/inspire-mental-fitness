import { createSlice } from "@reduxjs/toolkit";
import { getQuestionsData } from "./GamesSlice";

const initialState = {
  loading: false,
  error: null,
  startNow: false,
  isSubmit: false,
  levelNumber: 1,
  stageNumber: 1,
  stepNumber: null,
  gameId: null,

  level1Data: [],
  level1Day1: [],
  level1Day2: [],
  level1Day3: [],
  level1Stage: 1,
  level1Step: 1,
  level1Date1: null,
  level1Date2: null,
  level1Date3: null,
  activeDayLevel1: 1,
  isLevel1: false,

  level2Data: [],
  level2Day1: [],
  level2Day2: [],
  level2Day3: [],
  level2Stage: 1,
  level2Step: 1,
  level2Date1: null,
  level2Date2: null,
  level2Date3: null,
  activeDayLevel2: 1,
  isLevel2: false,

  level3Data: [],
  level3Day1: [],
  level3Day2: [],
  level3Day3: [],
  level3Stage: 1,
  level3Step: 1,
  level3Date1: null,
  level3Date2: null,
  level3Date3: null,
  activeDayLevel3: 1,
  isLevel3: false,

  level4Data: [],
  level4Day1: [],
  level4Day2: [],
  level4Day3: [],
  level4Day4: [],
  level4Stage: 1,
  level4Step: 1,
  level4Date1: null,
  level4Date2: null,
  level4Date3: null,
  level4Date4: null,
  activeDayLevel4: 1,
  isLevel4: false,

  level5Data: [],
  level5Day1: [],
  level5Day2: [],
  level5Day3: [],
  level5Day4: [],
  level5Day5: [],
  level5Stage: 1,
  level5Step: 1,
  level5Date1: null,
  level5Date2: null,
  level5Date3: null,
  level5Date4: null,
  level5Date5: null,
  activeDayLevel5: 1,
  isLevel5: false,


    level6Data: [],
  level6Day1: [],
  level6Day2: [],
  level6Day3: [],
  level6Day4: [],
  level6Day5: [],
  level6Stage: 1,
  level6Step: 1,
  level6Date1: null,
  level6Date2: null,
  level6Date3: null,
  level6Date4: null,
  level6Date5: null,
  activeDayLevel6: 1,
  isLevel6: false,


  level7Data: [],
  level7Day1: [],
  level7Day2: [],
  level7Day3: [],
  level7Day4: [],
  level7Day5: [],
   level7Day6: [],
  level7Stage: 1,
  level7Step: 1,
  level7Date1: null,
  level7Date2: null,
  level7Date3: null,
  level7Date4: null,
  level7Date5: null,
  level7Date6: null,
  activeDayLevel7: 1,
  isLevel7: false,

  level8Data: [],
  level8Day1: [],
  level8Day2: [],
  level8Day3: [],
  level8Day4: [],
  level8Day5: [],
   level8Day6: [],
  level8Stage: 1,
  level8Step: 1,
  level8Date1: null,
  level8Date2: null,
  level8Date3: null,
  level8Date4: null,
  level8Date5: null,
   level8Date6: null,
  activeDayLevel8: 1,
  isLevel8: false,

  level9Data: [],
  level9Day1: [],
  level9Day2: [],
  level9Day3: [],
  level9Day4: [],
  level9Day5: [],
   level9Day6: [],
  level9Stage: 1,
  level9Step: 1,
  level9Date1: null,
  level9Date2: null,
  level9Date3: null,
  level9Date4: null,
  level9Date5: null,
   level9Date6: null,
  activeDayLevel9: 1,
  isLevel9: false,


    level10Data: [],
  level10Day1: [],
  level10Day2: [],
  level10Day3: [],
  level10Day4: [],
  level10Day5: [],
   level10Day6: [],
  level10Stage: 1,
  level10Step: 1,
  level10Date1: null,
  level10Date2: null,
  level10Date3: null,
  level10Date4: null,
  level10Date5: null,
   level10Date6: null,
  activeDayLevel10: 1,
  isLevel10: false,


};

const game2Slice = createSlice({
  name: "game2",
  initialState,
  reducers: {
    setLevelNumber: (state, action) => {
      state.levelNumber = action.payload;
    },
    startGame: (state, action) => {
      state.startNow = action.payload;
    },
    getQuestionData: (state, action) => {
      state.loading = true;
    },
    getLevelQuestions: (state, action) => {
      state.loading = false;
      state.level1Day1 = action.payload.level1Day1;
      state.level1Day2 = action.payload.level1Day2;
      state.level1Day3 = action.payload.level1Day3;
      
      state.level2Day1 = action.payload.level2Day1;
      state.level2Day2 = action.payload.level2Day2;
      state.level2Day3 = action.payload.level2Day3;

      state.level3Day1 = action.payload.level3Day1;
      state.level3Day2 = action.payload.level3Day2;
      state.level3Day3 = action.payload.level3Day3;

      state.level4Day1 = action.payload.level4Day1;
      state.level4Day2 = action.payload.level4Day2;
      state.level4Day3 = action.payload.level4Day3;
      state.level4Day4 = action.payload.level4Day4;

      state.level5Day1 = action.payload.level5Day1;
      state.level5Day2 = action.payload.level5Day2;
      state.level5Day3 = action.payload.level5Day3;
      state.level5Day4 = action.payload.level5Day4;
      state.level5Day5 = action.payload.level5Day5;


      state.level6Day1 = action.payload.level6Day1;
      state.level6Day2 = action.payload.level6Day2;
      state.level6Day3 = action.payload.level6Day3;
      state.level6Day4 = action.payload.level6Day4;
      state.level6Day5 = action.payload.level6Day5;

      state.level7Day1 = action.payload.level7Day1;
      state.level7Day2 = action.payload.level7Day2;
      state.level7Day3 = action.payload.level7Day3;
      state.level7Day4 = action.payload.level7Day4;
      state.level7Day5 = action.payload.level7Day5;
 state.level7Day6 = action.payload.level7Day6;

      state.level8Day1 = action.payload.level8Day1;
      state.level8Day2 = action.payload.level8Day2;
      state.level8Day3 = action.payload.level8Day3;
      state.level8Day4 = action.payload.level8Day4;
      state.level8Day5 = action.payload.level8Day5;
      state.level8Day6 = action.payload.level8Day6;

      state.level9Day1 = action.payload.level9Day1;
      state.level9Day2 = action.payload.level9Day2;
      state.level9Day3 = action.payload.level9Day3;
      state.level9Day4 = action.payload.level9Day4;
      state.level9Day5 = action.payload.level9Day5;
      state.level9Day6 = action.payload.level9Day6;

      state.level10Day1 = action.payload.level10Day1;
      state.level10Day2 = action.payload.level10Day2;
      state.level10Day3 = action.payload.level10Day3;
      state.level10Day4 = action.payload.level10Day4;
      state.level10Day5 = action.payload.level10Day5;
      state.level10Day6 = action.payload.level10Day6;
    },
    game2Failure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getSubmissionData: (state, action) => {
      state.loading = true;
    },
    levelSubmissions: (state, action) => {
      state.loading = false;
      state.level1Data = action.payload.level1Data;
      state.level1Step = action.payload.level1Step;
      state.level1Date1 = action.payload.level1Date1;
      state.level1Date2 = action.payload.level1Date2;
      state.level1Date3 = action.payload.level1Date3;
      state.activeDayLevel1 = action.payload.activeDay;
      state.isLevel1 = action.payload.isLevel1;
      state.startNow = action.payload.startNow;

      state.level2Data = action.payload.level2Data;
      state.level2Step = action.payload.level2Step;
      state.level2Date1 = action.payload.level2Date1;
      state.level2Date2 = action.payload.level2Date2;
      state.level2Date3 = action.payload.level2Date3;
      state.activeDayLevel2 = action.payload.activeDayLevel2;
      state.isLevel2 = action.payload.isLevel2;

      state.level3Data = action.payload.level3Data;
      state.level3Step = action.payload.level3Step;
      state.level3Date1 = action.payload.level3Date1;
      state.level3Date2 = action.payload.level3Date2;
      state.level3Date3 = action.payload.level3Date3;
      state.activeDayLevel3 = action.payload.activeDayLevel3;
      state.isLevel3 = action.payload.isLevel3;

      state.level4Data = action.payload.level4Data;
      state.level4Step = action.payload.level4Step;
      state.level4Date1 = action.payload.level4Date1;
      state.level4Date2 = action.payload.level4Date2;
      state.level4Date3 = action.payload.level4Date3;
      state.level4Date4 = action.payload.level4Date4;
      state.activeDayLevel4 = action.payload.activeDayLevel4;
      state.isLevel4 = action.payload.isLevel4;

      state.level5Data = action.payload.level5Data;
      state.level5Step = action.payload.level5Step;
      state.level5Date1 = action.payload.level5Date1;
      state.level5Date2 = action.payload.level5Date2;
      state.level5Date3 = action.payload.level5Date3;
      state.level5Date4 = action.payload.level5Date4;
      state.level5Date5 = action.payload.level5Date5;
      state.activeDayLevel5 = action.payload.activeDayLevel5;
      state.isLevel5 = action.payload.isLevel5;

      state.level6Data = action.payload.level6Data;
      state.level6Step = action.payload.level6Step;
      state.level6Date1 = action.payload.level6Date1;
      state.level6Date2 = action.payload.level6Date2;
      state.level6Date3 = action.payload.level6Date3;
      state.level6Date4 = action.payload.level6Date4;
      state.level6Date5 = action.payload.level6Date5;
      state.activeDayLevel6 = action.payload.activeDayLevel6;
      state.isLevel6 = action.payload.isLevel6;


      state.level7Data = action.payload.level7Data;
      state.level7Step = action.payload.level7Step;
      state.level7Date1 = action.payload.level7Date1;
      state.level7Date2 = action.payload.level7Date2;
      state.level7Date3 = action.payload.level7Date3;
      state.level7Date4 = action.payload.level7Date4;
      state.level7Date5 = action.payload.level7Date5;
      state.level7Date6 = action.payload.level7Date6;
      state.activeDayLevel7 = action.payload.activeDayLevel7;
      state.isLevel7 = action.payload.isLevel7;

            state.level8Data = action.payload.level8Data;
      state.level8Step = action.payload.level8Step;
      state.level8Date1 = action.payload.level8Date1;
      state.level8Date2 = action.payload.level8Date2;
      state.level8Date3 = action.payload.level8Date3;
      state.level8Date4 = action.payload.level8Date4;
      state.level8Date5 = action.payload.level8Date5;
      state.level8Date6 = action.payload.level8Date6;
      state.activeDayLevel8 = action.payload.activeDayLevel8;
      state.isLevel8 = action.payload.isLevel8;


      state.level9Data = action.payload.level9Data;
      state.level9Step = action.payload.level9Step;
      state.level9Date1 = action.payload.level9Date1;
      state.level9Date2 = action.payload.level9Date2;
      state.level9Date3 = action.payload.level9Date3;
      state.level9Date4 = action.payload.level9Date4;
      state.level9Date5 = action.payload.level9Date5;
      state.level9Date6 = action.payload.level9Date6;
      state.activeDayLevel9 = action.payload.activeDayLevel9;
      state.isLevel9 = action.payload.isLevel9;


      state.level10Data = action.payload.level10Data;
      state.level10Step = action.payload.level10Step;
      state.level10Date1 = action.payload.level10Date1;
      state.level10Date2 = action.payload.level10Date2;
      state.level10Date3 = action.payload.level10Date3;
      state.level10Date4 = action.payload.level10Date4;
      state.level10Date5 = action.payload.level10Date5;
      state.level10Date6 = action.payload.level10Date6;
      state.activeDayLevel10 = action.payload.activeDayLevel10;
      state.isLevel10 = action.payload.isLevel10;
    }, 
    setSubmit: (state, action) => {
      state.isSubmit = action.payload;
    },
    submitDataRequest: (state, action) => {
      state.loading = true;
    },
    submissionData: (state, action) =>  {
      state.loading = false;
    },
    createSubmitRequest: (state, action) => {
      state.loading = true;
    }
  },
});

export const {
  setLevelNumber,
  startGame,
  getQuestionData,
  getLevelQuestions,
  getSubmissionData,
  levelSubmissions,
  game2Failure,
  setSubmit,
  submitDataRequest,
  submissionData,
  createSubmitRequest
} = game2Slice.actions;

export default game2Slice.reducer;