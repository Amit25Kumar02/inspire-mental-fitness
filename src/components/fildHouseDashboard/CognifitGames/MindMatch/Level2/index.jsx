import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ManageSteps from "./ManageSteps";
import Victory from "../Victory";
import StageCompleted from "../StageCompleted";

const Level2 = () => {
  const { level2Data, level2Date1, level2Date2, level2Date3 } = useSelector((state) => state.game2);
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

  return (
    <div>
      {
        date1 === today ? (
          <StageCompleted level={2} number={1} />
        ) : date2 === today ? (
          <StageCompleted level={2} number={2} />
        ) : date3 === today ? (
          <Victory level={2} nextLevel={"Spiral"} />
        ) : (
          (
            (!date1 && level2Data.some((item) => item.day === 1)) ||
            (!date2 && level2Data.some((item) => item.day === 2)) ||
            (!date3 && level2Data.some((item) => item.day === 3))
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

export default Level2;