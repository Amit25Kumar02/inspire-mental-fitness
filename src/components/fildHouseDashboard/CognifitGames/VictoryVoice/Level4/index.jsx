import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLevel2Status, getQuestions, getQuestionsData } from "../../../../../redux/slice/GamesSlice";
import StageCompleted from "../StageCompleted";
import ManageSteps from "./ManageSteps";
import Manage4 from "./Manage4";
import Level4Img from "../../../../../assets/image/png/game1-level4.png";
import Victory from "../Victory";

const Level4Home = () => {
    const { start4, level4Step, activeDayLevel4, level4Data, level4Date1, level4Date2, level4Date3, level4Date4, level4Date5 } = useSelector((state) => state.games);
    const dispatch = useDispatch();
    const formatDate = (d) => {
        if (!d) return null;
        const parsed = new Date(d);
        if (isNaN(parsed)) return null;
        return parsed.toLocaleDateString("en-CA");
    };
    const date1 = formatDate(level4Date1);
    const date2 = formatDate(level4Date2);
    const date3 = formatDate(level4Date3);
    const date4 = formatDate(level4Date4);
    const date5 = formatDate(level4Date5);
    const today = formatDate(new Date());

    useEffect(() => {
        dispatch(getQuestionsData());
        dispatch(getLevel2Status());
    }, []);

    //console.log("start step ---->", startstep, level3Data, activeDayLevel3);
    //console.log(level3Step, level3Date1, start3, (!date1 && level3Data.some((item) => item.day === 1)));

    return (
        <div>
            {
                date1 === today ? (
                    <StageCompleted level={4} number={1} />
                ) : date2 === today ? (
                    <StageCompleted level={4} number={2} />
                ) : date3 === today ? (
                    <StageCompleted level={4} number={3} />
                ) : date4 === today ? (
                    <StageCompleted level={4} number={4} />
                ) : (date5 === today || date5) ? (
                    <Victory defaultImg={Level4Img} level={4} nextLevel={"Lead with Light"} />
                ) : (
                    (
                        (!date1 && level4Data.some((item) => item.day === 1)) ||
                        (!date2 && level4Data.some((item) => item.day === 2)) ||
                        (!date3 && level4Data.some((item) => item.day === 3)) ||
                        (!date4 && level4Data.some((item) => item.day === 4)) ||
                        (!date5 && level4Data.some((item) => item.day === 5)) ||
                         start4
                    ) ? (
                         <ManageSteps />
                    ) : (
                        <Manage4 />
                    )
                )
            }
        </div>
    );
};

export default Level4Home;