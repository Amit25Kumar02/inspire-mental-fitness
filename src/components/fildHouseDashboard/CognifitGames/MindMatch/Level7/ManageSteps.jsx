import React from "react";
import { useSelector } from "react-redux";
import DefaultImg from "../../../../../assets/image/png/game2-level1.png";
import OtherSteps from "./OtherSteps";
import { AVATARS } from "../../../../../assets/mindmatchavatars";

const ManageSteps = () => {
    const { level7Step, activeDayLevel7, level7Day1, level7Day2, level7Day3, level7Day4, level7Day5 ,level7Day6 } = useSelector((state) => state.game2);
    console.log("step====>",level7Day3);
    const randomImages = [ AVATARS.LEVEL9IMG2, AVATARS.LEVEL9IMG1, AVATARS.LEVEL9IMG5, AVATARS.LEVEL9IMG7,AVATARS.LEVEL9IMG3, AVATARS.LEVEL9IMG6 , AVATARS.LEVEL9IMG4 , AVATARS.LEVEL9IMG9 , AVATARS.LEVEL9IMG10] ;
           const defaultImg = AVATARS.LEVEL9IMG1;

    return (
        <div>
            <OtherSteps
                data={
                    activeDayLevel7 === 1 ? level7Day1[level7Step - 1] :
                        activeDayLevel7 === 2 ? level7Day2[level7Step - 1] :
                            activeDayLevel7 === 3 ? level7Day3[level7Step - 1] :
                                activeDayLevel7 === 4 ? level7Day4[level7Step - 1] :
                                    activeDayLevel7 === 5 ? level7Day5[level7Step - 1] :
                                    activeDayLevel7 === 6 ? level7Day6[level7Step-1]:
                                        level7Day6[level7Step - 1]
                }
         defaultImg={level7Step === 1 ? defaultImg : [randomImages[(level7Step - 2) % randomImages.length]]}
            />
        </div>
    )
};

export default ManageSteps;