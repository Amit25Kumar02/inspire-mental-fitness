import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Level1Home from "./Level1";
import {
  createXpRequest,
  getCurrentRequest,
  getGamePerformance,
  getLevel2Status,
  getVictoryVoiceRequest,
  manageStart,
  setLevel,
} from "../../../../redux/slice/GamesSlice";
import VictoryLogo from "../../../../assets/image/png/victory-voice-logo.png";
import { useNavigate } from "react-router-dom";
import Level2Home from "./Level2";
import Level3Home from "./Level3";
import Level4Home from "./Level4";
import Level5Home from "./Level5";
import Level6Home from "./Level6";
import { FaCircleCheck } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import Level3Day1 from '../../../../assets/image/png/level3-day1.jpg';
import Level3Day2 from '../../../../assets/image/png/level3-day2.jpg';
import Level3Day3 from '../../../../assets/image/png/level3-day3.jpg';
import Level3Day4 from '../../../../assets/image/png/level3-day4.jpg';
import Level3Day5 from '../../../../assets/image/png/level3-day5.jpg';
import Level3Day6 from '../../../../assets/image/png/level3-day6.jpg';

// import "./VictoryVoice.css";

const VictoryVoiceHome = () => {
  const {
    nextLevel, levelNumber, date, isLevel1, isLevel2, isLevel3,
    level2Date3, level3Date6, isLevel4, level4Date5, isLevel5, level5Date5, isLevel6, level6Date5, startstep,
    level3Date1, level3Date2, level3Date3, level3Date4, level3Date5, activeDayLevel3, xpdata
  } = useSelector((state) => state.games);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const levels = [
    "Voice of Truth", "Power Words", "The Confidence", "Calm in Chaos", "Lead with Light", "Echo of Growth"
  ];

  const levelShow = {
    1: <Level1Home />,
    2: <Level2Home />,
    3: <Level3Home />,
    4: <Level4Home />,
    5: <Level5Home />,
    6: <Level6Home />,
  };

  useLayoutEffect(() => {
    dispatch(getVictoryVoiceRequest());
    dispatch(getLevel2Status());
    dispatch(getCurrentRequest());
  }, [dispatch]);

  const formatDate = (d) => {
    if (!d) return null;
    const parsed = new Date(d);
    if (isNaN(parsed)) return null;
    return parsed.toLocaleDateString("en-CA");
  };
  const reduxDate = formatDate(date);
  const today = formatDate(new Date());

  useEffect(() => {
    const todayDate = formatDate(new Date());
    const reduxDateFormatted = date ? formatDate(date) : null;
    const level2DateOnly = level2Date3 ? formatDate(level2Date3) : null;
    const level3DateOnly = level3Date6 ? formatDate(level3Date6) : null;
    const level4DateOnly = level4Date5 ? formatDate(level4Date5) : null;
    const level5DateOnly = level5Date5 ? formatDate(level5Date5) : null;
    const level6DateOnly = level6Date5 ? formatDate(level6Date5) : null;
    // console.log(level3DateOnly, isLevel3);

    if (isLevel6) {
      if (todayDate === level6DateOnly) {
        dispatch(setLevel({ data: 6 }));
      } else {
        dispatch(setLevel({ data: 6 }));
      }
    } else if (isLevel5) {
      if (todayDate === level5DateOnly) {
        dispatch(setLevel({ data: 5 }));
      } else {
        dispatch(setLevel({ data: 6 }));
      }
    } else if (isLevel4) {
      if (todayDate === level4DateOnly) {
        dispatch(setLevel({ data: 4 }));
      } else {
        dispatch(setLevel({ data: 5 }));
      }
    } else if (isLevel3) {
      if (todayDate === level3DateOnly) {
        dispatch(setLevel({ data: 3 }));
      } else {
        dispatch(setLevel({ data: 4 }));
      }
    } else if (isLevel2) {
      if (todayDate === level2DateOnly) {
        dispatch(setLevel({ data: 2 }));
      } else {
        dispatch(setLevel({ data: 3 }));
      }
    } else if (isLevel1) {
      if (reduxDateFormatted === todayDate) {
        dispatch(setLevel({ data: 1 }));
      } else {
        dispatch(setLevel({ data: 2 }));
      }
    } else if (!reduxDateFormatted && !level2DateOnly) {
      dispatch(setLevel({ data: 1 }));
    }
  }, [
    date,
    isLevel1,
    isLevel2,
    isLevel3,
    isLevel4,
    isLevel5,
    isLevel6,
    level2Date3,
    level3Date6,
    level4Date5,
    level5Date5,
    level6Date5
  ]);

  useEffect(() => {
    if (isLevel1 || isLevel2 || isLevel3 || isLevel4 || isLevel5 || isLevel6) {
      dispatch(createXpRequest());
    }
  }, [isLevel1, isLevel2, isLevel3, isLevel4, isLevel5, isLevel6]);

  const [backgroundImage, setBackgroundImage] = useState('');
  // useEffect(() => {
  //   if (!isLevel3) {
  //     const level3Images = [Level3Day1, Level3Day2, Level3Day3, Level3Day4, Level3Day5, Level3Day6];
  //     const level3Dates = [level3Date1, level3Date2, level3Date3, level3Date4, level3Date5, level3Date6];
  //     const nextDayIndex = level3Dates.findIndex(date => !date);

  //     if (nextDayIndex !== -1) {
  //       setBackgroundImage(`url(${level3Images[nextDayIndex]})`);
  //     }
  //   }
  // }, [isLevel3, level3Date1, level3Date2, level3Date3, level3Date4, level3Date5, level3Date6, startstep]);

  // console.log(activeDayLevel3);

  useEffect(() => {
    if (isLevel3 || !startstep) {
      setBackgroundImage('');
      return;
    }

    const images = [Level3Day1, Level3Day2, Level3Day3, Level3Day4, Level3Day5, Level3Day6];
    const dates = [level3Date1, level3Date2, level3Date3, level3Date4, level3Date5, level3Date6];

    const todayStr = new Date().toLocaleDateString('en-CA');
    const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-CA') : null;


    let selectedIndex = images.length - 1;
    let isStart = false;

    for (let i = 0; i < dates.length; i++) {
      const formatted = formatDate(dates[i]);

      if (formatted === todayStr && startstep) {
        isStart = true;
        setBackgroundImage('');
        break;
      } else if (formatted === todayStr) {
        isStart = false;
        selectedIndex = i;
        break;
      } else if (!formatted) {
        selectedIndex = i;
        break;
      }
    }

    setBackgroundImage(isStart ? '' : `url(${images[selectedIndex]})`);
  }, [isLevel3, level3Date1, level3Date2, level3Date3, level3Date4, level3Date5, level3Date6, startstep]);

  return (
    <>
      <ToastContainer />
      <div
        style={{
          backgroundColor: (isLevel1 && isLevel2 && !isLevel3 && levelNumber === 3) || (level3Date6 && levelNumber === 3) ? "black" : "#0071bd",
          backgroundImage: backgroundImage,
          ...(backgroundImage && {
            backgroundSize: "116% 100%"
          }),
        }}
      >
        <div className="container-xxl">
          <div className="victory-voice-header-wrapper">
            <div className="victory-voice-heading-wrap">
              <h3 className="text-white text-uppercase">Victory Voice</h3>
            </div>
            <div className="victory-voice-logo-wrap">
              <img src={VictoryLogo} alt="VictoryLogo" className="img-fluid" />
            </div>
            <div className="xp-with-exit-btn-wrap">
              <div className="d-flex justify-content-end">

                <span className="text-white fw-bold">XP</span>
                <div className="xp-progress flex-grow-1 mx-2"
                  style={{
                    height: "18px",
                    background: "#rgb(0, 113, 189)",
                    borderRadius: "9px",
                    overflow: "hidden",
                    border: "2px solid #FFFFFF",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                  }}>
                  <div className="step-progress-bar"
                    style={{
                      width: `${((xpdata?.xp ?? 0) / 100) * 100}%`,
                      background: "#019345",
                      height: "100%",
                      borderRadius: "7px"  
                    }} />
                </div>

                <button
                  type="button"
                  className="btn btn-danger victory-voice-exit-btn"
                  onClick={() => {
                    dispatch(manageStart());
                    navigate("/fieldhouse-dashboard/games");
                  }}
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container-xxl">
          <div className="progress-container">
            <div className="level-tabs">
              {/* {levels?.map((title, idx) => {
                        const levelIndex = idx + 1;
                        const isPastLevel = levelIndex < nextLevel;
                        const isCurrentLevel = levelIndex === nextLevel;

                        return (
                            <div
                                key={idx}
                                className={`level-tab 
                                   ${isPastLevel ? "active" : ""} 
                                   ${isCurrentLevel ? "active" : ""}`
                                }
                                style={{ cursor: isCurrentLevel ? "pointer" : "default" }}
                                onClick={() => {
                                    if (isCurrentLevel) {
                                        dispatch(setLevel({ data: levelIndex }));
                                    }
                                }}
                            >
                                <span className="level d-flex gap-1">
                                    Lv {levelIndex}
                                   {levelIndex < nextLevel && <FaRegCircleCheck className="mt-1" />}
                                </span>
                                <p>{title}</p>
                            </div>
                        );
                    })} */}

              {levels?.map((title, idx) => (
                <div
                  key={idx}
                  className={`level-tab 
                            ${(isLevel1 && idx + 1 === 1) ? "active" : ""} 
                            ${(isLevel2 && idx + 1 === 2) ? "active" : ""}
                            ${(isLevel3 && idx + 1 === 3) ? "active" : ""}
                            ${(isLevel4 && idx + 1 === 4) ? "active" : ""}
                            ${(isLevel5 && idx + 1 === 5) ? "active" : ""}
                            ${(isLevel6 && idx + 1 === 6) ? "active" : ""}
                            ${levelNumber === idx + 1 ? "active" : ""}
                            ${levelNumber === idx + 1 ? "current-tab" : ""}
                            ${levelNumber + 1 === idx + 1 ? "next-tab" : ""}`}
                // style={{ cursor: "pointer" }}
                // onClick={() => {
                //     dispatch(setLevel({ data: idx + 1 }));
                // }}
                >
                  <span className="level d-flex gap-2">
                    Lv {idx + 1}
                    {(isLevel1 && idx + 1 === 1) && <FaCircleCheck className="mt-1" />}
                    {(isLevel2 && idx + 1 === 2) && <FaCircleCheck className="mt-1" />}
                    {(isLevel3 && idx + 1 === 3) && <FaCircleCheck className="mt-1" />}
                    {(isLevel4 && idx + 1 === 4) && <FaCircleCheck className="mt-1" />}
                    {(isLevel5 && idx + 1 === 5) && <FaCircleCheck className="mt-1" />}
                    {(isLevel6 && idx + 1 === 6) && <FaCircleCheck className="mt-1" />}
                  </span>
                  <p>{title}</p>
                </div>
              ))}


            </div>
            <div className="level-content position-relative">
              {levelShow[levelNumber]}

            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default VictoryVoiceHome;
