import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVictoryVoiceRequest, getVictoryVoiceNegativeData } from "../../../../../redux/slice/GamesSlice";
import { toast } from "react-toastify";
import StepsProgress from "../StepsProgress";
import StepThreeImg from "../../../../../assets/image/png/StepThreeImg.png"

const Step3 = () => {
    const { levelnumber, stepnumber, gameId, negativeData, stage, levelNumber, stageNumber, stepNumber } = useSelector((state) => state.games);
    const dispatch = useDispatch();
    const [selectedThoughts, setSelectedThoughts] = useState([]);
    useEffect(() => {
        dispatch(getVictoryVoiceNegativeData());
    }, [dispatch]);

    const handleSelect = (id) => {
        setSelectedThoughts((prev) =>
            prev.includes(id) ?
                prev.filter((thoughtId) => thoughtId !== id) :
                prev.length < 3 ? [...prev, id] : prev
        );
    };

    const handleNext = async () => {
        if (selectedThoughts.length !== 3) {
            toast.error("Please Select any 3 negative thoughts!!", { toastId: 'selecterrth', autoClose: 2000 });
            return;
        }

        const data = {
            currentLevel: levelNumber,
            step: stepNumber + 1,
            negative_thoughts: selectedThoughts,
            id: gameId,
            stage: stageNumber
        };
        dispatch(createVictoryVoiceRequest(data));
    };

    return (
        <div>
            <div className="position-relative step-one-main-div-wrap">
                <StepsProgress />
                <div className="belief-container">
                    <h2 className="belief-title h2 fw-bold text-white mt-5 mb-4">Track 3 negative thoughts</h2>
                    <div className="belief-options">
                        {negativeData.map((option) => (
                            <button
                                key={option._id}
                                onClick={() => handleSelect(option._id)}
                                className={`belief-btn ${selectedThoughts.includes(option._id) ? 'active' : ''}`}
                            >
                                {option.thoughts}
                            </button>
                        ))}
                    </div>

                    <div className="Steps-two-img-wrap for-mobile-img d-lg-none d-block">
                        <img src={StepThreeImg} alt="StepOneImg" className="img-fluid" />
                    </div>

                    <button className="green-btn d-flex ms-auto" onClick={handleNext}>
                        Next
                    </button>
                </div>

                <div className="Steps-two-img-wrap for-desktop-img d-lg-block d-none">
                    <img src={StepThreeImg} alt="StepOneImg" className="img-fluid" />
                </div>
            </div>
        </div>
    )
};

export default Step3;