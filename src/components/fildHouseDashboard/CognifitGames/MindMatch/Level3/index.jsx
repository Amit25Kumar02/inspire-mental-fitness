import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ManageSteps from "./ManageSteps";
import Victory from "../Victory";
import StageCompleted from "../StageCompleted";

const Level3 = () => {
  const { level3Data, level3Date1, level3Date2, level3Date3 } = useSelector((state) => state.game2);
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
  const today = formatDate(new Date());

  // console.log("date2", date2, level1Date2);

  // useLayoutEffect(() => {
  //   dispatch(getSubmissionData());
  // }, [dispatch]);
  

  return (
    <div>
      {
        date1 === today ? (
          <StageCompleted level={3} number={1} />
        ) : date2 === today ? (
          <StageCompleted level={3} number={2} />
        ) : date3 === today ? (
          <Victory level={3} nextLevel={"Critic"} />
        ) : (
          (
            (!date1 && level3Data.some((item) => item.day === 1)) ||
            (!date2 && level3Data.some((item) => item.day === 2)) ||
            (!date3 && level3Data.some((item) => item.day === 3))
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

export default Level3;