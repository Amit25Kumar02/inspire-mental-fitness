import React, { useState } from "react";
import CompleteLevelOne from "../../../../assets/image/png/completeLavel1.png";
import Rank from "./Rank";

const Victory = ({ level, nextLevel, levelImage }) => {

const [showRank , setShowRank] = useState(true);
console.log("show rank is ===>",showRank)
    return (
        <div className="finished">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-md-6">
                        <div className="">
                            <img src={CompleteLevelOne} alt="CompleteLavelOne" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="belief-container-wrap mt-5">
                            <h1 className="belief-title h1 fw-bold">Congratulations!</h1>
                            <h4 className="text-success h6">You have Completed Level {level}</h4>
                        </div>
                       { nextLevel && <h3 className="">You have unlocked <span className="fw-bold">{nextLevel}</span> level</h3>}
                    </div>
                </div>
            </div>

       
      {showRank && < Rank setShowRank={setShowRank}/>}
        </div>
    );
};

export default Victory;