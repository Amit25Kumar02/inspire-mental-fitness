import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import sportsImage from "../../../assets/image/png/callToactionImage.png";
import { toast, ToastContainer } from "react-toastify";

const CallToAction = ({ show, onHide, selectedPlan }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    bestTimeToContact: "",
    teamName: "", // For "Team" plan
    clubName: "", // For "Club" plan
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/contact-requests`,
        {
          ...formData,
          plan: selectedPlan, // Include selectedPlan for context
        }
      );
      // Show success message
      toast.success("Your request has been submitted successfully!");
      onHide();
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        bestTimeToContact: "",
        teamName: "",
        clubName: "",
      });
    } catch (error) {
      // Check if the error is a conflict (409)
      if (error.response && error.response.status === 409) {
        const errorMessage =
          error.response.data.message || "Email or phone number already exists";
        // Show error message using toast
        toast.error(errorMessage);
      } else {
        // General error message
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="call-to-action">
        <Modal size="lg" show={show} onHide={onHide} centered>
          <Modal.Header
            style={{ borderRadius: "7px" }}
            closeButton
            className="p-0 m-0 bg_theme border-0"
          ></Modal.Header>
          <Modal.Body className="py-0 pe-md-4 px-0 mt-0 border-0">
            <Row>
              {/* Left Section with Image */}
              <Col lg={6}>
                <div className="d-flex justify-content-center align-items-center h-100 call-to-action-img ">
                  <div
                    style={{
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <img
                      src={sportsImage}
                      className="lg-100"
                      alt="Subscribe Illustration"
                      style={{ maxWidth: "300px" }}
                    />
                  </div>
                </div>
              </Col>

              {/* Right Form Section */}
              <Col lg={6} className="py-4 px-5 px-md-0">
                <h5 className="mb-3 ff-gotham-bold fs_20">
                  Contact us regarding {selectedPlan}
                </h5>
                <p className="text-muted mb-4 ff-gotham-normal">
                  Let's keep in touch! Please fill out the form below and we’ll
                  get in touch with you soon.
                </p>

                <Form onSubmit={handleSubmit}>
                  {/* Full Name Field */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      className="ff-gotham-normal"
                      type="text"
                      name="name"
                      value={formData.name}
                      placeholder="Enter Your Full Name"
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  {/* Email Address Field */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      className="ff-gotham-normal"
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder="Enter Your Email Address"
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  {/* Phone Number Field */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      className="ff-gotham-normal"
                      type="number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      placeholder="Enter Your Phone Number"
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  {/* Best Time to Contact Field */}
                  <Form.Group className="mb-3">
                    <Form.Select
                      className="ff-gotham-normal"
                      name="bestTimeToContact"
                      value={formData.bestTimeToContact}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>
                        Select Best Time to Contact
                      </option>
                      <option value="Morning">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon">
                        Afternoon (12 PM - 3 PM)
                      </option>
                      <option value="Evening">Evening (3 PM - 6 PM)</option>
                      <option value="Night">Night (6 PM - 9 PM)</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Team Name Field */}
                  {selectedPlan === "The Team" && (
                    <Form.Group className="mb-3">
                      <Form.Control
                        className="ff-gotham-normal"
                        type="text"
                        name="teamName"
                        value={formData.teamName}
                        placeholder="Enter Team Name"
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  )}

                  {/* Club Name Field */}
                  {selectedPlan === "The Club" && (
                    <Form.Group className="mb-3">
                      <Form.Control
                        className="ff-gotham-normal"
                        type="text"
                        name="clubName"
                        value={formData.clubName}
                        placeholder="Enter Club Name"
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  )}

                  {/* Submit Button */}
                  <Button
                    variant="success"
                    type="submit"
                    className="w-100 ff-gotham-medium"
                  >
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default CallToAction;
