import React from 'react';
import { useSelector } from 'react-redux';
import OtherSteps from './OtherSteps';
import DefaultImg from "../../../../../assets/image/png/level5-img1.png";
import Random2 from '../../../../../assets/image/png/level5-img2.png';
import Random3 from '../../../../../assets/image/png/level5-img3.png';
import Random4 from '../../../../../assets/image/png/level5-img4.png';
import Random5 from '../../../../../assets/image/png/level5-img5.png';

const ManageSteps = () => {
  const { level5Step, level5Day1, level5Day2, level5Day3, level5Day4, level5Day5, activeDayLevel5 } = useSelector((state) => state.games);
  const defaultImg = DefaultImg;
  const randomImages = [ Random2, Random3, Random4, Random5 ];

  return (
    <div>
      <OtherSteps
        data={
          activeDayLevel5 === 1 ? level5Day1[level5Step - 1] : 
          activeDayLevel5 === 2 ? level5Day2[level5Step - 1] : 
          activeDayLevel5 === 3 ? level5Day3[level5Step - 1] :
          activeDayLevel5 === 4 ? level5Day4[level5Step - 1] :
          activeDayLevel5 === 5 ? level5Day5[level5Step - 1] :
          level5Day5[level5Step - 1]
        }
        defaultImg={level5Step === 1 ? defaultImg : [randomImages[(level5Step - 2) % randomImages.length]]}
      />
    </div>
  );
};

export default ManageSteps;