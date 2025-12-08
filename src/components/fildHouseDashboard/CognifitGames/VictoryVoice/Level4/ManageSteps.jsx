import React from 'react';
import { useSelector } from 'react-redux';
import OtherSteps from './OtherSteps';
import DefaultImg from "../../../../../assets/image/png/level4-img1.png";
import Random2 from '../../../../../assets/image/png/level4-img2.png';
import Random3 from '../../../../../assets/image/png/level4-img3.png';
import Random4 from '../../../../../assets/image/png/level4-img4.png';
import Random5 from '../../../../../assets/image/png/level4-img5.png';
import Random6 from '../../../../../assets/image/png/level4-img6.png';
import Random7 from '../../../../../assets/image/png/level4-img7.png';

const ManageSteps = () => {
  const { level4Step, level4Day1, level4Day2, level4Day3, level4Day4, level4Day5, activeDayLevel4 } = useSelector((state) => state.games);
  const defaultImg = DefaultImg;
  const randomImages = [ Random2, Random3, Random4, Random5, Random6, Random7 ];

  return (
    <div>
      <OtherSteps
        data={
          activeDayLevel4 === 1 ? level4Day1[level4Step - 1] : 
          activeDayLevel4 === 2 ? level4Day2[level4Step - 1] : 
          activeDayLevel4 === 3 ? level4Day3[level4Step - 1] :
          activeDayLevel4 === 4 ? level4Day4[level4Step - 1] :
          activeDayLevel4 === 5 ? level4Day5[level4Step - 1] :
          level4Day5[level4Step - 1]
        }
        defaultImg={level4Step === 1 ? defaultImg : [randomImages[(level4Step - 2) % randomImages.length]]}
      />
    </div>
  );
};

export default ManageSteps;