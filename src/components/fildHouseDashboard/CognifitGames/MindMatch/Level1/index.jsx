import React, { useLayoutEffect } from "react";
import ManageStart from "./ManageStart";
import { useDispatch, useSelector } from "react-redux";
import ManageSteps from "./ManageSteps";
import Victory from "../Victory";
import StageCompleted from "../StageCompleted";
import { getSubmissionData } from "../../../../../redux/slice/Game2Slice";

const Level1 = () => {
  const { startNow, level1Data, level1Date1, level1Date2, level1Date3 } = useSelector((state) => state.game2);
  const dispatch = useDispatch();
  const formatDate = (d) => {
    if (!d) return null;
    const parsed = new Date(d);
    if (isNaN(parsed)) return null;
    return parsed.toLocaleDateString("en-CA");
  };
  const date1 = formatDate(level1Date1);
  const date2 = formatDate(level1Date2);
  const date3 = formatDate(level1Date3);
  const today = formatDate(new Date());

  // console.log("date2", date2, level1Date2);

  // useLayoutEffect(() => {
  //   dispatch(getSubmissionData());
  // }, [dispatch]);
  

  return (
    <div>
      {
        date1 === today ? (
          <StageCompleted level={1} number={1} />
        ) : date2 === today ? (
          <StageCompleted level={1} number={2} />
        ) : date3 === today ? (
          <Victory level={1} nextLevel={"Pressure Cooker"} />
        ) : (
          (
            (!date1 && level1Data.some((item) => item.day === 1)) ||
            (!date2 && level1Data.some((item) => item.day === 2)) ||
            (!date3 && level1Data.some((item) => item.day === 3)) ||
            startNow
          ) ? (
            <ManageSteps />
          ) : (
            <ManageStart />
          )
        )
      }
    </div>
  )
};

export default Level1;