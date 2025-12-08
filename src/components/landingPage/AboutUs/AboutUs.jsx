import React from "react";
import "./AboutUs.css";
import nextArrow from "../../../assets/image/png/nextArrow.png";
import mainImg from "../../../assets/image/png/girlWithRacket.png";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div id="aboutus" className="aboutus-bg-theme py-5">
      <Container>
        <Row className="align-items-center flex-column-reverse flex-lg-row">
          <Col className="mt-3" lg={6}>
            <div>
              <div className="d-flex align-items-center gap-4">
                <div className="hr-line"></div>
                <div className="bg-white px-3 py-1 rounded-2">
                  <p className="mb-0 ff-gotham-normal fs_20">About Us</p>
                </div>
              </div>
              <h2 className="mb-0 ff-gotham-bold fs-56 mt-4">
                Get to Know Us <span className="elevate-text">Better</span>
              </h2>
              <p
                style={{ opacity: "90%" }}
                className="mb-0 mt-4 ff-gotham-normal fs_16 clr-black"
              >
                Inspire Mental Fitness was created with the Athlete in Mind. We
                equip our athletes with the tools and support they need to face
                challenges, build confidence,envision goals and reach their true
                potential both on and off the field. We don't just talk about
                mental resilience, we build it!
              </p>
              <Link to={"/about-us"}>
                <Button
                  style={{
                    width: "150px",
                    height: "45px",
                    borderRadius: "10px",
                  }}
                  className="btn-green-common text-white d-flex align-items-center mt-4 gap-2 justify-content-center"
                >
                  Read More
                  <img
                    style={{ width: "13px", height: "10px" }}
                    src={nextArrow}
                    alt="nextArrow"
                  />
                </Button>
              </Link>
            </div>
          </Col>
          <Col lg={6}>
            <div className="text-center position-relative">
              <img className="w-75" src={mainImg} alt="boyWithFootball" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
