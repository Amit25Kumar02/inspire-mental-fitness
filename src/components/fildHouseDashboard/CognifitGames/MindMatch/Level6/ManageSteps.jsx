import React from "react";
import { useSelector } from "react-redux";
import DefaultImg from "../../../../../assets/image/png/game2-level1.png";
import OtherSteps from "./OtherSteps";
import { AVATARS } from "../../../../../assets/mindmatchavatars";

const ManageSteps = () => {
    const { level6Step, activeDayLevel6, level6Day1, level6Day2, level6Day3, level6Day4, level6Day5 } = useSelector((state) => state.game2);
    console.log("stage",level6Day3, level6Step);
      const randomImages = [ AVATARS.LEVEL9IMG7, AVATARS.LEVEL9IMG3, AVATARS.LEVEL9IMG6, AVATARS.LEVEL9IMG2,AVATARS.LEVEL9IMG4, AVATARS.LEVEL9IMG8 , AVATARS.LEVEL9IMG9 , AVATARS.LEVEL9IMG1 , AVATARS.LEVEL9IMG10] ;
           const defaultImg = AVATARS.LEVEL9IMG1;

    return (
        <div>
            <OtherSteps
                data={
                    activeDayLevel6 === 1 ? level6Day1[level6Step - 1] :
                        activeDayLevel6 === 2 ? level6Day2[level6Step - 1] :
                            activeDayLevel6 === 3 ? level6Day3[level6Step - 1] :
                                activeDayLevel6 === 4 ? level6Day4[level6Step - 1] :
                                    activeDayLevel6 === 5 ? level6Day5[level6Step - 1] :
                                        level6Day5[level6Step - 1]
                }
                defaultImg={level6Step === 1 ? defaultImg : [randomImages[(level6Step - 2) % randomImages.length]]}
            />
        </div>
    )
};

export default ManageSteps;