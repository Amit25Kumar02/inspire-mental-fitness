import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { patientDemographicData } from "../../../services/CounselingTicketRaising";
import { toast, ToastContainer } from "react-toastify";

const PatientDemographicForm = () => {
  const [ticketRequestId, setTicketRequestId] = useState("");
  const [athleteId, setAtheletetId] = useState("");
  const [formData, setFormData] = useState({
    patientInfo: {
      name: "",
      socialSecurity: "",
      dob: "",
      age: "",
      sex: "",
      maritalStatus: "",
      address: { street: "", apt: "", city: "", state: "", zip: "" },
      contact: { homePhone: "", cellPhone: "", workPhone: "", email: "" },
      referral: "",
    },
    guarantorInfo: {
      name: "",
      dob: "",
      socialSecurity: "",
      address: "",
      homePhone: "",
      employer: "",
      workPhone: "",
      relationshipToPatient: "",
      cellPhone: "",
    },
    insuranceInfo: {
      primary: {
        company: "",
        insured: "",
        dob: "",
        socialSecurity: "",
        memberId: "",
        groupId: "",
      },
      secondary: {
        company: "",
        insured: "",
        dob: "",
        socialSecurity: "",
        memberId: "",
        groupId: "",
      },
    },
  });

  const [step, setStep] = useState(1);

  const handleChange = (e, section, field, subField = null) => {
    const value = e.target.value;
    setFormData((prevData) => {
      const newData = { ...prevData };
      if (subField) {
        newData[section][field][subField] = value;
      } else {
        newData[section][field] = value;
      }
      return newData;
    });
  };

  const handleNextStep = () => setStep((prevStep) => prevStep + 1);
  const handlePreviousStep = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields
    const { patientInfo, guarantorInfo, insuranceInfo } = formData;

    const requiredFields = [
      // Patient Info
      patientInfo.name,
      patientInfo.socialSecurity,
      patientInfo.dob,
      patientInfo.age,
      patientInfo.sex,
      patientInfo.maritalStatus,
      patientInfo.address.street,
      patientInfo.address.city,
      patientInfo.address.state,
      patientInfo.address.zip,
      patientInfo.contact.homePhone,
      patientInfo.contact.cellPhone,
      patientInfo.contact.workPhone,
      patientInfo.contact.email,
      patientInfo.referral,

      // Guarantor Info
      guarantorInfo.name,
      guarantorInfo.dob,
      guarantorInfo.socialSecurity,
      guarantorInfo.address,
      guarantorInfo.homePhone,
      guarantorInfo.employer,
      guarantorInfo.workPhone,
      guarantorInfo.relationshipToPatient,
      guarantorInfo.cellPhone,

      // Primary insurance info
      insuranceInfo.primary.company,
      insuranceInfo.primary.insured,
      insuranceInfo.primary.dob,
      insuranceInfo.primary.socialSecurity,
      insuranceInfo.primary.memberId,
      insuranceInfo.primary.groupId,
    ];

    // Check if any required field is missing
    const isFormValid = requiredFields.every(
      (field) => field !== "" && field !== undefined
    );

    if (!isFormValid) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!ticketRequestId || !athleteId) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await patientDemographicData({
        demographicForm: formData,
        ticketRequestId,
        athleteId,
      });

      if (response.success === true) {
        toast.success("Form submitted successfully");
        setTicketRequestId("");
        setAtheletetId("");
        setFormData({
          patientInfo: {
            name: "",
            socialSecurity: "",
            dob: "",
            age: "",
            sex: "",
            maritalStatus: "",
            address: { street: "", apt: "", city: "", state: "", zip: "" },
            contact: { homePhone: "", cellPhone: "", workPhone: "", email: "" },
            referral: "",
          },
          guarantorInfo: {
            name: "",
            dob: "",
            socialSecurity: "",
            address: "",
            homePhone: "",
            employer: "",
            workPhone: "",
            relationshipToPatient: "",
            cellPhone: "",
          },
          insuranceInfo: {
            primary: {
              company: "",
              insured: "",
              dob: "",
              socialSecurity: "",
              memberId: "",
              groupId: "",
            },
            secondary: {
              company: "",
              insured: "",
              dob: "",
              socialSecurity: "",
              memberId: "",
              groupId: "",
            },
          },
        });
      }
    } catch (error) {
      console.error("Error submitting demographic data:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="landing-page-body">
        <Container className="py-5 bg-transparent">
          <h4 className="fs_25 ff-gotham-bold color_black2 fw-bold mb-0 text-center pb-5">
            PATIENT DEMOGRAPHIC FORM
          </h4>
          <Form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div className="bg-white rounded-3 p-5">
                  <h4 className="ff-gotham-bold">Patient Information</h4>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="patientName">
                        <Form.Label className="ff-gotham-medium">
                          Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={formData.patientInfo.name}
                          onChange={(e) =>
                            handleChange(e, "patientInfo", "name")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="patientSSN">
                        <Form.Label className="ff-gotham-medium">
                          Social Security Number
                        </Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={formData.patientInfo.socialSecurity}
                          onChange={(e) =>
                            handleChange(e, "patientInfo", "socialSecurity")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="patientDob">
                        <Form.Label className="ff-gotham-medium">
                          Date of Birth
                        </Form.Label>
                        <Form.Control
                          type="date"
                          required
                          value={formData.patientInfo.dob}
                          onChange={(e) =>
                            handleChange(e, "patientInfo", "dob")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="patientAge">
                        <Form.Label className="ff-gotham-medium">
                          Age
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={formData.patientInfo.age}
                          onChange={(e) =>
                            handleChange(e, "patientInfo", "age")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="patientSex">
                        <Form.Label className="ff-gotham-medium">
                          Sex
                        </Form.Label>
                        <Form.Control
                          as="select"
                          required
                          value={formData.patientInfo.sex}
                          onChange={(e) =>
                            handleChange(e, "patientInfo", "sex")
                          }
                          className="ff-gotham-normal"
                        >
                          <option value="">Select...</option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="maritalStatus">
                        <Form.Label className="ff-gotham-medium">
                          Marital Status
                        </Form.Label>
                        <Form.Control
                          as="select"
                          value={formData.patientInfo.maritalStatus}
                          onChange={(e) =>
                            handleChange(e, "patientInfo", "maritalStatus")
                          }
                          className="ff-gotham-normal"
                        >
                          <option value="">Select...</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Widow/er">Widow/er</option>
                          <option value="Divorced">Divorced</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <h4 className="ff-gotham-bold mt-4">Address</h4>
                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="street">
                        <Form.Label className="ff-gotham-medium">
                          Street
                        </Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={formData.patientInfo.address.street}
                          onChange={(e) =>
                            handleChange(e, "patientInfo", "address", "street")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="apt">
                        <Form.Label className="ff-gotham-medium">
                          Apt
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.patientInfo.address.apt}
                          onChange={(e) =>
                            handleChange(e, "patientInfo", "address", "apt")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="city">
                        <Form.Label className="ff-gotham-medium">
                          City
                        </Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={formData.patientInfo.address.city}
                          onChange={(e) =>
                            handleChange(e, "patientInfo", "address", "city")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="state">
                        <Form.Label className="ff-gotham-medium">
                          State
                        </Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={formData.patientInfo.address.state}
                          onChange={(e) =>
                            handleChange(e, "patientInfo", "address", "state")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="zip">
                        <Form.Label className="ff-gotham-medium">
                          Zip
                        </Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={formData.patientInfo.address.zip}
                          onChange={(e) =>
                            handleChange(e, "patientInfo", "address", "zip")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <h4 className="ff-gotham-bold mt-4">Contact</h4>
                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="homePhone">
                        <Form.Label className="ff-gotham-medium">
                          Home Phone
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.patientInfo.contact.homePhone}
                          onChange={(e) =>
                            handleChange(
                              e,
                              "patientInfo",
                              "contact",
                              "homePhone"
                            )
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="cellPhone">
                        <Form.Label className="ff-gotham-medium">
                          Cell Phone
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.patientInfo.contact.cellPhone}
                          onChange={(e) =>
                            handleChange(
                              e,
                              "patientInfo",
                              "contact",
                              "cellPhone"
                            )
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="workPhone">
                        <Form.Label className="ff-gotham-medium">
                          Work Phone
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.patientInfo.contact.workPhone}
                          onChange={(e) =>
                            handleChange(
                              e,
                              "patientInfo",
                              "contact",
                              "workPhone"
                            )
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="email">
                        <Form.Label className="ff-gotham-medium">
                          Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          value={formData.patientInfo.contact.email}
                          onChange={(e) =>
                            handleChange(e, "patientInfo", "contact", "email")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="referral">
                        <Form.Label className="ff-gotham-medium">
                          Referral
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.patientInfo.referral}
                          onChange={(e) =>
                            handleChange(e, "patientInfo", "referral")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="text-end mt-3">
                    <Button
                      style={{
                        width: "120px",
                        height: "45px",
                        borderRadius: "10px",
                      }}
                      className="ff-gotham-medium btn-green-common text-white"
                      onClick={handleNextStep}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="bg-white p-5">
                  <h2 className="ff-gotham-bold">Guarantor Information</h2>
                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="guarantorName">
                        <Form.Label className="ff-gotham-medium">
                          Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.guarantorInfo.name}
                          onChange={(e) =>
                            handleChange(e, "guarantorInfo", "name")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="guarantorDob">
                        <Form.Label className="ff-gotham-medium">
                          Date of Birth
                        </Form.Label>
                        <Form.Control
                          type="date"
                          value={formData.guarantorInfo.dob}
                          onChange={(e) =>
                            handleChange(e, "guarantorInfo", "dob")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="guarantorSSN">
                        <Form.Label className="ff-gotham-medium">
                          Social Security Number
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.guarantorInfo.socialSecurity}
                          onChange={(e) =>
                            handleChange(e, "guarantorInfo", "socialSecurity")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="guarantorAddress">
                        <Form.Label className="ff-gotham-medium">
                          Address
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.guarantorInfo.address}
                          onChange={(e) =>
                            handleChange(e, "guarantorInfo", "address")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="guarantorHomePhone">
                        <Form.Label className="ff-gotham-medium">
                          Home Phone
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.guarantorInfo.homePhone}
                          onChange={(e) =>
                            handleChange(e, "guarantorInfo", "homePhone")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="guarantorEmployer">
                        <Form.Label className="ff-gotham-medium">
                          Employer
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.guarantorInfo.employer}
                          onChange={(e) =>
                            handleChange(e, "guarantorInfo", "employer")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="guarantorWorkPhone">
                        <Form.Label className="ff-gotham-medium">
                          Work Phone
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.guarantorInfo.workPhone}
                          onChange={(e) =>
                            handleChange(e, "guarantorInfo", "workPhone")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="relationshipToPatient">
                        <Form.Label className="ff-gotham-medium">
                          Relationship to Patient
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.guarantorInfo.relationshipToPatient}
                          onChange={(e) =>
                            handleChange(
                              e,
                              "guarantorInfo",
                              "relationshipToPatient"
                            )
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="guarantorCellPhone">
                        <Form.Label className="ff-gotham-medium">
                          Cell Phone
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.guarantorInfo.cellPhone}
                          onChange={(e) =>
                            handleChange(e, "guarantorInfo", "cellPhone")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="text-end">
                    <Button
                      style={{
                        width: "120px",
                        height: "45px",
                        borderRadius: "10px",
                      }}
                      variant="secondary"
                      onClick={handlePreviousStep}
                      className="me-2"
                    >
                      Previous
                    </Button>
                    <Button
                      style={{
                        width: "120px",
                        height: "45px",
                        borderRadius: "10px",
                      }}
                      onClick={handleNextStep}
                      className="ff-gotham-medium btn-green-common text-white"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="bg-white p-5">
                  <h2 className="ff-gotham-bold">Insurance Information</h2>

                  <h4 className="ff-gotham-medium fs_20 mt-4">
                    Primary Insurance
                  </h4>
                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="primaryInsuranceCompany">
                        <Form.Label className="ff-gotham-medium">
                          Company
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.insuranceInfo.primary.company}
                          onChange={(e) =>
                            handleChange(
                              e,
                              "insuranceInfo",
                              "primary",
                              "company"
                            )
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="primaryInsured">
                        <Form.Label className="ff-gotham-medium">
                          Insured
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.insuranceInfo.primary.insured}
                          onChange={(e) =>
                            handleChange(
                              e,
                              "insuranceInfo",
                              "primary",
                              "insured"
                            )
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="primaryDob">
                        <Form.Label className="ff-gotham-medium">
                          Date of Birth
                        </Form.Label>
                        <Form.Control
                          type="date"
                          value={formData.insuranceInfo.primary.dob}
                          onChange={(e) =>
                            handleChange(e, "insuranceInfo", "primary", "dob")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="primarySSN">
                        <Form.Label className="ff-gotham-medium">
                          Social Security Number
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.insuranceInfo.primary.socialSecurity}
                          onChange={(e) =>
                            handleChange(
                              e,
                              "insuranceInfo",
                              "primary",
                              "socialSecurity"
                            )
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="primaryMemberId">
                        <Form.Label className="ff-gotham-medium">
                          Member ID
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.insuranceInfo.primary.memberId}
                          onChange={(e) =>
                            handleChange(
                              e,
                              "insuranceInfo",
                              "primary",
                              "memberId"
                            )
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="primaryGroupId">
                        <Form.Label className="ff-gotham-medium">
                          Group ID
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.insuranceInfo.primary.groupId}
                          onChange={(e) =>
                            handleChange(
                              e,
                              "insuranceInfo",
                              "primary",
                              "groupId"
                            )
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <h4 className="ff-gotham-medium fs_20 mt-4">
                    Secondary Insurance
                  </h4>
                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="secondaryInsuranceCompany">
                        <Form.Label className="ff-gotham-medium">
                          Company
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.insuranceInfo.secondary.company}
                          onChange={(e) =>
                            handleChange(
                              e,
                              "insuranceInfo",
                              "secondary",
                              "company"
                            )
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="secondaryInsured">
                        <Form.Label className="ff-gotham-medium">
                          Insured
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.insuranceInfo.secondary.insured}
                          onChange={(e) =>
                            handleChange(
                              e,
                              "insuranceInfo",
                              "secondary",
                              "insured"
                            )
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="secondaryDob">
                        <Form.Label className="ff-gotham-medium">
                          Date of Birth
                        </Form.Label>
                        <Form.Control
                          type="date"
                          value={formData.insuranceInfo.secondary.dob}
                          onChange={(e) =>
                            handleChange(e, "insuranceInfo", "secondary", "dob")
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="secondarySSN">
                        <Form.Label className="ff-gotham-medium">
                          Social Security Number
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={
                            formData.insuranceInfo.secondary.socialSecurity
                          }
                          onChange={(e) =>
                            handleChange(
                              e,
                              "insuranceInfo",
                              "secondary",
                              "socialSecurity"
                            )
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group controlId="secondaryMemberId">
                        <Form.Label className="ff-gotham-medium">
                          Member ID
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.insuranceInfo.secondary.memberId}
                          onChange={(e) =>
                            handleChange(
                              e,
                              "insuranceInfo",
                              "secondary",
                              "memberId"
                            )
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="secondaryGroupId">
                        <Form.Label className="ff-gotham-medium">
                          Group ID
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.insuranceInfo.secondary.groupId}
                          onChange={(e) =>
                            handleChange(
                              e,
                              "insuranceInfo",
                              "secondary",
                              "groupId"
                            )
                          }
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-4" sm={6}>
                      <Form.Group controlId="ticketId">
                        <Form.Label className="ff-gotham-medium">
                          Ticket ID
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={ticketRequestId}
                          onChange={(e) => setTicketRequestId(e.target.value)}
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                    <Col className="mt-4" sm={6}>
                      <Form.Group controlId="ticketId">
                        <Form.Label className="ff-gotham-medium">
                          Athelete ID
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={athleteId}
                          onChange={(e) => setAtheletetId(e.target.value)}
                          className="ff-gotham-normal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="text-end mt-3">
                    <Button
                      style={{
                        width: "120px",
                        height: "45px",
                        borderRadius: "10px",
                      }}
                      variant="secondary"
                      onClick={handlePreviousStep}
                      className="me-2"
                    >
                      Previous
                    </Button>
                    <Button
                      style={{
                        width: "120px",
                        height: "45px",
                        borderRadius: "10px",
                      }}
                      className="ff-gotham-medium btn-green-common text-white"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Form>
        </Container>
      </div>
    </>
  );
};

export default PatientDemographicForm;
