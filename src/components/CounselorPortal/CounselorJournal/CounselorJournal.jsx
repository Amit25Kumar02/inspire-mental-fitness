import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJournalsRequest } from "../../../redux/slice/AllJournalsSlice";
import Journal_icon from "../../../assets/image/svg/Journals_icon.svg";
import Journal_icon1 from "../../../assets/image/svg/Journals_icon1.svg";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const CounselorJournal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const journals = useSelector((state) => state.allJournals.journals);
  const totalJournals = useSelector((state) => state.allJournals.totalJournals);
  const loading = useSelector((state) => state.allJournals.loading);
  const [limit, setLimit] = useState(5);

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

  return (
    <div className="py-4">
      <div className="d-md-flex align-items-center justify-content-between">
        <h4 className="fs_25 ff-gotham-bold color_black2 fw-bold mb-0">
          Journals
        </h4>
        <div className="d-flex justify-content-between mt-3 mt-md-0 align-items-center gap-5">
          <button
            onClick={() => navigate("/counselor-portal/journal/add-new")}
            className="px-md-5 px-3 py-3 ff-inter rounded-4 border-0 bg_theme fs_14 fw-semibold text-white"
          >
            + &nbsp;Add your Journal
          </button>
        </div>
      </div>

      <div className="card border-body mt-4 px-3 pb-3 pt-1 rounded-3 border border-1">
        {journals?.length === 0 ? (
          <div
            style={{ height: "400px" }}
            className="d-flex align-items-center justify-content-center"
          >
            {loading && <p>Loading...</p>}
            <h5>No journal found</h5>
          </div>
        ) : (
          <>
            <Row>
              <Col lg={6}>
                <Link to={`/counselor-portal/journal/${journals[0]?._id}`}>
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
                    to={`/counselor-portal/journal/${journal?._id}`}
                  >
                    <div className="d-md-flex gap-3 mt-3">
                      <img
                        className="w-25 journal-other-blog-image object-fit-cover"
                        src={journal?.images[0]}
                        alt={`Journal_image${index + 1}`}
                      />
                      <div className="d-flex flex-column justify-content-between">
                        <p className="fs_15 ff-gotham-normal color_black3 mb-0  fw-normal">
                          {truncateTitle(journal?.title, 13)}
                        </p>
                        <p className="color_theme ff-gotham-normal mb-0 ">
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
                  <Link to={`/counselor-portal/journal/${journal?._id}`}>
                    <div className="d-md-flex gap-3 mt-3">
                      <img
                        className="w-25 journal-other-blog-image object-fit-cover"
                        src={journal?.images[0]}
                        alt={`Journal_image${index + 1}`}
                      />
                      <div className="d-flex flex-column justify-content-between">
                        <p className="fs_15 ff-gotham-normal color_black3 mb-0  fw-normal">
                          {truncateTitle(journal?.title, 13)}
                        </p>
                        <p className="color_theme ff-gotham-normal mb-0 ">
                          {formatDate(journal?.createdAt)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>

      {journals.length > 0 && (
        <div className="d-md-flex justify-content-center align-items-center mt-4">
          <button
            className={`px-4 py-3 border-0 rounded-3 fs_13 ff-gotham-bold ${
              journals.length >= totalJournals ? "d-none" : "d-block"
            }`}
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CounselorJournal;
