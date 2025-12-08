import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap components
import "../fildHouseDashboard/fildhouse.css";
import noti_icon from "../../assets/image/svg/Group 1000002848.svg";
import coachNotificationIcon from "../../assets/image/svg/coachNotificationIcon.svg";
import search_icon from "../../assets/image/svg/search.svg";
import { toast } from "react-toastify";

const Header = ({ onToggleSidebar }) => {
  const [userRole, setUserRole] = useState("");
  const [requests, setRequests] = useState([]);
  const [showRequests, setShowRequests] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    try {
      const parsedData = JSON.parse(userData);
      setUserRole(parsedData.role);
    } catch (error) {
      console.error("Error parsing userData:", error);
    }
  }, []);

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");
    if (userRole === "Athlete") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/requests`,
          {
            headers: { token },
          }
        );
        if (response.data?.data) {
          setRequests(response.data.data);
        } else {
          setRequests([]);
        }
      } catch (error) {
        console.error("Error fetching journal requests:", error);
        setRequests([]);
      }
    }
  };

  const handleNotificationClick = () => {
    if (userRole === "Athlete") {
      fetchRequests();
    }
    setShowRequests(!showRequests);
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleModalResponse = async (response) => {
    if (!selectedRequest) return;

    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/requests/respond`,
        {
          requestId: selectedRequest._id,
          response,
        },
        {
          headers: { token },
        }
      );
      if (res.data?.status === "success") {
        toast.success("The request has been aproved");
        setRequests(requests.filter((req) => req._id !== selectedRequest._id));
      }
    } catch (error) {
      console.error("Error responding to request:", error);
    } finally {
      setShowModal(false);
      setSelectedRequest(null);
    }
  };

  const notificationIcon =
    userRole === "Coach" ? coachNotificationIcon : noti_icon;

  return (
    <div className="bg-white py-4 ps-2 border-start border-start-1 pb-3 border-bottom border-bottom-2">
      <div className="px-4 justify-content-between align-items-center d-flex">
        <div className="d-flex align-items-center gap-3">
          <div
            onClick={onToggleSidebar}
            style={{ cursor: "pointer" }}
            className="navmanu d-none d-lg-block"
          >
            <div className="navdot"></div>
            <div className="navdot my-1"></div>
            <div className="navdot"></div>
          </div>
          {/* <div className="d-flex px-3 align-items-center gap-3 custom_input w-100">
            <img
              style={{ cursor: "pointer" }}
              src={search_icon}
              alt="search_icon"
            />
            <input className="w-100 py-2" type="text" placeholder="Search" />
          </div> */}
        </div>
        <div style={{ position: "relative" }}>
          <img
            style={{ cursor: "pointer" }}
            src={notificationIcon}
            alt="notification_icon"
            onClick={handleNotificationClick}
          />
          {showRequests && userRole === "Athlete" && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: "0",
                backgroundColor: "white",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                width: "300px",
                zIndex: 1000,
              }}
            >
              <ul style={{ listStyleType: "none", margin: 0, padding: "10px" }}>
                {requests.length > 0 ? (
                  requests.map((request, index) => (
                    <li
                      key={index}
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #f0f0f0",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRequestClick(request)}
                    >
                      <strong>Coach {request.coachId.firstName}</strong> wants
                      to view your journal titled{" "}
                      <em>{request.journalId.title}</em>.
                    </li>
                  ))
                ) : (
                  <li style={{ textAlign: "center", padding: "10px" }}>
                    No requests found
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* React-Bootstrap Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Allow Coach to View Journal?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>{selectedRequest?.coachId.email}</strong> wants to view your
            journal titled <em>{selectedRequest?.journalId.title}</em>.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => handleModalResponse("Yes")}>
            Yes
          </Button>
          <Button variant="danger" onClick={() => handleModalResponse("No")}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Header;
