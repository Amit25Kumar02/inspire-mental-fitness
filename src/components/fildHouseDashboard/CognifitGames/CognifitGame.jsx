import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Button,
  Alert,
} from "react-bootstrap";
import mindGameGif from "../../../assets/image/png/mind-games-gif.gif";
import Img1 from "../../../assets/image/png/victory-voice.png";
import Img2 from "../../../assets/image/png/mind-match.png";
import Img3 from "../../../assets/image/png/atheletics-quest.png";
import Img4 from "../../../assets/image/png/Focus-img.png";
import Img5 from "../../../assets/image/png/aimTrainer.png";
import Img6 from "../../../assets/image/png/reactionTime.png";
import DefaultImg from "../../../assets/image/png/comingsoon.png";
import { useNavigate } from "react-router-dom";

const CogniFitGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const baseUrl = `${process.env.REACT_APP_API_URL}/games`;
  const clientId = "23043109d499fb9536c2897ce88802b3";
  const accessToken = localStorage.getItem("token");

  // useEffect(() => {
  //   axios
  //     .get(baseUrl, { headers: { token: accessToken } })
  //     .then((response) => {

  //       if (response.data.success === false) {
  //         setErrorMessage("Coming soon");
  //         setGames([]);
  //       } else {
  //         setGames(response?.data?.games);
  //       }

  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching games:", error);
  //       setLoading(false);
  //     });
  // }, [baseUrl, accessToken]);

  // Listen for game completion
  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.data?.status === "completed" ||
        event.data?.status === "aborted"
      ) {
        console.log(`Game ${event.data.key} ${event.data.status}`);
        setSelectedGame(null);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const staticGames = [
    {
      imagePath: Img1,
      title: "Victory Voice",
      description:
        "Enter Victory Voice and turn self-doubt into unstoppable confidence. Transform challenges into empowering statements and build the inner voice that drives peak performance.",
      link: "/victory-voice",
      buttontext: "Play Game",
    },
    {
      imagePath: Img2,
      title: "Mind Match",
      description:
        "Step into Mind Match, where your focus, decisions, and emotions are put to the test. Match each challenge with the right mental strategy, earn points, and level up your game — on the field and in your mind.",
      link: "/mind-match",
      buttontext: "Play Game",
    },
    {
      imagePath: Img3,
      title: "Athletes Quest",
      description:
        "Begin your Athletes Quest and face challenges that sharpen resilience, confidence, and mental strength. Conquer each level to unlock the mindset of a true champion.",
      link: "",
      buttontext: "Coming Soon",
    },
    {
      imagePath: Img4,
      title: "Focus Field",
      description:
        "Sharpen your concentration and reaction speed in Focus Field! Tap numbers from 00 to 99 in order as fast as you can while the timer tracks your progress. Stay focused, avoid mistakes, and challenge yourself to set a new personal best. Perfect for training memory, attention, and mental endurance.",
      link: "/focus-field",
      buttontext: "Play Game",
    },
    {
      imagePath: Img5,
      title: "Aim Trainer",
      description:
        "Sharpen your reflexes and boost your precision by clicking targets as quickly and accurately as possible! Train your hand-eye coordination, reaction speed, focus, and quick decision-making skills with every round. Compete with yourself and aim for the fastest times to become a true aiming master.",
      link: "/aim-trainer",
      buttontext: "Play Game",
    },
    {
      imagePath: Img6,
      title: "Reaction Time",
      description:
        "Test and improve your reflexes with the Reaction Time game! Click as quickly as possible when the screen turns green. Avoid false starts and aim for the fastest response. This game trains your visual processing, hand-eye coordination, and quick decision-making skills.",
      link: "/reaction-time",
      buttontext: "Play Game",
    },
    // {
    //   imagePath: DefaultImg,
    //   title: "Coming Soon",
    //   description: "",
    //   link: "",
    //   buttontext: "Coming Soon",
    // },
    // {
    //   imagePath: DefaultImg,
    //   title: "Coming Soon",
    //   description: "",
    //   link: "",
    //   buttontext: "Coming Soon",
    // },
  ];

  return (
    <Container className="mt-4">
      <h2 className="ff-gotham-medium mb-4">Gamification</h2>
      {loading ? (
        <div
          style={{ height: "300px" }}
          className="text-center d-flex align-items-center justify-content-center"
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : errorMessage ? (
        <div
          style={{ height: "400px" }}
          className="text-center d-flex align-items-center justify-content-center flex-column"
        >
          <img
            style={{ maxWidth: "200px" }}
            className="w-100"
            src={mindGameGif}
            alt=""
          />
          <p className="ff-gotham-bold fs_30">{errorMessage}</p>
        </div>
      ) : selectedGame ? (
        <div
          id="cogniFitContent"
          className="w-100"
          style={{ height: "500px" }}
        ></div>
      ) : (
        <Row>
          {staticGames.map((game, index) => (
            <Col key={index} md={4} lg={4} className="mb-2">
              <Card className="min-games-card shadow-sm border-0 h-100">
                <Card.Img
                  variant="top"
                  src={game.imagePath}
                  alt={game.title}
                  className=""
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div className="pb-3">
                    <Card.Title className="min-gametitle">
                      {game.title}
                    </Card.Title>
                    <Card.Text className="min-gamedescription">
                      {game.description}
                    </Card.Text>
                  </div>
                  <Button
                    onClick={() => navigate(`${game.link}`)}
                    variant="success"
                    className="min-gamebutton"
                  >
                    {game.buttontext}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
          {/* {games.map((game) => (
            <Col key={game.key} md={4} lg={3} className="mb-4">
              <Card className="shadow-sm border-0 h-100">
                <Card.Img
                  variant="top"
                  src={
                    game.assets?.images?.icon ||
                    "https://via.placeholder.com/150"
                  }
                  alt={game.assets?.titles?.en}
                  className="p-3"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-primary">
                    {game.assets?.titles?.en}
                  </Card.Title>
                  <Card.Text style={{ fontSize: "0.9rem" }}>
                    {game.assets?.descriptions?.en?.slice(0, 100)}...
                  </Card.Text>
                  <Button
                    variant="success"
                    className="mt-auto"
                    onClick={() => playGame(game.key)}
                  >
                    Play Game
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))} */}
        </Row>
      )}
    </Container>
  );
};

export default CogniFitGames;
