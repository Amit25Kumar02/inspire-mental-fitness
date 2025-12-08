import React from "react";
import "../authPages/auth.css";
import logo from "../../assets/image/png/logo.png";
import cross_icon from "../../assets/image/svg/cross_icon.svg";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AuthHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-4 ">
      <Container>
        <div className="d-flex align-items-center justify-content-between">
          <img
            style={{ width: "200px", height: "62px" }}
            onClick={() => navigate("/")}
            className=" cursor-pointer"
            src={logo}
            alt="website logo"
          />
          <Link to={"/"}>
            <img
              className=" cursor-pointer"
              src={cross_icon}
              alt="cross icon"
            />
          </Link>
        </div>
      </Container>
      <div className="border mt-4"></div>
    </div>
  );
};

export default AuthHeader;
