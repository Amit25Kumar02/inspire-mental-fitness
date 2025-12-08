import React from "react";
import { useSelector } from "react-redux";

const StepsProgress = () => {
    const { stepnumber, levelNumber, stageNumber, stepNumber, } = useSelector((state) => state.games);
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center gap-3">
                    <p className="step-text m-0 fw-semibold text-white">Step</p>
                    <div className="step-progress flex-grow-1 mx-2" style={{ height: "8px", background: "#FFFFFF80", borderRadius: "4px", overflow: "hidden" }}>
                        <div
                            className="step-progress-bar"
                            style={{
                                width: `${((stepNumber+1) / 7) * 100}%`,
                                background: "#F5DB7D",
                                height: "100%"
                            }}
                        />
                    </div>
                    <p className="step-text m-0 fw-semibold text-white">{stepNumber+1}/7</p>
                </div>
        </div>
    )
};

export default StepsProgress;