import React, { useMemo } from "react";
import "./AppHero.css";
import nextArrow from "../../../assets/image/png/nextArrow.png";
import mainImg from "../../../assets/image/png/heroImg.png";
import mainImgGirl from "../../../assets/image/png/heroImgGirlShilloute.png";
import femaleBasketballSilhouette from "../../../assets/image/png/femaleBasketballSilhouette.png";
import femalefootballSilhouette from "../../../assets/image/png/footballgirlshilloute.png";
import maleBasketballSilhouette from "../../../assets/image/png/basketballplayerShilloute.png";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRole } from "../../../redux/slice/UserSlice";

const AppHero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const randomImage = useMemo(() => {
    const images = [
      mainImg,
      mainImgGirl,
      femaleBasketballSilhouette,
      maleBasketballSilhouette,
      femalefootballSilhouette,
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }, []);

  const handleNavigation = (role) => {
    dispatch(setRole(role));
    navigate("/sign-up");
  };

  return (
    <div className="hero-bg-theme py-5 d-flex flex-column flex-grow-1">
      <Container>
        <Row className="align-items-center">
          <Col className="mt-3 text-center text-lg-start" lg={6}>
            <div>
              <div className="d-flex align-items-center gap-4">
                <div className="hr-line"></div>
                <div className="bg-white px-3 py-1 rounded-5">
                  <p className="mb-0 ff-gotham-normal fs_20">
                    #1 Mental Fitness Platform
                  </p>
                </div>
              </div>
              <h1 className="mb-0 ff-gotham-bold fs-72">
                <span className="elevate-text">Inspire</span> Your Mind{" "}
                <span className="elevate-text">Elevate</span> Your Game
              </h1>
              <p className="mb-0 mt-4 ff-gotham-medium fs_18 clr-black">
                Inspire Mental Fitness with the Athlete in Mind
              </p>

              <Button
                onClick={() => handleNavigation("Athlete")}
                style={{ width: "196px", height: "45px" }}
                className="btn-green-common mx-auto mx-lg-0 rounded-2 d-flex mt-4 text-white align-items-center gap-2 justify-content-center"
              >
                Get Inspired Today
                <img
                  style={{ width: "13px", height: "10px" }}
                  src={nextArrow}
                  alt="nextArrow"
                />
              </Button>
            </div>
          </Col>
          <Col className="mt-4" lg={6}>
            <div className="text-center position-relative">
              <img className="w-75" src={randomImage} alt="heroImage" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AppHero;
