import React from "react";
import { Typography } from "antd";
import SongSlider from "./SongsSlider/SongSlider";
import { Col, Row } from "react-bootstrap";
import WhatsNew from "./WhatsNew/WhatsNew";
import TopSongs from "./TopSongs/TopSongs";

const QuiteRoomPage = () => {
  const { Title, Text } = Typography;
  return (
    <div className="my-4 position-relative">
      <Title className="fs_25 ff-gotham-bold ">Recovery Room</Title>
      <SongSlider />
      <Row className="mt-4">
        <Col lg={7}>
          <WhatsNew />
        </Col>
        <Col lg={5}>
          <TopSongs />
        </Col>
      </Row>
    </div>
  );
};

export default QuiteRoomPage;
