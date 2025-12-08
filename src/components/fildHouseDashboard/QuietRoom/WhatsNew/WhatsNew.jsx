import React, { useState, useEffect } from "react";
import "./WhatsNew.css";
import { Typography } from "antd";
import { Layout } from "antd";
import { Button, Card, Col, Row } from "react-bootstrap";
import { getAllAlbums } from "../../../../services/AllAlbumsService";
import { Link } from "react-router-dom";

const WhatsNew = () => {
  const { Title, Text } = Typography;
  const [data, setData] = useState([]);
  const [userRole, setUserRole] = useState("");

  // Fetch albums when the component mounts
  useEffect(() => {
    const fetchAlbums = async () => {
      const albums = await getAllAlbums();
      setData(albums);
    };

    fetchAlbums();

    // Get user role from localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.role) {
      setUserRole(userData.role);
    }
  }, []);

  return (
    <div>
      <hr
        className={`hr-line-quite-room border-0 ${
          userRole === "Coach" ? "bg_blue" : "bg_theme"
        }`}
      />
      <Layout className="flex-row align-items-center bg-transparent">
        <Layout className="bg-transparent">
          <Title className="fs_24 ff-gotham-bold mb-0">What's New</Title>
          <Text style={{ color: "#808191" }} className="fs_18 ff-gotham-normal">
            See What’s New this week
          </Text>
        </Layout>
      </Layout>
      <Row className="bg-transparent">
        {data.length > 0 ? (
          data.map((album, index) => (
            <Col className="mt-4 pt-2" key={index} lg={6}>
              <Link to={`/fieldhouse-dashboard/album/${album?._id}`}>
                <Card className="border-0 bg-transparent">
                  <Layout className="bg-transparent">
                    <img
                      style={{ width: "300px", height: "280px" }}
                      className="w-100 border-0 object-fit-cover album-image"
                      src={album.coverImage}
                      alt={album.name}
                    />
                  </Layout>
                  <Layout className="bg-transparent">
                    <Title className="ff-gotham-bold fs_20 mt-2 mb-0 text-capitalize">
                      {album.name}
                    </Title>
                  </Layout>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <Col
            style={{ height: "350px" }}
            className="mt-4 pt-2 text-center d-flex align-items-center justify-content-center"
          >
            <Text
              style={{ color: "#808191" }}
              className="fs_18 ff-gotham-normal"
            >
              No albums yet
            </Text>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default WhatsNew;
