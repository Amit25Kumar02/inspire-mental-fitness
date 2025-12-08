import React, { useState } from "react";
import { useSelector } from "react-redux";
import Step7 from "./Step7";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Manage1 from "./Manage1";
import Level1Img from '../../../../../assets/image/png/game-1-level-1.png';
import Victory from "../Victory";
import StageCompleted from "../StageCompleted";

const Level1Home = () => {
    const { date, levelNumber, stageNumber, stepNumber, isLevel1 } = useSelector((state) => state.games);
    const formatDate = (d) => {
        if (!d) return null;
        const parsed = new Date(d);
        if (isNaN(parsed)) return null;
        return parsed.toLocaleDateString("en-CA");
    };
    const reduxDate = formatDate(date);
    const today = formatDate(new Date());
    const steps = [<Step1 />, <Step2 />, <Step3 />, <Step4 />, <Step5 />, <Step6 />, <Step7 />];
    const stepsByStage = {
        1: steps,
        2: steps,
        3: steps,
    };

    return (
        <div>
            {
                (stageNumber === 3 && reduxDate === today) || (isLevel1 === true) ?
                   (<Victory defaultImg={Level1Img} level={1} nextLevel={"Power Words"} /> )
                 : reduxDate && reduxDate === today ? 
                   (<StageCompleted level={1} number={stageNumber} />) 
                   : ((stepNumber === null)) ? 
                   (<Manage1 />) 
                   : (stepsByStage[stageNumber][stepNumber])
            }
        </div>
    )
};

export default Level1Home;