import React, { useEffect, useState } from "react";
import assesment_image from "../../../assets/image/png/assesment-tests_img.png";
import { Link } from "react-router-dom";
import { getAssesmentQuestions } from "../../../services/AssesmentQuestionsService";
import { Col, Row } from "react-bootstrap";

const AssesmentTests = () => {
  const [data, setData] = useState([]);

  const gettingQuestions = async () => {
    const response = await getAssesmentQuestions();
    setData(response?.groups);
  };

  useEffect(() => {
    gettingQuestions();
  }, []);

  return (
    <div className="my-4">
      <h4 className="ff-gotham-bold fs_25 mb-0">Self Discovery</h4>
      <div className="card pb-5 rounded-4 mt-4">
        <img
          className="rounded-top-4"
          src={assesment_image}
          alt="assesment_image"
        />
        <div className="px-3">
          <h4
            style={{ letterSpacing: "-0.18px" }}
            className="mt-4 text-center ff-gotham-bold fs_28"
          >
            Instructions
          </h4>
          <p
            className="text-center ff-gotham-normal fs_15 color_black2 mb-0"
            style={{
              maxWidth: "940px",
              margin: "0 auto",
              lineHeight: "22.17px",
            }}
          >
            To create an accurate and holistic profile of your strengths, we
            will ask you to evaluate a series of questions about how you act,
            feel, and think in different scenarios. By dragging the slider,
            please evaluate to which extent a given statement describes you on a
            scale from 0% on the left to 100% on the right.
          </p>
          <p
            className="text-center ff-gotham-normal fs_15 color_black2 mb-0"
            style={{
              maxWidth: "940px",
              margin: "0 auto",
              lineHeight: "22.17px",
            }}
          >
            With some statements, you might feel that the answer depends on the
            context - at work, at home, or other social situations - and that’s
            totally fine. Answer with your first reaction - <br /> just choose
            what feels right.
          </p>
          <p
            className="text-center ff-gotham-normal fs_15 color_black2 mb-0"
            style={{
              maxWidth: "940px",
              margin: "0 auto",
              lineHeight: "22.17px",
            }}
          >
            We recommend finding a quiet place and setting 15-20 min aside for
            completing this test.
          </p>

          <div className="mt-4">
            {data?.length === 0 ? (
              <div className="text-center">
                <h5 className="ff-gotham-medium">No tests available</h5>
              </div>
            ) : (
              <Row className="justify-content-center">
                {data?.map((group, index) => (
                  <Col md={3} className="px-2 pt-3" key={index}>
                    <div className="card mb-4 h-100">
                      <div className="card-body d-flex flex-column justify-content-between">
                        <h5 className="ff-gotham-medium text-center mb-0">
                          {group.groupName}
                        </h5>
                        <div className="d-flex justify-content-center">
                          <Link
                            to={`/fieldhouse-dashboard/self-discovery-tests/${group._id}`}
                          >
                            <button
                              className="py-3 px-5 bg_theme border-0 text-white fs_14 ff-gotham-bold rounded-3"
                              style={{
                                maxWidth: "400px",
                                width: "100%",
                                lineHeight: "13.86px",
                                letterSpacing: "0.50px",
                              }}
                            >
                              Start Test
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssesmentTests;
