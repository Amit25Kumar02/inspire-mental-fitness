import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../../assets/image/png/logo.png";
import { List } from "antd";
import { Link } from "react-router-dom";
import "./AppFooter.css";

const AppFooter = () => {
  return (
    <div className="footer-bg-theme py-5">
      <Container>
        <Row>
          <Col lg={4} className="pe-5">
            <div>
              <img
                style={{ width: "200px", height: "62px" }}
                src={logo}
                alt="logo"
              />
              <p className="ff-gotham-normal clr-black opacity-60 fs_16 mt-3 mb-0">
                Our mission is to provide you with the tools, resources, and
                community support you need to maintain and improve your mental
                fitness.
              </p>
            </div>
          </Col>
          <Col className="mt-4 mt-lg-0" lg={8}>
            <Row className="justify-content-end">
              <Col sm={6} md={4}>
                <List>
                  <List.Item className="border-0 py-1 ff-gotham-bold fs-26 clr-black">
                    <a className="clr-black" href="#Features">
                      Features
                    </a>
                  </List.Item>
                  <List.Item className="border-0 py-1 ff-gotham-bold fs-26 clr-black">
                    <Link className="clr-black" to={"/about-us"}>
                      About Us
                    </Link>
                  </List.Item>
                  <List.Item className="border-0 py-1 ff-gotham-bold fs-26 clr-black">
                    <a className="clr-black" href="#Pricing">
                      Pricing
                    </a>
                  </List.Item>
                  <List.Item className="border-0 py-1 ff-gotham-bold fs-26 clr-black">
                    <a className="clr-black" href="#Blog">
                      Blog
                    </a>
                  </List.Item>
                  <List.Item className="border-0 py-1 ff-gotham-bold fs-26 clr-black">
                    <Link className="clr-black" to={"/contact-us"}>
                      Contact Us
                    </Link>
                  </List.Item>
                </List>
              </Col>
              <Col className="mt-4 mt-md-0" sm={6} md={4}>
                <List>
                  <List.Item className="border-0 py-1 ff-gotham-bold fs_20 clr-black">
                    Company
                  </List.Item>
                  <List.Item className="border-0 py-1 ff-gotham-normal fs_16 clr-black">
                    <Link className="clr-black" to={"/our-team"}>
                      Our Team
                    </Link>
                  </List.Item>
                  <List.Item className="border-0 py-1 ff-gotham-normal fs_16 clr-black">
                    <Link className="clr-black" to={"/privacy-policy"}>
                      Privacy Policy
                    </Link>
                  </List.Item>
                  <List.Item className="border-0 py-1 ff-gotham-normal fs_16 clr-black">
                    <Link className="clr-black" to={"/term-and-conditions"}>
                      Term and Conditions
                    </Link>
                  </List.Item>
                </List>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AppFooter;
