import React, { lazy, Suspense, useMemo } from 'react';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import ScrollToTop from '../../components/common/ScrollToTop';
import MainHeroBanner from '../../components/common/MainHeroBanner';
import { useProjects } from '../../hooks/useProjects';
import { PROJECT_STATUS_LABELS } from '../../utils/constant';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../../components/common/Preloader';
// import SEO from '../../components/common/Seo/Seo';

const Hero = lazy(() => import('../../components/home/Hero'));
const About = lazy(() => import('../../components/home/About'));
const Properties = lazy(() => import('../../components/home/Properties'));
const Testimonials = lazy(() => import('../../components/home/Testimonials'));
const WhyChooseUs = lazy(() => import('../../components/home/WhyChooseUs'));

const Home = () => {
    const { data, isLoading } = useProjects({
        page: 1,
        limit: 5, 
        sort_column: 'project_home_sequence',
        sort_order: 'asc',
        show_on_home_page: true,
    });

    const projects = data?.data || [];

    return (
        <div className="home-page">
            {/* <SEO /> */}
            <AnimatePresence>
                {isLoading && <Preloader key="preloader" isLoading={isLoading} />}
            </AnimatePresence>
            <Header />

            <main>
               
                {projects.length > 0 ? (
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

                
                <Suspense fallback={<div />}>
                    <Hero />
                    <About />
                    <Properties />
                    <WhyChooseUs />
                    <Testimonials />
                </Suspense>
            </main>

            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default Home;