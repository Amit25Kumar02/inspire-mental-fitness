import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Layout, Typography } from "antd";
import pdfIcon from "../../../assets/image/png/coachroompdficon.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllLibraryFileRequest } from "../../../redux/slice/GetAllLibrarySlice";
import { Link } from "react-router-dom";
import logo from "../../../assets/image/svg/logoIcon.svg";

const CoachLibrary = () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.getAllLibrary);
  const [pageLimit, setPageLimit] = useState(8);

  useEffect(() => {
    dispatch(getAllLibraryFileRequest());
  }, [dispatch]);

  const handleLoadMore = () => {
    setPageLimit(pageLimit + 8);
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

  return (
    <div className={`my-4`}>
      <h4 className={`ff-gotham-bold fs_25 mb-0`}>Library</h4>
      <Row className="pt-1">
        {data?.length === 0 ? (
          <>
            <Layout
              style={{ height: "400px" }}
              className="d-flex align-items-center justify-content-center mt-5 bg-transparent"
            >
              <Text className=" ff-gotham-bold">No data found</Text>
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
                              src={logo}
                              alt="content"
                              style={{
                                width: "60px",
                                height: "60px",
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
      </Row>
    </div>
  );
};

export default CoachLibrary;
