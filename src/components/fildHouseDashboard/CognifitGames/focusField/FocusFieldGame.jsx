import React, { useState, useEffect, useRef } from "react";
import gameLogo from "../../../../assets/image/png/Focus-img.png";
import "./FocusField.css";
import { sendFocusFieldBestTime } from "../../../../services/FocusFieldLeaderboardService";

const FocusFieldGame = () => {
  const [gridVisible, setGridVisible] = useState(false);
  const [timeVisible, setTimeVisible] = useState(false);
  const [nextNum, setNextNum] = useState(0);
  const [lastClicked, setLastClicked] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [shuffled, setShuffled] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const columns = 10;
  const timerRef = useRef(null);

  // Timer
  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  const startGame = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      const numbers = Array.from({ length: 100 }, (_, i) => i);
      setShuffled([...numbers].sort(() => Math.random() - 0.5));
      setGridVisible(true);
      setRunning(true);
      setSeconds(0);
      setNextNum(0);
      setLastClicked(null);
      setTimeVisible(false);
    }, 1500);
  };

  const endGame = async () => {
    setRunning(false);
    setGridVisible(false);
    setTimeVisible(true);

    try {
      const response = await sendFocusFieldBestTime(seconds);
      console.log("Best time submitted:", response);
    } catch (error) {
      console.error("Error submitting best time:", error);
    }
  };

  const handleClick = (num) => {
    if (num === nextNum) {
      setNextNum((n) => n + 1);
      setLastClicked(num);
      if (num === 99) {
        endGame();
      }
    } else {
      if (lastClicked !== num && num > nextNum) {
        console.log("Wrong click", num);
      }
    }
  };

  const formatTime = () => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}:${s.toString().padStart(2, "0")} min` : `${s} sec`;
  };

  return (
    <div className="card-bg">
      {/* Popup Overlay */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h4 className="ff-gotham-bold fs_20">Get Ready!</h4>
            <p className="ff-gotham-light fs_16">Time will start now 🚀</p>
          </div>
        </div>
      )}

      {/* Title */}
      <div
        style={{ minHeight: "90vh" }}
        className="card bg-transparent border-0 d-flex flex-column align-items-center justify-content-center"
      >
        <div className="px-md-5 w-100">
          {/* Start Screen */}
          {!gridVisible && !timeVisible && !showPopup && (
            <div className="text-center">
              <div>
                <img style={{ width: "170px" }} src={gameLogo} alt="" />
                <h4 className="ff-gotham-bold fs_25 mb-0 text-center">
                  The Focus Field
                </h4>
              </div>
              <p className="ff-gotham-light fs_16">
                HOW TO PLAY: Click each number starting from 00 up to 99. <br />
                If you forget which number to look for, the "Current Number"
                display will help you.
              </p>
              <p className="ff-gotham-normal fs_14">
                <small>
                  NOTE: Navigating away from this page will cancel your time
                </small>
              </p>
              <p className="ff-gotham-medium fs_16">
                Clicking the start button will begin the timer.
              </p>
              <button
                id="start"
                onClick={startGame}
                className="px-5 py-2 bg_theme text-white rounded-3 ff-gotham-bold fs_18 border-0"
              >
                Start
              </button>
            </div>
          )}

          {/* Game Grid */}
          {gridVisible && (
            <div id="gridDisplay" className="gridDisplay-bg">
              <div>
                <div className="text-center d-lg-none">
                  <img style={{ width: "170px" }} src={gameLogo} alt="" />
                </div>
                <div className="d-sm-flex justify-content-between align-items-center mb-3">
                  <h5 className="ff-gotham-medium fs_18">
                    TIME:{" "}
                    <span className="time ff-gotham-bold">{formatTime()}</span>
                  </h5>
                  <h5 className="ff-gotham-medium fs_18">
                    CURRENT NUMBER:{" "}
                    <span className="next ff-gotham-bold">
                      {nextNum.toString().padStart(2, "0")}
                    </span>
                  </h5>
                </div>
              </div>
              <table className="table-bordered text-center w-100">
                <tbody>
                  {Array.from({ length: Math.ceil(100 / columns) }).map(
                    (_, row) => (
                      <tr key={row}>
                        {shuffled
                          .slice(row * columns, row * columns + columns)
                          .map((num) => (
                            <td
                              key={num}
                              className={`number ff-gotham-normal fs_16 ${
                                num < nextNum
                                  ? "bg-success text-white strikethrough"
                                  : ""
                              }`}
                              style={{ height: "50px", cursor: "pointer" }}
                              onClick={() => handleClick(num)}
                            >
                              {num.toString().padStart(2, "0")}
                            </td>
                          ))}
                      </tr>
                    )
                  )}
                </tbody>
              </table>

              <div className="text-center mt-3">
                <button
                  onClick={() => window.location.reload()}
                  className="btn rounded-2 px-4 bg_theme text-white ff-gotham-medium fs_16 mx-2"
                >
                  Reset
                </button>
                <button
                  onClick={() => setGridVisible(false)}
                  className="btn rounded-2 px-4 bg_blue text-white ff-gotham-medium fs_16 mx-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* End Screen */}
          {timeVisible && (
            <div id="timeDisplay" className="text-center">
              <h3 className="ff-gotham-bold fs_24">Congratulations!</h3>
              <h5 className="ff-gotham-medium fs_18">
                You completed the Focus Field with a time of{" "}
                <span className="time ff-gotham-bold">{formatTime()}</span>
              </h5>
              <p className="ff-gotham-light fs_14">
                Record this to chart your progress over time.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn bg_theme text-white rounded-2 ff-gotham-medium fs_16 px-4 mt-3"
              >
                Continue To Focus
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-center ff-gotham-light fs_14 ">
        Inspire Focus Field © 2025
      </p>
    </div>
  );
};

export default FocusFieldGame;
