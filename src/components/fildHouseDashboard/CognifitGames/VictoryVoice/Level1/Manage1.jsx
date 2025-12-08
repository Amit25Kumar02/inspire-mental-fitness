import React from "react";
import StartLogo from '../../../../../assets/image/png/Game1-Start.png';
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../../../../../redux/slice/GamesSlice";
import { HiMiniArrowLongRight } from "react-icons/hi2";

const Manage1 = () => {
  const { stepnumber, stage, date } = useSelector((state) => state.games);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="text-white d-flex flex-column justify-content-center align-items-center text-center">
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
          <img
            src={StartLogo}
            alt="Illustration"
            className="img-fluid mt-0"
            style={{ maxHeight: "250px" }}
          />
        </div>

        <div className="voice-of-truth-content">
          <h2 className="fw-bold my-4">Voice of Truth</h2>
          <p className="mt-2 px-3 px-md-5 h6 fw-semibold d-flex align-items-center gap-2">
            Athletes learn how the words they choose <HiMiniArrowLongRight className="h5 mb-0" /> internally and externally <HiMiniArrowLongRight className="h5 mb-0" />
            shape confidence, focus, and team energy.
          </p>
        </div>

        <button className="btn green-btn" onClick={() => {
          dispatch(startGame({ data: 0 }));
        }}>Start Game</button>

        <a
          href="#"
          className="text-white-50 mt-3 d-flex text-decoration-underline h6 align-items-center gap-2"
        >
          How it Works
          <FaArrowRight />
        </a>
      </div>
    </div>
  );
};

export default Manage1;
