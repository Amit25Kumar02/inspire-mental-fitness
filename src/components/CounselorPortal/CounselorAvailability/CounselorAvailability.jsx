import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTrash, FaPencilAlt, FaCheck } from "react-icons/fa";
import { getAllAvailableSlots } from "../../../services/CounselingTicketRaising";
import { toast } from "react-toastify";

const CounselorAvailability = () => {
  const [availableSlots, setAvailableSlots] = useState([
    { startTime: "", endTime: "" },
  ]);
  const [date, setDate] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingAvailability, setExistingAvailability] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  const addSlot = () => {
    setAvailableSlots([...availableSlots, { startTime: "", endTime: "" }]);
  };

  const handleSlotChange = (index, field, value) => {
    const newSlots = [...availableSlots];
    newSlots[index][field] = value;
    setAvailableSlots(newSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/add/counselor-availability`,
        { date, availableSlots },
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      setMessage({ type: "success", text: response.data.message });
      fetchAvailability();
      await getAllAvailableSlots();
    } catch (error) {
      setMessage({ type: "danger", text: "Error adding availability" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailability = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/get/counselor-availability`, {
        headers: {
          token: `${token}`,
        },
      });
      setExistingAvailability(response.data || []);
    } catch (error) {
      console.error(error);
      setMessage({ type: "danger", text: "Error fetching availability" });
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const updateSlot = async (slotIndex, updatedSlot, date) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/update/counselor-availability`,
        {
          date: date,
          availableSlots: updatedSlot,
        },
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      console.log("response", response);
      setMessage({ type: "success", text: "Slot updated successfully" });
      setEditMode(null);
      fetchAvailability();
    } catch (error) {
      setMessage({ type: "danger", text: "Error updating slot" });
      console.error(error);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/delete/counselor-availability`,
        { slotId },
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      toast.success({ type: "success", text: "Slot deleted successfully" });
      fetchAvailability();
    } catch (error) {
      toast.error({ type: "danger", text: "Error deleting slot" });
      console.error(error);
    }
  };

  const handleEditSlot = (index, slotIndex) => {
    const slot = existingAvailability[index].availableSlots[slotIndex];
    setEditMode({ index, slotIndex });
    setEditStartTime(slot.startTime);
    setEditEndTime(slot.endTime);
  };

  const hourlyOptions = Array.from({ length: 24 }, (_, index) => {
    const hour = index.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  return (
    <Container className="mt-5">
      <div>
        <h4 className="fs_25 fw-bold ff-gotham-bold mb-4">
          Counselor Availability
        </h4>
      </div>
      <Row>
        <Col md={6}>
          <div className="bg-white p-4 rounded-2">
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} controlId="formDate">
                <Form.Label column>Date</Form.Label>
                <Col sm={10}>
                  <DatePicker
                    selected={date}
                    onChange={(newDate) => setDate(newDate)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select date"
                    className="form-control"
                    required
                  />
                </Col>
              </Form.Group>

              {availableSlots.map((slot, index) => (
                <Row key={index} className="my-3 align-items-end">
                  <Col sm={5}>
                    <Form.Label column>Available from</Form.Label>
                    <Form.Select
                      value={slot.startTime}
                      onChange={(e) =>
                        handleSlotChange(index, "startTime", e.target.value)
                      }
                      required
                    >
                      <option value="">Select start time</option>
                      {hourlyOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col sm={5}>
                    <Form.Label column>Available to</Form.Label>
                    <Form.Select
                      value={slot.endTime}
                      onChange={(e) =>
                        handleSlotChange(index, "endTime", e.target.value)
                      }
                      required
                    >
                      <option value="">Select end time</option>
                      {hourlyOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col sm={2}>
                    {availableSlots.length > 1 && (
                      <button
                        style={{
                          borderRadius: "100%",
                          height: "30px",
                          width: "30px",
                        }}
                        className="bg-danger border-0 text-white d-flex align-items-center justify-content-center"
                        onClick={() => {
                          const newSlots = availableSlots.filter(
                            (_, i) => i !== index
                          );
                          setAvailableSlots(newSlots);
                        }}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </Col>
                </Row>
              ))}
              <div className="text-end">
                <Button
                  variant="secondary"
                  className="px-4 py-2 rounded-2 ff-gotham-medium"
                  onClick={addSlot}
                >
                  Add Slot
                </Button>
                <Button
                  style={{ backgroundColor: "#009345", color: "#fff" }}
                  type="submit"
                  className="px-4 py-2 rounded-2 ff-gotham-medium ms-3"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Availability"}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
        <Col md={6}>
          {existingAvailability.length > 0 && (
            <div className="bg-white p-4 rounded-2">
              <h5 className="ff-gotham-medium">Existing Availability:</h5>
              {existingAvailability.map((availability, index) => (
                <div key={index} className="my-4">
                  <h6 className="ff-gotham-medium fs_14">
                    Date: {new Date(availability.date).toLocaleDateString()}
                  </h6>
                  <ul className="list-group">
                    {availability.availableSlots.map((slot, slotIndex) => (
                      <li key={slotIndex} className="list-group-item">
                        {editMode?.index === index &&
                        editMode?.slotIndex === slotIndex ? (
                          <div>
                            <Row className="align-items-center justify-content-between">
                              <Col sm={5}>
                                <Form.Select
                                  value={editStartTime}
                                  onChange={(e) =>
                                    setEditStartTime(e.target.value)
                                  }
                                >
                                  <option value="">Select start time</option>
                                  {hourlyOptions.map((time) => (
                                    <option key={time} value={time}>
                                      {time}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Col>
                              <Col sm={5}>
                                <Form.Select
                                  value={editEndTime}
                                  onChange={(e) =>
                                    setEditEndTime(e.target.value)
                                  }
                                >
                                  <option value="">Select end time</option>
                                  {hourlyOptions.map((time) => (
                                    <option key={time} value={time}>
                                      {time}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Col>
                              <Col sm={1}>
                                <button
                                  className="d-flex align-items-center justify-content-center bg-blue text-white border-0"
                                  style={{
                                    borderRadius: "100%",
                                    height: "30px",
                                    width: "30px",
                                  }}
                                  onClick={() =>
                                    updateSlot(
                                      slotIndex,
                                      [
                                        ...availability.availableSlots.slice(
                                          0,
                                          slotIndex
                                        ),
                                        {
                                          startTime: editStartTime,
                                          endTime: editEndTime,
                                        },
                                        ...availability.availableSlots.slice(
                                          slotIndex + 1
                                        ),
                                      ],
                                      availability.date
                                    )
                                  }
                                >
                                  <FaCheck />
                                </button>
                              </Col>
                            </Row>
                          </div>
                        ) : (
                          <div className="d-flex align-items-center justify-content-between">
                            {slot?.startTime} - {slot?.endTime}
                            <div className="d-flex align-items-center gap-2">
                              <Button
                                style={{ height: "30px" }}
                                variant="warning"
                                size="sm"
                                className="ff-gotham-light rounded-2 d-flex align-items-center justify-content-center"
                                onClick={() => handleEditSlot(index, slotIndex)}
                              >
                                <FaPencilAlt />
                              </Button>
                              <button
                                style={{
                                  borderRadius: "100%",
                                  height: "30px",
                                  width: "30px",
                                }}
                                className="bg-danger border-0 text-white d-flex align-items-center justify-content-center"
                                onClick={() => handleDeleteSlot(slot?._id)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CounselorAvailability;
