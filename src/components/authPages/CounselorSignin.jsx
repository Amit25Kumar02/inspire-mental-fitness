import React, { useState } from "react";
import "../authPages/auth.css";
import AuthHeader from "./AuthHeader";
import { Col, Container, Row } from "react-bootstrap";
import ice_icon from "../../assets/image/svg/ice_icon.svg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CounselorSignin = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/counselorsignin`, {
        emailOrPhone,
        password,
      });
      const { data, token } = response.data;
      if (response.data.status == "success") {
        toast.success("Signin successful!");
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(data));
        navigate("/counselor-portal/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex min-vh-100 flex-column">
        <div>
          <AuthHeader />
        </div>
        <Container className="d-flex py-4 flex-column flex-grow-1 justify-content-center align-items-center">
          <div className="custom_width ">
            <h4 className="fw-bold text-center ff-gotham-bold fs_24 color_black2">
              Welcome back.
            </h4>
            <form onSubmit={handleSubmit}>
              <Row className="mt-4 pt-3">
                <Col md={12} className="d-flex flex-column">
                  <label
                    className="ff-gotham-bold fs_14"
                    htmlFor="emailOrPhone"
                  >
                    Email or Phone Number
                  </label>
                  <input
                    id="emailOrPhone"
                    className="w-100 mt-2 custom_border ff-gotham-light fs_14 py-2"
                    type="text"
                    placeholder="Email or Phone Number"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                  />
                </Col>

                <Col md={12} className="d-flex mt-4 flex-column">
                  <label className="ff-gotham-bold fs_14" htmlFor="password">
                    Password
                  </label>
                  <div className="position-relative">
                    <input
                      id="password"
                      className="w-100 mt-2 custom_border ff-gotham-light fs_14 py-2"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <img
                      className="position-absolute top-0 end-0 pt-4 cursor-pointer pe-3"
                      src={ice_icon}
                      alt="toggle_visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  </div>
                </Col>
              </Row>
              <div className="d-flex mt-3 justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <input type="checkbox" id="Accept" />
                  <label className="ff-gotham-bold fs_14" htmlFor="Accept">
                    Remember me
                  </label>
                </div>
                <span className="fs_12 color_theme ff-gotham-normal cursor-pointer">
                  Forgot Password?
                </span>
              </div>
              <button
                type="submit"
                style={{
                  letterSpacing: "0.50px",
                  height: "42px",
                  borderRadius: "8.66px",
                }}
                className="w-100 bg_theme ff-gotham-bold text-white border-0 mt-4"
              >
                Continue
              </button>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CounselorSignin;
