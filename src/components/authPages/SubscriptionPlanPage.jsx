import React, { useState, useEffect } from "react";
import AuthHeader from "./AuthHeader";
import { Button, Col, Row } from "react-bootstrap";
import nextArrow from "../../assets/image/png/nextArrow.png";
import tick from "../../assets/image/png/tick.png";
import blackTick from "../../assets/image/png/blackTick.png";
import { useNavigate, useLocation } from "react-router-dom";

const SubscriptionPlanPage = () => {
  const [data, setData] = useState([
    {
      plan: "The Athlete",
      price: "$12.0 monthly",
      subscriptionPlan: "monthly",
      features: [
        "All Access to Mental Fitness Fieldhouse",
        "Mental Performance Training Center",
        "Mental Wellness Library",
        "Athletes Journal",
        "The Arena for Guest Speakers and Special Presentations",
        "One on One Mental Fitness Performance Counseling",
        "Special Designed Mental Fitness Programs for the Athlete",
      ],
    },
    {
      plan: "The Athlete",
      price: "$120.0 Annually",
      subscriptionPlan: "yearly",
      features: [
        "All Access to Mental Fitness Fieldhouse",
        "Mental Performance Training Center",
        "Mental Wellness Library",
        "Athletes Journal",
        "The Arena for Guest Speakers and Special Presentations",
        "One on One Mental Fitness Performance Counseling",
        "Special Designed Mental Fitness Programs for the Athlete",
      ],
    },
  ]);

  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleSubscriptionSelection = (type) => {
    let amount = 0;
    if (type === "monthly") {
      amount = location.state?.isClubValid ? 10.0 : 12.0;
    } else {
      amount = location.state?.isClubValid ? 100.0 : 120.0;
    }
    const currentDate = new Date().toISOString();
    navigate(`/payment`, {
      state: {
        email,
        type,
        amount,
        currentDate,
        isClubValid: location.state?.isClubValid,
      },
    });
  };

  useEffect(() => {
    if (!email) {
      console.error("Missing email or subscription plan.");
    }
  }, [email]);

  return (
    <>
      <AuthHeader />
      <div>
        <div
          style={{ height: "80vh" }}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <Row>
            {data.map((values, index) => (
              <Col lg={6} md={6} key={index}>
                <div
                  className={`${
                    index === 1 ? "bg-blue text-white" : "clr-black"
                  } p-4 border-20 cards-pricing h-100`}
                >
                  <p className="ff-gotham-bold fs_20">{values.plan}</p>
                  <p className="ff-poppins fw-normal fs_20">{values.price}</p>
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
                      handleSubscriptionSelection(values.subscriptionPlan)
                    }
                  >
                    Get Inspired
                    <img
                      style={{ width: "13px", height: "10px" }}
                      src={nextArrow}
                      alt="nextArrow"
                    />
                  </Button>
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
                            style={{ width: "5px", height: "4px" }}
                            src={blackTick}
                            alt="tick"
                          />
                        ) : (
                          <img
                            style={{ width: "5px", height: "4px" }}
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
        </div>
      </div>
    </>
  );
};

export default SubscriptionPlanPage;
