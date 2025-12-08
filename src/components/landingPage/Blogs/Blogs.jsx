import React, { useState, useEffect } from "react";
import "./Blogs.css";
import { Col, Container, Row } from "react-bootstrap";
import nextArrow from "../../../assets/image/png/nextArrowClrBlack.png";
import whiteNextArrow from "../../../assets/image/png/nextArrow.png";
import { getAllBlogs } from "../../../services/AllBlogs";
import { Link, useNavigate } from "react-router-dom";

const Blogs = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await getAllBlogs();
        const sortedBlogs = blogs.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setData(sortedBlogs.slice(0, 5));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div id="Blog" className="py-5 blogs-bg-theme">
      <Container>
        <div className="d-flex align-items-center gap-4">
          <div className="horizontal-line"></div>
          <div className="bg-white px-3 py-1 rounded-5">
            <p className="mb-0 ff-gotham-normal fs_20">Blogs</p>
          </div>
        </div>
        <div className="d-flex align-items-lg-center justify-content-between mt-4">
          <h2 className="mb-0 ff-gotham-bold fs-56">
            From Our <span className="elevate-text">Blog</span>
          </h2>
          <button
            onClick={() => navigate("/blogs")}
            className="d-sm-flex align-items-center gap-2 bg-white px-3 py-1 rounded-5 d-none"
          >
            <p className="mb-0 ff-gotham-normal fs_20">See All</p>
            <img
              style={{ width: "14px", height: "10px" }}
              src={whiteNextArrow}
              alt="nextArrow"
            />
          </button>
        </div>
        <Row>
          {data.map((value, index) => (
            <Col
              className="mt-4"
              lg={index === 0 ? 12 : 3}
              sm={index === 0 ? 12 : 6}
              key={index}
            >
              <div
                className={`${index !== 0 ? "blogs-images" : ""}`}
                onClick={() => navigate(`/blog/${value?._id}`)}
              >
                <div className="position-relative cursor-pointer h-100">
                  <div className="linear-layer"></div>
                  <div className="h-100">
                    <img
                      className={`${
                        index === 0 ? "height-363" : "h-100"
                      } w-100 object-fit-cover image-border-radius image-positions`}
                      src={value.image}
                      alt={value.head}
                    />
                  </div>

                  <div className="content position-absolute">
                    <div className="d-flex gap-3 align-items-center">
                      <p className="text-white ff-gotham-normal fs_16 mb-0">
                        {new Date(value.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                      </p>
                      <div className="d-flex align-items-center gap-3">
                        <div className="dot"></div>
                        <p className="text-white ff-gotham-normal fs_16 mb-0">
                          {value.readingTime || "5 min read"}{" "}
                        </p>
                      </div>
                    </div>
                    <h4 className="text-white d-sm-none ff-montserrat fw-medium fs-32 my-3 d-block d-sm-none">
                      {truncateText(value.title, 5)}
                    </h4>
                    {index === 0 && (
                      <>
                        <h4 className="text-white ff-montserrat fw-medium fs-32 my-3 d-none d-sm-block">
                          {value.title}
                        </h4>
                        <p
                          style={{ maxWidth: "700px" }}
                          className="text-white ff-gotham-normal fs_16 mb-0 d-none d-sm-block"
                        >
                          {value.metaDescription}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          ))}
          <div>
            <button
              onClick={() => navigate("/blogs")}
              style={{ width: "196px", height: "45px" }}
              className="d-flex d-sm-none btn-green-common align-items-center justify-content-center rounded-2 gap-2 mt-4 mx-auto"
            >
              <p className="mb-0 ff-poppins fw-medium fs_20 text-white">
                See All
              </p>
              <img
                style={{ width: "14px", height: "10px" }}
                src={whiteNextArrow}
                alt="nextArrow"
              />
            </button>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Blogs;
