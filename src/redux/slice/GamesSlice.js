import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  levelNumber: 1,
  stageNumber: 1,
  stepNumber: null,
  gameId: null,
  negativeIds: [],
  levelnumber: 1,
  stepnumber: null,
  stage: null,
  date: null,
  thoughts: [],
  negativeData: [],
  positiveData: [],
  gameData: null,
  startNow: false,
  isLevel1: false,
  isAccept: false,
  level2Data: [],
  level2Day1: [],
  level2Day2: [],
  level2Day3: [],
  level2Stage: 1,
  level2Step: 1,
  level2Date1: null,
  level2Date2: null,
  level2Date3: null,
  activeDay: 1,
  isLevel2: false,
  isSubmit: false,
  start3: false,
  startstep: false,
  level3Step: 1,
  level3Data: [],
  level3Day1: [],
  level3Day2: [],
  level3Day3: [],
  level3Day4: [],
  level3Day5: [],
  level3Day6: [],
  level3Date1: null,
  level3Date2: null,
  level3Date3: null,
  level3Date4: null,
  level3Date5: null,
  level3Date6: null,
  activeDayLevel3: 1,
  level3Sub5: [],
  level3Sub6: [],
  isLevel3: false,
  start4: false,
  level4Step: 1,
  level4Data: [],
  level4Day1: [],
  level4Day2: [],
  level4Day3: [],
  level4Day4: [],
  level4Day5: [],
  level4Date1: null,
  level4Date2: null,
  level4Date3: null,
  level4Date4: null,
  level4Date5: null,
  activeDayLevel4: 1,
  isLevel4: false,
  start5: false,
  level5Step: 1,
  level5Data: [],
  level5Day1: [],
  level5Day2: [],
  level5Day3: [],
  level5Day4: [],
  level5Day5: [],
  level5Date1: null,
  level5Date2: null,
  level5Date3: null,
  level5Date4: null,
  level5Date5: null,
  activeDayLevel5: 1,
  isLevel5: false,
  start6: false,
  level6Step: 1,
  level6Data: [],
  level6Day1: [],
  level6Day2: [],
  level6Day3: [],
  level6Day4: [],
  level6Day5: [],
  level6Date1: null,
  level6Date2: null,
  level6Date3: null,
  level6Date4: null,
  level6Date5: null,
  activeDayLevel6: 1,
  isLevel6: false,
  nextLevel: 1,
  xpdata: null,
  leaderShipData :null,
  rankdata: null,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    startGame: (state, action) => {
      state.stepNumber = action.payload.data;
    },
    setLevel: (state, action) => {
      state.levelNumber = action.payload.data;
    },
    startGame2: (state, action) => {
      state.isAccept = action.payload;
    },
    getVictoryVoiceRequest: (state) => {
      state.loading = true;
    },
    getVictoryVoice: (state, action) => {
      state.loading = false;
      state.levelnumber = action.payload.level;
      state.stepnumber = action.payload.step;
      state.gameId = action.payload.gameId;
      state.negativeIds = action.payload.negativeIds;
      state.thoughts = action.payload.thoughts;
      state.stage = action.payload.stage;
      state.date = action.payload.date;
      state.stepNumber = action.payload.stepNumber;
      state.stageNumber = action.payload.stageNumber;
      // state.levelNumber = action.payload.levelNumber;
      state.gameData = action.payload.gameData;
      state.isLevel1 = action.payload.isLevel1;
    },
    gamesFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    createVictoryVoiceRequest: (state, action) => {
      state.loading = true;
    },
    createVictoryVoiceSuccess: (state) => {
      state.loading = false;
    },
    getVictoryVoiceNegativeData: (state, action) => {
      state.loading = true;
    },
    getGameNegativeData: (state, action) => {
      state.loading = false;
      state.negativeData = action.payload.data;
    },
    getVictoryVoicePositiveData: (state, action) => {
      state.loading = true;
    },
    getGamePositiveData: (state, action) => {
      state.loading = false;
      state.positiveData = action.payload.data;
    },
    getGamePerformance: (state, action) => {
      state.loading = true;
    },
    getGamePerformanceData: (state, action) => {
      state.loading = false;
      state.gameData = action.payload.data;
    },
    startForNow: (state, action) => {
      state.startNow = action.payload;
    },
    getQuestionsData: (state, action) => {
      state.loading = true;
    },
    getLevel2Questions: (state, action) => {
      state.loading = false;
      state.level2Day1 = action.payload.day1;
      state.level2Day2 = action.payload.day2;
      state.level2Day3 = action.payload.day3;
      state.level3Day1 = action.payload.level3Day1;
      state.level3Day2 = action.payload.level3Day2;
      state.level3Day3 = action.payload.level3Day3;
      state.level3Day4 = action.payload.level3Day4;
      state.level3Day5 = action.payload.level3Day5;
      state.level3Day6 = action.payload.level3Day6;
      state.level4Day1 = action.payload.level4Day1;
      state.level4Day2 = action.payload.level4Day2;
      state.level4Day3 = action.payload.level4Day3;
      state.level4Day4 = action.payload.level4Day4;
      state.level4Day5 = action.payload.level4Day5;
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
    },
    getLevel2Status: (state, action) => {
      state.loading = true;
    },
    getLeve2Data: (state, action) => {
      state.loading = false;
      state.level2Data = action.payload.data;
      state.level2Step = action.payload.level2step;
      state.level2Date1 = action.payload.date1;
      state.level2Date2 = action.payload.date2;
      state.level2Date3 = action.payload.date3;
      state.activeDay = action.payload.activeDay;
      state.isLevel2 = action.payload.isLevel2;
      state.level3Data = action.payload.level3Data;
      state.level3Date1 = action.payload.level3Date1;
      state.level3Date2 = action.payload.level3Date2;
      state.level3Date3 = action.payload.level3Date3;
      state.level3Date4 = action.payload.level3Date4;
      state.level3Date5 = action.payload.level3Date5;
      state.level3Date6 = action.payload.level3Date6;
      state.level3Step = action.payload.level3step;
      state.activeDayLevel3 = action.payload.activeDayLevel3;
      state.startstep = action.payload.startstep;
      state.level3Sub5 = action.payload.level3Sub5;
      state.level3Sub6 = action.payload.level3Sub6;
      state.isLevel3 = action.payload.isLevel3;
      state.level4Data = action.payload.level4Data;
      state.level4Date1 = action.payload.level4Date1;
      state.level4Date2 = action.payload.level4Date2;
      state.level4Date3 = action.payload.level4Date3;
      state.level4Date4 = action.payload.level4Date4;
      state.level4Date5 = action.payload.level4Date5;
      state.level4Step = action.payload.level4step;
      state.activeDayLevel4 = action.payload.activeDayLevel4;
      state.isLevel4 = action.payload.isLevel4;
      state.level5Data = action.payload.level5Data;
      state.level5Date1 = action.payload.level5Date1;
      state.level5Date2 = action.payload.level5Date2;
      state.level5Date3 = action.payload.level5Date3;
      state.level5Date4 = action.payload.level5Date4;
      state.level5Date5 = action.payload.level5Date5;
      state.level5Step = action.payload.level5step;
      state.activeDayLevel5 = action.payload.activeDayLevel5;
      state.isLevel5 = action.payload.isLevel5;
      state.level6Data = action.payload.level6Data;
      state.level6Date1 = action.payload.level6Date1;
      state.level6Date2 = action.payload.level6Date2;
      state.level6Date3 = action.payload.level6Date3;
      state.level6Date4 = action.payload.level6Date4;
      state.level6Date5 = action.payload.level6Date5;
      state.level6Step = action.payload.level6step;
      state.activeDayLevel6 = action.payload.activeDayLevel6;
      state.isLevel6 = action.payload.isLevel6;
    },
    moveLevel2Request: (state, action) => {
      state.loading = true;
    },
    level2RequestSuccess: (state) => {
      state.loading = false;
    },
    setLevel2Step: (state, action) => {
      state.level2Step = action.payload;
    },
    submitRequest: (state, action) => {
      state.isSubmit = action.payload;
    },
    getCurrentRequest: (state, action) => {
      state.loading = true;
    },
    getCurrentLevel: (state, action) => {
      state.nextLevel = action.payload.nextLevel;
    },
    getCurrentSuccess: (state) => {
      state.loading = false;
    },
    startLevel3: (state, action) => {
      state.start3 = action.payload;
    },
    startStep: (state, action) => {
      state.startstep = action.payload;
    },
    setLevel3Step: (state, action) => {
      state.level3Step = action.payload;
    },
    setLevel4Step: (state, action) => {
      state.level4Step = action.payload;
    },
    startLevel4: (state, action) => {
      state.start4 = action.payload;
    },
    startLevel5: (state, action) => {
      state.start5 = action.payload;
    },
    startLevel6: (state, action) => {
      state.start6 = action.payload;
    },
    manageStart: (state) => {
      state.stepNumber = null;
      state.startNow = false;
      state.start3 = false;
      state.start4 = false;
      state.start5 = false;
      state.start6 = false;
    }, 
    createXpRequest: (state) => {
      state.loading = true; 
    },
    getXPData: (state, action) => {
      state.xpdata = action.payload.data;
    },
    getLeaderShipData:(state,action)=>{
      state.leaderShipData = action.payload.data ;
    },
    getRankData: (state,action) => {
      state.rankdata = action.payload.data;
    }
    // getLevel3Data: (state, )
  },
});

export const {
  startGame,
  setLevel,
  startGame2,
  getVictoryVoiceRequest,
  getVictoryVoice,
  gamesFailure,
  createVictoryVoiceRequest,
  createVictoryVoiceSuccess,
  getVictoryVoiceNegativeData,
  getGameNegativeData,
  getVictoryVoicePositiveData,
  getGamePositiveData,
  getGamePerformance,
  getGamePerformanceData,
  startForNow,
  getQuestionsData,
  getLevel2Questions,
  getLevel2Status,
  getLeve2Data,
  moveLevel2Request,
  level2RequestSuccess,
  setLevel2Step,
  submitRequest,
  getCurrentRequest,
  getCurrentLevel,
  getCurrentSuccess,
  startLevel3,
  startStep,
  setLevel3Step,
  setLevel4Step,
  startLevel4,
  startLevel5,
  startLevel6,
  manageStart,
  createXpRequest,
  getXPData,
  getLeaderShipData,
  getRankData
} = gamesSlice.actions;

export default gamesSlice.reducer;
