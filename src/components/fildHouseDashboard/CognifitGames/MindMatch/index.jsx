import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FaCircleCheck } from "react-icons/fa6";
import VictoryLogo from "../../../../assets/image/png/victory-voice-logo.png";
import {
  getQuestionData,
  getSubmissionData,
  setLevelNumber,
} from "../../../../redux/slice/Game2Slice";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";
import Level6 from "./Level6";
import Level7 from "./Level7";
import Level8 from "./Level8";
import Level9 from "./Level9";
import Level10 from "./Level10";
import { createXpRequest } from "../../../../redux/slice/GamesSlice";

const LEVEL_COMPONENTS = {
  1: <Level1 />, 2: <Level2 />, 3: <Level3 />, 4: <Level4 />, 5: <Level5 />, 6: <Level6 />, 7: <Level7 />, 8: <Level8 />, 9: <Level9 />, 10: <Level10 />
};

const LEVEL_NAMES = [
  "Fog", "Pressure Cooker", "Spiral", "Critic", "Doubter", "Mirror", "Freeze", "Spiral Returns", "Fog Returns", "The Spiral + Critic + Freeze",
];

const MindMatchHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const { xpdata } = useSelector((state) => state.games);
  const {
    levelNumber, isLevel1, isLevel2, isLevel3, isLevel4, isLevel5, isLevel6, isLevel7, isLevel8, isLevel9, isLevel10, level1Date3, level2Date3, level3Date3, level4Date3, level4Date4, level5Date5, level6Date5, level7Date6, level8Date6, level9Date6, level10Date6
  } = useSelector((state) => state.game2);

  useLayoutEffect(() => {
    dispatch(getQuestionData());
    dispatch(getSubmissionData());
  }, [dispatch]);

  useLayoutEffect(() => {
    dispatch(createXpRequest());
  }, [isLevel1, isLevel2, isLevel3, isLevel4, isLevel5, isLevel6, isLevel7, isLevel8, isLevel9, isLevel10]);

  const formatDate = (date) => date ? new Date(date).toLocaleDateString("en-CA") : null;

  useEffect(() => {
    const today = formatDate(new Date());

    const levels = [
      { active: isLevel1, date: formatDate(level1Date3) },
      { active: isLevel2, date: formatDate(level2Date3) },
      { active: isLevel3, date: formatDate(level3Date3) },
      { active: isLevel4, date: formatDate(level4Date4) },
      { active: isLevel5, date: formatDate(level5Date5) },
      { active: isLevel6, date: formatDate(level6Date5) },
      { active: isLevel7, date: formatDate(level7Date6) },
      { active: isLevel8, date: formatDate(level8Date6) },
      { active: isLevel9, date: formatDate(level9Date6) },
      { active: isLevel10, date: formatDate(level10Date6) }
    ];

    let currentLevel = 1;

    for (let i = 0; i < levels.length; i++) {
      const { active, date } = levels[i];
      if (active) {
        currentLevel = today === date ? i + 1 : i + 2;
      }
    }

    dispatch(setLevelNumber(Math.min(currentLevel, LEVEL_NAMES.length)));

  }, [isLevel1, isLevel2, isLevel3, isLevel4, isLevel5, isLevel6, isLevel7, isLevel8, isLevel9, isLevel10, level1Date3, level2Date3, level3Date3, level4Date3, level4Date4, level5Date5, level6Date5, level7Date6, level8Date6, level9Date6, level10Date6, dispatch]);

  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  const handleExit = () => navigate("/fieldhouse-dashboard/games");

  const isLevelCompleted = (index) => {
    const checks = [isLevel1, isLevel2, isLevel3, isLevel4, isLevel5, isLevel6, isLevel7, isLevel8, isLevel9, isLevel10];
    return checks[index];
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-white">
        <div className="container-xxl">

          {/* Header */}
          <div className="victory-voice-header-wrapper d-flex justify-content-between align-items-center">
            <h3 className="text-uppercase mb-0">Mind Match</h3>
            <img
              src={VictoryLogo}
              alt="VictoryLogo"
              className="img-fluid"
              style={{ height: "50px" }}
            />
            <div className="d-flex gap-2 align-items-center">
              <button
                className="btn btn-danger victory-voice-exit-btn"
                onClick={handleExit}
              >
                Exit
              </button>
              <i
                className="bi bi-list cursor-pointer fs-4"
                onClick={toggleSidebar}
              />
            </div>
            <div className="xp-with-exit-btn-wrap">
              <div className="d-flex gap-2 align-items-center justify-content-end">

                <span className="fw-bold">XP</span>
                <div className="xp-progress flex-grow-1 mx-2"
                  style={{
                    height: "18px",
                    background: "#rgb(0, 113, 189)",
                    borderRadius: "9px",
                    border: "2px solid #0000",
                    overflow: "hidden",
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
                  className="btn btn-danger victory-voice-exit-btn"
                  onClick={handleExit}
                >
                  Exit
                </button>
                <i
                  className="bi bi-list cursor-pointer fs-4"
                  onClick={toggleSidebar}
                />
              </div>
            </div>
          </div >

  {/* Sidebar */ }
{
  showSidebar && (
    <>
      <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      <div className="sidebar show">
        <div className="sidebar-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Levels</h5>
          <button className="btn-close" onClick={toggleSidebar}></button>
        </div>

        <ul className="list-group mt-3">
          {LEVEL_NAMES.map((level, index) => (
            <li
              key={index}
              className="list-group-item d-flex align-items-center"
              style={{ color: index + 1 <= levelNumber ? "#0C72B9" : "inherit", }}
            >
              {isLevelCompleted(index) && (
                <FaCircleCheck className="me-2 text-success" />
              )}
              Level {index + 1}: {level}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
} 
        </div >

  {/* Level Display */ }
  < div className = "container-xxl mt-3" >
    <div className="progress-container">{LEVEL_COMPONENTS[levelNumber]}</div>
        </div >
      </div >
    </>
  );
};

export default MindMatchHome;