import React from "react";
import StartLogo from '../../../../../assets/image/png/echo-growth.png';
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { startLevel6 } from "../../../../../redux/slice/GamesSlice";

const Manage6 = () => {
  const { stepnumber, stage, date } = useSelector((state) => state.games);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="text-white min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">

        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
          <img
            src={StartLogo}
            alt="Illustration"
            className="img-fluid mt-3 mt-md-0"
            style={{ maxHeight: "250px" }}
          />
        </div>

        <div className="voice-of-truth-content">
          <h2 className="fw-bold mt-4">Echo of Growth</h2>
          <p className="lead mt-2 px-3 px-md-5 text-center">
            This level has 50 detailed scenarios, organized by stage, with negative vs. positive responses.
          </p>
        </div>

        <button className="btn green-btn" onClick={() => {
          dispatch(startLevel6(true));
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

export default Manage6;
