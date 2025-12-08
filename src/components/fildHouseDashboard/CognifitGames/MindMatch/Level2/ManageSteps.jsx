import React from "react";
import { useSelector } from "react-redux";
import DefaultImg from "../../../../../assets/image/png/game2-level1.png";
import OtherSteps from "./OtherSteps";
import { AVATARS } from "../../../../../assets/mindmatchavatars";


const ManageSteps = () => {
    const { level2Step, activeDayLevel2, level2Day1, level2Day2, level2Day3 } = useSelector((state) => state.game2);
      const randomImages = [ AVATARS.LEVEL9IMG6, AVATARS.LEVEL9IMG1, AVATARS.LEVEL9IMG5, AVATARS.LEVEL9IMG7,AVATARS.LEVEL9IMG3, AVATARS.LEVEL9IMG2 , AVATARS.LEVEL9IMG4 , AVATARS.LEVEL9IMG9 , AVATARS.LEVEL9IMG8] ;
           const defaultImg = AVATARS.LEVEL9IMG1;
    
    return (
        <div>
            <OtherSteps
                data={
                    activeDayLevel2 === 1 ? level2Day1[level2Step - 1] :
                        activeDayLevel2 === 2 ? level2Day2[level2Step - 1] :
                            activeDayLevel2 === 3 ? level2Day3[level2Step - 1] :
                                level2Day3[level2Step - 1]
                }
            defaultImg={level2Step === 1 ? defaultImg : [randomImages[(level2Step - 2) % randomImages.length]]}
            
            />
        </div>
    )
};

export default ManageSteps;