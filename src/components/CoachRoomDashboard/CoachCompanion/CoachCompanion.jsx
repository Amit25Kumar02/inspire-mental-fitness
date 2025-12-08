import React, { useState } from "react";
import OpenAI from "openai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Col, Row } from "react-bootstrap";
import "./CoachCompanion.css";
import hellofromCompanion from "../../../assets/image/png/coach-companion.png";
import { openAiService } from "../../../services/AiCoachService";

const CoachCompanion = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleQueryChange = (value) => {
    const cleanQuery = value.trim() === "<p><br></p>" ? "" : value.trim();
    setQuery(cleanQuery);
    setError("");
  };

  const fetchAIResponse = async () => {
    const cleanQuery = query.trim() === "<p><br></p>" ? "" : query.trim();

    if (!cleanQuery) {
      setError("Please enter your issue you are facing");
      return;
    }

    setError("");
    setLoading(true);
    setResponse("");

    try {
      const data = {
        messages: [
          {
            role: "user",
            content: `As a coach companion, provide clear and well-structured advice for this scenario using HTML formatting, excluding any \`html\` tags and extra symbols: ${query}`,
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
      //       content: `As a coach companion, provide clear and well-structured advice for this scenario using HTML formatting, excluding any \`html\` tags and extra symbols: ${query}`,
      //     },
      //   ],
      //   max_tokens: 500,
      // });

      const aiResponse =
        apiAiResponse.choices[0]?.message?.content ||
        "An error occurred. Please try again.";
      setResponse(aiResponse);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-sm-4 pt-4 space-y-4 bg-gray-100 min-h-screen">
      <h1 className="fs_28 mb-4">Coach Companion</h1>
      <Row className="align-items-center">
        <Col sm={9} lg={10}>
          <ReactQuill
            className="w-full bg-white rounded-lg shadow ff-gotham-normal"
            theme="snow"
            value={query}
            onChange={handleQueryChange}
            placeholder="Hi! Coach, how can I help you..."
          />
          {error && (
            <p className="text-danger mt-2 ff-gotham-normal fs_16">{error}</p>
          )}
        </Col>
        <Col sm={3} lg={2}>
          <div className="companion-image-container d-none d-sm-block">
            <img
              className="companion-image active"
              src={hellofromCompanion}
              alt="Hello Companion"
            />
          </div>
        </Col>
      </Row>
      <div className="my-3 text-start">
        <button
          className="px-4 py-2 ff-gotham-medium border-0 bg_blue text-white rounded-2 hover:bg-blue-600"
          onClick={fetchAIResponse}
        >
          {loading ? "Processing..." : "Get Companion Advice"}
        </button>
      </div>

      {response && (
        <div className="w-full p-4 bg-white border rounded-lg shadow companion-div">
          <h3 className="fs_18 ff-gotham-bold mb-4">Companion:</h3>
          <div
            className="mt-2 ff-gotham-normal fs_14"
            dangerouslySetInnerHTML={{ __html: response }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default CoachCompanion;
