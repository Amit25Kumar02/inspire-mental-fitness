import React from "react";
import { useSelector } from "react-redux";

const Progress5 = ({step}) => {
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center gap-3">
                    <p className="step-text m-0 fw-semibold text-white">Step</p>
                    <div className="step-progress flex-grow-1 mx-2" style={{ height: "8px", background: "#FFFFFF80", borderRadius: "4px", overflow: "hidden" }}>
                        <div
                            className="step-progress-bar"
                            style={{
                                width: `${((step) / 20) * 100}%`,
                                background: "#F5DB7D",
                                height: "100%"
                            }}
                        />
                    </div>
                    <p className="step-text m-0 fw-semibold text-white">{step}/20</p>
                </div>
        </div>
    )
};

export default Progress5;