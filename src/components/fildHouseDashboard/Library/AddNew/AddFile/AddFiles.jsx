import React, { useCallback, useEffect, useState } from "react";
import "./addfiles.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import { Typography } from "antd";
import { useDropzone } from "react-dropzone";
import { Layout } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loading from "../../../../../assets/image/svg/dropbox.svg";
import dropboxIcon from "../../../../../assets/image/svg/icon-dropbox.svg";
import uploadIcon from "../../../../../assets/image/svg/uploadIcon.svg";
import AddFileModal from "../../../../Modals/AddFileModal";
import {
  closeModal,
  openModal,
} from "../../../../../redux/slice/UploadLibrarySlice";

const APP_KEY = "YOUR_DROPBOX_APP_KEY";
const MAX_FILE_SIZE = 200 * 1024 * 1024;

const AddFiles = () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const { error, loading, modalVisible } = useSelector(
    (state) => state.uploadLibrary
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "video/*": [".mp4", ".mov"],
    },
    noClick: true,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach((file) => {
          if (file.errors[0].code === "file-invalid-type") {
            toast.error(
              "File type is incorrect. Only PDF or video files are allowed."
            );
          } else if (file.errors[0].code === "file-too-large") {
            toast.error("File is too large. Maximum size allowed is 200MB.");
          }
        });
      } else {
        setSelectedFile(acceptedFiles[0]);
        dispatch(openModal());
        toast.success("File selected. Please provide a title.");
      }
    },
  });

  const handleButtonClick = useCallback(() => {
    open();
  }, [open]);

  const handleDropboxClick = () => {
    if (window.Dropbox) {
      const options = {
        success: (files) => {
          console.log("Files from Dropbox:", files);
          setSelectedFile(files[0]);
          dispatch(openModal());
          toast.success("File selected from Dropbox. Please provide a title.");
        },
        cancel: () => {
          console.log("User cancelled Dropbox chooser");
        },
        linkType: "preview",
        multiselect: false,
      };
      window.Dropbox.choose(options);
    } else {
      console.error("Dropbox Chooser script is not loaded");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.dropbox.com/static/api/2/dropins.js";
    script.id = "dropbox-js";
    script.dataset.appKey = APP_KEY;
    script.onload = () => {
      console.log("Dropbox Chooser script loaded");
    };
    script.onerror = () => {
      console.error("Error loading Dropbox Chooser script");
    };
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById("dropbox-js");
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(`Upload failed: ${error}`);
    }
  }, [error]);

  const handleModalHide = () => {
    dispatch(closeModal());
    setSelectedFile(null);
  };

  return (
    <div className="my-4">
      <Title className="ff-gotham-bold fs_25 mb-0">Library</Title>
      <Row className="mt-4">
        <Col lg={9}>
          <Layout
            {...getRootProps({ className: "dropzone" })}
            className="dropzone-container border px-4 py-5 mt-2 text-center"
          >
            <input {...getInputProps()} />
            <Text className="fw-medium fs_16 ff-poppins">
              Drag files here to upload
            </Text>
            <Button
              onClick={handleButtonClick}
              className="btn-upload-file mt-4 w-25 mx-auto fw-bold ff-inter fs_14 d-flex align-items-center justify-content-center gap-2"
            >
              <img
                style={{ width: "18.48px", height: "18.48px" }}
                src={uploadIcon}
                alt="uploadIcon"
              />
              Or choose file
            </Button>
          </Layout>
        </Col>
        <Col>
          <Layout className="bg-transparent">
            <Text className="ff-inter color_gray_3">Other ways to upload</Text>
            <Button
              onClick={handleDropboxClick}
              className="btn-dropbox border-0 mt-2 fw-bold ff-inter fs_14 d-flex align-items-center justify-content-center gap-2"
            >
              <img
                style={{ width: "18.48px", height: "18.48px" }}
                src={dropboxIcon}
                alt=""
              />
              Dropbox
            </Button>
            <img className="w-100 my-3" src={loading} alt="" />
            <Text className="fw-medium fs_11 ff-inter color_gray_3">
              Upgrade for up to 7TB with <br /> no weekly limits.
            </Text>
          </Layout>
        </Col>
      </Row>
      <ToastContainer />
      <AddFileModal
        show={modalVisible}
        onHide={handleModalHide}
        file={selectedFile}
        loading={loading}
      />
    </div>
  );
};

export default AddFiles;
