import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVictoryVoiceRequest } from "../../../../../redux/slice/GamesSlice";
import StepsProgress from "../StepsProgress";
import StepFiveImg from "../../../../../assets/image/png/StepFiveImg.png";

const Step5 = () => {
    const { levelnumber, stepnumber, gameId, thoughts, stage, levelNumber, stageNumber, stepNumber } = useSelector((state) => state.games);
    const dispatch = useDispatch();
    const handleNext = async () => {
        const payloaddata = {
            currentLevel: levelNumber,
            step: stepNumber+1,
            id: gameId,
            stage: stageNumber
        };
        dispatch(createVictoryVoiceRequest(payloaddata));
    };

    return (
        <div>
            <div className="position-relative step-one-main-div-wrap">
                <StepsProgress />
                <div className="belief-container">
                    <h2 className="belief-title h2 fw-bold text-white mt-5 mb-4">Repeat to reinforce</h2>
                    <div className="repeat-reinforce-container">
                        {thoughts.map((line, idx) => (
                            <p key={idx} className="mb-3 text-center fs-5 text-white">
                                {line?.thoughts}
                            </p>
                        ))}
                    </div>

                    <p className="mt-3 text-center text-white h6 fst-italic">
                        Practice these positive thoughts by repeating them 3 times each day
                    </p>

                    <div className="Steps-two-img-wrap for-mobile-img d-lg-none d-block">
                        <img src={StepFiveImg} alt="StepOneImg" className="img-fluid" />
                    </div>
                    <button className="green-btn d-flex ms-auto" onClick={handleNext}>Next</button>
                </div>
                <div className="Steps-two-img-wrap for-desktop-img d-lg-block d-none">
                    <img src={StepFiveImg} alt="StepOneImg" className="img-fluid" />
                </div>
            </div>
        </div>
    )
};

export default Step5;