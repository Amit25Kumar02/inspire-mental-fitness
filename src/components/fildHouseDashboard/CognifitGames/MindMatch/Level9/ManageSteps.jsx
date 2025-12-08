import React from "react";
import { useSelector } from "react-redux";
import DefaultImg from "../../../../../assets/image/png/game2-level1.png";
import OtherSteps from "./OtherSteps";
import { AVATARS } from "../../../../../assets/mindmatchavatars";


const ManageSteps = () => {
    const { level9Step, activeDayLevel9, level9Day1, level9Day2, level9Day3, level9Day4, level9Day5 ,level9Day6 } = useSelector((state) => state.game2);
    console.log("step====>",level9Day3);
     const randomImages = [ AVATARS.LEVEL9IMG1, AVATARS.LEVEL9IMG2, AVATARS.LEVEL9IMG3, AVATARS.LEVEL9IMG4,AVATARS.LEVEL9IMG5, AVATARS.LEVEL9IMG6 , AVATARS.LEVEL9IMG7 , AVATARS.LEVEL9IMG8 , AVATARS.LEVEL9IMG9] ;
       const defaultImg = AVATARS.LEVEL9IMG1;
    
    return (
        <div>
            <OtherSteps
                data={
                    activeDayLevel9 === 1 ? level9Day1[level9Step - 1] :
                        activeDayLevel9 === 2 ? level9Day2[level9Step - 1] :
                            activeDayLevel9 === 3 ? level9Day3[level9Step - 1] :
                                activeDayLevel9 === 4 ? level9Day4[level9Step - 1] :
                                    activeDayLevel9 === 5 ? level9Day5[level9Step - 1] :
                                     activeDayLevel9 === 6 ? level9Day6[level9Step - 1] :
                                        level9Day6[level9Step - 1]
                }
               defaultImg={level9Step === 1 ? defaultImg : [randomImages[(level9Step - 2) % randomImages.length]]}
            />
        </div>
    )
};

export default ManageSteps;