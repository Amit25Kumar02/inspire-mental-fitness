import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ManageSteps from "./ManageSteps";
import Victory from "../Victory";
import StageCompleted from "../StageCompleted";

const Level4 = () => {
  const { level4Data, level4Date1, level4Date2, level4Date3, level4Date4 } = useSelector((state) => state.game2);
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
  const today = formatDate(new Date());

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
          <Victory level={4} nextLevel={"Doubter"} />
        ) : (
          (
            (!date1 && level4Data.some((item) => item.day === 1)) ||
            (!date2 && level4Data.some((item) => item.day === 2)) ||
            (!date3 && level4Data.some((item) => item.day === 3)) ||
            (!date4 && level4Data.some((item) => item.day === 4))
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

export default Level4;