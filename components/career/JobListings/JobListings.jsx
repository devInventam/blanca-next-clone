import React, { useState } from "react";
import "./JobListings.css";
import { Container } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { motion as Montion, AnimatePresence } from "framer-motion";
// 🔹 CHANGE: removed static jobs data
// import { jobs } from "../../../data/jobsData";

import JobApplyModal from "../JobApplyModal/JobApplyModal";
import Dropdown from "../../common/Dropdown/Dropdown";

// 🔹 CHANGE: import API hooks
import { useCareerCategories } from "../../../hooks/useCareers";

const JobListings = ({ categoryData }) => {
    // 🔹 CHANGE: default value for API filtering
    const [activeTab, setActiveTab] = useState("all");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 🔹 CHANGE: store full job instead of title
    const [selectedJob, setSelectedJob] = useState(null);

    // 🔹 CHANGE: fetch categories for dropdown

    const categoryList = categoryData?.data
    
    // 🔹 CHANGE: fetch careers list
    const { data: careerData, isLoading } = useCareerCategories({
        page: currentPage,
        limit: itemsPerPage,
        is_parent: false,
        category_id: activeTab === "all" ? undefined : activeTab,
    });

    // 🔹 CHANGE: prepare dropdown options
    const categories = [
        { label: "All Jobs", value: "all" },
        ...(categoryList || []).map((cat) => ({
            label: cat.career_category_name,
            value: cat.career_category_career_category_id,
        })),
    ];

    // 🔹 CHANGE: jobs now come from API
    const jobs = careerData?.data || [];

    // 🔹 CHANGE: total pages from API
    const totalPages = careerData?.meta?.totalPages || 1;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleTabChange = (category) => {
        setActiveTab(category);
        setCurrentPage(1);
    };

    const handleApplyNow = (e, job) => {
        e.preventDefault();

        // 🔹 CHANGE: store full job object
        setSelectedJob(job);

        setIsModalOpen(true);
    };

    return (
        <section className="job-listings-section">
            <Container>
                <div className="job-section-header">
                    <div className="section-title text-start mb-0">
                        <div className="main-title-badge">
                            <span className="sub-title common-subtitle">Current Openings</span>
                        </div>

                        <Montion.h2
                            className="common-title bs-font-playfair-display"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Join Our Growing Team
                        </Montion.h2>

                        <p className="job-subtitle mt-10">
                            Don't find what you're looking for?{" "}
                            <button
                                onClick={(e) => handleApplyNow(e, null)}
                                className="text-primary fw-bold bg-transparent border-0 p-0"
                            >
                                Quick Apply here
                            </button>
                        </p>
                    </div>

                    <Montion.div
                        className="category-filter-wrapper"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="category-dropdown-container">

                            {/* 🔹 CHANGE: dropdown now uses API categories */}
                            <Dropdown
                                label="Filter by Category:"
                                options={categories}
                                value={activeTab}
                                onChange={(e) => handleTabChange(e.target.value)}
                                className="category-dropdown"
                            />

                        </div>
                    </Montion.div>
                </div>

                <div className="jobs-container">

                    {/* 🔹 CHANGE: loading state */}
                    {isLoading && <p className="text-center">Loading jobs...</p>}

                    <AnimatePresence mode="wait">
                        <Montion.div
                            key={`${activeTab}-${currentPage}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >

                            {/* 🔹 CHANGE: jobs from API */}
                            {jobs.map((job) => (
                                <div className="job-card-wrapper mb-4" key={job.career_category_career_category_id}>
                                    <div className="job-card glass-card">
                                        <div className="job-content-wrap">
                                            <div className="job-info-main">

                                                <div className="job-header">
                                                    {/* 🔹 CHANGE: category from API */}
                                                    <span className="job-category">
                                                        {job.parent_category_name}
                                                    </span>

                                                    <h4 className="job-title mt-10 mb-15">
                                                        {job.career_category_name}
                                                    </h4>
                                                </div>

                                                {job.description && (
                                                    <div className="job-details-content mb-20">
                                                        <p className="job-description">
                                                            {job.career_category_description}
                                                        </p>
                                                    </div>
                                                )}

                                                {job.career_category_key_responsibilities && (
                                                    <div className="job-responsibilities mt-20">
                                                        <h5 className="responsibilities-title mb-15">
                                                            Key Responsibilities:
                                                        </h5>

                                                        <ul className="responsibilities-list">

                                                            {/* 🔹 CHANGE: responsibilities from API */}
                                                            {job.career_category_key_responsibilities.map((item, idx) => (
                                                                <li
                                                                    key={idx}
                                                                    className="responsibility-item"
                                                                >
                                                                    <Icon
                                                                        icon="lucide:check-circle-2"
                                                                        className="check-icon"
                                                                    />
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}

                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="job-action-wrap">
                                            <div className="job-action">
                                                <button
                                                    onClick={(e) =>
                                                        handleApplyNow(e, job)
                                                    }
                                                    className="theme-btn job-apply-btn border-0"
                                                >
                                                    Apply Now
                                                    <Icon
                                                        icon="lucide:arrow-right"
                                                        className="ms-2"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </Montion.div>
                    </AnimatePresence>
                </div>

                {/* 🔹 CHANGE: pagination from API */}
                {totalPages > 1 && (
                    <Montion.div
                        className="jobs-pagination d-flex justify-content-center align-items-center gap-3 mt-60"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >

                        <button
                            className={`pagination-btn ${currentPage === 1 ? "disabled" : ""
                                }`}
                            onClick={() =>
                                currentPage > 1 && paginate(currentPage - 1)
                            }
                            disabled={currentPage === 1}
                        >
                            <Icon icon="lucide:chevron-left" />
                        </button>

                        <div className="page-numbers d-flex gap-2">

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    className={`page-number ${currentPage === i + 1 ? "active" : ""
                                        }`}
                                    onClick={() => paginate(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                        </div>

                        <button
                            className={`pagination-btn ${currentPage === totalPages
                                ? "disabled"
                                : ""
                                }`}
                            onClick={() =>
                                currentPage < totalPages &&
                                paginate(currentPage + 1)
                            }
                            disabled={currentPage === totalPages}
                        >
                            <Icon icon="lucide:chevron-right" />
                        </button>

                    </Montion.div>
                )}
            </Container>

            <JobApplyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                job={selectedJob} // 🔹 CHANGE
                categories={categoryData?.data || []} // 🔹 CHANGE
            />
        </section>
    );
};

export default JobListings;