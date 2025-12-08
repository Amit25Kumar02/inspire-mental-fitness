import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ManageSteps from "./ManageSteps";
import Victory from "../Victory";
import StageCompleted from "../StageCompleted";

const Level10 = () => {
    const { level10Data, level10Date1, level10Date2, level10Date3, level10Date4, level10Date5 ,level10Date6} = useSelector((state) => state.game2);
    const dispatch = useDispatch();
    const formatDate = (d) => {
        if (!d) return null;
        const parsed = new Date(d);
        if (isNaN(parsed)) return null;
        return parsed.toLocaleDateString("en-CA");
    };
    const date1 = formatDate(level10Date1);
    const date2 = formatDate(level10Date2);
    const date3 = formatDate(level10Date3);
    const date4 = formatDate(level10Date4);
    const date5 = formatDate(level10Date5);
     const date6 = formatDate(level10Date6);
    const today = formatDate(new Date());
    

    return (
        <div>
            {
                date1 === today ? (
                    <StageCompleted level={10} number={1} />
                ) : date2 === today ? (
                    <StageCompleted level={10} number={2} />
                ) : date3 === today ? (
                    <StageCompleted level={10} number={3} />
                ) : date4 === today ? (
                    <StageCompleted level={10} number={4} />
                ) : date5 === today ?(
                    <StageCompleted level={10} number={5}/>
                )
                : date6 === today ? (
                    <Victory level={10}  />
                ) : (
                    (
                        (!date1 && level10Data.some((item) => item.day === 1)) ||
                        (!date2 && level10Data.some((item) => item.day === 2)) ||
                        (!date3 && level10Data.some((item) => item.day === 3)) ||
                        (!date4 && level10Data.some((item) => item.day === 4)) ||
                        (!date5 && level10Data.some((item) => item.day === 5))  ||
                          (!date6 && level10Data.some((item) => item.day === 6))
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

export default Level10;