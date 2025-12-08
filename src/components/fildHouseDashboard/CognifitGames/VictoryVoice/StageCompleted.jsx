import React from "react";

const StageCompleted = ({level,number}) => {
    
    return (
        <div className="container-xxl text-white d-flex flex-column justify-content-center align-items-center text-center p-3">
          <div className="voice-of-truth-content">
            <h2 className="fw-bold mt-4">Congratulations!</h2>
            <p className="lead mt-2 px-3 px-md-5 text-center">
              Your have completed the <strong>Day {number} </strong> 
               of <strong>Level {level}</strong> all scenarios. 
              Please come back tomorrow to complete <strong>Day {number+1}</strong> scenarios. 
            </p>
          </div>
        </div>
    );
};

export default StageCompleted;