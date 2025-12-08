import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import boxImg from "../../assets/image/png/silhouette_soccer_player.png";
import journalIcon from "../../assets/image/png/journalSelected.png";
import libraryIcon from "../../assets/image/png/whiteLibraryicon.png";
import selfDiscoveryIcon from "../../assets/image/png/assesmentSelected.png";
import quietRoomIcon from "../../assets/image/png/whiteQuiteRoomIcon.png";
// import FocusFieldDailyLeaderBoard from "./CognifitGames/focusField/FocusFieldDailyLeaderBoard";
import { Col, Row } from "react-bootstrap";
// import ReactionTimeDailyLeaderBoard from "./CognifitGames/leaderboardGames/reactionTime/ReactionTimeDailyLeaderBoard";
// import AimTrainerDailyLeaderboard from "./CognifitGames/leaderboardGames/aimTrainer/AimTrainerDailyLeaderboard";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

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

  const cards = [
    {
      title: "Journal",
      icon: journalIcon,
      onClick: () => navigate("/fieldhouse-dashboard/journal"),
    },
    {
      title: "Library",
      icon: libraryIcon,
      onClick: () => navigate("/fieldhouse-dashboard/library"),
    },
    {
      title: "Self Discovery",
      icon: selfDiscoveryIcon,
      onClick: () => navigate("/fieldhouse-dashboard/self-discovery"),
    },
    {
      title: "Recovery Room",
      icon: quietRoomIcon,
      onClick: () => navigate("/fieldhouse-dashboard/recovery-room"),
    },
  ];

  return (
    <div className="pt-4 pb-4">
      <h4 className="fs_25 fw-bold ff-gotham-bold">Dashboard</h4>
      <div className="bg_theme bg_image p-sm-5 px-3 py-4 rounded-4 mt-3 position-relative overflow-hidden">
        <img className="box-img" src={boxImg} alt="player" />
        <div className="position-relative z-1">
          <h4 className="fs_30 text-white ff-gotham-normal">Hi {userName}👋</h4>
          <h2 className="fs_50 ff-gotham-bold text-white mt-3 mb-0">
            Welcome to the Training Center!
          </h2>
          <button
            onClick={() => navigate("/fieldhouse-dashboard/session")}
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
            <div
              className={`col-md-6 col-lg-4 col-xl-3 col-sm-6 ${
                index === 3 ? "mt-md-3 mt-xl-0" : ""
              }`}
              key={index}
            >
              <div
                className={`d-flex align-items-center gap-3 p-3 rounded-3 border cursor-pointer mt-lg-0 ${
                  index === 1 ? "mt-sm-0" : ""
                } ${index === 0 ? "mt-0" : "mt-3"} `}
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
                  className="bg_theme d-flex align-items-center justify-content-center rounded-2"
                >
                  <img
                    src={card.icon}
                    alt={card.title}
                    style={{ width: "22px", height: "22px" }}
                  />
                </div>
                <h5 className="mt-3 ff-gotham-bold fs_16">{card.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </Card>
      {/* <Row>
        <Col md={6}>
          <FocusFieldDailyLeaderBoard />
        </Col>
        <Col md={6}>
          <ReactionTimeDailyLeaderBoard />
        </Col>
        <Col md={6}>
          <AimTrainerDailyLeaderboard />
        </Col>
      </Row> */}
    </div>
  );
};

export default Dashboard;
