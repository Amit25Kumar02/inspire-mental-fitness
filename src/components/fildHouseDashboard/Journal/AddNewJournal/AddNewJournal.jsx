import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addJournalRequest,
  resetUploadStatus,
} from "../../../../redux/slice/JournalSlice";
import { toast } from "react-toastify";

const AddNewJournal = () => {
  const dispatch = useDispatch();
  const uploadedSuccessfully = useSelector(
    (state) => state.journal.uploadedSuccessfully
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [journalImg, setjournalImg] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    journalImg: "",
  });
  const [role, setRole] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (userData && userData.role) {
      setRole(userData.role);
    } else {
      console.log("Role not found");
    }

    if (uploadedSuccessfully) {
      toast.success("Journal uploaded successfully!");
      setTitle("");
      setDescription("");
      setjournalImg(null);
      setImagePreview(null);
      dispatch(resetUploadStatus());
    }
  }, [uploadedSuccessfully, dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setjournalImg(file);
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
    // Clear title error when user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      title: e.target.value ? "" : prevErrors.title,
    }));
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    // Clear description error when user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      description: value ? "" : prevErrors.description,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = {
      title: "",
      description: "",
      journalImg: "",
    };

    if (!title) {
      newErrors.title = "Title is required";
      hasError = true;
    }
    if (!description) {
      newErrors.description = "Description is required";
      hasError = true;
    }
    if (!journalImg) {
      newErrors.journalImg = "Image is required";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const formData = {
      title,
      description,
      journalImg: journalImg,
    };

    dispatch(addJournalRequest(formData));
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
    <div>
      <Form
        onSubmit={handleSubmit}
        className="pb-3"
        encType="multipart/form-data"
      >
        <div className="d-flex align-sm-items-center flex-column flex-sm-row gap-sm-5">
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
          <div xs={"w-100"} sm={"w-50"}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label className="ff-gotham-bold">Title</Form.Label>
              <Form.Control
                className="ff-gotham-normal"
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter the blog title"
              />
              {errors.title && (
                <Form.Text className="text-danger ff-gotham-normal">
                  {errors.title}
                </Form.Text>
              )}
            </Form.Group>
          </div>
        </div>

        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label className="ff-gotham-bold">Description</Form.Label>
          <ReactQuill
            className="ff-gotham-normal bg-white"
            value={description}
            theme="snow"
            onChange={handleDescriptionChange}
            placeholder="Write your blog description here..."
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
            className={`mt-2 rounded-2 ${
              role === "Coach" ? "bg_blue" : "bg_theme"
            } ff-gotham-medium px-4 py-2`}
            type="submit"
          >
            Add Journal
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddNewJournal;
