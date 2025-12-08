import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../assets/image/png/logo.png";
import { FaTrophy, FaBook, FaPlay } from "react-icons/fa";
import "./LeaderboardGamesNavbar.css";

const LeaderboardGamesNavbar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <nav className="lg-navbar">
      <Container className="d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Link to="/" className="py-3">
          <img src={logo} alt="logo" className="lg-logo lg-logo-size" />
        </Link>

        {/* Desktop Menu */}
        <div className="d-none d-lg-flex align-items-center gap-4">
          <Link
            to="/fieldhouse-dashboard/games"
            className="lg-link d-flex align-items-center gap-1"
          >
            <FaPlay /> <span>Games</span>
          </Link>

          <Link to="#" className="lg-link d-flex align-items-center gap-1">
            <FaTrophy /> <span>High Score</span>
          </Link>

          <Link to="/blogs" className="lg-link d-flex align-items-center gap-1">
            <FaBook /> <span>Blogs</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <Button
          onClick={() => setShowNav(!showNav)}
          className={`d-lg-none lg-hamburger-btn bg-transparent border-0 ${
            showNav ? "lg-hamburger-active" : "lg-hamburger"
          }`}
        >
          <span className="lg-bar"></span>
          <span className="lg-bar"></span>
          <span className="lg-bar"></span>
        </Button>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`d-lg-none lg-mobile-menu ${
          showNav
            ? "lg-nav-show d-flex align-items-center"
            : "lg-nav-hidden d-flex align-items-center"
        }`}
      >
        <Link
          onClick={() => setShowNav(false)}
          to="/fieldhouse-dashboard/games"
          className="lg-link d-flex align-items-center gap-1 mb-3"
        >
          <FaPlay /> <span>Games</span>
        </Link>

        <Link
          onClick={() => setShowNav(false)}
          to="#"
          className="lg-link d-flex align-items-center gap-1 mb-3"
        >
          <FaTrophy /> <span>High Score</span>
        </Link>

        <Link
          onClick={() => setShowNav(false)}
          to="/blogs"
          className="lg-link d-flex align-items-center gap-1 mb-3"
        >
          <FaBook /> <span>Blogs</span>
        </Link>
      </div>
    </nav>
  );
};

export default LeaderboardGamesNavbar;
