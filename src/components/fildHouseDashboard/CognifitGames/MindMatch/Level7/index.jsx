import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ManageSteps from "./ManageSteps";
import Victory from "../Victory";
import StageCompleted from "../StageCompleted";

const Level7 = () => {
    const { level7Data, level7Date1, level7Date2, level7Date3, level7Date4, level7Date5,level7Date6} = useSelector((state) => state.game2);
    const dispatch = useDispatch();
    const formatDate = (d) => {
        if (!d) return null;
        const parsed = new Date(d);
        if (isNaN(parsed)) return null;
        return parsed.toLocaleDateString("en-CA");
    };
    const date1 = formatDate(level7Date1);
    const date2 = formatDate(level7Date2);
    const date3 = formatDate(level7Date3);
    const date4 = formatDate(level7Date4);
    const date5 = formatDate(level7Date5);
     const date6 = formatDate(level7Date6);
    const today = formatDate(new Date());
    

    return (
        <div>
            {
                date1 === today ? (
                    <StageCompleted level={7} number={1} />
                ) : date2 === today ? (
                    <StageCompleted level={7} number={2} />
                ) : date3 === today ? (
                    <StageCompleted level={7} number={3} />
                ) : date4 === today ? (
                    <StageCompleted level={7} number={4} />
                ) : date5== today?(
                    <StageCompleted level={7} number={5}/>
                )
                : date6 === today ? (
                    <Victory level={7} nextLevel={"Spiral Returns"} />
                ) : (
                    (
                        (!date1 && level7Data.some((item) => item.day === 1)) ||
                        (!date2 && level7Data.some((item) => item.day === 2)) ||
                        (!date3 && level7Data.some((item) => item.day === 3)) ||
                        (!date4 && level7Data.some((item) => item.day === 4)) ||
                        (!date5 && level7Data.some((item) => item.day === 5)) ||
                        (!date6 && level7Data.some((item) => item.day === 6))
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

export default Level7;