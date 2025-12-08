import React, { useEffect, useRef, useState } from "react";
import "./BreathingExercise.css";
import logo from "../assets/image/png/logo.png";
import bg from "../assets/image/png/breathingBg.jpeg";

const BreathingExercise = () => {
  const [isDark, setIsDark] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [breathText, setBreathText] = useState("Breathe In");
  const [timer, setTimer] = useState(0);
  const [pattern, setPattern] = useState("478");
  const [level, setLevel] = useState("beginner");
  const [sessionTime, setSessionTime] = useState(0);
  const [circleClass, setCircleClass] = useState("circle");

  const sessionInterval = useRef(null);
  const currentInterval = useRef(null);

  const patterns = {
    478: { inhale: 4, hold: 7, exhale: 8 },
    box: { inhale: 4, hold: 4, exhale: 4, holdOut: 4 },
    diaphragm: { inhale: 6, hold: 2, exhale: 6 },
  };

  const levels = {
    beginner: 0.8,
    intermediate: 1,
    advanced: 1.2,
  };

  useEffect(() => {
    if (isRunning) {
      sessionInterval.current = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
      runSession();
    } else {
      clearInterval(sessionInterval.current);
      clearInterval(currentInterval.current);
    }

    return () => {
      clearInterval(sessionInterval.current);
      clearInterval(currentInterval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const runSession = async () => {
    const { inhale, hold, exhale, holdOut } = patterns[pattern];
    const speed = levels[level];

    while (isRunning) {
      await breathe("Inhale", inhale / speed, "inhale");
      if (!isRunning) break;
      await breathe("Hold", hold / speed, "hold");
      if (!isRunning) break;
      await breathe("Exhale", exhale / speed, "exhale");
      if (holdOut && isRunning) {
        await breathe("Hold", holdOut / speed, "hold");
      }
    }
  };

  const breathe = (text, duration, animation) => {
    return new Promise((resolve) => {
      setBreathText(text);
      setCircleClass(`circle ${animation}`);

      let timeLeft = Math.round(duration);
      setTimer(timeLeft);

      currentInterval.current = setInterval(() => {
        timeLeft--;
        setTimer(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(currentInterval.current);
          resolve();
        }
      }, 1000);
    });
  };

  const toggleExercise = () => {
    if (isRunning) {
      setIsRunning(false);
      setBreathText("Paused");
      setTimer(0);
      setCircleClass("circle");
    } else {
      setSessionTime(0);
      setIsRunning(true);
    }
  };

  const progressPercentage = Math.min((sessionTime / 300) * 100, 100);

  return (
    <div
      className={`breathing-app ${isDark ? "dark" : ""}`}
      style={{
        background: `url(${bg}) no-repeat center center fixed`,
        backgroundSize: "contain",
        minHeight: "100vh",
      }}
    >
      <div
        className="container-fluid"
        style={{
          background:
            "linear-gradient(135deg, rgba(224,242,254,0.9), rgba(186,230,253,0.9))",
          minHeight: "100vh",
          padding: "10px",
        }}
      >
        <a href="/fieldhouse-dashboard">
          <img
            src={logo}
            alt="logo"
            style={{ width: "200px", float: "left", padding: "10px" }}
          />
        </a>
        <div style={{ clear: "both" }}></div>

        <div className="controls">
          <h1 className="ql-font-gothamBold">Inspired Breathing</h1>
          <div className="settings">
            <select
              value={pattern}
              className="ff-gotham-medium"
              onChange={(e) => setPattern(e.target.value)}
            >
              <option value="478">4-7-8 Breathing</option>
              <option value="box">Box Breathing</option>
              <option value="diaphragm">Diaphragmatic</option>
            </select>

            <select
              className="ff-gotham-medium"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <button className="ff-gotham-medium" onClick={toggleExercise}>
              {isRunning ? "Stop" : "Start"}
            </button>
            <button
              className="ff-gotham-medium"
              onClick={() => setIsDark(!isDark)}
            >
              Toggle Dark Mode
            </button>
          </div>
        </div>

        <div className="breathing-container">
          <div className={circleClass}></div>
          <div className="instructions">
            <span className="ff-gotham-medium" id="breathText">
              {breathText}
            </span>
            <span className="ff-gotham-medium" id="timer">
              {timer}
            </span>
          </div>
        </div>

        <div className="progress d-flex align-items-center mx-auto">
          <div
            className="progress-bar"
            style={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressPercentage}%`,
                background: isDark
                  ? "linear-gradient(90deg, #60a5fa, #34d399)"
                  : "linear-gradient(90deg, #3b82f6, #10b981)",
                borderRadius: "6px",
                transition: "width 0.5s ease-out",
              }}
            ></div>
          </div>
          <span className="fs_14 ff-gotham-medium" id="sessionTime">
            Session: {Math.floor(sessionTime / 60)}:
            {String(sessionTime % 60).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;
