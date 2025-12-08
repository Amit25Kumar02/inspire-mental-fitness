import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const AskViewPermission = ({ show, onClose, journalId, athleteId }) => {
  const handleRequestAccess = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/requests`,
        {
          athleteId,
          journalId,
          response: "Yes",
        },
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Your request has been sent!");
        onClose();
      } else {
        toast.error(
          response.data.message || "There was an error sending your request."
        );
      }
    } catch (error) {
      console.error("Error requesting journal access:", error);

      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Request already made");
        } else if (error.response.status === 403) {
          toast.error("You are not authorized to request access.");
        } else if (error.response.status === 404) {
          toast.error("Journal not found or does not belong to the Athlete.");
        } else {
          toast.error(
            error.response.data.message ||
              "Something went wrong. Please try again."
          );
        }
      } else {
        toast.error(
          "Network error. Please check your connection and try again."
        );
      }
    }
  };

  return (
    <Modal show={show} onHide={onClose} className="ff-gotham-normal" centered>
      <Modal.Header closeButton>
        <Modal.Title className="ff-gotham-bold">
          Request Journal Access
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="ff-gotham-medium">
          Do you want to request access to view the journal?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onClose}
          className="ff-gotham-medium rounded-2"
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleRequestAccess}
          className="ff-gotham-medium px-3 ff-inter rounded-2 border-0 bg_blue fs_14 text-white"
        >
          Send Request
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AskViewPermission;
