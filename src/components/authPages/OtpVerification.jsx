import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "../authPages/auth.css";
import AuthHeader from "./AuthHeader";
import { resetRedirectPath } from "../../redux/slice/OtpVerificationSlice";
import { Container, Modal, Button, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import tick from "../../assets/image/png/tick.png";
import blackTick from "../../assets/image/png/blackTick.png";
import { otpVerify, saveUser } from "../../services/otpService";
import nextArrow from "../../assets/image/png/nextArrow.png";

const OtpVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const location = useLocation();
  const userData = location.state;
  console.log("userData", userData);
  const [showModal, setShowModal] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState(null);
  const [data, setData] = useState([
    {
      plan: "The Athlete",
      price: "$12.00 monthly",
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
      price: "$120.00 Annually",
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

  useEffect(() => {
    if (userData?.isClubValid) {
      setData([
        {
          plan: "The Athlete",
          price: "$10.00 monthly", // 👈 discounted price
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
          price: "$100.00 Annually",
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
    }
  }, [userData]);

  const emailOrPhoneFromStore = useSelector(
    (state) => state.userLogin.emailOrPhone
  );
  const userEmail = userData?.email;
  const userPhone = userData?.phoneNumber;
  const emailOrPhone = userEmail || userPhone || emailOrPhoneFromStore;

  const redirectPath = useSelector(
    (state) => state.otpVerification.redirectPath
  );

  useEffect(() => {
    if (redirectPath) {
      navigate(redirectPath);
      dispatch(resetRedirectPath());
    }
  }, [redirectPath, navigate, dispatch]);

  const handleChange = (element, index) => {
    if (isNaN(element.value) && element.value !== "") return;

    const value = element.value;
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "Delete" && otp[index] === "") {
      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const submitDetails = async () => {
    const response = await saveUser(userData);
    const { status, token, data } = response;
    if (status === "success" && data?.role === "Coach") {
      navigate("/coach-request");
    }
  };

  const handleSubmit = async () => {
    if (emailOrPhone) {
      const userDataWithOtp = {
        ...userData,
        emailOrPhone,
        otp: otp.join(""),
      };

      const response = await otpVerify(userDataWithOtp);
      if (response?.status !== "success") {
        toast.error(`${response?.message}`);
      }

      if (userData?.role === "Athlete") {
        if (response?.status === "success") {
          setShowModal(true);
        }
      } else {
        submitDetails();
      }
    }
  };

  const handleSubscriptionSelection = (type) => {
    let amount = 0;
    if (type === "monthly") {
      amount = userData?.isClubValid ? 10.0 : 12.0;
    } else {
      amount = userData?.isClubValid ? 100.0 : 120.0;
    }

    const currentDate = new Date().toISOString();
    navigate("/payment", { state: { amount, type, currentDate, userData } });
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex min-vh-100 flex-column">
        <div>
          <AuthHeader />
        </div>
        <Container className="d-flex py-4 flex-column flex-grow-1 justify-content-center align-items-center">
          <div className="custom_width">
            <h4 className="fw-bold text-center ff-gotham-bold fs_24 color_black2">
              OTP Verification
            </h4>
            <p
              style={{ color: "#21272A" }}
              className="fs_14 text-center mt-3 mb-0 ff-gotham-normal"
            >
              Please enter the OTP received at your email or SMS
            </p>
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between mt-4">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="otp-input mx-1 text-center ff-gotham-bold fs_24"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={(e) => e.target.select()}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>
              <span className="d-flex mt-3 justify-content-end ff-gotham-bold fs_12 color_theme">
                Resend OTP?
              </span>
            </div>
            <button
              style={{
                letterSpacing: "0.50px",
                height: "42px",
                borderRadius: "8.66px",
              }}
              className="w-100 bg_theme ff-gotham-bold text-white border-0 mt-4 rounded-2"
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </Container>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Choose a Subscription</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column align-items-center">
              <Row className="">
                {data.map((values, index) => (
                  <Col className="mt-3" lg={6} md={6} key={index}>
                    <div
                      className={`${
                        index === 1 ? "bg-blue text-white" : "clr-black"
                      } p-4 border-20 cards-pricing h-100`}
                    >
                      <p className="ff-gotham-bold fs_20">{values.plan}</p>
                      <p className="ff-poppins fw-normal fs_20">
                        {values.price}
                      </p>
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
                          index === 1
                            ? "horizontal-line-blue"
                            : "horizontal-line"
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
                          <p className="ff-gotham-normal mb-0 fs_16">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default OtpVerification;
