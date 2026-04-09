"use client";

import React, { useEffect } from "react";
import SmallHeroBanner from "../../components/common/Small-hero-banner";
import CareerBenefits from "../../components/career/CareerBenefits/CareerBenefits";
import JobListings from "../../components/career/JobListings/JobListings";
import "./careers.css";
// import SEO from '../../components/common/Seo/Seo';

const Careers = ({ categoryData }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {/* <SEO /> */}
            <main className="careers-page-wrapper">
                <SmallHeroBanner
                    title="Career Opportunities"
                    description=""
                    image="/images/background/career-bg.jpg" // Using an existing standard background
                />
                <JobListings categoryData={categoryData} />
                <CareerBenefits />
            </main>
        </>
    );
};

export default Careers;
