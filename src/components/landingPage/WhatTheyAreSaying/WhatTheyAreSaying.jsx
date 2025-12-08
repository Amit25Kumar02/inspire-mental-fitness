import React, { useState } from "react";
import "./WhatTheyAreSaying.css";
import { Button, Container } from "react-bootstrap";
import Slider from "react-slick";
import ford from "../../../assets/image/png/fordClrBlue.png";
import disneyClrBlue from "../../../assets/image/png/disneyClrBlue.png";
import fedExClrBlue from "../../../assets/image/png/fedExClrBlue.png";
import gapClrBlue from "../../../assets/image/png/gapClrBlue.png";
import krogerClrBlue from "../../../assets/image/png/krogerClrBlue.png";
import greenSliderArrow from "../../../assets/image/png/greenSliderArrow.png";
import greenSliderArrowNext from "../../../assets/image/png/greenSliderArrowNext.png";

const WhatTheyAreSaying = () => {
  const button = React.useRef();
  const [data, setData] = useState([
    {
      head: "Overcame My Mental Barriers",
      para: "Inspire Mental Fitness has been a game-changer for me. The personalized mental training plans have significantly improved my focus and confidence in the pool. The expert guidance has helped me stay calm and composed during competitions, leading to better performance. I can't recommend it enough to any athlete ",
      img: ford,
    },

    {
      head: "Overcame My Mental Barriers",
      para: "Inspire Mental Fitness has been a game-changer for me. The personalized mental training plans have significantly improved my focus and confidence in the pool. The expert guidance has helped me stay calm and composed during competitions, leading to better performance. I can't recommend it enough to any athlete ",
      img: gapClrBlue,
    },
    {
      head: "Overcame My Mental Barriers",
      para: "Inspire Mental Fitness has been a game-changer for me. The personalized mental training plans have significantly improved my focus and confidence in the pool. The expert guidance has helped me stay calm and composed during competitions, leading to better performance. I can't recommend it enough to any athlete ",
      img: krogerClrBlue,
    },
  ]);

  var settings = {
    autoplay: false,
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2.3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          infinite: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="bg-white py-5">
      <Container>
        <div className="d-flex align-items-center gap-4">
          <hr className="horizontal-line" />
          <p className="mb-0 ff-gotham-normal fs_20 clr-black">Testimonials</p>
        </div>
        <h2 className="mb-0 ff-gotham-bold fs-56 mt-3">
          What They Are <span className="elevate-text">Saying</span>
        </h2>
        <div className="d-flex align-items-center justify-content-between mt-4">
          <p
            style={{ maxWidth: "621px" }}
            className="clr-black opacity-60 ff-gotham-normal fs_18  mb-0"
          >
            Discover the stories and experiences of individuals and companies
            who have found success and excellence through Applyfier
          </p>
          <div className="d-md-flex align-items-center gap-2 d-none">
            <Button
              className="prev-button d-flex align-items-center justify-content-center"
              onClick={() => button.current.slickPrev()}
            >
              <img
                style={{ width: "8px", height: "15px" }}
                src={greenSliderArrow}
                alt="arrow"
              />
            </Button>
            <Button
              className="next-button d-flex align-items-center justify-content-center"
              onClick={() => button.current.slickNext()}
            >
              <img
                style={{ width: "8px", height: "15px" }}
                src={greenSliderArrowNext}
                alt="arrow"
              />
            </Button>
          </div>
        </div>
        <Slider className="mt-5" {...settings} ref={button}>
          {data.map((value, index) => (
            <div key={index}>
              <div className="pe-sm-5">
                <h4 className="ff-montserrat fw-medium fs_20">{value.head}</h4>
                <p className="ff-gotham-normal fs_16 clr-black opacity-60 mt-3">
                  {value.para}
                </p>
                <hr className="slider-card-horizontal-line" />
                <div>
                  <img
                    style={{ width: "120px", height: "47px" }}
                    className="object-fit-contain"
                    src={value.img}
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div className="d-flex d-md-none align-items-center gap-2 justify-content-center mt-4">
          <Button
            className="prev-button d-flex align-items-center justify-content-center"
            onClick={() => button.current.slickPrev()}
          >
            <img
              style={{ width: "8px", height: "15px" }}
              src={greenSliderArrow}
              alt="arrow"
            />
          </Button>
          <Button
            className="next-button d-flex align-items-center justify-content-center"
            onClick={() => button.current.slickNext()}
          >
            <img
              style={{ width: "8px", height: "15px" }}
              src={greenSliderArrowNext}
              alt="arrow"
            />
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default WhatTheyAreSaying;
