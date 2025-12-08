import React from "react";
import DefaultImg from '../../../../../assets/image/png/default.png';
import { startStep } from "../../../../../redux/slice/GamesSlice";
import { useDispatch, useSelector } from "react-redux";

const StepList = () => {
    const { activeDayLevel3, level3Data, level3Date1, level3Date2, level3Date3, level3Date4, level3Date5, level3Date6 } = useSelector((state) => state.games);
    const dispatch = useDispatch();
    const steps = [
        "Awareness & Basic Mindset",
        "Visualization",
        "Hype Statements",
        "Big Moment Affirmations",
        "Combo Challenges",
        "Final Champion's Moment",
    ];

    return (
        <div className="confidence-steps-wrapper">
            <div className="container-xxl position-relative">
                <div className="row justify-content-lg-center justify-content-end">
                    <div className="col-12 col-lg-6 col-md-8">
                        <h1 className="text-white fw-bold mb-4 ff-gotham-medium">Steps</h1>
                        <ul className="list-unstyled position-relative">
                            {steps.map((step, idx) => (
                                <li className="step-item d-flex justify-content-between align-items-start" key={idx}>
                                    <div className="confidence-steps-list">
                                        <span className={`step-active-circle ${idx + 1 === activeDayLevel3 ? 'active' : ''}`}>
                                        </span>
                                        <span className="confidence-steps-info">
                                            <h6 className="ff-gotham-normal text-upparcase light-white mb-0">
                                                STEP {idx + 1}
                                            </h6>
                                            <h5 className="ff-gotham-medium text-white">{step}</h5>
                                        </span>
                                    </div>
                                    <button
                                        className={
                                            `btn ${(idx + 1 < activeDayLevel3 || idx + 1 === activeDayLevel3) ? 'green-btn' : 'green-btn'}`
                                        }
                                        onClick={() => {
                                            dispatch(startStep(true));
                                            window.scrollTo({ top: 100, behavior: 'smooth' });
                                        }}
                                        disabled={idx + 1 !== activeDayLevel3}
                                    >
                                        {idx + 1 < activeDayLevel3 ? 'Completed' : 'Get Started'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="Steps-Img-wrap">
                    <img
                        src={DefaultImg}
                        alt="Confident"
                        className="img-fluid"
                    />
                </div>
            </div>
        </div>
    )
};

export default StepList;