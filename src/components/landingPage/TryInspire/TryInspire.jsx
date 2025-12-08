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
        <Container className="tryinspire-card pb-3 py-xl-5">

          <Row className="px-md-5 position-relative text-center text-md-start align-items-center">
            <Col lg={2} className="d-none d-md-block">
              <div>
                <img
                  style={{ maxWidth: "150px" }}
                  className="w-100"
                  src={discoverTestHeadIcon}
                  alt="headIcon"
                />
              </div>
            </Col>
            <Col className="" lg={8}>
              <div>
                <p className="mb-0 text-center text-white ff-gotham-bold fs_24">
                  START YOUR JOURNEY WITH INSPIRE MENTAL FITNESS
                </p>
                <p className="mb-0 text-center text-white ff-gotham-bold fs_15">
                  COMPLETE OUR FREE RESEARCH BACKED SCORE BASED SELF DISCOVERY
                  ANALYSIS
                </p>
              </div>
            </Col>
            <Col lg={2} className="d-none d-md-block">
              <div>
                <Button
                  onClick={handleShowModal}
                  className="discovery-test-button ff-gotham-medium fs_16 position-relative ms-auto d-flex text-white align-items-center gap-2 justify-content-center"
                >
                  <span className="position-relative z-2">Get Inspired</span>
                  <div
                    style={{
                      borderRadius: "100%",
                    }}
                    className="d-flex align-items-center justify-content-center position-absolute bg-white-pointer"
                  >
                    <img
                      style={{ maxWidth: "12px" }}
                      src={mousePointer}
                      alt=""
                    />
                  </div>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
        <TryInspireModal show={showModal} handleClose={handleCloseModal} />
      </div>
    </>
  );
};

export default TryInspire;
