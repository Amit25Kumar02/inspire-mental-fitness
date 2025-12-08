import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVictoryVoiceRequest } from "../../../../../redux/slice/GamesSlice";
import StepSixImg from "../../../../../assets/image/png/StepSixImg.png";
import StepsProgress from "../StepsProgress";

// Breathing patterns with durations (seconds)
const BREATHING_PATTERNS = {
  "4-7-8 Breathing": { inhale: 5, hold: 10, exhale: 10 },
  "Box Breathing": { inhale: 5, hold: 5, exhale: 5 },
  Diaphragmatic: { inhale: 10, hold: 5, exhale: 10 },
};

// Difficulty multipliers (scale inhale/exhale times)
const DIFFICULTY = {
  Beginner: 1,
  Intermediate: 1.5,
  Advanced: 2,
};

const TOTAL_DURATION = 1 * 60;

const Step6 = () => {
  const [patternName, setPatternName] = useState("4-7-8 Breathing");
  const [phase, setPhase] = useState("ready");
  const [level, setLevel] = useState("Beginner");
  const [timeLeft, setTimeLeft] = useState(BREATHING_PATTERNS[patternName].inhale);
  const [running, setRunning] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);
  const { levelnumber, stepnumber, gameId, stage, levelNumber, stageNumber, stepNumber } = useSelector((state) => state.games);
  const dispatch = useDispatch();

  useEffect(() => {
    if (timeLeft === 0) {
      if (phase === "inhale") {
        setPhase("hold");
        setTimeLeft(BREATHING_PATTERNS[patternName].hold);
      } else if (phase === "hold") {
        setPhase("exhale");
        setTimeLeft(BREATHING_PATTERNS[patternName].exhale);
      } else if (phase === "exhale") {
        setPhase("inhale");
        setTimeLeft(BREATHING_PATTERNS[patternName].inhale);
      }
    }
  }, [timeLeft, phase, patternName]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getMessage = () => {
    if (phase === "ready") {
      return `Ready ?`;
    } else if (phase === "inhale") {
      return `Inhale`;
    } else if (phase === "hold") {
      return `Hold`;
    } else if (phase === "done") {
      return "Exercise completed!";
    } else {
      return `Exhale`;
    }
  };

  const startExercise = () => {
    setRunning(true);
    setPhase("inhale");
    setTimeLeft((BREATHING_PATTERNS[patternName].inhale));
    setSessionMs(0);
    setNextEnabled(false);
  };

  const stopExercise = () => {
    setRunning(false);
    setPhase("ready");
    setTimeLeft(0);
    setNextEnabled(false);
  };

  const handleNext = () => {
    const payloaddata = {
      currentLevel: levelNumber,
      step: stepNumber+1,
      id: gameId,
      stage: stageNumber
  };
  dispatch(createVictoryVoiceRequest(payloaddata));
  };

  // const sessionSeconds = Math.floor(sessionMs / 1000);
  // const progressPercent = Math.min((sessionMs / (TOTAL_DURATION * 1000)) * 100, 100);
  const [sessionMs, setSessionMs] = useState(0);
  const sessionSeconds = Math.floor(sessionMs / 1000);
  const progressPercent = Math.min((sessionSeconds / TOTAL_DURATION) * 100, 100);
  useEffect(() => {
    if (!running || phase === "ready" || phase === "done") return;

    const interval = setInterval(() => {
      setSessionMs((prev) => {
        const next = prev + 100;
        if (next / 1000 >= TOTAL_DURATION) {
          setPhase("done");
          setRunning(false);
          setNextEnabled(true);
          clearInterval(interval);
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [running, phase]);

  return (
    <div>

      <div className="position-relative step-one-main-div-wrap">
        <StepsProgress />
        <div className="recovery-breath-step-container d-flex flex-column align-items-center justify-content-center text-center mb-5">
          <h2 className="question victory-voice-questions h2 fw-bold text-white mb-4">
            {/* Inspired Breathing */}
            Mental recovery starts with the breath
          </h2>

          {/* Dropdowns */}
          <div className="starts-breath-select-fields-wrap">
            <select
              className="form-select"
              value={patternName}
              onChange={(e) => {
                setPatternName(e.target.value);
                setTimeLeft(BREATHING_PATTERNS[e.target.value].inhale);
              }}
              disabled={running}
            >
              {Object.keys(BREATHING_PATTERNS).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>

            <select
              className="form-select"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              disabled={running}
            >
              {Object.keys(DIFFICULTY).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          {/* Circle Timer */}
          <div
            className="ready-outer-circle-wrap">
            <div className="ready-inner-circle-wrap">
              <span>{getMessage()}</span>
              {!nextEnabled && running && <span>{timeLeft}</span>}
            </div>
          </div>

          <div className="Steps-two-img-wrap for-mobile-img d-lg-none d-block">
            <img src={StepSixImg} alt="StepOneImg" className="img-fluid" />
          </div>

          <div className="d-flex gap-3">
            <button className="btn white-btn" onClick={startExercise} disabled={running}>
              Start
            </button>
            <button className="btn red-btn" onClick={stopExercise} disabled={!running}>
              Stop
            </button>
            <button className="btn green-btn" disabled={!nextEnabled} onClick={handleNext}>
              Next
            </button>
          </div>
        </div>

        <div className="position-fixed bottom-0 start-0 w-100 p-2 bg-white shadow mt-5 z-1">
          <div className="d-flex align-items-center">
            <div
              className="progress flex-grow-1 me-3"
              style={{
                height: "10px",
                background: `linear-gradient(to right, #198754 ${progressPercent}%, #e9ecef ${progressPercent}%)`,
              }}
            >
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{
                  width: `${progressPercent}%`,
                  transition: "width 0.1s linear",
                }}
                aria-valuenow={progressPercent}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
            <div className="fw-bold text-primary">
              Session: {Math.floor(sessionSeconds / 60)}:
              {String(sessionSeconds % 60).padStart(2, "0")}
            </div>
          </div>
        </div>

        <div className="Steps-two-img-wrap for-desktop-img d-lg-block d-none">
          <img src={StepSixImg} alt="StepOneImg" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Step6;
