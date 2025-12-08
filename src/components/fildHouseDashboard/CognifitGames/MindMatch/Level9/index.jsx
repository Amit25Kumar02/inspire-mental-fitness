import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ManageSteps from "./ManageSteps";
import Victory from "../Victory";
import StageCompleted from "../StageCompleted";

const Level9 = () => {
    const { level9Data, level9Date1, level9Date2, level9Date3, level9Date4, level9Date5 ,level9Date6} = useSelector((state) => state.game2);
    const dispatch = useDispatch();
    const formatDate = (d) => {
        if (!d) return null;
        const parsed = new Date(d);
        if (isNaN(parsed)) return null;
        return parsed.toLocaleDateString("en-CA");
    };
    const date1 = formatDate(level9Date1);
    const date2 = formatDate(level9Date2);
    const date3 = formatDate(level9Date3);
    const date4 = formatDate(level9Date4);
    const date5 = formatDate(level9Date5);
     const date6 = formatDate(level9Date6);
    const today = formatDate(new Date());
    

    return (
        <div>
            {
                date1 === today ? (
                    <StageCompleted level={9} number={1} />
                ) : date2 === today ? (
                    <StageCompleted level={9} number={2} />
                ) : date3 === today ? (
                    <StageCompleted level={9} number={3} />
                ) : date4 === today ? (
                    <StageCompleted level={9} number={4} />
                ) : date5 === today ?(
                    <StageCompleted level={9} number={5}/>
                )
                : date6 === today ? (
                    <Victory level={9} nextLevel={"The Spiral + Critic + Freeze"} />
                ) : (
                    (
                        (!date1 && level9Data.some((item) => item.day === 1)) ||
                        (!date2 && level9Data.some((item) => item.day === 2)) ||
                        (!date3 && level9Data.some((item) => item.day === 3)) ||
                        (!date4 && level9Data.some((item) => item.day === 4)) ||
                        (!date5 && level9Data.some((item) => item.day === 5))  ||
                          (!date6 && level9Data.some((item) => item.day === 6))
                    ) ? (
                        <ManageSteps />
                    ) : (
                        <ManageSteps />
                    )
                )
            }
        </div>
    )
};

export default Level9;