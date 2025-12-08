import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import FocusFieldDailyLeaderBoard from "../CognifitGames/focusField/FocusFieldDailyLeaderBoard";
import FocusFieldWeeklyLeaderBoard from "../CognifitGames/focusField/FocusFieldWeeklyLeaderBoard";
import "./LeaderBoard.css";
import backgroundImage from "../../../assets/image/png/leaderboard-img.png";

const LeaderBoard = () => {
    const [activeTab, setActiveTab] = useState("daily");

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            try {
                JSON.parse(userData);
            } catch (error) {
                console.error("Error parsing userData:", error);
            }
        }
    }, []);

    return (
        <div className="leaderboard-page-wrapper">
            <div className="leaderboard-hero position-relative">
                <img className="leaderboard-hero-img" src={backgroundImage} alt="leaderboard" />
                {/*  Updated Text Section */}
                <div className="leaderboard-hero-content">
                    <h2 className="fs_50 ff-gotham-bold text-white">
                        Welcome to the Leaderboard!
                    </h2>
                    <p className="leaderboard-sub-text text-white mt-2">
                        Scores are calculated based on time spent learning, journal activity,
                        game performance & overall platform engagement.
                    </p>
                </div>
            </div>

            {/* ---- Tabs ---- */}
            <div className="d-flex gap-3 my-3 leaderboard-tabs">
                <Button
                    className={`custom-tab-btn ${activeTab === "daily" ? "active" : ""}`}
                    onClick={() => setActiveTab("daily")}
                >
                    Daily
                </Button>

                <Button
                    className={`custom-tab-btn ${activeTab === "weekly" ? "active" : ""}`}
                    onClick={() => setActiveTab("weekly")}
                >
                    Weekly
                </Button>
            </div>

            {/* ---- Leaderboard Content ---- */}
            <Row className="mt-4">
                <Col xs={12}>
                    {activeTab === "daily" && <FocusFieldDailyLeaderBoard />}
                    {activeTab === "weekly" && <FocusFieldWeeklyLeaderBoard />}
                </Col>
            </Row>
        </div>
    );
};

export default LeaderBoard;
