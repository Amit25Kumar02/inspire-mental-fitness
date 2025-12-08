import React from "react";
import { useSelector } from "react-redux";
import DefaultImg from "../../../../../assets/image/png/game2-level1.png";
import OtherSteps from "./OtherSteps";
import { AVATARS } from "../../../../../assets/mindmatchavatars";

const ManageSteps = () => {
    const { level5Step, activeDayLevel5, level5Day1, level5Day2, level5Day3, level5Day4, level5Day5 } = useSelector((state) => state.game2);
         const randomImages = [ AVATARS.LEVEL9IMG9, AVATARS.LEVEL9IMG4, AVATARS.LEVEL9IMG2, AVATARS.LEVEL9IMG6,AVATARS.LEVEL9IMG3, AVATARS.LEVEL9IMG7 , AVATARS.LEVEL9IMG1 , AVATARS.LEVEL9IMG10, AVATARS.LEVEL9IMG8] ;
           const defaultImg = AVATARS.LEVEL9IMG1;
    
    return (
        <div>
            <OtherSteps
                data={
                    activeDayLevel5 === 1 ? level5Day1[level5Step - 1] :
                        activeDayLevel5 === 2 ? level5Day2[level5Step - 1] :
                            activeDayLevel5 === 3 ? level5Day3[level5Step - 1] :
                                activeDayLevel5 === 4 ? level5Day4[level5Step - 1] :
                                    activeDayLevel5 === 5 ? level5Day5[level5Step - 1] :
                                        level5Day5[level5Step - 1]
                }
                         defaultImg={level5Step === 1 ? defaultImg : [randomImages[(level5Step - 2) % randomImages.length]]}
            />
        </div>
    )
};

export default ManageSteps;