import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import OtherSteps from './OtherSteps';
import DefaultImg from "../../../../../assets/image/png/default.png";
import Random1 from '../../../../../assets/image/png/img1.png';
import Random2 from '../../../../../assets/image/png/img2.png';
import Random3 from '../../../../../assets/image/png/img3.png';
import Random4 from '../../../../../assets/image/png/img4.png';
import Random5 from '../../../../../assets/image/png/imge5.png';

const ManageSteps = () => {
  const { level3Step, level3Day1, level3Day2, level3Day3, level3Day4, level3Day5, level3Day6, activeDayLevel3, level3Sub5, level3Sub6, level3Date5, level3Date6 } = useSelector((state) => state.games);
  const defaultImg = DefaultImg;
  const [stepNo, setStepNo] = useState(1);
  const [subData, setSubData] = useState([]);
  const [optId, setOptId] = useState(null);
  const randomImages = [Random1, Random2, Random3, Random4, Random5];
  const day5 = level3Sub5?.filter((itm) => itm?.day === 5 && itm?.step === 29)[0]?.answers?.[0]?.selectedOption?.["0"] ?? null;
  const day5Two = level3Sub5?.filter((itm) => itm?.day === 5 && itm?.step === 30)[0]?.answers?.[0]?.selectedOption?.["0"] ?? null;
  const day6 = level3Sub6?.filter((itm) => itm?.day === 6 && itm?.step === 19)[0]?.answers?.[0]?.selectedOption?.["0"] ?? null;
  const day6Two = level3Sub6?.filter((itm) => itm?.day === 6 && itm?.step === 20)[0]?.answers?.[0]?.selectedOption?.["0"] ?? null;
  
  
   const formatDate = (d) => {
        if (!d) return null;
        const parsed = new Date(d);
        if (isNaN(parsed)) return null;
        return parsed.toLocaleDateString("en-CA");
    };
    const date5 = formatDate(level3Date5);
    const date6 = formatDate(level3Date6);

  useEffect(() => {
    const defaultstep =
      activeDayLevel3 === 5 && level3Step === 30 && day5?.length !== 3 ? 29 :
      activeDayLevel3 === 5 && level3Step === 30 && day5Two?.length !== 3 ? 30 : 
      activeDayLevel3 === 6 && level3Step === 20 && day6?.length !== 3 ? 19 : 
      activeDayLevel3 === 6 && level3Step === 20 && day6Two?.length !== 3 ? 20 :
      level3Step - 1;
    // const defaultstep = level3Step - 1;
    let questData = [];
    let submitData = [];

    if (activeDayLevel3 === 5) {
      const data = level3Day5?.filter(
        (itm) => itm?.day === activeDayLevel3 && itm?.step === defaultstep
      );
      const checkdata = level3Sub5?.filter(
        (itm) => itm?.day === activeDayLevel3 && itm?.step === defaultstep
      );
      // console.log("answers===>",data,checkdata);
      

      setOptId(checkdata[0]?._id);

      questData = data[0]?.answers ?? [];
      submitData = checkdata[0]?.answers?.[0]?.selectedOption?.["0"] ?? [];

      setSubData(Array.isArray(submitData) ? submitData : []);
    }

    if (activeDayLevel3 === 6) {
      const data = level3Day6?.filter(
        (itm) => itm?.day === activeDayLevel3 && itm?.step === defaultstep
      );
      const checkdata = level3Sub6?.filter(
        (itm) => itm?.day === activeDayLevel3 && itm?.step === defaultstep
      );

      setOptId(checkdata[0]?._id);

      questData = data[0]?.answers ?? [];
      submitData = checkdata[0]?.answers?.[0]?.selectedOption?.["0"] ?? [];

      setSubData(Array.isArray(submitData) ? submitData : []);
    }

    if (![1, 2, 3, 4].includes(activeDayLevel3)) {
      if (activeDayLevel3 === 5 || activeDayLevel3 === 6) {
        const nextStep = questData?.length === submitData?.length ? level3Step : defaultstep;
        setStepNo(nextStep);
        setSubData(questData?.length === submitData?.length ? [] : submitData);
        
        if(questData?.length === submitData?.length){
           setOptId(null);
        }
      } else {
        setStepNo(level3Step);
      }
    }

    if([1, 2, 3, 4].includes(activeDayLevel3)) {
      setStepNo(level3Step);
    }

  }, [activeDayLevel3, level3Day1, level3Day2, level3Day3, level3Day4, level3Day5, level3Day6, level3Sub5, level3Sub6 ]);

  // console.log(level3Step, stepNo, activeDayLevel3, subData);

  return (
    <div>
      <OtherSteps
        data={
          activeDayLevel3 === 1 ? level3Day1[stepNo - 1] :
            activeDayLevel3 === 2 ? level3Day2[stepNo - 1] :
              activeDayLevel3 === 3 ? level3Day3[stepNo - 1] :
                activeDayLevel3 === 4 ? level3Day4[stepNo - 1] :
                  activeDayLevel3 === 5 ? level3Day5[stepNo - 1] :
                    activeDayLevel3 === 6 ? level3Day6[stepNo - 1] :
                      level3Day3[stepNo - 1]
        }
        subData={subData}
        optId={optId}
        defaultImg={stepNo === 1
          ? defaultImg
          : [randomImages[(stepNo - 2) % randomImages.length]]}
      />
    </div>
  );
};

export default ManageSteps;