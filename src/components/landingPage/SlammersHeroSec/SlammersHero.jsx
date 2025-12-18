import React from "react";
import "./SlammersHero.css";
import inspireLogo from "../../../assets/image/png/logo.png";
import footballGirl from "../../../assets/image/png/footballgirlshilloute.png";
import SLogo from "../../../assets/image/png/s-logo.png"

const API_URL = "https://prodapi.inspirementalfitness.com";

const SlammersHero = () => {
    return (
        <section className="slammers-hero-wrapper">
            {/* Left Content - Text Section */}
            <div className="text-content">
                {/* Main Header */}
                <div className="main-header">
                    <h1 className="slammer-title">Slammers FC</h1>
                    <h2 className="slammer-title-1">Mental Fitness</h2>
                </div>

                <div className="logo-sec">
                    <div className="powered-section">
                        <div className="powered-label">Powered By</div>
                        <div className="powered-logos">
                            <img
                                src={inspireLogo}
                                alt="INSPIRE"
                                className="inspire-logo-text"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Image Section */}
            <div className="image-section">
                <img
                    src={footballGirl}
                    alt="Football Player Silhouette"
                    className="player-silhouette"
                />
            </div>
        </section>
    );
};

export default SlammersHero;
