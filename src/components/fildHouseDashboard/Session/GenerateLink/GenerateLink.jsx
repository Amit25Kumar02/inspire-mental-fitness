import { Layout } from "antd";
import { Modal } from "react-bootstrap";
import "./GenerateLink.css";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Toast } from "react-bootstrap";
import callIcon from "../../../../assets/image/svg/callIcon.svg";
import {
  ElementsConsumer,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  checkIfSessionScheduled,
  getAllAvailableSlots,
  getAvailableSlots,
  raiseCounselingTicket,
} from "../../../../services/CounselingTicketRaising";
import checked from "../../../../assets/image/png/checked.png";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

const GenerateLink = ({ getSessions, role, loadPaymentIntent }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [isTimeConfirmed, setIsTimeConfirmed] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isSessionBooked, setIsSessionBooked] = useState(null);
  const [isSessionBookedInsurance, setIsSessionBookedInsurance] =
    useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [paymentOption, setPaymentOption] = useState(null);
  const [paymentElement, setPaymentElement] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [availableTimesForDate, setAvailableTimesForDate] = useState([]);
  const [authCode, setAuthCode] = useState(null);
  const STRIPE_PRICE = 100;
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();

  const formatTo12Hour = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const isPM = hours >= 12;
    const formattedHour = hours % 12 || 12;
    const formattedMinute =
      minutes === 0 ? "" : `:${String(minutes).padStart(2, "0")}`;
    const period = isPM ? "PM" : "AM";
    return `${formattedHour}${formattedMinute} ${period}`;
  };

  const allTimeSlots = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];
  const isTimeDisabled = (time) => {
    const currentDate = new Date();
    if (selectedDate.toDateString() === currentDate.toDateString()) {
      const [hour, minute] = time.split(":").map(Number);
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();
      return (
        hour < currentHour || (hour === currentHour && minute <= currentMinute)
      );
    }
    return false;
  };

  const formatDateToLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchSession = async (date) => {
    const formattedDate = formatDateToLocal(date);
    try {
      const response = await checkIfSessionScheduled(formattedDate);
      setIsSessionBooked(response?.sessionExists);
      setIsSessionBookedInsurance(response?.insurancePending);
    } catch (error) {
      console.error("Error fetching session: ", error);
    }
  };

  const fetchSlots = async (date) => {
    const formattedDate = formatDateToLocal(date);
    try {
      const response = await getAvailableSlots(formattedDate);
    } catch (error) {
      console.error("Error fetching session: ", error);
    }
  };

  const fetchCounselorAvailable = async () => {
    try {
      const response = await getAllAvailableSlots();
      console.log("response", response);

      const adjustedSlots = response?.availableSlots?.map((slot) => ({
        ...slot,
        localDate: new Date(slot.date),
      }));

      setAvailableSlots(adjustedSlots);
    } catch (error) {
      console.error("Error fetching counselor availability: ", error);
      setAvailableSlots([]);
    }
  };

  useEffect(() => {
    const date = new Date();
    fetchSession(date);
    fetchSlots(date);
    fetchCounselorAvailable();
  }, []);

  const handleTimeSelect = (time) => {
    if (!isTimeDisabled(time)) {
      setSelectedTime(time);
      setIsTimeConfirmed(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    fetchSession(date);
    fetchSlots(date);

    const selectedDateSlot = availableSlots.find(
      (slot) => new Date(slot.date).toDateString() === date.toDateString()
    );

    const times = selectedDateSlot
      ? selectedDateSlot.availableSlots.map(
          (timeSlot) => `${timeSlot.startTime}-${timeSlot.endTime}`
        )
      : [];

    setAvailableTimesForDate(times);
  };

  const handleConfirmTime = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentOptionSelect = (option) => {
    setPaymentOption(option);
    if (option === "Stripe") {
      setShowPaymentModal(false);
      setShowStripeModal(true);
    } else {
      submitSession("Insurance", "Pending");
    }
  };

  const submitSession = (paymentOption, paymentStatus = "Pending") => {
    const formattedDate = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

    const sessionData = {
      date: formattedDate,
      time: selectedTime,
      paymentOption,
      paymentStatus,
      ...(paymentOption === "Stripe" && { price: STRIPE_PRICE }),
      code: authCode,
    };

    raiseCounselingTicket(sessionData)
      .then((response) => {
        setIsTimeConfirmed(true);
        setShowPaymentModal(false);
        fetchSession(selectedDate);
        setShowToast(true);
        setShowStripeModal(false);
        getSessions();
      })
      .catch((error) => {
        console.error("Error raising the ticket:", error);
        toast.error(
          "You have already scheduled a counseling session for this date"
        );
      });
  };

  const handleStripePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe has not loaded.");
      return;
    }

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: "if_required",
      });

      if (error) {
        console.error("Payment failed:", error);
        return;
      }

      submitSession("Stripe", "Completed");
      loadPaymentIntent();
      setShowStripeModal(false);
      setShowToast(true);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };
  const isTimeAvailable = (time) => {
    return availableTimesForDate.some((slot) => {
      const [startTime, endTime] = slot.split("-");

      return time >= startTime && time < endTime;
    });
  };

  const parseToLocalDate = (utcDate) => {
    const date = new Date(utcDate);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  };

  return (
    <>
      <div style={{ background: "#F4F8FA" }}>
        <h4 className="fs_25 fw-bold ff-gotham-bold mb-4">Session</h4>
        <Row>
          <Col md={8} lg={9}>
            <Layout
              style={{ background: "#ECEEEF" }}
              className="p-sm-4 px-3 py-4 generate-link-css h-100 d-flex flex-column justify-content-between"
            >
              <div>
                <h4 className="fs_18 fw-bold ff-gotham-bold">
                  Set Session Time
                </h4>
                <Row className="mt-3">
                  <Col lg={6}>
                    <div className="d-flex flex-column">
                      <label className="color_gray_2 ff-gotham-normal fs_16">
                        Select Date
                      </label>
                      <div className="calendar-wrapper mt-2">
                        <Calendar
                          onChange={handleDateChange}
                          value={selectedDate}
                          className="react-calendar w-100"
                          minDate={new Date()}
                          tileDisabled={({ date }) => {
                            return !availableSlots.some(
                              (slot) =>
                                parseToLocalDate(slot.date).toDateString() ===
                                date.toDateString()
                            );
                          }}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="d-flex flex-column mt-3 mt-lg-0">
                      <label className="color_gray_2 ff-gotham-normal fs_16">
                        Select Time (Eastern Standard Time)
                      </label>
                      <div className="time-slots mt-2">
                        <div className="d-flex flex-wrap">
                          {allTimeSlots.map((time, index) => {
                            const formattedTime = formatTo12Hour(time);
                            const isAvailable = isTimeAvailable(time);

                            return (
                              <Button
                                key={index}
                                onClick={() => handleTimeSelect(time)}
                                className={`me-2 mb-2 rounded-2 select-time-box`}
                                style={{
                                  backgroundColor:
                                    selectedTime === time
                                      ? role === "coach"
                                        ? "#0071BD"
                                        : "#009345"
                                      : isAvailable && !isTimeDisabled(time)
                                      ? "#0071BD"
                                      : "transparent",

                                  color:
                                    selectedTime === time ||
                                    (isAvailable && !isTimeDisabled(time))
                                      ? "#fff"
                                      : "#808191",

                                  borderColor: "#009345",
                                  cursor:
                                    isAvailable && !isTimeDisabled(time)
                                      ? "pointer"
                                      : "not-allowed",
                                }}
                                disabled={!isAvailable || isTimeDisabled(time)}
                              >
                                {formattedTime} {/* Display formatted time */}
                              </Button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="text-center">
                        {selectedTime && !isTimeConfirmed && (
                          <>
                            <Button
                              onClick={handleConfirmTime}
                              className={`mt-3 w-75 mx-auto text-white rounded-2 py-2 ${
                                isSessionBookedInsurance === true
                                  ? "d-none"
                                  : "d-block"
                              }`}
                              style={{
                                backgroundColor:
                                  role === "coach" ? "#0071BD" : "#009345",
                                borderColor: "#009345",
                              }}
                              disabled={isSessionBooked}
                            >
                              {isSessionBooked
                                ? "Session scheduled for this date"
                                : "Confirm Session"}
                            </Button>
                            {isSessionBookedInsurance ? (
                              <p className="ff-gotham-normal mt-3">
                                Your session booking is in waiting for payment.
                                Please complete the insurance form. If submited
                                please wait.
                              </p>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Layout>
          </Col>

          <Col md={4} lg={3}>
            <div
              className={`call-test-bg px-4 pt-4 pb-3 mt-3 mt-lg-0 ${
                role === "coach" ? "bg_blue" : "bg_theme"
              }`}
            >
              <div className="d-flex align-items-center justify-content-center">
                <div
                  style={{ width: "57px", height: "57px" }}
                  className={`${
                    role === "coach" ? "bg_blue" : "bg_theme"
                  } d-flex align-items-center justify-content-center call-icon-bg`}
                >
                  <img
                    style={{ width: "36px", height: "20px" }}
                    src={callIcon}
                    alt="callicon"
                  />
                </div>
              </div>
              <p
                style={{ lineHeight: "11.48px" }}
                className="text-center text-white mb-0 mt-3 ff-gotham-normal fs_12"
              >
                Test a call to check settings <br /> and option.
              </p>
              <Button
                style={{ lineHeight: "14.36px" }}
                className={`bg-white border-0 rounded-2 py-3 ${
                  role === "coach" ? "color_blue" : "color_theme"
                } w-100 mt-4 ff-gotham-normal fs_15`}
              >
                Pre Call test
              </Button>
            </div>
          </Col>
        </Row>

        {/* Toast for Session Confirmation */}
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1050,
            backgroundColor: "#28a745",
            width: "300px",
            height: "300px",
            borderRadius: "8px",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="d-flex align-items-center justify-content-center flex-column gap-3">
            <div>
              <img
                style={{ width: "45px", height: "45px" }}
                src={checked}
                alt=""
              />
            </div>
            <div className="text-center">
              {paymentOption === "Insurance" ? (
                <span
                  className="ff-gotham-normal"
                  style={{
                    fontSize: "16px",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Your request will be submitted once the form is filled out by
                  your parents regarding the session confirmation on{" "}
                  {selectedDate.toDateString()} at {selectedTime}.
                </span>
              ) : (
                <span
                  className="ff-gotham-normal"
                  style={{
                    fontSize: "16px",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Your session is confirmed on {selectedDate.toDateString()} at{" "}
                  {selectedTime}.
                </span>
              )}
            </div>
          </div>
        </Toast>

        {/* Payment Options Modal */}
        <Modal
          show={showPaymentModal}
          onHide={() => setShowPaymentModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Select Payment Option</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column align-items-center">
              <Button
                onClick={() => handlePaymentOptionSelect("Stripe")}
                className="mb-3 w-75"
                style={{ backgroundColor: "#009345", color: "#fff" }}
              >
                Pay with Stripe
              </Button>
              <Button
                onClick={() => handlePaymentOptionSelect("Insurance")}
                className="w-75"
                style={{ backgroundColor: "#009345", color: "#fff" }}
              >
                Use Insurance
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        {/* Stripe Payment Modal */}
        <Modal
          show={showStripeModal}
          onHide={() => setShowStripeModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter Payment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ElementsConsumer>
              {({ stripe, elements }) => (
                <form onSubmit={handleStripePayment}>
                  <PaymentElement />
                  <Button
                    type="submit"
                    disabled={!stripe}
                    style={{ backgroundColor: "#009345", color: "#fff" }}
                    className="mt-3 w-100"
                  >
                    Pay Now ${STRIPE_PRICE}
                  </Button>
                </form>
              )}
            </ElementsConsumer>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default GenerateLink;
