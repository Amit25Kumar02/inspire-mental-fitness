import React, { useState } from "react";
import "./TrustedByCoaches.css";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import disney from "../../../assets/image/png/disney.png";
import fedEx from "../../../assets/image/png/fedEx.png";
import ford from "../../../assets/image/png/ford.png";
import gap from "../../../assets/image/png/gap.png";
import kroger from "../../../assets/image/png/kroger.png";
import uber from "../../../assets/image/png/uber.png";

const TrustedByCoaches = () => {
  const [imageLogo, setImageLogo] = useState([
    {
      img: ford,
    },
    {
      img: gap,
    },
    {
      img: kroger,
    },
    {
      img: uber,
    },
  ]);

  var settings = {
    autoplay: false,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          autoplay: true,
          infinite: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="py-4 section-border trusted-by-coach">
      <Container>
        <h2 className="text-center ff-gotham-normal fs_20 mt-3">
          Trusted By Players Coaches and Sports Clubs Nationwide
        </h2>
      </Container>
    </div>
  );
};

export default TrustedByCoaches;
