import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createVictoryVoiceRequest } from "../../../../../redux/slice/GamesSlice";
import StepsProgress from "../StepsProgress";
import StepOneImg from "../../../../../assets/image/png/steponeimg.png";
import HappinessIcon from "../../../../../assets/image/png/Happiness.png";
import ProudIcon from "../../../../../assets/image/png/proud.png";
import SadIcon from "../../../../../assets/image/png/sad.png";
import FearIcon from "../../../../../assets/image/png/fear.png";
import EmbarrassmentIcon from "../../../../../assets/image/png/Embarrassment.png";
import ThinkIcon from "../../../../../assets/image/png/think.png";
import AngryIcon from "../../../../../assets/image/png/angry.png";
import UpsetIcon from "../../../../../assets/image/png/upset.png";

const Step1 = () => {
    const { levelnumber, stepnumber, stage, levelNumber, stageNumber, stepNumber, gameData } = useSelector((state) => state.games);
    const [emoji, setEmoji] = useState("");
    const dispatch = useDispatch();
    // const emojis = [
    //     { label: "Happiness", icon: "😀" },
    //     { label: "Proud", icon: "😎" },
    //     { label: "Sadness", icon: "😢" },
    //     { label: "Fear", icon: "😨" },
    //     { label: "Embarrassment", icon: "😳" },
    //     { label: "Worry", icon: "😟" },
    //     { label: "Anger", icon: "😡" },
    //     { label: "Upset", icon: "😞" },
    // ];

    const emojis = [
        { label: "Happiness", icon: HappinessIcon },
        { label: "Proud", icon: ProudIcon },
        { label: "Sadness", icon: SadIcon },
        { label: "Fear", icon: FearIcon },
        { label: "Embarrassment", icon: EmbarrassmentIcon },
        { label: "Worry", icon: ThinkIcon },
        { label: "Anger", icon: AngryIcon },
        { label: "Upset", icon: UpsetIcon },
    ];

    const handleNext = async () => {
        console.log("jgrtrt5r5rt65", typeof emoji);

        if (!emoji || emoji.trim() === "") {
            toast.error("Please select a feeling!!", { toastId: 'emojierr', autoClose: 2000 });
            return;
        }

        const data = {
            currentLevel: levelNumber,
            step: 1,
            emotions: emoji,
            stage: gameData?.step === 7 ? stageNumber + 1 : stageNumber
        };

        // console.log("submitted data ====>", data);
        dispatch(createVictoryVoiceRequest(data));
    };

    return (
        <div className="">
            <div className="step-one-main-div-wrap">
                <StepsProgress />
                <h2 className="question victory-voice-questions h2 fw-bold text-white mt-5 mb-4">How are you feeling?</h2>
                <div className="emoji-container-wrap">
                    <div className="emoji-container">
                        {emojis.map((e, i) => (
                            <button key={i} className={`emoji-btn ${emoji === e.label ? 'emoji-selected' : ''}`} onClick={() => setEmoji(e.label)}>
                                <div className="question-emoji-wrap">
                                    {/* <span className="emoji">{e.icon}</span> */}
                                    <img src={e.icon} alt={e.label} width={40} height={40} />
                                </div>
                                <p>{e.label}</p>
                            </button>
                        ))}
                    </div>
                    <div className="Steps-two-img-wrap for-mobile-img d-lg-none d-block">
                        <img src={StepOneImg} alt="StepOneImg" className="img-fluid" />
                    </div>
                    <button className="btn green-btn d-flex ms-auto" onClick={handleNext}>
                        Next
                    </button>
                </div>

                <div className="Steps-two-img-wrap for-desktop-img d-lg-block d-none">
                    <img src={StepOneImg} alt="StepOneImg" className="img-fluid" />
                </div>
            </div>
        </div>
    )
};

export default Step1;