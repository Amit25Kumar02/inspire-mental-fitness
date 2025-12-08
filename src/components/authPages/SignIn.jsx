import React, { useEffect, useState } from "react";
import "../authPages/auth.css";
import AuthHeader from "./AuthHeader";
import { Col, Container, Row } from "react-bootstrap";
import or_icon from "../../assets/image/svg/or_icon.svg";
import ice_icon from "../../assets/image/svg/ice_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/slice/UserLoginSlice";
import { resetRedirectPath } from "../../redux/slice/UserLoginSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ForgotPasswordModal from "../Modals/ForgotPasswordModal";

const SignIn = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ emailOrPhone: "", password: "" });
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirectPath = useSelector((state) => state.userLogin.redirectPath); // Get redirect path from redux

  const handleSubmit = () => {
    setErrors({ emailOrPhone: "", password: "" });

    let hasErrors = false;
    if (!emailOrPhone) {
      setErrors((prev) => ({
        ...prev,
        emailOrPhone: "Email or Phone Number is required",
      }));
      hasErrors = true;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      hasErrors = true;
    }

    if (!hasErrors) {
      dispatch(userLogin({ emailOrPhone, password }));
    }
  };

  useEffect(() => {
    if (redirectPath) {
      const redirectUrl = redirectPath?.redirect || redirectPath;
      const email = redirectPath?.email;
      if (email) {
        navigate(redirectUrl, {
          state: { email },
        });
      } else {
        navigate(redirectUrl);
      }
      dispatch(resetRedirectPath());
    }
  }, [redirectPath, navigate, dispatch]);

  return (
    <div className="d-flex min-vh-100 flex-column">
      <ToastContainer />
      <div>
        <AuthHeader />
      </div>
      <Container className="d-flex py-4 flex-column flex-grow-1 justify-content-center align-items-center">
        <div className="custom_width">
          <h4 className="fw-bold text-center ff-gotham-bold fs_24 color_black2">
            Welcome back.
          </h4>
          <Row className="mt-4 pt-3">
            <Col md={12} className="d-flex flex-column">
              <label
                className="ff-gotham-bold fs_14 mb-0"
                htmlFor="emailOrPhone"
              >
                Email or Phone Number
              </label>
              <input
                className="w-100 mt-2 custom_border ff-gotham-light fs_14 py-2"
                type="text"
                style={{ height: "41px" }}
                placeholder="Email or Phone Number"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
              {errors.emailOrPhone && (
                <p className="text-danger ff-gotham-normal fs_12 mb-0">
                  {errors.emailOrPhone}
                </p>
              )}
            </Col>

            <Col md={12} className="d-flex mt-4 flex-column">
              <label className="ff-gotham-bold fs_14 mb-0" htmlFor="password">
                Password
              </label>
              <div className="position-relative">
                <input
                  className="w-100 mt-2 custom_border ff-gotham-light fs_14 py-2"
                  type={showPassword ? "text" : "password"}
                  style={{ height: "41px" }}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <img
                  className="position-absolute top-0 end-0 pt-4 cursor-pointer pe-3"
                  src={ice_icon}
                  alt="Toggle visibility"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              {errors.password && (
                <p className="text-danger ff-gotham-normal fs_12 mb-0">
                  {errors.password}
                </p>
              )}
            </Col>
          </Row>
          <div className="d-flex mt-3 justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <input type="checkbox" id="Accept" />
              <label
                className="ff-gotham-bold fs_14 mb-0 mt-1"
                htmlFor="Accept"
              >
                Remember me
              </label>
            </div>
            <span
              onClick={() => setShowForgotPasswordModal(true)}
              className="fs_12 color_theme ff-gotham-normal cursor-pointer"
            >
              Forgot Password?
            </span>
          </div>
          <button
            onClick={handleSubmit}
            style={{
              letterSpacing: "0.50px",
              height: "42px",
              borderRadius: "8.66px",
            }}
            className="w-100 bg_theme ff-gotham-bold text-white border-0 mt-4"
          >
            Continue
          </button>
          <div className="d-flex justify-content-center mt-4">
            <img className="" src={or_icon} alt="or_icon" />
          </div>
          {/* <div className="d-flex mt-4 justify-content-center gap-3">
            <img
              className="cursor-pointer"
              src={google_icon}
              alt="google_icon"
            />
            <img
              className="cursor-pointer"
              src={facebook_icon}
              alt="facebook_icon"
            />
          </div> */}
          <p className="text-center ff-gotham-normal mt-3 fs_14">
            New to Inspire?
            <span
              className="fw-bold color_theme ff-gotham-bold cursor_pointer"
              onClick={() => navigate("/sign-up")}
            >
              {" "}
              Sign up
            </span>
          </p>
        </div>
        <ForgotPasswordModal
          show={showForgotPasswordModal}
          handleClose={() => setShowForgotPasswordModal(false)}
        />
      </Container>
    </div>
  );
};

export default SignIn;
