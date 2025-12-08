import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllJournalsRequest } from "../../../redux/slice/AllJournalsSlice";
import boxImg from "../../../assets/image/png/silhouette_soccer_player.png";
import { ToastContainer } from "react-toastify";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const CounselorDashboard = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allJournals = useSelector((state) => state.allJournals?.journals);
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserName(parsedData.name);
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);

  useEffect(() => {
    dispatch(fetchAllJournalsRequest({ limit }));
  }, [dispatch]);

  const latestJournals = allJournals?.slice(0, 4) || [];
  const truncateTitle = (title, wordLimit) => {
    if (!title) return "Untitled Journal";

    const words = title.split(" ");
    if (words.length <= wordLimit) return title;

    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <>
      <ToastContainer />
      <div className="pt-4 pb-4">
        <h4 className="fs_25 fw-bold ff-gotham-bold">Dashboard</h4>
        <div className="bg_theme bg_image p-sm-5 px-3 py-4 rounded-4 mt-3 position-relative overflow-hidden">
          <img className="box-img" src={boxImg} alt="player" />
          <div className="position-relative z-1">
            <h4 className=" fs_30 text-white ff-gotham-normal">
              Hi {userName}👋
            </h4>
            <h2 className=" fs_50 ff-gotham-bold text-white mt-3 mb-0">
              Welcome to the Counselor's portal!
            </h2>
            <button
              onClick={() => navigate("/counselor-portal/calendar")}
              style={{ borderRadius: "10px", height: "42px" }}
              className="mt-5 ff-gotham-normal border-0 bg-white px-5 fs_16 py-2"
            >
              Check Calendar
            </button>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-4 mb-3">
          <h4 className="fs_25 ff-gotham-bold fw-bold color_black2">
            Latest Journals & Notes
          </h4>
          <Link
            className="ff-gotham-bold color_theme text-decoration-underline d-none d-sm-block"
            to={"/counselor-portal/journal"}
          >
            View all
          </Link>
        </div>

        <Card className="rounded-5">
          <div className="row">
            {latestJournals.length > 0 ? (
              latestJournals.map((journal, index) => (
                <div className="col-md-4 col-xl-3 col-sm-6" key={index}>
                  <Link to={`/counselor-portal/journal/${journal?._id}`}>
                    <div className="position-relative">
                      <img
                        style={{ height: "200px", objectPosition: "top" }}
                        className="w-100 object-fit-cover rounded-3"
                        src={journal?.images[0]}
                        alt={journal?.title}
                      />
                      <div className="position-absolute d-flex align-items-center gap-3 bottom-0 mb-2 ff-gotham-normal ps-3 text-white">
                        <p className="mb-0">{formatDate(journal?.createdAt)}</p>
                      </div>
                    </div>
                    <p className="ff-gotham-normal mt-3 fs_15 color_black4">
                      {truncateTitle(journal?.title, 10)}
                    </p>
                  </Link>
                </div>
              ))
            ) : (
              <p>No journals found</p>
            )}
          </div>
          <div className="text-center">
            <Link
              style={{ border: "1px solid #009345" }}
              className="ff-gotham-bold mt-4 py-3 rounded-2 color_theme text-decoration-underline d-block d-sm-none"
              to={"/counselor-portal/journal"}
            >
              View all
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CounselorDashboard;
