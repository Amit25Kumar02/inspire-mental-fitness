import React, { useEffect, useState } from "react";
import "./auth.css";
import AuthHeader from "./AuthHeader";
import { Col, Container, Row } from "react-bootstrap";
import or_icon from "../../assets/image/svg/or_icon.svg";
import ice_icon from "../../assets/image/svg/ice_icon.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSignup, resetRedirectPath } from "../../redux/slice/UserSlice";
import { ToastContainer } from "react-toastify";
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);
  const redirectPath = useSelector((state) => state.user.redirectPath);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    parentName: "",
    parentEmail: "",
    clubId: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isClubValid, setIsClubValid] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (redirectPath?.path) {
      navigate(redirectPath.path, { state: redirectPath.dataToSend });
      dispatch(resetRedirectPath());
    }
  }, [redirectPath, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "clubId") {
      if (typingTimeout) clearTimeout(typingTimeout);

      setTypingTimeout(
        setTimeout(() => {
          checkClubId(value);
        }, 1000)
      );
    }
  };

  const handlePhoneChange = (value) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      phoneNumber: "",
    }));

    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!formData.firstName) formErrors.firstName = "First name is required.";
    if (!formData.lastName) formErrors.lastName = "Last name is required.";
    if (!formData.email) {
      formErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = "Invalid email format.";
    }
    if (!formData.phoneNumber)
      formErrors.phoneNumber = "Phone number is required.";

    if (!formData.password) formErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = "Passwords do not match.";

    if (!formData.termsAccepted)
      formErrors.termsAccepted = "You must accept the terms and conditions.";

    if (role === "Athlete") {
      if (!formData.parentName)
        formErrors.parentName = "Parent name is required for athletes.";
      if (!formData.parentEmail) {
        formErrors.parentEmail = "Parent email is required for athletes.";
      } else if (!emailRegex.test(formData.parentEmail)) {
        formErrors.parentEmail = "Invalid parent email format.";
      }
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      let payload = { ...formData, role: role, isClubValid };
      if (role === "Athlete") {
        payload = {
          ...payload,
          parentName: formData.parentName,
          parentEmail: formData.parentEmail,
        };
      } else {
        const { parentName, parentEmail, ...rest } = payload;
        payload = rest;
      }
      dispatch(userSignup(payload));
    }
  };

  useEffect(() => {
    if (!role) {
      navigate("/choose-role");
    }
  }, []);

  const checkClubId = async (clubId) => {
    try {
      const response = await fetch(`${API_URL}/club-id-user`);
      const data = await response.json();

      const match = data.some((club) => club.clubId === clubId);
      setIsClubValid(match);
    } catch (err) {
      console.error("Error fetching club IDs", err);
    }
  };

  return (
    <div className="d-flex min-vh-100 flex-column">
      <ToastContainer />
      <div>
        <AuthHeader />
      </div>
      <Container className="d-flex py-4 flex-column flex-grow-1 justify-content-center align-items-center">
        <div className="custom_width">
          <h4 className="fw-bold text-center ff-gotham-bold fs_24 color_black2">
            Create your Inspire Fitness account
          </h4>
          <Row className="mt-4 pt-3">
            <Col md={6} className="d-flex flex-column">
              <label className="ff-gotham-bold mb-0" htmlFor="firstName">
                First Name
              </label>
              <input
                className="w-100 mt-2 custom_border ff-gotham-light py-2"
                type="text"
                style={{ height: "41px" }}
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="text-danger fs_14">{errors.firstName}</span>
              )}
            </Col>
            <Col md={6} className="d-flex flex-column">
              <label className="ff-gotham-bold mb-0" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="w-100 mt-2 custom_border ff-gotham-light py-2"
                type="text"
                style={{ height: "41px" }}
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className="text-danger fs_14">{errors.lastName}</span>
              )}
            </Col>
            <Col md={12} className="d-flex mt-3 flex-column">
              <label className="ff-gotham-bold mb-0" htmlFor="email">
                Email
              </label>
              <input
                className="w-100 mt-2 custom_border ff-gotham-light py-2"
                type="email"
                style={{ height: "41px" }}
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="text-danger fs_14">{errors.email}</span>
              )}
            </Col>
            <Col md={12} className="d-flex mt-3 flex-column">
              <label className="ff-gotham-bold mb-0" htmlFor="phoneNumber">
                Phone Number
              </label>
              <PhoneInput
                className=" mt-2 custom_border_phone_input ff-gotham-light h-100 border-0"
                style={{ height: "41px" }}
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
              />
              {errors.phoneNumber && (
                <span className="text-danger fs_14">{errors.phoneNumber}</span>
              )}
            </Col>
            {role === "Athlete" ? (
              <>
                <Col md={6} className="d-flex flex-column mt-3">
                  <label className="ff-gotham-bold mb-0" htmlFor="parentName">
                    Parent Name
                  </label>
                  <input
                    className="w-100 mt-2 custom_border ff-gotham-light py-2"
                    type="text"
                    style={{ height: "41px" }}
                    placeholder="Parent Name"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                  />
                  {errors.parentName && (
                    <span className="text-danger fs_14">
                      {errors.parentName}
                    </span>
                  )}
                </Col>
                <Col md={6} className="d-flex flex-column mt-3">
                  <label className="ff-gotham-bold mb-0" htmlFor="parentEmail">
                    Parent Email
                  </label>
                  <input
                    className="w-100 mt-2 custom_border ff-gotham-light py-2"
                    type="email"
                    style={{ height: "41px" }}
                    placeholder="Parent Email"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleChange}
                  />
                  {errors.parentEmail && (
                    <span className="text-danger fs_14">
                      {errors.parentEmail}
                    </span>
                  )}
                </Col>
              </>
            ) : null}
            {role === "Athlete" ? (
              <>
                <Col md={12} className="d-flex flex-column mt-3">
                  <label className="ff-gotham-bold mb-0" htmlFor="parentName">
                    Club Id
                  </label>
                  <input
                    className="w-100 mt-2 custom_border ff-gotham-light py-2"
                    type="text"
                    maxLength="10"
                    style={{ height: "41px" }}
                    placeholder="Club Id"
                    name="clubId"
                    value={formData.clubId}
                    onChange={handleChange}
                  />
                  {isClubValid && (
                    <span className="text-success fs_14">
                      🎉 Valid Club ID applied! You’ll get a discounted plan.
                    </span>
                  )}
                  {errors.parentName && (
                    <span className="text-danger fs_14">
                      {errors.parentName}
                    </span>
                  )}
                </Col>
              </>
            ) : null}
            <Col md={12} className="d-flex mt-3 flex-column">
              <label className="ff-gotham-bold mb-0" htmlFor="password">
                Create Password
              </label>
              <div className="position-relative">
                <input
                  className="w-100 mt-2 custom_border ff-gotham-light py-2"
                  type={showPassword ? "text" : "password"}
                  style={{ height: "41px" }}
                  placeholder="Create Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <img
                  className="position-absolute top-0 end-0 pt-4 cursor-pointer pe-3"
                  src={ice_icon}
                  alt="ice_icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              {errors.password && (
                <span className="text-danger fs_14">{errors.password}</span>
              )}
            </Col>

            <Col md={12} className="d-flex mt-3 flex-column">
              <label className="ff-gotham-bold mb-0" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="position-relative">
                <input
                  className="w-100 mt-2 custom_border ff-gotham-light py-2"
                  type={showPassword ? "text" : "password"}
                  style={{ height: "41px" }}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <img
                  className="position-absolute top-0 end-0 pt-4 cursor-pointer pe-3"
                  src={ice_icon}
                  alt="ice_icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              {errors.confirmPassword && (
                <span className="text-danger fs_14">
                  {errors.confirmPassword}
                </span>
              )}
            </Col>
          </Row>
          <div className="d-flex mt-3 align-items-center gap-2">
            <input
              type="checkbox"
              id="Accept"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <label
              className="ff-gotham-normal fs_14 mb-0 mt-1"
              htmlFor="Accept"
            >
              Accept terms and conditions. Read T&C
            </label>
          </div>
          {errors.termsAccepted && (
            <span className="text-danger">{errors.termsAccepted}</span>
          )}
          <button
            onClick={handleSubmit}
            style={{ height: "42px", borderRadius: "8.66px" }}
            className="w-100 bg_theme ff-gotham-bold text-white border-0 mt-4 rounded-2"
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
          <p className="fs_12 text-center fw-semibold mt-3 mb-0">
            Already have an account?
            <span
              onClick={() => navigate("/sign-in")}
              className="fw-bold color_theme cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
