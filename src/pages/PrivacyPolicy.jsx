import React from "react";
import Privacyplans from "../components/landingPage/PrivacyPolicy/PrivacyPlans";
import AppNav from "../components/landingPage/AppNavbar/AppNav";
import AppFooter from "../components/landingPage/AppFooter/AppFooter";

const PrivacyPolicy = () => {
  return (
    <div>
      <div className="landing-page-body">
        <AppNav />
        <Privacyplans />
        <AppFooter />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
