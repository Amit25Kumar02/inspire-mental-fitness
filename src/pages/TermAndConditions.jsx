import React from "react";
import TermsConditions from "../components/landingPage/TermAndCondition/TermAndConditions";
import AppNav from "../components/landingPage/AppNavbar/AppNav";
import AppFooter from "../components/landingPage/AppFooter/AppFooter";

const TermAndConditions = () => {
  return (
    <div>
      <div className="landing-page-body">
        <AppNav />
        <TermsConditions />
        <AppFooter />
      </div>
    </div>
  );
};

export default TermAndConditions;
