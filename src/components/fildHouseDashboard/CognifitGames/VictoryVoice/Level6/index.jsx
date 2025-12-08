import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLevel2Status, getQuestionsData } from "../../../../../redux/slice/GamesSlice";
import StageCompleted from "../StageCompleted";
import ManageSteps from "./ManageSteps";
import Manage6 from "./Manage6";
import Level6Img from '../../.../../../../../assets/image/png/game1-level6.png';
import Victory from "../Victory";

const Level6Home = () => {
    const { start6, level6Data, level6Date1, level6Date2, level6Date3, level6Date4, level6Date5 } = useSelector((state) => state.games);
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

    useEffect(() => {
        dispatch(getQuestionsData());
        dispatch(getLevel2Status());
    }, []);

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
                ) : (date5 === today || date5) ? (
                    <Victory defaultImg={Level6Img} level={6} />
                ) : (
                    (
                        (!date1 && level6Data.some((item) => item.day === 1)) ||
                        (!date2 && level6Data.some((item) => item.day === 2)) ||
                        (!date3 && level6Data.some((item) => item.day === 3)) ||
                        (!date4 && level6Data.some((item) => item.day === 4)) ||
                        (!date5 && level6Data.some((item) => item.day === 5)) ||
                         start6
                    ) ? (
                         <ManageSteps />
                    ) : (
                        <Manage6 />
                    )
                )
            }
        </div>
    );
};

export default Level6Home;