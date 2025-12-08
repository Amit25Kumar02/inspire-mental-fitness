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
import DefaultImg from "../../../../assets/image/png/comingsoon.png";

const CogniFitGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const baseUrl = `${process.env.REACT_APP_API_URL}/games`;
  const clientId = "23043109d499fb9536c2897ce88802b3";
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(baseUrl, { headers: { token: accessToken } })
      .then((response) => {
        if (response.data.success === false) {
          setErrorMessage("Coming soon");
          setGames([]);
        } else {
          // Map API response to the fields we need
          const mappedGames = response.data.games.map((game) => ({
            key: game.key,
            name: game.assets?.titles?.en || "Untitled Game",
            description: game.assets?.descriptions?.en || "No description",
            imageUrl: game.assets?.images?.icon || DefaultImg,
          }));
          setGames(mappedGames);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
        setLoading(false);
      });
  }, [baseUrl, accessToken]);

  const playGame = (gameKey) => {
    setSelectedGame(gameKey);

    const script = document.createElement("script");
    script.src = `https://js.cognifit.com/2025-02-20_1140_bilbo/html5Loader.js`;
    script.async = true;
    script.onload = () => {
      if (window.HTML5JS) {
        window.HTML5JS.loadMode(
          "2025-02-20_1140_bilbo",
          "gameMode",
          gameKey,
          "cogniFitContent",
          {
            clientId,
            accessToken,
            appType: "web",
          }
        );
      }
    };

    document.body.appendChild(script);
  };

  // Listen for game completion
  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.data?.status === "completed" ||
        event.data?.status === "aborted"
      ) {
        setSelectedGame(null);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="ff-gotham-medium mb-4">Mind Games</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p>Loading games...</p>
        </div>
      ) : errorMessage ? (
        <Alert variant="warning">{errorMessage}</Alert>
      ) : selectedGame ? (
        <div id="cogniFitContent" style={{ minHeight: "600px" }}></div>
      ) : (
        <Row>
          {games.map((game) => (
            <Col key={game.key} md={4} lg={3} className="mb-4">
              <Card className="shadow-sm border-0 h-100">
                <Card.Img
                  variant="top"
                  style={{ minHeight: "280px" }}
                  className="object-fit-cover"
                  src={game.imageUrl}
                  alt={game.name}
                />
                <Card.Body className="d-flex flex-column p-3">
                  <Card.Title className=" ff-gotham-medium">
                    {game.name}
                  </Card.Title>
                  <Card.Text className=" ff-gotham-normal">
                    {game.description.split(" ").slice(0, 30).join(" ")}
                    {game.description.split(" ").length > 30 ? "..." : ""}
                  </Card.Text>

                  <Button
                    onClick={() => playGame(game.key)}
                    variant="success"
                    className="mt-auto ff-gotham-medium"
                  >
                    Play Game
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CogniFitGames;
