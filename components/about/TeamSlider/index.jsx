import React, { useState } from "react";
import "./TeamSlider.css";

const TeamSlider = ({ items }) => {
    const data = Array.isArray(items) ? items : [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animState, setAnimState] = useState("idle"); // "idle", "exiting", "entering"
    const [direction, setDirection] = useState(""); // "next", "prev"

    const prevIndex =
        data.length > 0 ? (currentIndex - 1 + data.length) % data.length : 0;
    const nextIndex = data.length > 0 ? (currentIndex + 1) % data.length : 0;

    const handleNext = () => {
        if (animState !== "idle") return;
        if (!data?.length) return;
        setDirection("next");
        setAnimState("exiting");

        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % data.length);
            setAnimState("entering");

            setTimeout(() => {
                setAnimState("idle");
            }, 800);
        }, 400);
    };

    const handlePrev = () => {
        if (animState !== "idle") return;
        if (!data?.length) return;
        setDirection("prev");
        setAnimState("exiting");

        setTimeout(() => {
            setCurrentIndex(
                (prev) => (prev - 1 + data.length) % data.length
            );
            setAnimState("entering");

            setTimeout(() => {
                setAnimState("idle");
            }, 800);
        }, 400);
    };

    // Helper to resolve image paths (similar to JourneySection if needed, but here we'll assume relative to public or src)
    const getImagePath = (imagePath) => {
        if (!imagePath) return "";
        // If it starts with assets, it might be in src/assets
        if (imagePath.startsWith("assets/")) {
            return `/${imagePath}`;
        }
        return imagePath;
    };

    const getAnimationClass = () => {
        if (animState === "exiting") {
            return direction === "next" ? "slide-out-left" : "slide-out-right";
        }
        if (animState === "entering") {
            return direction === "next" ? "slide-in-right" : "slide-in-left";
        }
        return "";
    };

    if (!data?.length) return null;

    return (
        <section className="team-slider-section" id="leadership">
            <div className="container">
                <div className="section-title text-center mb-0">
                    <div className="sub-title-wrapper">
                        <span className="sub-title common-subtitle">
                            Our Members
                        </span>
                    </div>
                    <div className="about-page-team-title bs-font-playfair-display">
                        Meet the Experts Who Make It Happen
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="team-slider-main">

                    {/* Left Preview */}
                    <div className="team-side-preview preview-left">
                        <img
                            src={getImagePath(data[prevIndex]?.image)}
                            alt="Previous Member"
                        />
                    </div>

                    {/* Active Card */}
                    <div className={`team-active-card ${getAnimationClass()}`}>
                        <div className="team-member-img-wrap">
                            <img
                                src={getImagePath(data[currentIndex]?.image)}
                                alt={data[currentIndex]?.name}
                            />
                        </div>

                        <div className="team-member-content">
                            <p className="team-member-quote">
                                "{data[currentIndex]?.quote}"
                            </p>

                            <h3 className="team-member-name">
                                {data[currentIndex]?.name}
                            </h3>

                            <div className="team-slider-nav">
                                <button
                                    className="team-nav-btn team-prev"
                                    onClick={handlePrev}
                                    aria-label="Previous member"
                                    disabled={animState !== "idle"}
                                >
                                    <i className="fas fa-arrow-left"></i>
                                </button>

                                <button
                                    className="team-nav-btn team-next"
                                    onClick={handleNext}
                                    aria-label="Next member"
                                    disabled={animState !== "idle"}
                                >
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Preview */}
                    <div className="team-side-preview preview-right">
                        <img
                            src={getImagePath(data[nextIndex]?.image)}
                            alt="Next Member"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TeamSlider;
