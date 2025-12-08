import React from 'react';
import { useSelector } from 'react-redux';
import OtherSteps from './OtherSteps';
import DefaultImg from "../../../../../assets/image/png/level6-img1.png";
import Random2 from '../../../../../assets/image/png/level6-img2.png';
import Random3 from '../../../../../assets/image/png/level6-img3.png';
import Random4 from '../../../../../assets/image/png/level6-img4.png';
import Random5 from '../../../../../assets/image/png/level6-img5.png';
import Random6 from '../../../../../assets/image/png/level6-img6.png';
import Random7 from '../../../../../assets/image/png/level6-img7.png';
import Random8 from '../../../../../assets/image/png/level6-img8.png';

const ManageSteps = () => {
  const { level6Step, level6Day1, level6Day2, level6Day3, level6Day4, level6Day5, activeDayLevel6 } = useSelector((state) => state.games);
  const defaultImg = DefaultImg;
  const randomImages = [ Random2, Random3, Random4, Random5, Random6, Random7, Random8 ];

  return (
    <div>
      <OtherSteps
        data={
          activeDayLevel6 === 1 ? level6Day1[level6Step - 1] : 
          activeDayLevel6 === 2 ? level6Day2[level6Step - 1] : 
          activeDayLevel6 === 3 ? level6Day3[level6Step - 1] :
          activeDayLevel6 === 4 ? level6Day4[level6Step - 1] :
          activeDayLevel6 === 5 ? level6Day5[level6Step - 1] :
          level6Day5[level6Step - 1]
        }
        defaultImg={level6Step === 1 ? defaultImg : [randomImages[(level6Step - 2) % randomImages.length]]}
      />
    </div>
  );
};

export default ManageSteps;