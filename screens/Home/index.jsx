"use client";

import React from 'react';
import dynamic from 'next/dynamic';

import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import ScrollToTop from '../../components/common/ScrollToTop';
import MainHeroBanner from '../../components/common/MainHeroBanner';
import { PROJECT_STATUS_LABELS } from '../../utils/constant';

const Hero = dynamic(() => import('../../components/home/Hero'), { ssr: false });
const About = dynamic(() => import('../../components/home/About'), { ssr: false });
const Properties = dynamic(() => import('../../components/home/Properties'), { ssr: false });
const Testimonials = dynamic(() => import('../../components/home/Testimonials'), { ssr: false });
const WhyChooseUs = dynamic(() => import('../../components/home/WhyChooseUs'), { ssr: false });

const Home = ({ projectsResponse }) => {
    const projects = projectsResponse?.data || [];

    return (
        <div className="home-page">
            <Header />

            <main>
                {projects?.length > 0 ? (
                    projects?.map((project) => (
                        <MainHeroBanner
                            key={project?.project_project_id}
                            videoSrc={project?.project_banner_image}
                            poster={project?.project_image}
                            status={
                                PROJECT_STATUS_LABELS[project?.project_status] ||
                                project?.project_status
                            }
                            title={project?.project_name}
                            location={`${project?.categories?.[0]?.category_name || ''} - ${project?.project_location}`}
                            overlayOpacity={project.project_banner_color}
                            projectLink={project?.project_link}
                            isHomePage={true}
                            projectId={project?.project_project_id}
                        />
                    ))
                ) : (
                    <div style={{ height: '100vh', background: '#111' }} />
                )}

                <Hero />
                <About />
                <Properties />
                <WhyChooseUs />
                <Testimonials />
            </main>

            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default Home;