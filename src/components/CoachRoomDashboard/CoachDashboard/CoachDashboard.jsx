import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import trending_image from "../../../assets/image/png/tranding_image.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJournalsRequest } from "../../../redux/slice/AllJournalsSlice";
import boxImg from "../../../assets/image/png/silhouette_soccer_player.png";
import journalIcon from "../../../assets/image/png/journalSelected.png";
import libraryIcon from "../../../assets/image/png/whiteLibraryicon.png";
import selfDiscoveryIcon from "../../../assets/image/png/assesmentSelected.png";
import quietRoomIcon from "../../../assets/image/png/whiteQuiteRoomIcon.png";

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

// Truncate title to a specified word limit
const truncateTitle = (title, wordLimit) => {
  if (!title) return "Untitled Journal";
  const words = title.split(" ");
  if (words.length <= wordLimit) return title;
  return words.slice(0, wordLimit).join(" ") + "...";
};

const CoachDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const allJournals = useSelector((state) => state.allJournals?.journals);
  const [limit, setLimit] = useState(4);

  const cards = [
    {
      title: "Journal",
      icon: journalIcon,
      onClick: () => navigate("/coaching-dashboard/journal"),
    },
    {
      title: "Library",
      icon: libraryIcon,
      onClick: () => navigate("/coaching-dashboard/library"),
    },
    {
      title: "Recovery Room",
      icon: quietRoomIcon,
      onClick: () => navigate("/coaching-dashboard/recovery-room"),
    },
  ];

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

  return (
    <div className="pt-4 pb-4">
      <h4 className="fs_25 fw-bold ff-gotham-bold">Dashboard</h4>
      <div className="bg_blue bg_image p-sm-5 px-3 py-4 rounded-4 mt-3 position-relative overflow-hidden">
        <img className="box-img" src={boxImg} alt="player" />
        <div className="position-relative z-1">
          <h4 className="fs_30 text-white ff-gotham-normal">Hi {userName}👋</h4>
          <h2 className="fs_50 ff-gotham-bold text-white mt-3 mb-0">
            Welcome to the Coaching Room!
          </h2>
          <button
            onClick={() => navigate("/coaching-dashboard/session")}
            style={{ borderRadius: "10px", height: "42px" }}
            className="mt-5 ff-gotham-normal border-0 bg-white px-5 fs_16 py-2"
          >
            Book Session
          </button>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-4 mb-3">
        <h4 className="fs_25 ff-gotham-bold fw-bold color_black2">Explore</h4>
      </div>
      <Card className="rounded-5">
        <div className="row">
          {cards.map((card, index) => (
            <div className="col-md-3 col-sm-6" key={index}>
              <div
                className={`d-flex align-items-center gap-3 p-3 rounded-3 border cursor-pointer mt-3 mt-md-0
                 `}
                onClick={card.onClick}
                style={{
                  transition: "transform 0.2s",
                  background: "#f9f9f9",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div
                  style={{ width: "40px", height: "40px" }}
                  className="bg_blue d-flex align-items-center justify-content-center rounded-2"
                >
                  <img
                    src={card.icon}
                    alt={card.title}
                    style={{ width: "22px", height: "22px" }}
                  />
                </div>
                <h5 className="mt-3 ff-gotham-bold fs_18">{card.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CoachDashboard;
