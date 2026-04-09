import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Amenities.css";

const Amenities = ({ amenities }) => {

    // const amenitiesImages = [
    //     "/images/amenities/amenity-1.png",
    //     "/images/amenities/amenity-2.png",
    //     "/images/amenities/amenity-3.png",
    //     "/images/amenities/amenity-4.png",
    //     "/images/amenities/amenity-5.png",
    //     "/images/amenities/amenity-6.png",
    // ];

    // const amenities = [
    //     {
    //         id: 1,
    //         title: "Swimming Pool",
    //         desc: "Luxurious infinity pool with stunning views",
    //         img: amenitiesImages[0],
    //     },
    //     {
    //         id: 2,
    //         title: "Fitness Center",
    //         desc: "State-of-the-art gym with modern equipment",
    //         img: amenitiesImages[1],
    //     },
    //     {
    //         id: 3,
    //         title: "Parking Space",
    //         desc: "Secure covered parking for residents",
    //         img: amenitiesImages[2],
    //     },
    //     {
    //         id: 4,
    //         title: "Siting Pavilion",
    //         desc: "Pavilion with beautiful views and seating area",
    //         img: amenitiesImages[3],
    //     },
    //     {
    //         id: 5,
    //         title: "Jogging Track",
    //         desc: "Jogging Track with fitness equipment",
    //         img: amenitiesImages[4],
    //     },
    //     {
    //         id: 6,
    //         title: "Club House",
    //         desc: "Club House with all games and amenities",
    //         img: amenitiesImages[5],
    //     },
    // ];

    const [activeAmenity, setActiveAmenity] = useState(amenities[0]);

    return (
        <section className="amenities-main" id="prime-location">
            <Container className="position-relative z-1">
                <Row className="mt-60">
                    <Col xs={12}>
                        <div className="lux-amenities-section">

                            {/* Heading */}
                            <div className="amenities-heading text-center mb-60 wow fadeInUp delay-0-3s">
                                <div className="sub-title-wrapper mb-20 d-inline-block">
                                    <span className="sub-title common-subtitle">
                                        AMENITIES
                                    </span>
                                </div>

                                <h2 className="common-title bs-font-playfair-display text-white mb-20">
                                    For those who expect the extraordinary
                                </h2>

                                <p className="text-white opacity-50">
                                    Where luxury is not just seen it’s felt in every
                                    experience.
                                </p>
                            </div>

                            {/* Amenities Content */}
                            <div className="lux-amenities-container wow fadeInUp delay-0-4s">
                                <Row className="g-0 align-items-stretch">

                                    {/* Left List */}
                                    <Col lg={5}>
                                        <div className="lux-amenities-list">
                                            {amenities?.map((item, index) => (
                                                <div
                                                    key={item.id}
                                                    className={`lux-amenity-item ${activeAmenity?.id === item?.id ? "active" : ""
                                                        }`}
                                                    onClick={() => setActiveAmenity(item)}
                                                >
                                                    <div className="amenity-item-content">
                                                        <span className="amenity-num">
                                                            {String(index + 1).padStart(2, "0")}
                                                        </span>

                                                        <div className="amenity-text">
                                                            <h4 className="text-white">
                                                                {item?.title}
                                                            </h4>
                                                            <p>{item?.description}</p>
                                                        </div>
                                                    </div>

                                                    {/* Mobile Inline Image */}
                                                    <div className={`mobile-amenity-image ${activeAmenity?.id === item?.id ? "show" : ""}`}>
                                                        <img
                                                            src={item?.image}
                                                            alt={item?.title}
                                                            className="img-fluid"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Col>

                                    {/* Right Image Preview */}
                                    <Col lg={7} className="d-none d-lg-block">
                                        <div className="lux-amenity-visual">
                                            <div className="visual-inner">
                                                <img
                                                    src={activeAmenity?.image}
                                                    alt={activeAmenity?.title}
                                                    className="img-fluid"
                                                />
                                                <div className="visual-overlay"></div>
                                            </div>
                                        </div>
                                    </Col>

                                </Row>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Amenities;