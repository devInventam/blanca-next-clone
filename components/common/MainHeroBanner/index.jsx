import React from "react";
import ThemeBtn from "../Button/ThemeBtn";
import './MainHeroBanner.css'

const MainHeroBanner = ({
    videoSrc,
    poster,
    status,
    title,
    location,
    buttonText = "View More",
    buttonTo = "/projects",
    overlayOpacity,
    projectLink,
    isHomePage = false,
    projectId,
}) => {

    const redirectLink = projectLink ? projectLink : `/project/${projectId}`;

    const shouldShowButton = isHomePage || (!isHomePage && projectLink);


    return (
        <section className="hero-area-2 black-120-bg">
            <div
                className="hero-2-item justify-content-center"
                style={{ position: "relative", overflow: "hidden" }}
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={poster}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        zIndex: 0,
                    }}
                >
                    <source src={videoSrc} type="video/mp4" />
                    {poster && (
                        <img
                            src={poster}
                            alt={title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    )}
                </video>

                <div
                    className="video-overlay"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: overlayOpacity,
                        zIndex: 1,
                    }}
                ></div>

                <div className="container-fluid" style={{ position: "relative", zIndex: 2 }}>
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-10 text-center">
                            <div className="hero-content flex-grow-1 d-flex align-items-center justify-content-center flex-column">
                                {status && <h5 className="hero-main-subinfo text-white">{status}</h5>}
                                {title && <h1 className="hero-main-title text-white bs-font-colgent-regular">{title}</h1>}
                                {location && <h5 className="hero-main-subinfo text-white">{location}</h5>}
                            </div>
                            {shouldShowButton && (
                                <div className="buttons mt-96">
                                    <ThemeBtn to={redirectLink} className="bs-font-montserrat">
                                        {buttonText}
                                    </ThemeBtn>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainHeroBanner;
