import React, { useEffect, useState } from "react";
import { Layout, Typography } from "antd";
import "./CounselorArena.css";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import boxImg from "../../../assets/image/png/arenaSilhouette.png";
import { getAllLibraryFileRequest } from "../../../redux/slice/GetAllLibrarySlice";
import pdfIcon from "../../../assets/image/svg/pdfIcon.svg";
import meetingIcon from "../../../assets/image/png/videoCall.png";
import { getArenaFile } from "../../../services/ArenaService";

const CounselorArena = () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { loading, error } = useSelector((state) => state.getAllLibrary);
  const [pageLimit, setPageLimit] = useState(8);

  const gettingArenaFiles = async () => {
    const response = await getArenaFile();
    setData(response);
  };

  useEffect(() => {
    gettingArenaFiles();
  }, []);

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
      <Row className="pt-1">
        <div className="bg_theme bg_image p-sm-5 px-3 py-4 rounded-4 position-relative overflow-hidden">
          <img
            className="box-img-arena position-absolute"
            src={boxImg}
            alt="player"
          />
          <div
            style={{ height: "140px" }}
            className="position-relative z-1 d-flex flex-column justify-content-center"
          >
            <h2 className="fs_50 ff-gotham-bold text-white mb-0">
              Welcome to the Arena!
            </h2>
          </div>
        </div>
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
                          {value?.zoomLink ? (
                            <>
                              <Link to={value?.zoomLink}>
                                <img
                                  src={meetingIcon}
                                  alt="content"
                                  style={{
                                    width: "80px",
                                    height: "80px",
                                    objectFit: "contain",
                                  }}
                                />
                              </Link>
                            </>
                          ) : (
                            <>
                              {value?.video ? (
                                <video
                                  src={value?.video}
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
                            </>
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
                          {value?.title}
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
                    <Col sm={6} lg={3} key={index} className="mt-4">
                      {value?.pdf && !value.video && !value.zoomLink ? (
                        <>
                          <Link
                            to={value.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none" }}
                          >
                            {cardContent}
                          </Link>
                        </>
                      ) : (
                        <>
                          {value?.zoomLink && !value.video && !value.pdf ? (
                            <>
                              <Link
                                to={value.zoomLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none" }}
                              >
                                {cardContent}
                              </Link>
                            </>
                          ) : (
                            <>
                              {" "}
                              <div>{cardContent}</div>
                            </>
                          )}
                        </>
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

export default CounselorArena;
