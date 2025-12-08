import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { deleteJournalRequest } from "../../redux/slice/JournalSlice";

const DeleteJournalModal = ({ show, onClose, journalId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteJournalRequest({ id: journalId }));
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="ff-gotham-normal">
          Are you sure you want to delete this journal?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="rounded-2 px-4 py-2 bg_theme ff-gotham-medium"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          className="rounded-2 px-4 py-2 bg_blue ff-gotham-medium"
          onClick={handleDelete}
        >
          Yes, Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteJournalModal;
