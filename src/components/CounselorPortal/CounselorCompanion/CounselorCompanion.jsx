import React, { useState, useEffect } from "react";
import OpenAI from "openai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Col, Row } from "react-bootstrap";
import "./CounselorCompanion.css";
import hellofromCompanion from "../../../assets/image/png/counselorCompionCharacter.png";
import companionThinking from "../../../assets/image/png/counselorCompionCharacterThinking.png";
import companionSearching from "../../../assets/image/png/counselorCompionCharacterSearching.png";
import companionResponse from "../../../assets/image/png/counselorCompionCharacterResponse.png";
import { openAiService } from "../../../services/AiCoachService";

const CounselorCompanion = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [companionImage, setCompanionImage] = useState(hellofromCompanion);
  const [isFocused, setIsFocused] = useState(false);
  const [lastImage, setLastImage] = useState(hellofromCompanion);
  const [isResponseImageVisible, setIsResponseImageVisible] = useState(false);
  const [error, setError] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState("");

  const changeImage = (newImage) => {
    if (newImage !== lastImage) {
      setLastImage(newImage);
      setTimeout(() => {
        setCompanionImage(newImage);
        if (newImage === companionResponse) {
          setIsResponseImageVisible(false);
        }
      }, 200);
    }
  };

  const handleQueryChange = (value) => {
    const cleanQuery = value.trim() === "<p><br></p>" ? "" : value.trim();

    setQuery(cleanQuery);

    if (cleanQuery.length > 0) {
      setError("");
      changeImage(companionThinking);
    } else if (!isFocused && response.trim().length === 0) {
      changeImage(hellofromCompanion);
    } else if (cleanQuery.length === 0 && response.trim().length > 0) {
      changeImage(companionResponse);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (!loading && query.trim()) {
      changeImage(companionThinking);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);

    setTimeout(() => {
      const cleanQuery = query.trim() === "<p><br></p>" ? "" : query.trim();
      const isQueryEmpty = cleanQuery.length === 0;
      const isResponseEmpty = response.trim().length === 0;

      if (isQueryEmpty && isResponseEmpty) {
        changeImage(hellofromCompanion);
      } else if (isQueryEmpty && !isResponseEmpty) {
        changeImage(companionResponse);
      }
    }, 100);
  };

  useEffect(() => {
    if (response) {
      setDisplayedResponse("");
      let index = 0;

      const typingInterval = setInterval(() => {
        if (index < response.length) {
          setDisplayedResponse((prev) => prev + response[index]);
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 30);

      return () => clearInterval(typingInterval);
    }
  }, [response]);

  const fetchAIResponse = async () => {
    const cleanQuery = query.trim() === "<p><br></p>" ? "" : query.trim();

    if (!cleanQuery) {
      setError("Please enter your issue you are facing");
      return;
    }

    setError("");
    setLoading(true);
    setResponse("");
    setDisplayedResponse("");
    changeImage(companionSearching);

    try {
      const data = {
        messages: [
          {
            role: "user",
            content: `A counselor seeks advice for athletes and coaches: ${query}`,
          },
        ],
        max_tokens: 500,
      };

      const apiAiResponse = await openAiService(data);

      // const completion = await openai.chat.completions.create({
      //   model: "gpt-4o-mini",
      //   messages: [
      //     {
      //       role: "user",
      //       content: `A counselor seeks advice for athletes and coaches: ${query}`,
      //     },
      //   ],
      //   max_tokens: 500,
      // });

      setTimeout(() => {
        changeImage(companionResponse);
        setTimeout(() => {
          setResponse(apiAiResponse.choices[0].message.content);
        }, 400);
      }, 300);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("An error occurred. Please try again.");
      changeImage(hellofromCompanion);
    } finally {
      setLoading(false);
    }
  };

  const parseResponse = (text) => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");

    return lines.map((line, index) => {
      const formattedText = line.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
      );
      return (
        <p
          key={index}
          className="mt-2 ff-gotham-normal"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        ></p>
      );
    });
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 bg-gray-100 min-h-screen">
      <h1 className="fs_28 mb-4">Counselor Companion</h1>
      <Row className="align-items-center">
        <Col lg={3}>
          <div className="companion-image-container">
            <img
              className={`companion-image ${
                companionImage === hellofromCompanion ? "active" : ""
              }`}
              src={hellofromCompanion}
              alt="Hello Companion"
            />
            <img
              className={`companion-image ${
                companionImage === companionThinking ? "active" : ""
              }`}
              src={companionThinking}
              alt="Thinking Companion"
            />
            <img
              className={`companion-image ${
                companionImage === companionSearching ? "active" : ""
              }`}
              src={companionSearching}
              alt="Searching Companion"
            />
            <img
              className={`companion-image ${
                companionImage === companionResponse ? "active" : ""
              }`}
              src={companionResponse}
              alt="Response Companion"
              onTransitionEnd={() => setIsResponseImageVisible(true)} // Detect transition completion
            />
          </div>
        </Col>
        <Col lg={9}>
          <ReactQuill
            className="w-full bg-white rounded-lg shadow ff-gotham-normal"
            theme="snow"
            value={query}
            onChange={handleQueryChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Describe the issue you need help with..."
          />
          {error && (
            <p className="text-danger mt-2 ff-gotham-normal fs_16">{error}</p>
          )}
        </Col>
      </Row>
      <div className="my-3 text-end">
        <button
          className="px-4 py-2 ff-gotham-medium btn-green-common bg-blue-500 text-white rounded-2 hover:bg-blue-600"
          onClick={fetchAIResponse}
        >
          {loading ? "Processing..." : "Get Companion Advice"}
        </button>
      </div>

      {displayedResponse && isResponseImageVisible && (
        <div className="w-full p-4 bg-white border rounded-lg shadow">
          <h2 className="fs_24 ff-gotham-bold mb-4">Companion:</h2>
          <div className="mt-2">{parseResponse(displayedResponse)}</div>
        </div>
      )}
    </div>
  );
};

export default CounselorCompanion;
