import React, { useEffect } from "react";
import Manage3 from "./Manage3";
import { useDispatch, useSelector } from "react-redux";
import { getLevel2Status, getQuestionsData } from "../../../../../redux/slice/GamesSlice";
import StepList from "./StepList";
import StageCompleted from "../StageCompleted";
import ManageSteps from "./ManageSteps";
import Level3Img from '../../../../../assets/image/png/game1-level3.png';
import Victory from "../Victory";

const Level3Home = () => {
    const { start3, startstep, level3Data, level3Date1, level3Date2, level3Date3, level3Date4, level3Date5, level3Date6 } = useSelector((state) => state.games);
    const dispatch = useDispatch();
    const formatDate = (d) => {
        if (!d) return null;
        const parsed = new Date(d);
        if (isNaN(parsed)) return null;
        return parsed.toLocaleDateString("en-CA");
    };
    const date1 = formatDate(level3Date1);
    const date2 = formatDate(level3Date2);
    const date3 = formatDate(level3Date3);
    const date4 = formatDate(level3Date4);
    const date5 = formatDate(level3Date5);
    const date6 = formatDate(level3Date6);
    const today = formatDate(new Date());

    useEffect(() => {
        dispatch(getQuestionsData());
        dispatch(getLevel2Status());
    }, []);

    // console.log(startstep, date6)

    return (
        <div>
            {
                date1 === today ? (
                    <StageCompleted level={3} number={1} />
                ) : date2 === today ? (
                    <StageCompleted level={3} number={2} />
                ) : date3 === today ? (
                    <StageCompleted level={3} number={3} />
                ) : date4 === today ? (
                    <StageCompleted level={3} number={4} />
                ) : date5 === today ? (
                    <StageCompleted level={3} number={5} />
                ) : (date6 === today || date6) ? (
                    <Victory defaultImg={Level3Img} level={3} nextLevel={"Calm in Chaos"} />
                ) : (
                    (
                        (!date1 && level3Data.some((item) => item.day === 1)) ||
                        (!date2 && level3Data.some((item) => item.day === 2)) ||
                        (!date3 && level3Data.some((item) => item.day === 3)) ||
                        (!date4 && level3Data.some((item) => item.day === 4)) ||
                        (!date5 && level3Data.some((item) => item.day === 5)) ||
                        (!date6 && level3Data.some((item) => item.day === 6)) ||
                        start3
                    ) ? (
                        startstep ? <ManageSteps /> : <StepList />
                    ) : (
                        <Manage3 />
                    )
                )
            }
        </div>
    );
};

export default Level3Home;