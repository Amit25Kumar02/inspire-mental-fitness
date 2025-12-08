import React, { useEffect, useState } from "react";
import "./ReactionTime.css";
import LeaderboardGamesNavbar from "../../../leaderboardGamesNavbar/LeaderboardGamesNavbar";
import { FaBrain, FaPlay, FaTrophy } from "react-icons/fa";
import { submitReactionTimeScore } from "../../../../../services/ReactionTimeLeaderboardService";

const ReactionTime = () => {
  const [gameState, setGameState] = useState("idle");
  const [message, setMessage] = useState("Tap to Start");
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [bestTime, setBestTime] = useState(
    () => localStorage.getItem("reactionBest") || null
  );
  const [submitting, setSubmitting] = useState(false);

  const themeStart = "#0071bd";
  const themeActive = "#009345";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const startGame = () => {
    setGameState("waiting");
    setReactionTime(null);
    setMessage("Wait for green...");
    const randomDelay = Math.floor(Math.random() * 3000) + 2000;
    const id = setTimeout(() => {
      setGameState("ready");
      setMessage("Click Now!");
      setStartTime(Date.now());
    }, randomDelay);
    setTimeoutId(id);
  };

  const handleClick = async () => {
    if (
      gameState === "idle" ||
      gameState === "clicked" ||
      gameState === "falseStart"
    ) {
      startGame();
    } else if (gameState === "waiting") {
      clearTimeout(timeoutId);
      setMessage("Too soon! Wait for green.");
      setGameState("falseStart");
    } else if (gameState === "ready") {
      const reaction = Date.now() - startTime;
      setReactionTime(reaction);
      setMessage(`Your Reaction Time: ${reaction} ms`);
      setGameState("clicked");

      // ✅ Save best locally
      if (!bestTime || reaction < bestTime) {
        localStorage.setItem("reactionBest", reaction);
        setBestTime(reaction);
      }

      // ✅ Send to backend
      try {
        setSubmitting(true);
        const res = await submitReactionTimeScore(reaction);
        console.log("Reaction time submitted:", res);
      } catch (err) {
        console.error("Failed to submit reaction time:", err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <>
      <LeaderboardGamesNavbar />
      <div className="bg-light text-dark py-5 px-3 d-flex flex-column align-items-center justify-content-center min-vh-100">
        <div className="container">
          {/* Game Box */}
          <div
            className="rounded-4 shadow position-relative d-flex align-items-center justify-content-center border mx-auto"
            style={{
              width: "100%",
              height: "480px",
              cursor: "pointer",
              backgroundColor:
                gameState === "ready"
                  ? themeActive
                  : gameState === "waiting"
                  ? themeStart
                  : gameState === "falseStart"
                  ? "#dc3545"
                  : themeStart,
              color: "#fff",
              transition: "background-color 0.3s ease",
            }}
            onClick={handleClick}
          >
            <span className="text-center fs_18 ff-gotham-medium">
              {bestTime && (
                <div className="mt-4 text-center d-flex align-items-center gap-2 fs_20 ff-gotham-bold text-white position-absolute personal-best-score-div">
                  <FaTrophy /> Best: {bestTime} ms
                </div>
              )}
              {message === "Tap to Start" ? (
                <>
                  <FaPlay /> Tap to Start
                </>
              ) : (
                <>
                  <div>
                    {message}
                    {(gameState === "clicked" ||
                      gameState === "falseStart") && (
                      <div className="mt-3 text-center">
                        <button
                          className="btn text-white bg-transparent border-0 d-flex align-items-center mx-auto ff-gotham-medium fs_18"
                          onClick={startGame}
                          style={{ gap: "0.5rem" }}
                          disabled={submitting}
                        >
                          <FaPlay />{" "}
                          {submitting
                            ? "Submitting..."
                            : gameState === "clicked"
                            ? "Play Again"
                            : "Try Again"}
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </span>
          </div>

          {/* Section: Benefits as Cards */}
          <section className="text-center mb-5 mt-5">
            <h2 className="fs_24 ff-gotham-bold text-black mb-3">
              Enhance Your Neural Networks
            </h2>
            <p
              style={{ maxWidth: "800px" }}
              className="text-secondary mb-5 ff-gotham-normal mx-auto"
            >
              The Reaction Time game trains your visual processing and motor
              reflexes through challenges that strengthen neural connections.
              Consistent practice can significantly improve:
            </p>

            <div className="row g-4 justify-content-center">
              <div className="col-md-6 col-lg-4">
                <div className="benefit-card p-4 h-100 text-start rounded-4 shadow-sm border bg-white">
                  <div className="icon-circle bg-primary text-white mb-3">
                    <i className="bi bi-lightning"></i>
                  </div>
                  <h3 className="ff-gotham-bold text-black fs_18 mb-2">
                    Faster Decision-Making
                  </h3>
                  <p className="text-secondary ff-gotham-normal fs_15 mb-0">
                    Improves neural processing speed to help you make quicker,
                    sharper choices under pressure.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="benefit-card p-4 h-100 text-start rounded-4 shadow-sm border bg-white">
                  <div className="icon-circle bg-success text-white mb-3">
                    <i className="bi bi-eye"></i>
                  </div>
                  <h3 className="ff-gotham-bold text-black fs_18 mb-2">
                    Enhanced Coordination
                  </h3>
                  <p className="text-secondary ff-gotham-normal fs_15 mb-0">
                    Strengthens hand-eye coordination essential for sports,
                    gaming, and real-world activities.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="benefit-card p-4 h-100 text-start rounded-4 shadow-sm border bg-white">
                  <div className="icon-circle bg-warning text-white mb-3">
                    <i className="bi bi-car-front"></i>
                  </div>
                  <h3 className="ff-gotham-bold text-black fs_18 mb-2">
                    Sharper Reflexes
                  </h3>
                  <p className="text-secondary ff-gotham-normal fs_15 mb-0">
                    Builds quick-response reflexes that are crucial for driving
                    and safety-critical situations.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="benefit-card p-4 h-100 text-start rounded-4 shadow-sm border bg-white">
                  <div className="icon-circle bg-info text-white mb-3">
                    <i className="bi bi-cpu"></i>
                  </div>
                  <h3 className="ff-gotham-bold text-black fs_18 mb-2">
                    Stronger Neural Links
                  </h3>
                  <p className="text-secondary ff-gotham-normal fs_15 mb-0">
                    Reinforces the connection between visual stimuli and
                    physical response for faster reactions.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="benefit-card p-4 h-100 text-start rounded-4 shadow-sm border bg-white">
                  <div className="icon-circle bg-danger text-white mb-3">
                    <FaBrain />
                  </div>
                  <h3 className="ff-gotham-bold text-black fs_18 mb-2">
                    Cognitive Agility
                  </h3>
                  <p className="text-secondary ff-gotham-normal fs_15 mb-0">
                    Helps maintain mental sharpness and agility as you age
                    through consistent reflex training.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Mastery Strategies */}
          <section className="mt-5 text-center">
            <h2 className="fs_24 ff-gotham-bold text-black mb-4">
              Mastery Strategies for Reaction Time
            </h2>

            <div className="row g-4 justify-content-center">
              {/* Strategy Cards */}
              <div className="col-md-6 col-lg-5">
                <div className="strategy-card p-4 h-100 text-start rounded-4 shadow-sm border bg-white">
                  <div className="icon-circle bg-success text-white mb-3">
                    <i className="bi bi-ear"></i>
                  </div>
                  <h3 className="ff-gotham-bold text-black mb-2 fs_18">
                    Minimize Distractions
                  </h3>
                  <p className="text-secondary ff-gotham-normal fs_15 mb-0">
                    Create a quiet environment free from distractions to help
                    your brain focus solely on the visual cue.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-5">
                <div className="strategy-card p-4 h-100 text-start rounded-4 shadow-sm border bg-white">
                  <div className="icon-circle bg-warning text-white mb-3">
                    <i className="bi bi-sun"></i>
                  </div>
                  <h3 className="ff-gotham-bold text-black mb-2 fs_18">
                    Find Your Peak Time
                  </h3>
                  <p className="text-secondary ff-gotham-normal fs_15 mb-0">
                    Test at different times of day to discover when your
                    reflexes are fastest and practice then.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-5">
                <div className="strategy-card p-4 h-100 text-start rounded-4 shadow-sm border bg-white">
                  <div className="icon-circle bg-info text-white mb-3">
                    <i className="bi bi-person-standing"></i>
                  </div>
                  <h3 className="ff-gotham-bold text-black mb-2 fs_18">
                    Proper Posture
                  </h3>
                  <p className="text-secondary ff-gotham-normal fs_15 mb-0">
                    Sit with a straight back and position your hand comfortably
                    to reduce physical response lag.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-5">
                <div className="strategy-card p-4 h-100 text-start rounded-4 shadow-sm border bg-white">
                  <div className="icon-circle bg-danger text-white mb-3">
                    <i className="bi bi-lightning-charge"></i>
                  </div>
                  <h3 className="ff-gotham-bold text-black mb-2 fs_18">
                    Anticipate Without Guessing
                  </h3>
                  <p className="text-secondary ff-gotham-normal fs_15 mb-0">
                    Stay ready without predicting exactly when the color will
                    change to avoid false starts.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ReactionTime;
