import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { countries } from "countries-list";
import { toast, ToastContainer } from "react-toastify";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import {
  createDiscoveryCallRequest,
  createUserContactRequest,
} from "../services/discoveryCallRequestService";
import AppNav from "../components/landingPage/AppNavbar/AppNav";
import AppFooter from "../components/landingPage/AppFooter/AppFooter";
import contactUsimg from "../assets/image/png/contactUsImage.png";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    country: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value,
    }));
  };

  const handleCountryChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      country: selectedOption,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUserContactRequest({
        ...formData,
        country: formData.country ? formData.country.label : "",
      });

      if (response.status === true) {
        toast.success("Request Submitted Successfully!");
        setFormData({
          name: "",
          phoneNumber: "",
          email: "",
          country: null,
        });
      } else {
        toast.error("Something went wrong, please try again!");
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          `${
            error.response.data.message ||
            "Request failed with status " + error.response.status
          }`
        );
      } else if (error.request) {
        toast.error("No response received from the server.");
      } else {
        toast.error("Something went wrong while submitting your request.");
      }
      console.error("API Error:", error);
    }
  };

  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name,
  }));

  return (
    <>
      <ToastContainer />
      <div className="landing-page-body">
        <AppNav />
        <div className="container contact-us-page py-5">
          <h1 className="ff-gotham-bold text-center mb-5">Contact Us</h1>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="text-center">
                <img className="w-50" src={contactUsimg} alt="" />
              </div>
            </Col>
            <Col md={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    className="bg-transparent"
                    type="text"
                    name="name"
                    placeholder="Enter Your Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <PhoneInput
                    className="mt-2 custom_border_phone_input-contact-us ff-gotham-light h-100 border-0 bg-transparent"
                    style={{ height: "41px" }}
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    className="bg-transparent"
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Select
                    className="bg-transparent"
                    options={countryOptions}
                    value={formData.country}
                    onChange={handleCountryChange}
                    placeholder="Select Your Country"
                    isClearable
                  />
                </Form.Group>

                <button
                  type="submit"
                  className="w-50 rounded-2 mx-auto text-white px-4 py-2 bg_theme border-0 ff-gotham-medium"
                >
                  Submit
                </button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default ContactUsPage;
