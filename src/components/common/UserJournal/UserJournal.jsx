import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserJournalRequest } from "../../../redux/slice/userJournalSlice";
import { deleteJournalRequest } from "../../../redux/slice/JournalSlice";
import { Col, Modal, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaCopy, FaEye, FaPen, FaTrash } from "react-icons/fa";
import EditJournalModal from "../../Modals/EditJournalModal";
import DeleteJournalModal from "../../Modals/DeleteJournalModal";
import { toast, ToastContainer } from "react-toastify";

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

const UserJournal = () => {
  const dispatch = useDispatch();
  const userJournal = useSelector((state) => state.userJournal.data?.data);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [shareModalShow, setShareModalShow] = useState(false);
  const [shareJournalId, setShareJournalId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserRole(parsedData.role);
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);

  useEffect(() => {
    dispatch(getUserJournalRequest());
  }, [dispatch]);

  const handleEditClick = (journal) => {
    setSelectedJournal(journal);
    setModalShow(true);
  };

  const handleDeleteClick = (journal) => {
    setSelectedJournal(journal);
    setDeleteModalShow(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedJournal) {
      dispatch(deleteJournalRequest({ id: selectedJournal._id }));
      setDeleteModalShow(false);
    }
  };

  const handleShareChoice = (targetRole) => {
    const roleToPath = {
      Coach: "coaching-dashboard",
      Counselor: "counselor-dashboard",
      Athlete: "fieldhouse-dashboard",
    };

    const basePath = roleToPath[targetRole] || "fieldhouse-dashboard";

    const fullUrl = `${window.location.origin}/${basePath}/journal/${shareJournalId}`;
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        toast.success(`Journal URL copied to clipboard for ${targetRole}!`);
        setShareModalShow(false);
      })
      .catch((err) => {
        toast.error("Failed to copy URL");
        setShareModalShow(false);
      });
  };

  const handleCopyClick = (journalId) => {
    if (userRole === "Athlete") {
      setShareJournalId(journalId);
      setShareModalShow(true);
    } else {
      const basePath =
        userRole === "Coach" ? "fieldhouse-dashboard" : "coaching-dashboard";
      const fullUrl = `${window.location.origin}/${basePath}/journal/${journalId}`;

      navigator.clipboard
        .writeText(fullUrl)
        .then(() => {
          toast.success("Journal URL copied to clipboard!");
        })
        .catch((err) => {
          toast.error("Failed to copy URL");
        });
    }
  };

  const iconStyle =
    userRole === "Coach" ? { color: "#0071BD " } : { color: "#009345" };
  return (
    <>
      <ToastContainer />
      <div className="py-4">
        <div className="d-sm-flex align-items-center justify-content-between">
          <h4 className="fs_25 ff-gotham-bold color_black2 fw-bold mb-0">
            My Journals
          </h4>
          <div className="text-end">
            <button
              onClick={() =>
                navigate(
                  userRole === "Athlete"
                    ? "/fieldhouse-dashboard/journal/add-new"
                    : "/coaching-dashboard/journal/add-new"
                )
              }
              className={`px-md-5 px-3 py-3 ff-inter rounded-4 border-0 mt-3 ${
                userRole === "Athlete" ? "bg_theme" : "bg_blue"
              }  fs_14 fw-semibold text-white`}
            >
              + &nbsp;Add your Journal
            </button>
          </div>
        </div>
        {!userJournal || userJournal.length === 0 ? (
          <div
            style={{ height: "400px" }}
            className="d-flex align-items-center justify-content-center"
          >
            <p className="ff-gotham-bold fs_18">No journals found</p>
          </div>
        ) : (
          <Row className="">
            {userJournal?.map((value, index) => (
              <Col className="mt-4" key={index} md={6}>
                <div className="d-md-flex gap-3 bg-white p-4 rounded-3">
                  <img
                    className="journal-image object-fit-cover"
                    src={value?.images}
                    alt={value?.title}
                  />
                  <div className="d-flex flex-column justify-content-between">
                    <p className="fs_15 mt-3 fs_20 mt-md-0 mb-3 mb-md-0 ff-gotham-normal color_black3 mb-0 fw-normal">
                      {value?.title && value.title.length > 25
                        ? value.title.slice(0, 55) + "..."
                        : value?.title}
                    </p>
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                      <p className="color_theme ff-gotham-normal mb-0 me-2">
                        {formatDate(value?.createdAt)}
                      </p>
                      <div className="d-flex align-items-center gap-2">
                        <Link
                          to={
                            userRole === "Coach"
                              ? `/coaching-dashboard/journal/${value?._id}`
                              : `/fieldhouse-dashboard/journal/${value?._id}`
                          }
                        >
                          <FaEye style={iconStyle} className="me-2" />
                        </Link>
                        <FaPen
                          style={iconStyle}
                          onClick={() => handleEditClick(value)}
                          className="me-2 cursor_pointer"
                        />
                        <FaTrash
                          style={iconStyle}
                          onClick={() => handleDeleteClick(value)}
                          className="me-2 cursor_pointer"
                        />
                        <FaCopy
                          style={iconStyle}
                          onClick={() => handleCopyClick(value?._id)}
                          className="me-2 cursor_pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}

        {selectedJournal && (
          <>
            <EditJournalModal
              show={modalShow}
              handleClose={() => setModalShow(false)}
              journal={selectedJournal}
            />
            <DeleteJournalModal
              show={deleteModalShow}
              onClose={() => setDeleteModalShow(false)}
              journalId={selectedJournal._id}
              onConfirm={handleDeleteConfirm}
            />
          </>
        )}
      </div>
      <Modal
        show={shareModalShow}
        onHide={() => setShareModalShow(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Share Journal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">With whom do you want to share this journal?</p>
          <div className="d-flex justify-content-around">
            {["Coach", "Counselor", "Athlete"].map((role) => (
              <button
                key={role}
                className="btn btn-outline-primary"
                onClick={() => handleShareChoice(role)}
              >
                {role}
              </button>
            ))}
          </div>
        </Modal.Body>
      </Modal>
      ;
    </>
  );
};

export default UserJournal;
