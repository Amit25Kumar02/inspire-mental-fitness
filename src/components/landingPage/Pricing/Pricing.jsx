import React, { useState } from "react";
import "./Pricing.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import nextArrow from "../../../assets/image/png/nextArrow.png";
import Toggle from "react-styled-toggle";
import tick from "../../../assets/image/png/tick.png";
import blackTick from "../../../assets/image/png/blackTick.png";
import CallToAction from "./CallToAction";
import { ToastContainer } from "react-toastify";
import { setRole } from "../../../redux/slice/UserSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Pricing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const [data, setData] = useState([
    {
      plan: "The Athlete",
      priceMonthly: "$12.00 monthly",
      priceYearly: "$120.00 Annually",
      features: [
        "All Access to Mental Performance Training Center",
        "Recovery Room",
        "Mental Wellness Library",
        "Athletes Journal",
        "The Arena for Guest Speakers and Special Presentations",
        "One on One Mental Fitness Performance Counseling",
        "Special Designed Mental Fitness Programs for the Athlete",
      ],
    },
    {
      plan: "The Team",
      features: [
        "All Access to Subscription Platform",
        "Team Mental Fitness Workshops",
        "Team Chat Room",
        "Coach and Athlete Journals",
        "Mental Performance Team Counseling",
        "Custom Mental Performance Curriculum",
        "Coach Access to Coaching Room",
      ],
    },
    {
      plan: "The Club",
      price: "",
      features: [
        "All Access for Athletes, Coaches, and Directors to Subscription Platform",
        "All Access to the Team Platform",
        "Coach Education and Mentoring Workshops",
        "One on One Coach Mental Performance Counseling",
        "Mental Performance Club Curriculum and Culture Programming Initiatives",
        "Parent Educational Workshops",
        "Special Guest Speaker Presentations in The Arena",
      ],
    },
  ]);

  const handleGetStarted = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleNavigation = (role) => {
    dispatch(setRole(role));
    navigate("/sign-up");
  };

  return (
    <div id="Pricing" className="pricing-bg-theme py-5">
      <Container>
        <div className="d-flex align-items-center gap-4 justify-content-center">
          <hr className="horizontal-line" />
          <h3 className="ff-gotham-normal clr-black fs_20 mb-0">Pricing</h3>
          <hr className="horizontal-line" />
        </div>
        <h2 className="mb-0 ff-gotham-bold fs-56 text-center mt-3">
          <span className="elevate-text">Simple</span> and Transparent Pricing
        </h2>
        {/* <div className="d-flex align-items-center gap-3 gap-sm-4 justify-content-center mt-5">
          <p className="ff-gotham-normal fs_20 clr-black mb-0 text-center text-sm-start">
            Yearly plans
          </p>
          <Toggle
            onChange={() => setChecked(!checked)}
            checked={checked}
            backgroundColorChecked="#0071BD"
            backgroundColorUnchecked="#0071BD"
          />
          <p className="ff-gotham-normal fs_20 clr-black mb-0 text-center text-sm-start">
            Monthly plans
          </p>
        </div> */}
        <Row className="mt-4 mt-md-5 g-3 g-md-4">
          {data.map((values, index) => (
            <Col xs={12} sm={6} lg={4} key={index}>
              <div
                className={`${
                  index === 1 ? "bg-blue text-white" : "clr-black"
                } p-4 border-20 cards-pricing h-100`}
              >
                <p className="ff-gotham-bold fs_20">{values.plan}</p>

                <Button
                  style={{
                    maxWidth: "320px",
                    height: "45px",
                    borderRadius: "10px",
                  }}
                  className={`${
                    index === 1 ? "border-white" : ""
                  } btn-green-common w-100 text-white d-flex align-items-center mt-4 gap-2 justify-content-center`}
                  onClick={() =>
                    index === 0
                      ? handleNavigation("Athlete")
                      : handleGetStarted(values.plan)
                  }
                >
                  Get Inspired
                  <img
                    style={{ width: "13px", height: "10px" }}
                    src={nextArrow}
                    alt="nextArrow"
                  />
                </Button>
                {/* <p className="ff-poppins fw-normal fs_20 mb-0 mt-2">
                  {index === 0
                    ? checked
                      ? values.priceMonthly
                      : values.priceYearly
                    : values.price}
                </p> */}
                <hr
                  className={`${
                    index === 1 ? "horizontal-line-blue" : "horizontal-line"
                  } w-100 mt-4`}
                />
                {values.features.map((feature, featureIndex) => (
                  <div
                    className="d-flex align-items-center gap-3 mt-3"
                    key={featureIndex}
                  >
                    <div
                      className={`${
                        index === 1 ? "white-circle" : "black-circle"
                      } d-flex align-items-center justify-content-center`}
                    >
                      {index === 1 ? (
                        <img
                          style={{ width: "5px", height: "5px" }}
                          src={blackTick}
                          alt="tick"
                        />
                      ) : (
                        <img
                          style={{ width: "5px", height: "5px" }}
                          src={tick}
                          alt="tick"
                        />
                      )}
                    </div>
                    <p className="ff-gotham-normal mb-0 fs_16">{feature}</p>
                  </div>
                ))}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <CallToAction
        show={showModal}
        onHide={() => setShowModal(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

export default Pricing;
