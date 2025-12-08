import React from "react";
import { useSelector } from "react-redux";
import DefaultImg from "../../../../../assets/image/png/game2-level1.png";
import OtherSteps from "./OtherSteps";
import { AVATARS } from "../../../../../assets/mindmatchavatars";


const ManageSteps = () => {
    const { level1Step, activeDayLevel1, level1Day1, level1Day2, level1Day3 } = useSelector((state) => state.game2);
     const randomImages = [ AVATARS.LEVEL9IMG6, AVATARS.LEVEL9IMG4, AVATARS.LEVEL9IMG2, AVATARS.LEVEL9IMG3,AVATARS.LEVEL9IMG7, AVATARS.LEVEL9IMG5 , AVATARS.LEVEL9IMG8 , AVATARS.LEVEL9IMG10 , AVATARS.LEVEL9IMG1] ;
           const defaultImg = AVATARS.LEVEL9IMG6;
    
    return (
        <div>
            <OtherSteps
                data={
                    activeDayLevel1 === 1 ? level1Day1[level1Step - 1] :
                        activeDayLevel1 === 2 ? level1Day2[level1Step - 1] :
                            activeDayLevel1 === 3 ? level1Day3[level1Step - 1] :
                                level1Day3[level1Step - 1]
                }
               defaultImg={level1Step === 1 ? defaultImg : [randomImages[(level1Step - 2) % randomImages.length]]}
            />
        </div>
    )
};

export default ManageSteps;