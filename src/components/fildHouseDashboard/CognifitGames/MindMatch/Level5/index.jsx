import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ManageSteps from "./ManageSteps";
import Victory from "../Victory";
import StageCompleted from "../StageCompleted";

const Level5 = () => {
    const { level5Data, level5Date1, level5Date2, level5Date3, level5Date4, level5Date5 } = useSelector((state) => state.game2);
    const dispatch = useDispatch();
    const formatDate = (d) => {
        if (!d) return null;
        const parsed = new Date(d);
        if (isNaN(parsed)) return null;
        return parsed.toLocaleDateString("en-CA");
    };
    const date1 = formatDate(level5Date1);
    const date2 = formatDate(level5Date2);
    const date3 = formatDate(level5Date3);
    const date4 = formatDate(level5Date4);
    const date5 = formatDate(level5Date5);
    const today = formatDate(new Date());

    return (
        <div>
            {
                date1 === today ? (
                    <StageCompleted level={5} number={1} />
                ) : date2 === today ? (
                    <StageCompleted level={5} number={2} />
                ) : date3 === today ? (
                    <StageCompleted level={5} number={3} />
                ) : date4 === today ? (
                    <StageCompleted level={5} number={4} />
                ) : date5 === today ? (
                    <Victory level={5} nextLevel={"Mirror"} />
                ) : (
                    (
                        (!date1 && level5Data.some((item) => item.day === 1)) ||
                        (!date2 && level5Data.some((item) => item.day === 2)) ||
                        (!date3 && level5Data.some((item) => item.day === 3)) ||
                        (!date4 && level5Data.some((item) => item.day === 4)) ||
                        (!date5 && level5Data.some((item) => item.day === 5))
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

export default Level5;