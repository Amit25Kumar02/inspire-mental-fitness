import React from "react";
import AppNav from "../components/landingPage/AppNavbar/AppNav";
import AppFooter from "../components/landingPage/AppFooter/AppFooter";
import { Col, Container, Row } from "react-bootstrap";

const OurTeam = () => {
  return (
    <div className="landing-page-body">
      <AppNav />
      <div className="py-5">
        <Container className="py-md-5">
          <Row className="align-items-center justify-content-center">
            <Col md={8}>
              <div className="text-center">
                <h1 className="fs_50 ff-gotham-bold">
                  Our <span className="elevate-text">Team</span>
                </h1>
                <p className="mb-0 ff-gotham-normal fs_18">
                  Inspire Mental Fitness PLLC boasts a team of mental health
                  professionals specializing in sports psychology. We are
                  committed to the mental wellbeing of the youth athlete and
                  apply a holistic approach to mental fitness with performance
                  enhanced practices to ensure the athlete reaches their full
                  potential on and off the field.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <AppFooter />
    </div>
  );
};

export default OurTeam;
