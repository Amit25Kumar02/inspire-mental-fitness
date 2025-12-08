import React, { useState } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import "./UpdatePassword.css";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState("success");
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setVariant("danger");
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      // Example: call your API endpoint
      const res = await fetch(`${API_BASE_URL}/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();
      setVariant(data.status === "success" ? "success" : "danger");
      setMessage(data.message);
    } catch (err) {
      setVariant("danger");
      setMessage("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-password-container">
      <Card className="shadow update-password-card">
        <Card.Body>
          <h3 className="ff-gotham-bold text-center mb-4 title-color">
            Update Password
          </h3>

          {message && <Alert variant={variant}>{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label className="ff-gotham-medium">New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="ff-gotham-normal"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label className="ff-gotham-medium">
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="ff-gotham-normal"
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100 custom-btn"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" animation="border" /> : "Update"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdatePassword;
