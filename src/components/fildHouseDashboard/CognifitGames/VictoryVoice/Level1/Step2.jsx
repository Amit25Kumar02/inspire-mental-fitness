import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVictoryVoiceRequest } from "../../../../../redux/slice/GamesSlice";
import { toast } from "react-toastify";
import StepsProgress from "../StepsProgress";
import StepTwoImg from "../../../../../assets/image/png/StepTwoImg.png"

const Step2 = () => {
    const { levelnumber, stepnumber, gameId, stage, levelNumber, stageNumber, stepNumber } = useSelector((state) => state.games);
    const [selected, setSelected] = useState("");
    const dispatch = useDispatch();
    const beliefOptions = [
        { label: "option1", text: "I am focused and ready" },
        { label: "option2", text: "I perform well under pressure" },
        { label: "option3", text: "I am in control of my emotions" },
        { label: "option4", text: "I bounce back quickly from mistakes" },
        { label: "option5", text: "I believe in my ability to succeed" },
        { label: "option6", text: "I am a strong and confident teammate" },
        { label: "option7", text: "Every setback is a setup for a comeback" },
    ];

    const handleSelect = (label) => {
        setSelected(label);
    };

    const handleNext = async () => {
        if (selected === "") {
            toast.error("Please Select an option!!", { toastId: 'selecterr', autoClose: 2000 });
            return;
        }

        const data = {
            currentLevel: levelNumber,
            step: stepNumber + 1,
            believe: selected,
            id: gameId,
            stage: stageNumber
        };
        //console.log(data);
        dispatch(createVictoryVoiceRequest(data));
    };

    return (
        <div>
            <div className="position-relative step-one-main-div-wrap">
                <StepsProgress />
                <div className="belief-container">
                    <h2 className="belief-title h2 fw-bold text-white mt-5 mb-4">What do you believe today?</h2>
                    <div className="belief-options">
                        {beliefOptions.map((option) => (
                            <button
                                key={option.label}
                                onClick={() => handleSelect(option.text)}
                                className={`belief-btn ${selected === option.text ? "active" : ""}`}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>

                    <div className="Steps-two-img-wrap for-mobile-img d-lg-none d-block">
                        <img src={StepTwoImg} alt="StepOneImg" className="img-fluid" />
                    </div>

                    <button className="green-btn border-0 ms-auto d-flex" onClick={handleNext}>
                        Next
                    </button>
                </div>

                <div className="Steps-two-img-wrap for-desktop-img d-lg-block d-none">
                    <img src={StepTwoImg} alt="StepOneImg" className="img-fluid" />
                </div>
            </div>
        </div>
    )
};

export default Step2;