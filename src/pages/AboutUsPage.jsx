import React from "react";
import "../components/landingPage/AboutUs/AboutUs.css";
import nextArrow from "../assets/image/png/nextArrow.png";
import mainImg from "../assets/image/png/girlWithRacket.png";
import { Button, Col, Container, Row } from "react-bootstrap";
import AppNav from "../components/landingPage/AppNavbar/AppNav";
import AppFooter from "../components/landingPage/AppFooter/AppFooter";
import { Link } from "react-router-dom";

const AboutUsPage = () => {
  return (
    <div className="landing-page-body">
      <AppNav />

      {/* SAME BG THEME AS HOME PAGE */}
      <section id="aboutus" className="aboutus-bg-theme">
        <Container>
          <div className="d-flex align-items-center gap-4 justify-content-center">
            <div className="hr-line"></div>
            <h3 className="ff-gotham-normal fs_20 text-white">About Us</h3>
            <div className="hr-line"></div>
          </div>

          <h2
            style={{ maxWidth: "800px" }}
            className="mb-0 ff-gotham-bold fs-56 text-center mx-auto mt-3"
          >
            Get to Know Us <span className="elevate-text">Better</span>
          </h2>

          <Row className="align-items-center flex-column-reverse flex-lg-row mt-4">
            <Col lg={6}>
              <p className="mb-0 mt-4 ff-gotham-normal fs_16 about-text">
                Inspire Mental Fitness was created with the Athlete in Mind. We
                equip our athletes with the tools and support they need to face
                challenges, build confidence, envision goals and reach their
                true potential both on and off the field. We don't just talk
                about mental resilience, we build it!
              </p>

              <p className="mb-0 mt-3 ff-gotham-normal fs_16 about-text">
                Our virtual platform offers personalized mental training plans,
                interactive counseling sessions, self discovery tools,
                mindfulness training and a wealth of other resources designed
                specifically for athletes of all ages and skill levels.
              </p>

              <p className="mb-0 mt-3 ff-gotham-normal fs_16 about-text">
                Conquer the mental game with Inspire Mental Fitness. Meet with
                success, enhance your love of your sport and unleash your true
                potential — Become Inspired.
              </p>

              <Link to="/about-us-details">
                <Button className="btn-green-common text-white d-flex align-items-center mt-4 gap-2 justify-content-center"
                  style={{ width: "160px", height: "45px", borderRadius: "10px" }}>
                  Read More
                  <img src={nextArrow} style={{ width: "13px", height: "10px" }} alt="nextArrow" />
                </Button>
              </Link>
            </Col>

            <Col lg={6}>
              <div className="text-center position-relative mt-4 mt-lg-0">
                <img className="about-img-shadow w-75" src={mainImg} alt="athlete" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <AppFooter />
    </div>
  );
};

export default AboutUsPage;
