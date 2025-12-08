import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./Blogs.css";
import { Link, useNavigate } from "react-router-dom";
import { getAllBlogs } from "../../../services/AllBlogs";
import AppNav from "../AppNavbar/AppNav";
import AppFooter from "../AppFooter/AppFooter";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsData = await getAllBlogs();
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="landing-page-body">
      <AppNav />
      <div className="py-5 min-vh-100">
        <Container>
          <h2 className="mb-4 ff-gotham-bold fs-56 text-center">
            <span className="elevate-text">Blogs</span>
          </h2>
          <Row className="g-4 mt-5">
            {blogs.map((blog) => (
              <Col key={blog._id} lg={4} md={6} sm={12}>
                <div
                  className="h-100"
                  onClick={() => navigate(`/blog/${blog?._id}`)}
                >
                  <div className="blog-card d-flex flex-column justify-content-between h-100 border rounded overflow-hidden shadow-sm cursor-pointer">
                    {/* Blog Image */}
                    <div>
                      <div className="blog-image-container">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="img-fluid w-100 object-fit-cover"
                          style={{ height: "200px" }}
                        />
                      </div>
                      <div className="px-3 pt-3">
                        <h5 className="blog-title ff-gotham-bold fs-18 clr-black">
                          {blog.title}
                        </h5>
                      </div>
                    </div>
                    <div className="px-3">
                      <p className="blog-meta ff-gotham-normal fs-14 text-muted mb-2">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        | {blog.readingTime || "5 min read"}
                      </p>
                      <p className="blog-description ff-gotham-normal fs-14 text-truncate clr-black">
                        {blog.metaDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <AppFooter />
    </div>
  );
};

export default AllBlogs;
