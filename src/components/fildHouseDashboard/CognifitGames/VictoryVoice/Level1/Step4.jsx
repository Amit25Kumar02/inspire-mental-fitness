import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVictoryVoiceRequest, getVictoryVoicePositiveData } from "../../../../../redux/slice/GamesSlice";
import { toast } from "react-toastify";
import StepsProgress from "../StepsProgress";
import { FaArrowRight } from "react-icons/fa6";
import StepFourImg from "../../../../../assets/image/png/StepFourImg.png"

const Step4 = () => {
    const { levelnumber, stepnumber, gameId, negativeIds, positiveData, stage, levelNumber, stageNumber, stepNumber } = useSelector((state) => state.games);
    const dispatch = useDispatch();
    const [selectedPositive, setSelectedPositive] = useState({});
    const handleSelect = (negId, posId) => {
        setSelectedPositive((prev) => ({
            ...prev,
            [negId]: posId,
        }));
    };

    const handleNext = async () => {
        const ids = Object.values(selectedPositive);
        if (ids.length < 3) {
            toast.error("Please Select any 3 positive thoughts!!", { toastId: 'positiveerr', autoClose: 2000 });
            return;
        }

        const payloaddata = {
            currentLevel: levelNumber,
            step: stepNumber + 1,
            positive_thoughts: ids,
            id: gameId,
            stage: stageNumber
        };
        dispatch(createVictoryVoiceRequest(payloaddata));
    };

    useEffect(() => {
        dispatch(getVictoryVoicePositiveData({
            ids: negativeIds.map((itm) => itm._id)
        }));
    }, [dispatch, negativeIds]);

    return (
        <div>
            <div className="position-relative step-one-main-div-wrap">
                <StepsProgress />
                <div className="belief-container">
                    <h2 className="belief-title h2 fw-bold text-white mt-5 mb-4">
                        Reframe to Positive Thoughts
                    </h2>
                    {negativeIds.map((neg) => (
                        <div
                            key={neg._id}
                            className="reframe-positive-thoughts-grid mb-4"
                        >

                            <div className="text-white h6 text-start" style={{ minWidth: "250px" }}>
                                "{neg.thoughts}"
                            </div>

                            <div className="points-arrow-wrap">
                                <span>
                                    <FaArrowRight />
                                </span>
                            </div>

                            <div className="belief-options justify-content-start">
                                {positiveData[neg._id]?.map((pos, idx) => (
                                    <button
                                        key={idx}
                                        className={`belief-btn text-start w-100 ${selectedPositive[neg._id] === pos._id ? "active" : ""}`}
                                        // style={{ minWidth: "350px" }}
                                        onClick={() => handleSelect(neg._id, pos._id)}
                                    >
                                        {pos.thoughts}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="Steps-two-img-wrap for-mobile-img d-lg-none d-block">
                        <img src={StepFourImg} alt="StepOneImg" className="img-fluid" />
                    </div>
                    <button className="green-btn d-flex ms-auto" onClick={handleNext}>Next</button>
                </div>
                <div className="Steps-two-img-wrap for-desktop-img d-lg-block d-none">
                    <img src={StepFourImg} alt="StepOneImg" className="img-fluid" />
                </div>
            </div>
        </div>
    )
};

export default Step4;