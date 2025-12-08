import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { fogotPassword } from "../../services/PasswordServices";

const ForgotPasswordModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await fogotPassword({ email });
      toast.success(response?.message || "Password reset email sent!");
      setEmail("");
      handleClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="ff-gotham-bold fs_14 mb-0" htmlFor="forgotEmail">
          Email Address
        </label>
        <input
          className="w-100 mt-2 custom_border ff-gotham-light fs_14 py-2"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ height: "41px" }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            letterSpacing: "0.50px",
            height: "42px",
            borderRadius: "8.66px",
          }}
          className="bg_theme ff-gotham-bold text-white border-0 w-100"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ForgotPasswordModal;
