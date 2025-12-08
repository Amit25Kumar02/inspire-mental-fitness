import React from "react";
import { useSelector } from "react-redux";

const Progress = ({step, totalSteps}) => {
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center gap-3">
                    <p className="step-text m-0 fw-semibold">Step</p>
                    <div className="step-progress flex-grow-1 mx-2" style={{ height: "8px", background: "lightgrey", borderRadius: "4px", overflow: "hidden" }}>
                        <div
                            className="step-progress-bar"
                            style={{
                                width: `${((step) / totalSteps) * 100}%`,
                                background:"#0C72B9",
                                height: "100%"
                            }}
                        />
                    </div>
                    <p className="step-text m-0 fw-semibold">{step}/{totalSteps}</p>
                </div>
        </div>
    )
};

export default Progress;