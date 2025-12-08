import React, { useEffect, useState, useRef } from "react";
import "./AimTrainer.css";
import LeaderboardGamesNavbar from "../../../leaderboardGamesNavbar/LeaderboardGamesNavbar";
import football from "../../../../../assets/image/png/soccer.png";
import footballMachine from "../../../../../assets/image/png/footballMachine.png";
import goalKeeperGloves from "../../../../../assets/image/png/goalKeeperGloves.png";
import { FaPlay } from "react-icons/fa";
import { submitAimTrainerScore } from "../../../../../services/AimTrainerService";

const AimTrainer = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [balls, setBalls] = useState([]);
  const [glovePos, setGlovePos] = useState({ x: 50, y: 85 });
  const [submitting, setSubmitting] = useState(false);
  const fieldRef = useRef(null);
  const spawnRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(spawnRef.current);
  }, []);

  // Start game
  const startGame = () => {
    clearTimeout(spawnRef.current);
    setScore(0);
    setTimeLeft(60);
    setBalls([]);
    setGameOver(false);
    setGameActive(true);
  };

  // Spawn balls
  useEffect(() => {
    if (!gameActive) return;
    spawnBall();
  }, [gameActive]);

  useEffect(() => {
    if (!gameActive) return;
    if (timeLeft <= 0) {
      setGameActive(false);
      setGameOver(true);
      handleSubmitScore();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameActive]);

  // Spawn footballs
  const spawnBall = () => {
    if (!gameActive) return;

    const directions = ["left", "right", "top-left", "top-right", "top-center"];
    const dir = directions[Math.floor(Math.random() * directions.length)];

    const newBall = { id: Date.now(), direction: dir };
    setBalls((prev) => [...prev, newBall]);

    spawnRef.current = setTimeout(spawnBall, 1500);

    setTimeout(() => {
      setBalls((prev) => prev.filter((b) => b.id !== newBall.id));
    }, 3500);
  };

  const handleMouseMove = (e) => {
    if (!gameActive || !fieldRef.current) return;
    const rect = fieldRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlovePos({ x, y });
  };

  const handleHit = (id) => {
    setScore((s) => s + 1);
    setBalls((prev) => prev.filter((b) => b.id !== id));
  };

  const handleSubmitScore = async () => {
    try {
      setSubmitting(true);
      const res = await submitAimTrainerScore(score);
      console.log("Score submitted:", res);
    } catch (err) {
      console.error("Error submitting Aim Trainer score:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <LeaderboardGamesNavbar />
      <div className="bg-light py-5 px-3 d-flex flex-column align-items-center justify-content-center min-vh-100">
        <div className="container">
          {/* Football Field */}
          <div
            ref={fieldRef}
            className="football-field-div position-relative border rounded-4 mx-auto bg-white shadow"
            style={{ width: "100%", height: "700px", overflow: "hidden" }}
            onMouseMove={handleMouseMove}
          >
            {/* Machines */}
            <div className="d-flex justify-content-between px-5 pt-3">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  className="soccer-machine"
                  src={footballMachine}
                  alt="footballMachine"
                />
              ))}
            </div>

            {/* Gloves */}
            <img
              className="goal-keeper-gloves position-absolute"
              src={goalKeeperGloves}
              alt="goalKeeperGloves"
              style={{
                left: `${glovePos.x}%`,
                top: `${glovePos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Footballs */}
            {balls.map((ball) => (
              <img
                key={ball.id}
                src={football}
                alt="football"
                className={`football-ball ${ball.direction}`}
                onClick={() => handleHit(ball.id)}
              />
            ))}

            {/* Start & Game Over */}
            {!gameActive && !gameOver && (
              <button
                className="btn btn-primary start-btn mx-auto ff-gotham-bold fs_18 d-flex align-items-center gap-2"
                onClick={startGame}
              >
                <FaPlay /> Start Game
              </button>
            )}

            {gameOver && (
              <div className="text-center position-absolute top-50 start-50 translate-middle">
                <h2 className="text-success ff-gotham-bold mb-3">Time’s Up!</h2>
                <p className="ff-gotham-medium fs_18 mb-3">
                  You saved <span className="text-primary">{score}</span> goals!
                </p>
                <button
                  disabled={submitting}
                  className="btn btn-primary ff-gotham-bold d-flex align-items-center gap-2 mx-auto"
                  onClick={startGame}
                >
                  {submitting ? (
                    "Saving..."
                  ) : (
                    <>
                      <FaPlay /> Play Again
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Scoreboard */}
            {gameActive && (
              <div className="position-absolute top-0 start-0 p-3 d-flex gap-3">
                <p className="text-primary ff-gotham-bold fs_16 mb-0">
                  Score: {score}
                </p>
                <p className="text-danger ff-gotham-bold fs_16 mb-0">
                  Time: {timeLeft}s
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AimTrainer;
