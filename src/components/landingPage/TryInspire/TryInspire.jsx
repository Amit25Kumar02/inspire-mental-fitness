import React, { useState } from "react";
import "./TryInspire.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import discoverTestHeadIcon from "../../../assets/image/png/discoverTestHeadIcon.png";
import mousePointer from "../../../assets/image/png/mousePointer.png";
import TryInspireModal from "../../Modals/TryInspireModal";
import { ToastContainer } from "react-toastify";

const TryInspire = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      <div className="tryinspire-wrapper py-5 px-2">
        <Container className="tryinspire-card">
          <Row className="px-md-5 position-relative text-center align-items-center g-3 g-md-4">
            <Col xs={12} md={2} className="d-flex justify-content-center">
              <img
                style={{ maxWidth: "150px" }}
                className="w-100 tryinspire-icon"
                src={discoverTestHeadIcon}
                alt="headIcon"
              />
            </Col>
            <Col xs={12} md={8}>
              <div className="px-2">
                <p className="mb-2 text-center text-white ff-gotham-bold fs_24">
                  START YOUR JOURNEY WITH INSPIRE MENTAL FITNESS
                </p>
                <p className="mb-0 text-center text-white ff-gotham-bold fs_15">
                  COMPLETE OUR FREE RESEARCH BACKED SCORE BASED SELF DISCOVERY
                  ANALYSIS
                </p>
              </div>
            </Col>
            <Col xs={12} md={2} className="d-flex justify-content-center">
              <Button
                onClick={handleShowModal}
                className="discovery-test-button ff-gotham-medium fs_16 position-relative d-flex text-white align-items-center gap-2 justify-content-center"
              >
                <span className="position-relative z-2">Get Inspired</span>
                <div className="d-flex align-items-center justify-content-center position-absolute bg-white-pointer">
                  <img
                    style={{ maxWidth: "12px" }}
                    src={mousePointer}
                    alt="pointer"
                  />
                </div>
              </Button>
            </Col>
          </Row>
        </Container>
        <TryInspireModal show={showModal} handleClose={handleCloseModal} />
      </div>
    </>
  );
};

export default TryInspire;
