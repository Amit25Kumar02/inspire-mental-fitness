import React, { useEffect } from "react";
import Manage2 from "./Manage2";
import { useDispatch, useSelector } from "react-redux";
import { getLevel2Status, getQuestionsData } from "../../../../../redux/slice/GamesSlice";
import ManageSteps from "./ManageSteps";
import StageCompleted from "../StageCompleted";
import Level2Img from '../../../../../assets/image/png/game1-level2.png';
import Victory from "../Victory";

const Level2Home = () => {
    const { startNow, level2Data, level2Date1, level2Date2, level2Date3 } = useSelector((state) => state.games);
    const dispatch = useDispatch();
    const formatDate = (d) => {
        if (!d) return null;
        const parsed = new Date(d);
        if (isNaN(parsed)) return null;
        return parsed.toLocaleDateString("en-CA");
    };
    const date1 = formatDate(level2Date1);
    const date2 = formatDate(level2Date2);
    const date3 = formatDate(level2Date3);
    const today = formatDate(new Date());

    useEffect(() => {
        dispatch(getQuestionsData());
        dispatch(getLevel2Status());
    }, []);

    return (
        <div>
            {
                date1 === today ? (
                    <StageCompleted level={2} number={1} />
                ) : date2 === today ? (
                    <StageCompleted level={2} number={2} />
                ) : (date3 === today || date3) ? (
                    <Victory defaultImg={Level2Img} level={2} nextLevel={"The Confidence"} />
                ) : (
                    (
                        (!date1 && level2Data.some((item) => item.day === 1)) ||
                        (!date2 && level2Data.some((item) => item.day === 2)) ||
                        (!date3 && level2Data.some((item) => item.day === 3)) ||
                        startNow
                    ) ? (
                        <ManageSteps />
                    ) : (
                        <Manage2 />
                    )
                )
            }
        </div>
    );
};

export default Level2Home;