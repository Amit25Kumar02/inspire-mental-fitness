import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ManageSteps from "./ManageSteps";
import Victory from "../Victory";
import StageCompleted from "../StageCompleted";

const Level8 = () => {
    const { level8Data, level8Date1, level8Date2, level8Date3, level8Date4, level8Date5 ,level8Date6} = useSelector((state) => state.game2);
    const dispatch = useDispatch();
    const formatDate = (d) => {
        if (!d) return null;
        const parsed = new Date(d);
        if (isNaN(parsed)) return null;
        return parsed.toLocaleDateString("en-CA");
    };
    const date1 = formatDate(level8Date1);
    const date2 = formatDate(level8Date2);
    const date3 = formatDate(level8Date3);
    const date4 = formatDate(level8Date4);
    const date5 = formatDate(level8Date5);
     const date6 = formatDate(level8Date6);
    const today = formatDate(new Date());
    

    return (
        <div>
            {
                date1 === today ? (
                    <StageCompleted level={8} number={1} />
                ) : date2 === today ? (
                    <StageCompleted level={8} number={2} />
                ) : date3 === today ? (
                    <StageCompleted level={8} number={3} />
                ) : date4 === today ? (
                    <StageCompleted level={8} number={4} />
                ) : date5 === today ?(
                    <StageCompleted level={8} number={5}/>
                )
                : date6 === today ? (
                    <Victory level={8} nextLevel={"Fog Returns"} />
                ) : (
                    (
                        (!date1 && level8Data.some((item) => item.day === 1)) ||
                        (!date2 && level8Data.some((item) => item.day === 2)) ||
                        (!date3 && level8Data.some((item) => item.day === 3)) ||
                        (!date4 && level8Data.some((item) => item.day === 4)) ||
                        (!date5 && level8Data.some((item) => item.day === 5))  ||
                          (!date6 && level8Data.some((item) => item.day === 6))
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

export default Level8;