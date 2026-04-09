"use client";

import React, { useEffect, useRef } from "react";
import "./ProjectDetails.css";
import MainHeroBanner from "../../components/common/MainHeroBanner";
import { Container, Row, Col, Form } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InteriorExterior from "../../components/project/InteriorExterior/InteriorExterior";
import Amenities from "../../components/project/Amenities";
import ThemeBtn from "../../components/common/Button/ThemeBtn";
import { useEnquire, useProjectById } from "../../hooks/useProjects";
import { useParams } from "next/navigation";
import { PROJECT_STATUS_LABELS } from "../../utils/constant";
import Preloader from "../../components/common/Preloader";
import { AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { enquirySchema } from "../../schema/validationSchema";
import { Icon } from "@iconify/react";
import { useContactModal } from "../../context/ContactModalContext";
import ThankYouModal from "../../components/common/ThankYouModal/ThankYouModal";
// const commercial1 = "/images/project-details/commercial-office-1.png";
// const commercial2 = "/images/project-details/commercial-office-2.png";
// const commercial3 = "/images/project-details/commercial-office-3.png";

const defaultValues = {
  project_id: "",
  name: "",
  email: "",
  phone_number: "",
  message: "",
};

const ProjectDetails = () => {
  const { openContactModal } = useContactModal();
  const { id } = useParams();
  const enquiryRef = useRef(null);
  const [showThankYou, setShowThankYou] = React.useState(false);
  const { data, isLoading, error } = useProjectById(id);
  const { mutate, isPending } = useEnquire();

  const project = data?.data;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(enquirySchema),
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#enquiry") return;
    const t = window.setTimeout(() => {
      enquiryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
    return () => window.clearTimeout(t);
  }, [isLoading]);

  if (isLoading) {
    return (
      <AnimatePresence>
        <Preloader key="preloader" isLoading={isLoading} />
      </AnimatePresence>
    );
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  //   const overviewData = [
  //     {
  //       id: 1,
  //       image: commercial1,
  //       alt: "Blanca Ekaiva Office 1",
  //     },
  //     {
  //       id: 2,
  //       image: commercial2,
  //       alt: "Blanca Ekaiva Office 2",
  //     },
  //     {
  //       id: 3,
  //       image: commercial3,
  //       alt: "Blanca Ekaiva Office 3",
  //     },
  //   ];

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    fade: true,
    speed: 1000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      phone: data?.phone_number,
      project_id: project?.project_project_id,
    };
    mutate(payload, {
      onSuccess: () => {
        setShowThankYou(true);
        reset();
      },
      onError: () => {
        alert("Something went wrong");
      },
    });
  };

  return (
    <>
      <main>
        <MainHeroBanner
          videoSrc={project?.project_banner_image}
          overlayOpacity={project?.project_banner_color}
          poster={project?.project_card_image}
          status={PROJECT_STATUS_LABELS[project?.project_status]}
          title={project?.project_name}
          location={`${project?.categories?.[0]?.category_name} - ${project?.project_location}`}
          projectLink={project?.project_link}
        />

        <section className="project-about-section">
          <Container>
            <Row className="gap-3 align-items-center">
              {/* Left Content */}
              {project?.project_overview_description && (
                <Col className="wow fadeInLeft">
                  <div className="sub-title-wrapper mb-20">
                    <span className="sub-title common-subtitle">OVERVIEW</span>
                  </div>

                  <h2 className="common-title bs-font-playfair-display text-white mb-30">
                    {project?.project_overview_title}
                  </h2>

                  <div className="project-description-text">
                    {project?.project_overview_description}
                  </div>

                  <div className="download-buttons-wrapper mt-40">
                    <button className="download-btn" onClick={openContactModal}>
                      <div className="btn-icon">
                        <Icon icon="ph:article-light" />
                      </div>
                      <div className="btn-text">
                        <span className="btn-title bs-font-montserrat">PROJECT BROCHURE</span>
                        <span className="btn-subtitle">DOWNLOAD <i className="fas fa-arrow-down"></i></span>
                      </div>
                    </button>
                    <button className="download-btn" onClick={openContactModal}>
                      <div className="btn-icon">
                        <Icon icon="ph:list-checks-light" />
                      </div>
                      <div className="btn-text">
                        <span className="btn-title bs-font-montserrat">FACT SHEET</span>
                        <span className="btn-subtitle">DOWNLOAD <i className="fas fa-arrow-down"></i></span>
                      </div>
                    </button>
                  </div>
                </Col>
              )}

              {/* Right Slider */}
              <Col lg={6} className="wow fadeInRight">
                <div className="overview-slider">
                  <Slider {...settings}>
                    {project?.project_overview_image?.map((item) => (
                      <div key={item}>
                        <img
                          className="d-block w-100 rounded"
                          src={item}
                          alt={item}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {project?.project_interior?.length > 0 && (
          <InteriorExterior
            interiorImages={project?.project_interior}
            exteriorImages={project?.project_exterior}
          />
        )}
        {project?.project_amenities?.length > 0 && (
          <Amenities amenities={project?.project_amenities} />
        )}

        {project?.project_map_link && (
          <section className="project-location">
            {/* Heading */}
            <div className="location-heading text-center mb-60 wow fadeInUp delay-0-3s">
              <div className="sub-title-wrapper mb-20 d-inline-block">
                <span className="sub-title common-subtitle">LOCATION</span>
              </div>

              <h2 className="common-title bs-font-playfair-display text-white mb-20">
                living at a prime address
              </h2>

              <p className="text-white opacity-50">
                Strategically connected to everything that matters
              </p>
            </div>

            <Container>
              <Row className="align-items-center">
                <Col className="wow fadeInRight">
                  <div className="location-map-wrap">
                    <iframe
                      src={project?.project_map_link}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="Project Location Map"
                    ></iframe>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        )}

        <section
          id="enquiry"
          ref={enquiryRef}
          className="enquiry-premium-section py-150"
        >
          <Container fluid>
            <Row className="align-items-center gap-4">
              {/* LEFT CONTENT */}
              <Col className="wow fadeInLeft">
                <div className="enquiry-content-box">
                  <div className="sub-title-wrapper mb-20 d-inline-block">
                    <span className="sub-title common-subtitle">
                      ENQUIRE NOW
                    </span>
                  </div>

                  <h2 className="common-title bs-font-playfair-display text-white">
                    Interested in {project?.project_name}?
                  </h2>

                  <p className="text-white opacity-50">
                    Our experts are happy to help you with all project details
                    and site visits.
                  </p>

                  <div className="consultation-features">
                    <div className="c-feature-item">
                      <div className="icon-circle">
                        <i className="fas fa-user-tie"></i>
                      </div>
                      <div className="text">
                        <h5>Private Viewing</h5>
                        <p>
                          Personalized site visits arranged at your convenience.
                        </p>
                      </div>
                    </div>

                    <div className="c-feature-item">
                      <div className="icon-circle">
                        <i className="fas fa-chart-line"></i>
                      </div>
                      <div className="text">
                        <h5>Investment Analysis</h5>
                        <p>
                          Detailed performance reports and projected ROI data.
                        </p>
                      </div>
                    </div>

                    <div className="c-feature-item">
                      <div className="icon-circle">
                        <i className="fas fa-chess-knight"></i>
                      </div>
                      <div className="text">
                        <h5>Expert Strategy</h5>
                        <p>
                          Tailored business entry and expansion strategies for
                          the Navi Mumbai market.
                        </p>
                      </div>
                    </div>

                    <div className="c-feature-item">
                      <div className="icon-circle">
                        <i className="fas fa-headset"></i>
                      </div>
                      <div className="text">
                        <h5>End-to-End Support</h5>
                        <p>
                          Dedicated relationship managers to guide you from
                          inquiry to possession.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              {/* RIGHT FORM */}
              <Col lg={6} className="wow fadeInRight">
                <div className="lux-enquiry-card-wrapper">
                  <div className="lux-enquiry-card glass-morphism">
                    <div className="enquiry-card-header text-center mb-40">
                      <h2 className="common-title bs-font-playfair-display text-white">
                        Enquire for {project?.project_name}
                      </h2>
                      <p>
                        Fill in your details and our team will be in touch
                        within 24 hours.
                      </p>
                    </div>

                    <Form
                      className="modern-contact-form"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <Row className="g-4">
                        {/* NAME */}
                        <Col md={12}>
                          <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                              <div
                                className={`input-modern-group ${errors?.name ? "has-error" : ""
                                  }`}
                              >
                                <Form.Control
                                  {...field}
                                  type="text"
                                  className="modern-input"
                                  placeholder=" "
                                />
                                <label className="modern-label">
                                  Full Name
                                </label>
                                <span className="focus-border"></span>

                                {errors.name && (
                                  <small className="text-danger">
                                    {errors?.name?.message}
                                  </small>
                                )}
                              </div>
                            )}
                          />
                        </Col>

                        {/* EMAIL */}
                        <Col md={12}>
                          <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                              <div
                                className={`input-modern-group ${errors?.email ? "has-error" : ""
                                  }`}
                              >
                                <Form.Control
                                  {...field}
                                  type="email"
                                  className="modern-input"
                                  placeholder=" "
                                />
                                <label className="modern-label">
                                  Email Address
                                </label>
                                <span className="focus-border"></span>

                                {errors.email && (
                                  <small className="text-danger">
                                    {errors?.email?.message}
                                  </small>
                                )}
                              </div>
                            )}
                          />
                        </Col>

                        {/* PHONE */}
                        <Col md={12}>
                          <Controller
                            name="phone_number"
                            control={control}
                            render={({ field }) => (
                              <div
                                className={`input-modern-group ${errors?.phone_number ? "has-error" : ""
                                  }`}
                              >
                                <Form.Control
                                  {...field}
                                  type="number"
                                  className="modern-input"
                                  placeholder=" "
                                />
                                <label className="modern-label">
                                  Phone Number
                                </label>
                                <span className="focus-border"></span>

                                {errors.phone_number && (
                                  <small className="text-danger">
                                    {errors?.phone_number?.message}
                                  </small>
                                )}
                              </div>
                            )}
                          />
                        </Col>

                        {/* MESSAGE */}
                        <Col md={12}>
                          <Controller
                            name="message"
                            control={control}
                            render={({ field }) => (
                              <div className="input-modern-group">
                                <Form.Control
                                  {...field}
                                  as="textarea"
                                  rows={3}
                                  className="modern-input"
                                  placeholder=" "
                                />
                                <label className="modern-label">
                                  Message (Optional)
                                </label>
                                <span className="focus-border"></span>

                                {errors?.message && (
                                  <small className="text-danger">
                                    {errors?.message?.message}
                                  </small>
                                )}
                              </div>
                            )}
                          />
                        </Col>

                        {/* SUBMIT BUTTON */}
                        <Col md={12}>
                          <div className="buttons submit-enquiry-btn">
                            <button
                              type="submit"
                              className="theme-btn bs-font-montserrat"
                              disabled={isPending}
                            >
                              {isPending ? "Sending..." : "Submit Inquiry"}
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </Form>

                    <div className="enquiry-security-note mt-30 text-center">
                      <p>
                        <i className="fas fa-shield-alt me-2"></i>
                        Your data is protected by industry-standard encryption.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      <ThankYouModal
        isOpen={showThankYou}
        onClose={() => setShowThankYou(false)}
        title="Enquiry Sent"
        message="Thank you for your enquiry! We’ve received your details and our team will get in touch with you shortly."
      />
    </>
  );
};

export default ProjectDetails;
