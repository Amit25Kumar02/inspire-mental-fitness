import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import AuthHeader from "../../authPages/AuthHeader";
import AppFooter from "../../landingPage/AppFooter/AppFooter";
import { useNavigate } from "react-router-dom";

const CoachRequest = () => {
  const navigate = useNavigate();
  return (
    <>
      <AuthHeader />
      <Container
        style={{ height: "80vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Row>
          <Col>
            <div className="text-center">
              <h3 className="ff-gotham-medium elevate-text fs_50">
                Request Submitted
              </h3>
              <p className="ff-gotham-medium my-3">
                Thank you for submitting your request. Our team will review it
                shortly. <br /> You will receive an email with the status of
                your request soon.
              </p>
              <button
                style={{ width: "196px", height: "45px" }}
                className="btn-green-common rounded-2 text-white mt-4"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CoachRequest;
