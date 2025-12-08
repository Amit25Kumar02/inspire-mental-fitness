import React from "react";
import { useSelector } from "react-redux";
import DefaultImg from "../../../../../assets/image/png/game2-level1.png";
import OtherSteps from "./OtherSteps";
import { AVATARS } from "../../../../../assets/mindmatchavatars";

const ManageSteps = () => {
    const { level8Step, activeDayLevel8, level8Day1, level8Day2, level8Day3, level8Day4, level8Day5 ,level8Day6 } = useSelector((state) => state.game2);
    console.log("step====>",level8Day3);
    const randomImages = [ AVATARS.LEVEL9IMG9, AVATARS.LEVEL9IMG8, AVATARS.LEVEL9IMG4, AVATARS.LEVEL9IMG2,AVATARS.LEVEL9IMG6, AVATARS.LEVEL9IMG3 , AVATARS.LEVEL9IMG7 , AVATARS.LEVEL9IMG5 , AVATARS.LEVEL9IMG1] ;
           const defaultImg = AVATARS.LEVEL9IMG1;

    return (
        <div>
            <OtherSteps
                data={
                    activeDayLevel8 === 1 ? level8Day1[level8Step - 1] :
                        activeDayLevel8 === 2 ? level8Day2[level8Step - 1] :
                            activeDayLevel8 === 3 ? level8Day3[level8Step - 1] :
                                activeDayLevel8 === 4 ? level8Day4[level8Step - 1] :
                                    activeDayLevel8 === 5 ? level8Day5[level8Step - 1] :
                                     activeDayLevel8 === 6 ? level8Day6[level8Step - 1] :
                                        level8Day6[level8Step - 1]
                }
    defaultImg={level8Step === 1 ? defaultImg : [randomImages[(level8Step - 2) % randomImages.length]]}
            />
        </div>
    )
};

export default ManageSteps;