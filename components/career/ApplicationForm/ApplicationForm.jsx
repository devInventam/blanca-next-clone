import React, { useState } from "react";
import "./ApplicationForm.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import { motion as Motion } from "framer-motion";
import { Icon } from "@iconify/react";
import InputField from "../../common/InputField/InputField";
import PhoneInput from "../../common/PhoneInput/PhoneInput";
import Dropdown from "../../common/Dropdown/Dropdown";
import FileUpload from "../../common/FileUpload/FileUpload";
import TextArea from "../../common/TextArea/TextArea";
import ThemeButton from "../../common/Button/ThemeBtn";
import ThankYouModal from "../../common/ThankYouModal/ThankYouModal";

import { jobs } from "../../../data/jobsData";

const ApplicationForm = () => {
    const [showThankYou, setShowThankYou] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        position: "General Application",
        resume: null,
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDropdownChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add submission logic here
        setShowThankYou(true);
    };

    return (
        <section id="easy-apply" className="application-form-section py-100">
            <Container>
                <div className="section-title text-center mb-60">
                    <div className="main-title-badge justify-content-center">
                        <span className="sub-title common-subtitle">Quick Apply</span>
                    </div>
                    <Motion.h2 
                        className="common-title bs-font-playfair-display text-white"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Easy Apply for Any Role
                    </Motion.h2>
                    <p className="text-white-50 mt-15 max-600 mx-auto">
                        Don't see a specific opening that fits? Submit your CV here and mention your areas of interest. We'll reach out when a suitable opportunity arises.
                    </p>
                </div>

                <Row className="justify-content-center">
                    <Col lg={10}>
                        <div className="application-form-wrapper glass-card elevation-2">
                            <Row className="g-0">
                                <Col lg={4} className="p-0">
                                    <div className="form-info-sidebar h-100">
                                        <div className="info-content">
                                            <h3 className="text-white mb-25 bs-font-playfair-display">Join Blanca</h3>
                                            <p className="mb-40 text-white-50">
                                                We're always on the lookout for visionary talent to join our real estate revolution.
                                            </p>

                                            <div className="contact-info-list">
                                                <div className="info-item mb-30">
                                                    <div className="icon-box">
                                                        <Icon icon="lucide:mail" />
                                                    </div>
                                                    <div>
                                                        <h6>HR Department</h6>
                                                        <p>careers.blanca@gmail.com</p>
                                                    </div>
                                                </div>
                                                <div className="info-item mb-30">
                                                    <div className="icon-box">
                                                        <Icon icon="lucide:heart" />
                                                    </div>
                                                    <div>
                                                        <h6>Our Culture</h6>
                                                        <p>Innovation & Excellence</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="sidebar-badge mt-50">
                                                <div className="linkedin-easy-badge">
                                                    <Icon icon="lucide:zap" className="me-2" />
                                                    Integrated Easy Apply
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                                <Col lg={8}>
                                    <div className="form-main-content p-50">
                                        <Form onSubmit={handleSubmit} className="custom-form">
                                            <Row>
                                                <Col md={6}>
                                                    <InputField
                                                        label="Full Name"
                                                        placeholder="Enter your full name"
                                                        name="fullName"
                                                        value={formData.fullName}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <InputField
                                                        label="Email Address"
                                                        placeholder="Enter your email"
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <PhoneInput
                                                        label="Phone Number"
                                                        name="phoneNumber"
                                                        value={formData.phoneNumber}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <Dropdown
                                                        label="Interested Roles"
                                                        placeholder="Select or Mention Roles"
                                                        name="position"
                                                        options={[
                                                            ...jobs.map(job => job.title),
                                                            "General Application"
                                                        ]}
                                                        value={formData.position}
                                                        onChange={(e) => handleDropdownChange("position", e.target.value)}
                                                    />
                                                </Col>
                                                <Col md={12}>
                                                    <FileUpload
                                                        label="Upload Resume / CV"
                                                        name="resume"
                                                        value={formData.resume}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="Drop your CV here or click to browse"
                                                    />
                                                </Col>
                                                <Col md={12}>
                                                    <TextArea
                                                        label="Mention roles or describe your expertise"
                                                        name="description"
                                                        rows={3}
                                                        placeholder="Tell us about your background and what kind of roles you're looking for..."
                                                        value={formData.description}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </Col>
                                                <Col md={12} className="mt-10">
                                                    <ThemeButton 
                                                        type="submit" 
                                                        className="w-100 py-3"
                                                        variant="primary"
                                                    >
                                                        Submit Easy Application
                                                        <Icon icon="lucide:send" className="ms-2" />
                                                    </ThemeButton>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>

            <ThankYouModal 
                isOpen={showThankYou} 
                onClose={() => setShowThankYou(false)}
                title="Application Received!"
                message="Thank you for your interest in Blanca. We've received your CV and details. Our talent acquisition team will review your profile and get in touch if your skills match any current or future openings."
            />
        </section>
    );
};

export default ApplicationForm;

