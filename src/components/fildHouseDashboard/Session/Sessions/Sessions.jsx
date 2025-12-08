import "./Sessions.css";
import React, { useState } from "react";
import { Button, Card, Image } from "antd";
import { Typography } from "antd";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import laptopWithClock from "../../../../assets/image/png/watchOnLaptop.png";

const Sessions = ({ userSessions }) => {
  const [activeTab, setActiveTab] = useState("All");
  const { Text } = Typography;

  // Function to handle tab switching
  const handleButtonClick = (tab) => {
    setActiveTab(tab);
  };

  const formattedDate = (date) => {
    const structuredDate = new Date(date).toISOString().split("T")[0];
    return structuredDate;
  };

  const combineDateAndTime = (sessionDate, sessionTime) => {
    if (!sessionDate || !sessionTime) return null;

    // Split the session time into hours and minutes
    const [hours, minutes] = sessionTime.split(":");
    const localDateTime = new Date(sessionDate);
    localDateTime.setHours(parseInt(hours));
    localDateTime.setMinutes(parseInt(minutes));

    return localDateTime;
  };

  const isSessionUpcoming = (sessionDate, sessionTime) => {
    const sessionDateTime = combineDateAndTime(sessionDate, sessionTime);
    if (!sessionDateTime) return false;

    return sessionDateTime > new Date();
  };

  const isSessionRecent = (sessionDate, sessionTime) => {
    const sessionDateTime = combineDateAndTime(sessionDate, sessionTime);
    if (!sessionDateTime) return false;

    return sessionDateTime < new Date();
  };

  const canJoinSession = (sessionDate, sessionTime) => {
    const sessionDateTime = combineDateAndTime(sessionDate, sessionTime);
    const currentTime = new Date();
    const timeDifference = sessionDateTime - currentTime;

    return timeDifference <= 30 * 60 * 1000 && timeDifference > 0; // Join within 30 minutes
  };

  const filterSessions = (tab) => {
    if (tab === "Recent") {
      return userSessions?.filter((session) =>
        isSessionRecent(session?.date, session?.time)
      );
    }

    if (tab === "Upcoming") {
      return userSessions?.filter((session) =>
        isSessionUpcoming(session?.date, session?.time)
      );
    }

    return userSessions;
  };

  return (
    <div className="pb-5 pt-4">
      <div className="d-flex align-items-center gap-4 mt-4">
        {["All", "Recent", "Upcoming"]?.map((tab) => (
          <Button
            key={tab}
            className={`btn-sessions-tab w-100 fs-15 ${
              activeTab === tab
                ? "btn-sessions-tab-active ff-gotham-bold"
                : "ff-gotham-normal"
            }`}
            onClick={() => handleButtonClick(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      <Row className="mt-4 pt-3">
        {filterSessions(activeTab)?.length > 0 ? (
          filterSessions(activeTab).map((value, index) => {
            const isPastSession = isSessionRecent(value?.date, value?.time);
            const isUpcomingSession = isSessionUpcoming(
              value?.date,
              value?.time
            );
            const joinSessionDisabled = !(
              isUpcomingSession && canJoinSession(value?.date, value?.time)
            );

            return (
              <Col lg={3} key={index}>
                <Card
                  bodyStyle={{ padding: 0 }}
                  style={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <div
                    style={{
                      background: "#F1F1F1",
                      borderRadius: "10px 10px 0px 0px",
                    }}
                    className="p-5 text-center position-relative"
                  >
                    <Image
                      style={{ height: "97.5px", width: "97.5px" }}
                      src={laptopWithClock}
                      alt="clock"
                    />
                    <div
                      style={{ bottom: "4px", left: "0" }}
                      className="mt-3 d-flex align-items-center justify-content-between w-100 px-2 position-absolute"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{ marginTop: "1px" }}
                          className="blue-dot"
                        ></div>
                        <Text
                          style={{ color: "#808191" }}
                          className="fs_12 mb-0 ff-inter fw-medium"
                        >
                          {value?.time}
                        </Text>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{ marginTop: "1px" }}
                          className="green-dot"
                        ></div>
                        <Text
                          style={{ color: "#808191" }}
                          className="fs_12 ff-inter fw-medium"
                        >
                          {formattedDate(value?.date)}
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className="py-3 px-5 text-center">
                    <Link target="_blank" to={value?.zoomLink}>
                      <Button
                        className={`btn-sessions-tab-active w-100 mx-auto py-2 rounded-3 ff-gotham-medium `}
                      >
                        Join Meeting
                      </Button>
                    </Link>
                  </div>
                </Card>
              </Col>
            );
          })
        ) : (
          <Col className="text-center">
            <Text
              style={{ color: "#808191" }}
              className="fs_16 ff-gotham-medium"
            >
              No sessions booked
            </Text>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Sessions;
