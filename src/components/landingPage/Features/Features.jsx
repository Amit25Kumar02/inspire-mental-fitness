import React, { useState } from "react";
import "./Features.css";
import { Col, Container, Row } from "react-bootstrap";
import pieChart from "../../../assets/image/png/pieChart.png";
import squareBoxes from "../../../assets/image/png/squareBoxes.png";
import tickWithGreenBg from "../../../assets/image/png/tickWithGreenBg.png";

const Features = () => {
  const [data, setData] = useState([
    {
      img: tickWithGreenBg,
      head: "Mental Fitness Training Center",
      para: "Explore the vast resources available in the Training Center. Access Self Discovery Surveys, the Library , the Recovery Room and the Arena.",
    },
    {
      img: pieChart,
      head: "Personalized Mental Training Plans",
      para: "Reach peak mental fitness with a counselor crafted plan complete with techniques and strategies tailored to your unique needs",
    },
    {
      img: squareBoxes,
      head: "Interactive Counseling Sessions",
      para: "Access one-on-one virtual counseling with a mental health counselor certified in sports psychology in a safe and supportive environment",
    },
  ]);
  return (
    <div id="Features" className="features-bg-theme py-5">
      <Container>
        <div className="d-flex align-items-center gap-4 justify-content-center">
          <hr className="horizontal-line" />
          <h3 className="ff-gotham-normal clr-white fs_20">Features</h3>
          <hr className="horizontal-line" />
        </div>
        <h2
          style={{ maxWidth: "800px" }}
          className="mb-0 ff-gotham-bold fs-56 text-center mx-auto mt-3"
        >
          <span className="elevate-text">Personalized</span> Guidance and
          Support for Every Athlete
        </h2>
        <p
          style={{ maxWidth: "500px" }}
          className="mb-0 ff-gotham-normal fs-15 mt-4 mx-auto text-center"
        >
          Specialized Features helping athletes reach their full potential
        </p>
        <Row className="mt-3">
          {data.map((value, index) => {
            return (
              <Col lg={4} sm={6} key={index} className="mt-4">
                <div className="feature-card cursor-pointer p-4 h-100 d-flex flex-column">
                  <div>
                    <div className="card-image-circle d-flex align-items-center justify-content-center">
                      <img className="card-image" src={value.img} alt="" />
                    </div>
                    <h4 className="ff-gotham-bold fs-30 mt-3">{value.head}</h4>
                  </div>
                  <p className="ff-gotham-normal fs-17 mb-0 mt-3">
                    {value.para}
                  </p>
                </div>
              </Col>
            );
          })}
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Features;
