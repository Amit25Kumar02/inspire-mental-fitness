import React from "react";
import { useSelector } from "react-redux";
import DefaultImg from "../../../../../assets/image/png/game2-level1.png";
import OtherSteps from "./OtherSteps";
import { AVATARS } from "../../../../../assets/mindmatchavatars";

const ManageSteps = () => {
    const { level10Step, activeDayLevel10, level10Day1, level10Day2, level10Day3, level10Day4, level10Day5 ,level10Day6 } = useSelector((state) => state.game2);
    console.log("step====>",level10Day3);
         const randomImages = [ AVATARS.LEVEL9IMG6, AVATARS.LEVEL9IMG2, AVATARS.LEVEL9IMG4, AVATARS.LEVEL9IMG9,AVATARS.LEVEL9IMG8, AVATARS.LEVEL9IMG5 , AVATARS.LEVEL9IMG1 , AVATARS.LEVEL9IMG3 , AVATARS.LEVEL9IMG7] ;
           const defaultImg = AVATARS.LEVEL9IMG6;
    
    return (
        <div>
            <OtherSteps
                data={
                    activeDayLevel10 === 1 ? level10Day1[level10Step - 1] :
                        activeDayLevel10 === 2 ? level10Day2[level10Step - 1] :
                            activeDayLevel10 === 3 ? level10Day3[level10Step - 1] :
                                activeDayLevel10 === 4 ? level10Day4[level10Step - 1] :
                                    activeDayLevel10 === 5 ? level10Day5[level10Step - 1] :
                                     activeDayLevel10 === 6 ? level10Day6[level10Step - 1] :
                                        level10Day6[level10Step - 1]
                }
                 defaultImg={level10Step === 1 ? defaultImg : [randomImages[(level10Step - 2) % randomImages.length]]}
            />
        </div>
    )
};

export default ManageSteps;