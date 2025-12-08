import React from 'react';
import { useSelector } from 'react-redux';
import OtherSteps from './OtherSteps';
import DefaultImg from "../../../../../assets/image/png/default.png";
import Random1 from '../../../../../assets/image/png/img1.png';
import Random2 from '../../../../../assets/image/png/img2.png';
import Random3 from '../../../../../assets/image/png/img3.png';
import Random4 from '../../../../../assets/image/png/img4.png';
import Random5 from '../../../../../assets/image/png/imge5.png';

const ManageSteps = () => {
  const { level2Step, level2Day1, level2Day2, level2Day3, activeDay } = useSelector((state) => state.games);
  const defaultImg = DefaultImg;
  const randomImages = [ Random1, Random2, Random3, Random4, Random5 ];

  return (
    <div>
      <OtherSteps
        data={
          activeDay === 1 ? level2Day1[level2Step - 1] :
          activeDay === 2 ? level2Day2[level2Step - 1] :
          activeDay === 3 ? level2Day3[level2Step - 1] :
          level2Day1[level2Step - 1] ?? 0
        }
        defaultImg={level2Step === 1 
          ? defaultImg
          : [randomImages[(level2Step - 2) % randomImages.length]]}
      />
    </div>
  );
};

export default ManageSteps;