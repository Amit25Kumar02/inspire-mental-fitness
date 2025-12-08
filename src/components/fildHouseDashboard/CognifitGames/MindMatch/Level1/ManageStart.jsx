import React from "react";
import StartLogo from '../../../../../assets/image/png/start-game2.png';
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../../../../../redux/slice/Game2Slice";

const ManageStart = () => {
  const { stepnumber, stage, date } = useSelector((state) => state.games);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">

        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
          <img
            src={StartLogo}
            alt="Illustration"
            className="img-fluid mt-3 mt-md-0"
            style={{ maxHeight: "250px" }}
          />
        </div>


        <div className="voice-of-truth-content">
          <h4 className="fw-bold mt-4">MIND MATCH</h4>
          <h2 className="fw-bold mt-4">
            Gather skill pieces. Unlock badges. Strengthen your mindset
          </h2>
          <p className="lead mt-2 px-3 px-md-5 text-center">
            In this game user have to add puzzle piece → unlocks badges → progress toward Champion’s Mind
          </p>
        </div>

        <button className="btn green-btn" onClick={() => {
          dispatch(startGame(true));
        }}>Start Game</button>

        <a
          href="#"
          className="mt-3 d-flex text-decoration-underline h6 align-items-center gap-2"
        >
          How it Works
          <FaArrowRight />
        </a>
      </div>
    </div>
  );
};

export default ManageStart;
