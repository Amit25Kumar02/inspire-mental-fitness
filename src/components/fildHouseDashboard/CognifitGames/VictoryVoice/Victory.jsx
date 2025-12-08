import React from "react";

const Victory = ({ defaultImg, level, nextLevel }) => {
    return (
        <div className="finished">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-md-6">
                        <div className="congratulations-img">
                            <img src={defaultImg} alt="CompleteLavelOne" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="belief-container-wrap mt-5">
                            <h1 className="belief-title h1 fw-bold text-white">Congratulations!</h1>
                            <h4 className="text-success h6 text-white">You have Completed Level{level}</h4>
                        </div>
                        {nextLevel && <h3 className="text-white">Your have unlocked <span className="fw-bold">“{nextLevel}”</span> level</h3>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Victory;