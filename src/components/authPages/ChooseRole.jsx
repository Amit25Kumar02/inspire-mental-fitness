// src/components/ChooseRole.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./auth.css";
import AuthHeader from "./AuthHeader";
import { Col, Container, Row } from "react-bootstrap";
import choose_role_image1 from "../../assets/image/png/choose_role_image1.png";
import choose_role_image2 from "../../assets/image/png/choose_role_image2.png";
import { setRole } from "../../redux/slice/UserSlice";

const ChooseRole = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    dispatch(setRole(role));
    navigate("/sign-up");
  };

  return (
    <div className="d-flex min-vh-100 flex-column">
      <div className="bg_overlay">
        <AuthHeader />
      </div>
      <Container className="d-flex py-4 flex-column flex-grow-1 justify-content-center align-items-center">
        <div className="role_box py-4">
          <h5 className="ff-gotham-bold px-4 text-center mb-0 fs_25 fw-bold color_lightblack">
            Select your Role to Continue
          </h5>
          <div className="border mt-4"></div>
          <Row className="justify-content-center p-md-4 p-3 mt-3">
            <Col md={5}>
              <div
                className={`border border-2 p-4 pb-3 bg_blue rounded-4 ${
                  selectedRole === "coach" ? "border_theme" : ""
                }`}
                onClick={() => handleRoleClick("Coach")}
                style={{ cursor: "pointer" }}
              >
                <h5 className="ff-gotham-bold fs_24 tet mb-0 mt-2 text-white">
                  Coach
                </h5>
                <p className="ff-gotham-normal fs_18 tet mb-0 mt-2 text-white">
                  \ koʊtʃ \ • Noun
                </p>
                <p className="ff-gotham-normal fs_18 tet mb-0 mt-2 text-white">
                  A passionate and dedicated person who unlocks hidden potential
                  by developing, encouraging, and believing
                </p>
              </div>
            </Col>
            <Col md={5} className="mt-4 mt-md-0">
              <div
                className={`border border-2 p-4 pb-3 bg_theme rounded-4 h-100 ${
                  selectedRole === "Athlete" ? "border_theme" : ""
                }`}
                onClick={() => handleRoleClick("Athlete")}
                style={{ cursor: "pointer" }}
              >
                <h5 className="ff-gotham-bold fs_24 tet mb-0 mt-2 text-white">
                  Athlete
                </h5>
                <p className="ff-gotham-normal fs_18 tet mb-0 mt-2 text-white">
                  \ ath-lēt \ • Noun
                </p>
                <p className="ff-gotham-normal fs_18 tet mb-0 mt-2 text-white">
                  Someone who has a passion for a sport and gives their all to
                  it
                </p>
              </div>
            </Col>
          </Row>
        </div>
        <p className="fs_12 bg_overlay fw-semibold mt-3">
          Already have an account?
          <span className="fw-bold color_theme"> Login</span>
        </p>
      </Container>
    </div>
  );
};

export default ChooseRole;
