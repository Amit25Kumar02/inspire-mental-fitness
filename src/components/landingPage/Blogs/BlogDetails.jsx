import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the ID from URL params

import { Container, Row, Col } from "react-bootstrap";
import { getBlogDetails } from "../../../services/AllBlogs";
import AppNav from "../AppNavbar/AppNav";
import AppFooter from "../AppFooter/AppFooter";

const BlogDetails = () => {
  const { id } = useParams(); // Get blog ID from URL params
  const [blog, setBlog] = useState(null); // State to store blog data
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await getBlogDetails(id);
        setBlog(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{ minHeight: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div>
          <p className="mb-0 ff-gotham-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div
        style={{ minHeight: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div>
          <p className="mb-0 ff-gotham-medium">Blog not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page-body">
      <AppNav />
      <div className="py-5 overflow-hidden">
        <Container>
          <Row>
            <Col lg={8} className="offset-lg-2">
              <div className="blog-detail-card">
                {/* Blog Image */}
                <div className="mb-4">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="img-fluid w-100 object-fit-cover"
                    style={{ height: "400px" }}
                  />
                </div>

                {/* Blog Title */}
                <h2 className="ff-gotham-bold fs-48">{blog.title}</h2>

                {/* Blog Meta Information */}
                <div className="d-flex justify-content-between mb-3">
                  <p className="ff-gotham-normal fs-16 text-muted">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="ff-gotham-normal fs-16 text-muted">
                    {blog.readingTime || "5 min read"}
                  </p>
                </div>

                {/* Blog Content */}
                <div className="blog-content">
                  <div
                    className="blog-content ff-gotham-normal fs-16"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </div>

                {/* Blog Keywords */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <AppFooter />
    </div>
  );
};

export default BlogDetails;
