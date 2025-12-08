import React from "react";
import { useSelector } from "react-redux";
import DefaultImg from "../../../../../assets/image/png/game2-level1.png";
import OtherSteps from "./OtherSteps";
import { AVATARS } from "../../../../../assets/mindmatchavatars";

const ManageSteps = () => {
    const { level3Step, activeDayLevel3, level3Day1, level3Day2, level3Day3 } = useSelector((state) => state.game2);
     const randomImages = [ AVATARS.LEVEL9IMG8, AVATARS.LEVEL9IMG9, AVATARS.LEVEL9IMG4, AVATARS.LEVEL9IMG1,AVATARS.LEVEL9IMG6, AVATARS.LEVEL9IMG3 , AVATARS.LEVEL9IMG7 , AVATARS.LEVEL9IMG10 , AVATARS.LEVEL9IMG2] ;
           const defaultImg = AVATARS.LEVEL9IMG1;
    
    return (
        <div>
            <OtherSteps
                data={
                    activeDayLevel3 === 1 ? level3Day1[level3Step - 1] :
                        activeDayLevel3 === 2 ? level3Day2[level3Step - 1] :
                            activeDayLevel3 === 3 ? level3Day3[level3Step - 1] :
                                level3Day3[level3Step - 1]
                }
               defaultImg={level3Step === 1 ? defaultImg : [randomImages[(level3Step - 2) % randomImages.length]]}
            />
        </div>
    )
};

export default ManageSteps;