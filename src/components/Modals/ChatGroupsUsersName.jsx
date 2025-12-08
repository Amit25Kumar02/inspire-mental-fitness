import React from "react";
import { Modal } from "react-bootstrap";

const ChatGroupsUsersName = ({ show, handleClose, athletes }) => {
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="ff-gotham-medium">
          Athletes in Group
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {athletes && athletes.length > 0 ? (
          <div
          className="p-3"
            style={{
              columnCount: Math.ceil(athletes.length / 10), // number of columns
              columnGap: "20px",
            }}
          >
            {athletes.map((athlete, index) => (
              <div key={athlete.id || index} className="ff-gotham-normal mb-1">
                • {athlete.name}
              </div>
            ))}
          </div>
        ) : (
          <p>No athletes in this group.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ChatGroupsUsersName;
