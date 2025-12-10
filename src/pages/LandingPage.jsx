import React from "react";
import "../components/landingPage/landingpage.css";
import AppNav from "../components/landingPage/AppNavbar/AppNav";
import AppHero from "../components/landingPage/AppHeroSec/AppHero";
import TrustedByCoaches from "../components/landingPage/TrustedByCoaches/TrustedByCoaches";
import Features from "../components/landingPage/Features/Features";
import AboutUs from "../components/landingPage/AboutUs/AboutUs";
import Blogs from "../components/landingPage/Blogs/Blogs";
import Pricing from "../components/landingPage/Pricing/Pricing";
import TryInspire from "../components/landingPage/TryInspire/TryInspire";
import AppFooter from "../components/landingPage/AppFooter/AppFooter";

import Faqs from "../components/landingPage/Faq/Faq";
import SlammersHero from "../components/landingPage/SlammersHeroSec/SlammersHero";

const LandingPage = () => {
  return (
    <div className="d-flex flex-column landing-page-body">
      <AppNav />
      {/* <AppHero /> */}
      <SlammersHero />
      {/* <TrustedByCoaches /> */}
      {/* <Features /> */}
      {/* <AboutUs /> */}
      {/* <WhatTheyAreSaying /> */}
      {/* <TryInspire /> */}
      {/* <Blogs /> */}
      {/* <Pricing /> */}
      {/* <Faqs /> */}
      {/* <AppFooter /> */}
    </div>
  );
};

export default LandingPage;
