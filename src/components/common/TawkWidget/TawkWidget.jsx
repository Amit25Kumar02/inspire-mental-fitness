import React from "react";
import { Card } from "react-bootstrap";

const TawkWidget = () => {
  return (
    <div className="pt-4">
      <h2 className="ff-gotham-medium fs_24 mb-4">Support Chat</h2>
      <div className="d-flex justify-content-center">
        <Card
          style={{
            width: "80%",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            borderRadius: "12px",
          }}
        >
          <Card.Body
            style={{
              height: "70vh",
              padding: 0,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <iframe
              src="https://tawk.to/chat/682b6331849023190af5a748s/1irknmugt"
              title="Tawk.to Chat"
              width="100%"
              height="100%"
              style={{ border: "none", flex: 1 }}
              allow="microphone; camera"
            ></iframe>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default TawkWidget;