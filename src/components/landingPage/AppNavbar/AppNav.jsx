import React, { useEffect, useState } from "react";
import "./Appnav.css";
import { Button, Container, ListGroup } from "react-bootstrap";
import logo from "../../../assets/image/png/s-logo.png";
import nextArrow from "../../../assets/image/png/nextArrow.png";
import { List } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LanguageDropdown from "./languageDropdown";

const AppNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNav, setShowNav] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userInitial, setUserInitial] = useState("");
  const token = localStorage.getItem("token");

  const handleNavigate = () => {
    const userData = localStorage.getItem("userData");
    if (token) {
      try {
        const parsedData = JSON.parse(userData);
        const userRole = parsedData.role;
        if (token && userRole === "Coach") {
          navigate("/coaching-dashboard");
        }
        if (token && userRole === "Athlete") {
          navigate("/fieldhouse-dashboard");
        }
        if (token && userRole === "Counselor") {
          navigate("/counselor-portal");
        }
      } catch (error) {}
    } else {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    const scrollToSection = () => {
      if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    setTimeout(scrollToSection, 100);
  }, [location]);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserName(parsedData.name);
        setUserRole(parsedData.role);
        setUserInitial(parsedData.name.charAt(0));
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);

  return (
    <div className="pt-4 pb-3 app-navbar-bg-theme shadow-sm">
      <Container>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <Link to={"/"}>
              <img
                className="position-relative logo-index logo-size"
                src={logo}
                alt="logo"
              />
            </Link>
          </div>

          <div>
            <ListGroup
              className={`list-unstyled gap-4 flex-lg-row d-flex justify-content-center align-items-center ${
                showNav === true ? "nav-show" : "nav-hidden"
              }`}
            >
              {/* <List.Item
                className="ff-gotham-normal fs_16"
                onClick={() => setShowNav(false)}
              >
                <a className="color_black4-1" href="/#Features">
                  Features
                </a>
              </List.Item> */}

              {/* <List.Item
                className="ff-gotham-normal fs_16"
                onClick={() => setShowNav(false)}
              >
                <a className="color_black4-1" href="/about-us">
                  About Us
                </a>
              </List.Item> */}

              {/* <List.Item
                className="ff-gotham-normal fs_16"
                onClick={() => setShowNav(false)}
              >
                <a className="color_black4-1" href="/#Pricing">
                  Pricing
                </a>
              </List.Item> */}

              {/* <List.Item
                className="ff-gotham-normal fs_16"
                onClick={() => setShowNav(false)}
              >
                <a className="color_black4-1" href="/#Blog">
                  Blog
                </a>
              </List.Item> */}

              {/* <List.Item
                className="ff-gotham-normal fs_16"
                onClick={() => setShowNav(false)}
              >
                <a className="color_black4-1" href="/contact-us">
                  Contact Us
                </a>
              </List.Item> */}

              <List.Item className="d-lg-none">
                <Button
                  onClick={() => {
                    handleNavigate();
                    setShowNav(false);
                  }}
                  className="bg-transparent border-0 text-white ff-gotham-bold fs_16"
                >
                  Login
                </Button>
              </List.Item>

              <List.Item className="d-lg-none">
                <Button
                  onClick={() => {
                    navigate("/choose-role");
                    setShowNav(false);
                  }}
                  className="btn-green-common text-white d-flex align-items-center gap-2 px-3 ff-gotham-bold fs_16"
                >
                  Register Now
                  <img
                    style={{ width: "13px", height: "10px" }}
                    src={nextArrow}
                    alt="nextArrow"
                  />
                </Button>
              </List.Item>

              <List.Item className="d-lg-none">
                <LanguageDropdown />
              </List.Item>
            </ListGroup>
          </div>

          <div className="d-flex gap-2 align-items-center">
            {token ? (
              <div onClick={handleNavigate} className="cursor-pointer">
                <div className="d-none d-lg-flex gap-3 align-items-center py-3">
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "100%",
                      backgroundColor: "#00000033",
                    }}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <p
                      style={{ color: "#fff" }}
                      className="mb-0 ff-gotham-bold fs_18"
                    >
                      {userInitial}
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div>
                      <p className="mb-0 ff-gotham-bold text-white">{userName}</p>
                      <p className="mb-0 ff-gotham-normal text-white">{userRole}</p>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "100%",
                    backgroundColor: "#00000033",
                  }}
                  className="d-flex d-lg-none align-items-center justify-content-center"
                >
                  <p
                    style={{ color: "#fff" }}
                    className="mb-0 ff-gotham-bold fs_18"
                  >
                    {userInitial}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="d-none d-lg-flex gap-2 align-items-center">
                  <LanguageDropdown />
                  <Button
                    onClick={() => navigate("/sign-in")}
                    className="bg-transparent border-0 text-white ff-gotham-bold fs_16"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navigate("/choose-role")}
                    className="btn-green-common text-white d-flex align-items-center gap-2 px-3 ff-gotham-bold fs_16"
                  >
                    Register Now
                    <img
                      style={{ width: "13px", height: "10px" }}
                      src={nextArrow}
                      alt="nextArrow"
                    />
                  </Button>
                </div>
                <Button
                  onClick={() => setShowNav(!showNav)}
                  className={`d-flex d-lg-none flex-column bg-transparent border-0 p-0 ${
                    showNav ? "hamburger-2" : "hamburger"
                  }`}
                >
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AppNav;
