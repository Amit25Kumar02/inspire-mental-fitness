import React, { useEffect, useState } from "react";
import "./userlibrary.css";
import { DatePicker, Layout, Typography } from "antd";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import deleteIcon from "../../../../../assets/image/svg/deleteicon.svg";
import singleList from "../../../../../assets/image/svg/singleList.svg";
import multiGrid from "../../../../../assets/image/svg/multiGrid.svg";
import pdfIcon from "../../../../../assets/image/svg/pdfIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { getUserLibraryFileRequest } from "../../../../../redux/slice/GetAllLibrarySlice";
import {
  deleteUserLibraryFilesRequest,
  resetDeletedState,
} from "../../../../../redux/slice/DeleteUserLibrarySlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UserLibrary = () => {
  const { Title, Text, Paragraph } = Typography;
  const [activeTab, setActiveTab] = useState("All");
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [pageLimit, setPageLimit] = useState(8);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getAllLibrary);
  const { deleted } = useSelector((state) => state.deleteLibrary);

  const getData = () => {
    let fileType = "";
    if (activeTab === "PDF’s") {
      fileType = "pdf";
    } else if (activeTab === "Videos") {
      fileType = "video";
    }
    dispatch(
      getUserLibraryFileRequest({
        fileType,
        pageLimit,
        selectedDate,
      })
    );
  };

  const logDeletedState = () => {
    if (deleted === true) {
      getData();
    }
  };

  useEffect(() => {
    getData();
    logDeletedState();
  }, [dispatch, activeTab, pageLimit, selectedDate]);

  useEffect(() => {
    if (deleted) {
      dispatch(resetDeletedState());
      console.log("Deleted state reset");
      logDeletedState();
    }
  }, [deleted, dispatch]);

  const handleButtonClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDeleteButtonClick = () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one file.");
      return;
    }
    dispatch(deleteUserLibraryFilesRequest({ fileIds: selectedIds }));
    setShowCheckboxes(!showCheckboxes);
    if (showCheckboxes) {
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleLoadMore = () => {
    setPageLimit(pageLimit + 4);
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
    setShowCheckboxes(false);
  };

  const timeAgo = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);
    if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `${hoursAgo} hours ago`;
    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 30) return `${daysAgo} days ago`;
    const monthsAgo = Math.floor(daysAgo / 30);
    if (monthsAgo < 12) return `${monthsAgo} months ago`;
    const yearsAgo = Math.floor(monthsAgo / 12);
    return `${yearsAgo} years ago`;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsChecked(true);
    setShowCalendar(false);
  };

  const handleOpenChange = (open) => {
    setShowCalendar(open);
  };

  const handleCheckboxClick = () => {
    if (isChecked) {
      setSelectedDate(null);
      setIsChecked(false);
    } else {
      setShowCalendar(true);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-4 mt-4">
        <Button
          className={`btn-sessions-tab w-100 fs_15 ff-gotham-bold ${
            activeTab === "All" ? "btn-sessions-tab-active " : ""
          }`}
          onClick={() => handleButtonClick("All")}
        >
          All
        </Button>
        <Button
          className={`btn-sessions-tab w-100 fs_15 ff-gotham-bold ${
            activeTab === "PDF’s" ? "btn-sessions-tab-active " : ""
          }`}
          onClick={() => handleButtonClick("PDF’s")}
        >
          PDF’s
        </Button>
        <Button
          className={`btn-sessions-tab w-100 fs_15 ff-gotham-bold ${
            activeTab === "Videos" ? "btn-sessions-tab-active " : ""
          }`}
          onClick={() => handleButtonClick("Videos")}
        >
          Videos
        </Button>
      </div>
      <div>
        <Paragraph style={{ color: "#11142D" }} className=" mt-4">
          <Text className="ff-poppins fw-medium fs_16">
            You uploaded {data?.length || 0}{" "}
            {activeTab === "Videos" ? "videos" : "files"}
          </Text>
        </Paragraph>
        <Layout className="flex-row bg-transparent justify-content-between">
          <Layout className="flex-row bg-transparent align-items-center gap-3 position-relative">
            <input
              className="custom-checkbox"
              type="checkbox"
              checked={isChecked}
              onClick={handleCheckboxClick}
            />
            <div
              onClick={() => setShowCalendar(true)}
              style={{
                width: "184.75px",
                height: "51.73px",
                backgroundColor: "#E4E4E480",
                borderRadius: "14.78px",
              }}
              className="d-flex align-items-center ps-3 cursor-pointer"
            >
              <Text
                style={{ color: "#808191" }}
                className="ff-gotham-bold fs_14"
              >
                {selectedDate
                  ? selectedDate.format("MM/DD/YYYY")
                  : "Date uploaded"}
              </Text>
            </div>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              open={showCalendar}
              onOpenChange={handleOpenChange}
            />
          </Layout>

          <Layout className="flex-row bg-transparent gap-5 justify-content-end">
            {showCheckboxes && (
              <div
                onClick={handleDeleteButtonClick}
                className="d-flex align-items-center gap-1 cursor-pointer"
              >
                <Image src={deleteIcon} alt="deleteIcon" />
                <Text
                  style={{ color: "#808191" }}
                  className="ff-gotham-bold fs_12"
                >
                  Delete
                </Text>
              </div>
            )}
            <div
              onClick={() => {
                if (showCheckboxes) {
                  handleDeselectAll();
                } else {
                  setShowCheckboxes(true);
                }
              }}
              className="d-flex align-items-center gap-1 cursor-pointer"
            >
              <Image src={deleteIcon} alt="deleteIcon" />
              <Text
                style={{ color: "#808191" }}
                className="ff-gotham-bold fs_12"
              >
                {showCheckboxes ? "Deselect" : "Select"}
              </Text>
            </div>
            <div className="d-flex align-items-center gap-1">
              <Image src={deleteIcon} alt="deleteIcon" />
              <Text
                style={{ color: "#808191" }}
                className="ff-gotham-bold fs_12"
              >
                Add to Playlist
              </Text>
            </div>
            <div className="d-flex align-items-center">
              <Image src={singleList} alt="list" />
            </div>
            <div
              style={{ width: "57px", height: "57px" }}
              className="bg_theme rounded-4 d-flex align-items-center justify-content-center"
            >
              <Image src={multiGrid} alt="list" />
            </div>
          </Layout>
        </Layout>
      </div>
      {data?.length === 0 ? (
        <>
          <Layout className="d-flex align-items-center justify-content-center mt-5 bg-transparent">
            <Text className=" ff-gotham-bold">No File Uploaded</Text>
          </Layout>
        </>
      ) : (
        <>
          <Row className="py-3">
            {Array.isArray(data) &&
              data.map((value, index) => {
                const isPdf = !value.video;
                const cardContent = (
                  <Card
                    bodyStyle={{ padding: 0 }}
                    className="h-100 d-flex flex-column justify-content-between border-0"
                    style={{ borderRadius: "10px", overflow: "hidden" }}
                  >
                    <div>
                      <div
                        className="content-container position-relative"
                        style={{
                          background: "#F1F1F1",
                          borderRadius: "10px 10px 0 0",
                          height: "200px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          overflow: "hidden",
                        }}
                      >
                        {showCheckboxes && (
                          <input
                            style={{
                              width: "20px",
                              height: "20px",
                              top: "3%",
                              right: "5%",
                              zIndex: "10",
                            }}
                            className="position-absolute custom-checkbox"
                            type="checkbox"
                            checked={selectedIds.includes(value._id)}
                            onChange={() => handleCheckboxChange(value._id)}
                          />
                        )}
                        {value.video ? (
                          <video
                            src={value.video}
                            type="video/mp4"
                            controls
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            src={pdfIcon}
                            alt="content"
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "contain",
                            }}
                          />
                        )}
                      </div>

                      <Title
                        level={4}
                        style={{
                          color: "#11142D",
                          marginBottom: 0,
                          fontSize: 16,
                        }}
                        className="px-3 pt-3 ff-gotham-normal"
                      >
                        {value.title}
                      </Title>
                    </div>
                    <div className="px-3 pb-3">
                      <div className="mt-3 d-flex align-items-center gap-5">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{ marginTop: "1px" }}
                            className="green-dot"
                          ></div>
                          <Text
                            style={{
                              color: "#808191",
                              marginBottom: 0,
                            }}
                            className="fs_12 ff-inter fw-medium"
                          >
                            {timeAgo(value?.createdAt)}
                          </Text>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 mt-3">
                        <div className="name-bg d-flex align-items-center justify-content-center">
                          <p className="mb-0 ff-gotham-normal fs_12">
                            {value.userId?.firstName?.charAt(0).toUpperCase()}
                          </p>
                        </div>
                        <Text
                          style={{ color: "#11142D", marginBottom: 0 }}
                          className="ff-gotham-bold fs_12"
                        >
                          {value.userId?.firstName +
                            " " +
                            value.userId?.lastName}
                        </Text>
                      </div>
                    </div>
                  </Card>
                );

                return (
                  <Col lg={3} key={index} className="mt-4">
                    {isPdf ? (
                      <Link
                        to={value.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        {cardContent}
                      </Link>
                    ) : (
                      cardContent
                    )}
                  </Col>
                );
              })}
          </Row>
          {data?.length > 8 ? (
            <div className="d-md-flex justify-content-center align-items-center my-4">
              <button
                onClick={handleLoadMore}
                className=" px-4 py-3  border-0 rounded-3 fs_13 ff-gotham-bold"
              >
                Load More
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default UserLibrary;
