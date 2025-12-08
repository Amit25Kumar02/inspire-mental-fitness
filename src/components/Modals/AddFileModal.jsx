import React, { useEffect, useState } from "react";
import { Button, Modal, Form, ProgressBar } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadFileWithTitleRequest,
  closeModal,
} from "../../redux/slice/UploadLibrarySlice";

const AddFileModal = ({ show, onHide, file }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  const loading = useSelector((state) => state.uploadLibrary.loading);
  const uploadSuccess = useSelector(
    (state) => state.uploadLibrary.uploadSuccess
  );

  useEffect(() => {
    if (uploadSuccess) {
      setProgress(0);
      dispatch(closeModal());
    }
  }, [uploadSuccess, dispatch]);

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !file) {
      toast.error("Please provide a title and select a file.");
      return;
    }
    dispatch(uploadFileWithTitleRequest({ title, file }));
    setTitle("");
  };

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add File</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center">
            <p>Uploading...</p>
            <ProgressBar now={progress} label={`${progress}%`} />
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={handleTitleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Label>File</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={file ? file.name : "No file selected"}
              />
            </Form.Group>
            <div className="text-end">
              <Button
                className="bg_theme px-4 py-2 rounded-2 mt-3"
                type="submit"
              >
                Upload
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddFileModal;
