import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  updateJournalRequest,
  resetUploadStatus,
} from "../../redux/slice/JournalSlice";
import { toast } from "react-toastify";

const EditJournalModal = ({ show, handleClose, journal }) => {
  const dispatch = useDispatch();
  const uploadSuccess = useSelector(
    (state) => state.journal.uploadedSuccessfully
  );

  const [initialJournal, setInitialJournal] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [journalImg, setJournalImg] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    journalImg: "",
  });

  useEffect(() => {
    if (journal) {
      setInitialJournal({
        title: journal.title,
        description: journal.description,
        images: journal.images,
      });
      setTitle(journal.title);
      setDescription(journal.description);
      setImagePreview(journal.images);
    }
  }, [journal]);

  useEffect(() => {
    if (uploadSuccess) {
      toast.success("Journal updated successfully!");
      handleClose();
      dispatch(resetUploadStatus());
    }
  }, [uploadSuccess, dispatch, handleClose]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setJournalImg(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      journalImg: file ? "" : prevErrors.journalImg,
    }));
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      title: e.target.value ? "" : prevErrors.title,
    }));
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      description: value ? "" : prevErrors.description,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If no changes have been made, close the modal and return
    if (
      title === initialJournal.title &&
      description === initialJournal.description &&
      (journalImg ? imagePreview === journal.images : true)
    ) {
      handleClose();
      return;
    }

    let hasError = false;
    const newErrors = {
      title: "",
      description: "",
      journalImg: "",
    };

    if (!title.trim()) {
      newErrors.title = "Title is required";
      hasError = true;
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
      hasError = true;
    }
    if (!journalImg && !journal.images) {
      newErrors.journalImg = "Image is required";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const formData = {
      id: journal._id,
      title,
      description,
      journalImg: journalImg || journal.images,
    };

    dispatch(updateJournalRequest(formData));
  };

  const Font = Quill.import("formats/font");
  Font.whitelist = [
    "gothamBold",
    "gothamMedium",
    "gothamNormal",
    "gothamLight",
  ];
  Quill.register(Font, true);

  const modules = {
    toolbar: [
      [{ font: Font.whitelist }],
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "align",
  ];

  return (
    <Modal size="xl" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Journal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="pb-3">
          <div className="d-flex align-items-center gap-4">
            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label className="ff-gotham-bold">Upload Image</Form.Label>
              <div className="image-upload-container">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="fileInput"
                  className="image-input"
                />
                <label htmlFor="fileInput" className="image-label">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Selected"
                      className="image-preview"
                    />
                  ) : (
                    <div className="image-placeholder">
                      <FaPencilAlt className="pencil-icon" />
                      <p>Select Image</p>
                    </div>
                  )}
                </label>
              </div>
              {errors.journalImg && (
                <Form.Text className="text-danger ff-gotham-normal">
                  {errors.journalImg}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formTitle" className="mb-3 w-100 pe-4">
              <Form.Label className="ff-gotham-bold">Title</Form.Label>
              <Form.Control
                className="ff-gotham-normal"
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
              {errors.title && (
                <Form.Text className="text-danger ff-gotham-normal">
                  {errors.title}
                </Form.Text>
              )}
            </Form.Group>
          </div>
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label className="ff-gotham-bold">Description</Form.Label>
            <ReactQuill
              className="ff-gotham-normal bg-white"
              value={description}
              theme="snow"
              onChange={handleDescriptionChange}
              modules={modules}
              formats={formats}
            />
            {errors.description && (
              <Form.Text className="text-danger ff-gotham-normal">
                {errors.description}
              </Form.Text>
            )}
          </Form.Group>
          <div className="text-end">
            <Button
              className="mt-2 rounded-2 bg_theme ff-gotham-medium px-4 py-2"
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditJournalModal;
