import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import agree from "../../../assets/image/png/agree.png";
import disagree from "../../../assets/image/png/disagree.png";
import { useNavigate, useParams } from "react-router-dom";
import "./assesment.css";

const AssesmentQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const colorSets = {
    3: ["#1a71bd", "#9dc3a6", "#118c2a"],
    4: ["#1a71bd", "#a5badb", "#e1e7f0", "#118c2a"],
    5: ["#1a71bd", "#a5badb", "#e1e7f0", "#9dc3a6", "#118c2a"],
    6: ["#1a71bd", "#5c8dcf", "#a5badb", "#e1e7f0", "#9dc3a6", "#118c2a"],
    7: [
      "#1a71bd",
      "#4f89cf",
      "#7ba8d4",
      "#a5badb",
      "#e1e7f0",
      "#9dc3a6",
      "#118c2a",
    ],
  };

  const currentColors =
    colorSets[questions[currentQuestion]?.options.length] || colorSets[5];

  const { id } = useParams();
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            token: `${token}`,
          },
        };
        const response = await axios.get(
          `${API_URL}/group-questions/${id}`,
          config
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const updatedAnswers = [
        ...answers,
        {
          questionId: questions[currentQuestion]._id,
          selectedOption: selectedAnswer,
        },
      ];

      setAnswers(updatedAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        submitAnswers(updatedAnswers);
      }
    } else {
      toast.error("Please select an answer.");
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
    }
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const submitAnswers = async (finalAnswers) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/answers`,
        { answers: finalAnswers },
        {
          headers: {
            token: `${token}`,
          },
        }
      );

      if (response.data.status) {
        toast.success("Your answers have been submitted!");

        setTimeout(() => {
          navigate("/fieldhouse-dashboard/self-discovery");
        }, 3000);
      } else {
        toast.error(response.data.message || "Failed to submit answers.");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      toast.error("Failed to submit answers. Please try again.");
    }
  };

  return (
    <div className="my-4">
      <ToastContainer />
      <h4 className="ff-gotham-bold fs_25 mb-0">Self Discovery</h4>
      <div className="card mt-4 border-0" style={{ height: "100%" }}>
        <div className="p-md-5 py-4 px-2">
          {questions.length > 0 && (
            <>
              <h4
                style={{ maxWidth: "776px" }}
                className="text-center ff-gotham-bold fs_28 mb-0 color_black4 mx-auto"
              >
                {questions[currentQuestion].question_text}
              </h4>
              <div className="p-md-5 px-2 mt-4">
                <div className="d-flex justify-content-between">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      style={{
                        backgroundColor: currentColors[index],
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleAnswerClick(option)}
                      className={`btn-option ${
                        selectedAnswer === option ? "selected" : ""
                      }`}
                    ></button>
                  ))}
                </div>
                <div className="d-flex align-items-center justify-content-between mt-2">
                  <div className="d-flex align-items-center">
                    <p className="mb-0 ff-gotham-medium fs_14">Disagree</p>
                    <img
                      className="ms-2"
                      style={{ width: "30px" }}
                      src={disagree}
                      alt=""
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      className="me-2"
                      style={{ width: "30px" }}
                      src={agree}
                      alt=""
                    />
                    <p className="mb-0 ff-gotham-medium fs_14">Agree</p>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column-reverse flex-sm-row justify-content-center mt-5 align-items-center gap-3">
                <button
                  style={{ letterSpacing: "0.50px" }}
                  onClick={handleBack}
                  className="px-5 py-2 bg-transparent rounded-3 fs_13 color_theme border-1 light_blue border-success border ff-gotham-bold"
                >
                  Back
                </button>
                <button
                  style={{ letterSpacing: "0.50px" }}
                  onClick={handleNext}
                  className="px-5 py-2 bg_theme rounded-3 border border-1 border-transparent fs_13 text-white ff-gotham-bold"
                >
                  {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssesmentQuestions;
