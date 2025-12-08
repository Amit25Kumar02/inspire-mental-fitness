import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ManageSteps from "./ManageSteps";
import Victory from "../Victory";
import StageCompleted from "../StageCompleted";

const Level6 = () => {
    const { level6Data, level6Date1, level6Date2, level6Date3, level6Date4, level6Date5 } = useSelector((state) => state.game2);
    const dispatch = useDispatch();
    const formatDate = (d) => {
        if (!d) return null;
        const parsed = new Date(d);
        if (isNaN(parsed)) return null;
        return parsed.toLocaleDateString("en-CA");
    };
    const date1 = formatDate(level6Date1);
    const date2 = formatDate(level6Date2);
    const date3 = formatDate(level6Date3);
    const date4 = formatDate(level6Date4);
    const date5 = formatDate(level6Date5);
    const today = formatDate(new Date());
    

    return (
        <div>
            {
                date1 === today ? (
                    <StageCompleted level={6} number={1} />
                ) : date2 === today ? (
                    <StageCompleted level={6} number={2} />
                ) : date3 === today ? (
                    <StageCompleted level={6} number={3} />
                ) : date4 === today ? (
                    <StageCompleted level={6} number={4} />
                ) : date5 === today ? (
                    <Victory level={6} nextLevel={"Freeze"} />
                ) : (
                    (
                        (!date1 && level6Data.some((item) => item.day === 1)) ||
                        (!date2 && level6Data.some((item) => item.day === 2)) ||
                        (!date3 && level6Data.some((item) => item.day === 3)) ||
                        (!date4 && level6Data.some((item) => item.day === 4)) ||
                        (!date5 && level6Data.some((item) => item.day === 5))
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

export default Level6;