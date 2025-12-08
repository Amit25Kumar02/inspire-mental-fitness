import React from "react";
import { useSelector } from "react-redux";
import DefaultImg from "../../../../../assets/image/png/game2-level1.png";
import OtherSteps from "./OtherSteps";
import { AVATARS } from "../../../../../assets/mindmatchavatars";

const ManageSteps = () => {
    const { level4Step, activeDayLevel4, level4Day1, level4Day2, level4Day3, level4Day4 } = useSelector((state) => state.game2);
    const randomImages = [ AVATARS.LEVEL9IMG1, AVATARS.LEVEL9IMG5, AVATARS.LEVEL9IMG7, AVATARS.LEVEL9IMG3,AVATARS.LEVEL9IMG6, AVATARS.LEVEL9IMG2 , AVATARS.LEVEL9IMG10 , AVATARS.LEVEL9IMG4 , AVATARS.LEVEL9IMG9] ;
          const defaultImg = AVATARS.LEVEL9IMG1;
   
    return (
        <div>
            <OtherSteps
                data={
                    activeDayLevel4 === 1 ? level4Day1[level4Step - 1] :
                        activeDayLevel4 === 2 ? level4Day2[level4Step - 1] :
                            activeDayLevel4 === 3 ? level4Day3[level4Step - 1] :
                                activeDayLevel4 === 4 ? level4Day4[level4Step - 1] :
                                    level4Day4[level4Step - 1]
                }
                       defaultImg={level4Step === 1 ? defaultImg : [randomImages[(level4Step - 2) % randomImages.length]]}
            />
        </div>
    )
};

export default ManageSteps;