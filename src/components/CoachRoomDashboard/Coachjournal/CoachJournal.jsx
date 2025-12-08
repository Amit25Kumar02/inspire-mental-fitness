import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJournalsRequest } from "../../../redux/slice/AllJournalsSlice";
import Journal_icon from "../../../assets/image/svg/Journals_icon.svg";
import Journal_icon1 from "../../../assets/image/svg/multiGrid.svg";
import { Col, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import AskViewPermission from "./AskViewPermission"; // Import the modal component
import { toast, ToastContainer } from "react-toastify";

const CoachJournal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const journals = useSelector((state) => state.allJournals.journals);
  const totalJournals = useSelector((state) => state.allJournals.totalJournals);
  const [limit, setLimit] = useState(5);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [currentJournal, setCurrentJournal] = useState(null); // Store the journal that needs permission
  const [athleteId, setAthleteId] = useState(""); // Store athleteId if needed

  useEffect(() => {
    dispatch(fetchAllJournalsRequest({ limit }));
  }, [dispatch, limit]);

  const handleLoadMore = () => {
    if (journals.length < totalJournals) {
      setLimit(totalJournals);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const truncateTitle = (title, wordLimit) => {
    if (!title) return "";
    const words = title.split(" ");
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };

  const checkPermissionAndNavigate = async (journalId, athleteId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/check-permission/${journalId}`,
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.data.status === "success") {
        navigate(`/coaching-dashboard/journal/${journalId}`);
      } else {
        setCurrentJournal({ journalId, athleteId });
        setShowModal(true); // Show the modal if no permission
      }
    } catch (error) {
      console.error("Error checking permission:", error);
      toast.error("There was an error checking your permission.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="py-4">
        <div className="d-md-flex align-items-center justify-content-between">
          <h4 className="fs_25 ff-gotham-bold color_black2 fw-bold mb-0">
            Journals
          </h4>
          <div className="d-flex justify-content-between mt-3 mt-md-0 align-items-center gap-5">
            <Button
              onClick={() => navigate("/coaching-dashboard/journal/add-new")}
              className="px-md-5 px-3 py-3 ff-inter rounded-4 border-0 bg_blue fs_14 fw-semibold text-white"
            >
              + &nbsp;Add your Journal
            </Button>
          </div>
        </div>

        {journals.length === 0 ? (
          <div
            style={{ height: "400px" }}
            className="mt-4 card border-body mt-4 px-3 pb-3 pt-1 rounded-3 border border-1 d-flex flex-column align-items-center justify-content-center"
          >
            <h5 className="fs_20 ff-gotham-medium color_black3">
              No journals yet
            </h5>
            <p className="fs_14 ff-gotham-normal color_black3">
              Start by adding your first journal!
            </p>
          </div>
        ) : (
          <div className="card border-body mt-4 px-3 pb-3 pt-1 rounded-3 border border-1">
            <Row>
              <Col lg={6}>
                <Link to={`/coaching-dashboard/journal/${journals[0]?._id}`}>
                  <div className="mt-3">
                    <img
                      className="w-100 journal-first-image object-fit-cover rounded-2"
                      src={journals[0]?.images[0]}
                      alt="Journal_image"
                    />
                    <h4 className="fs_28 mt-3 ff-gotham-bold color_black2">
                      {truncateTitle(journals[0]?.title, 8)}
                    </h4>
                    <p className="color_theme ff-gotham-normal mt-4">
                      {formatDate(journals[0]?.createdAt)}
                    </p>
                  </div>
                </Link>
              </Col>

              <Col lg={6} className="ps-2">
                {journals.slice(1, 5).map((journal, index) => (
                  <Link
                    key={index}
                    to={`/coaching-dashboard/journal/${journal?._id}`}
                  >
                    <div className="d-md-flex gap-3 mt-3">
                      <img
                        className="w-100 journal-other-blog-image object-fit-cover"
                        src={journal?.images[0]}
                        alt={`Journal_image${index + 1}`}
                      />
                      <div className="d-flex flex-column justify-content-between">
                        <p className="fs_15 ff-gotham-normal color_black3 mb-0 fw-normal">
                          {truncateTitle(journal?.title, 13)}
                        </p>
                        <p className="color_theme ff-gotham-normal mb-0">
                          {formatDate(journal?.createdAt)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </Col>
            </Row>
            <Row>
              {journals.slice(5, limit).map((journal, index) => (
                <Col key={index} lg={6} className="ps-2">
                  <Link to={`/coaching-dashboard/journal/${journal?._id}`}>
                    <div className="d-md-flex gap-3 mt-3">
                      <img
                        className="w-25 journal-other-blog-image object-fit-cover"
                        src={journal?.images[0]}
                        alt={`Journal_image${index + 1}`}
                      />
                      <div className="d-flex flex-column justify-content-between">
                        <p className="fs_15 ff-gotham-normal color_black3 mb-0 fw-normal">
                          {truncateTitle(journal?.title, 13)}
                        </p>
                        <p className="color_theme ff-gotham-normal mb-0">
                          {formatDate(journal?.createdAt)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        )}

        <div className="text-center mt-5">
          <button
            className={`px-4 py-3 border-0 rounded-3 fs_13 ff-gotham-bold bg_blue ${
              journals.length >= totalJournals ? "d-none" : "d-block"
            }`}
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>

        {/* Modal for requesting permission */}
        <AskViewPermission
          show={showModal}
          onClose={() => setShowModal(false)}
          journalId={currentJournal?.journalId}
          athleteId={currentJournal?.athleteId}
        />
      </div>
    </>
  );
};

export default CoachJournal;
