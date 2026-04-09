import React, { useState, useEffect } from "react";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import Preloader from "../../components/common/Preloader";
import ScrollToTop from "../../components/common/ScrollToTop";
import SmallHeroBanner from "../../components/common/Small-hero-banner";
// import PrivacyPolicyContent from "../../components/privacy/PrivacyPolicyContent";
import { AnimatePresence } from "framer-motion";
import { Container } from "react-bootstrap";
import "./TermsConditions.css";
// import SEO from '../../components/common/Seo/Seo';
const TermsAndConditions = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 800);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    return (
        <div className="privacy-policy-page">
            {/* <SEO /> */}
            <AnimatePresence>
                {isLoading && <Preloader key="preloader" isLoading={isLoading} />}
            </AnimatePresence>
            <Header />
            <main>
                <SmallHeroBanner
                    title="Terms and Conditions"
                    image="/images/background/terms-condition.png"
                />
                <section className="legal-content-area">
                    <Container>
                        <div
                            className="legal-content-wrapper wow fadeInUp"
                            data-wow-delay="0.2s"
                        >
                            <p className="main-title-policy-page">
                                Effective Date: March 2026
                            </p>

                            <p style={{ textAlign: "center", marginBottom: "36px" }}>
                                This Privacy Policy applies to the website of Blanca Developers
                                (“Company”, “we”, “our”, or “us”) accessible at{" "}
                                <a href="https://blanca.co.in" target="_blank" rel="noreferrer">
                                    https://blanca.co.in
                                </a>{" "}
                                (“Website”). Blanca Developers is committed to safeguarding the
                                privacy of visitors, customers, channel partners, investors, and job
                                applicants in accordance with:
                            </p>

                            <ul className="terms-compliance-list">
                                <li>The Information Technology Act, 2000 (India)</li>
                                <li>The SPDI Rules under the IT Act</li>
                                <li>
                                    Applicable provisions of Maharashtra Real Estate Regulatory
                                    Authority (MahaRERA) guidelines
                                </li>
                            </ul>

                            <h2>1. Website Usage</h2>
                            <p>This Website is intended for:</p>

                            <ul className="point-list-datainfo">
                                <li>Providing information about our real estate projects</li>
                                <li>Enquiry and lead generation purposes</li>
                                <li>Marketing and promotional communication</li>
                            </ul>

                            <p>You agree not to:</p>

                            <ul className="point-list-datainfo">
                                <li>Use the Website for unlawful purposes</li>
                                <li>Attempt unauthorized access to our systems</li>
                                <li>
                                    Copy, reproduce, or misuse content without written permission
                                </li>
                            </ul>

                            <h2>2. Project Information Disclaimer</h2>
                            <p>
                                All project details, specifications, floor plans, amenities,
                                visuals, brochures, and pricing displayed on the Website are:
                            </p>

                            <ul className="point-list-datainfo">
                                <li>Indicative in nature</li>
                                <li>Subject to change without prior notice</li>
                                <li>For general informational purposes only</li>
                            </ul>

                            <p>
                                Actual specifications may vary as per final approvals and agreements.
                            </p>

                            <h2>3. RERA Compliance</h2>
                            <p>
                                Where applicable, projects promoted on this Website are registered
                                under the Maharashtra Real Estate Regulatory Authority (MahaRERA).
                            </p>
                            <p>
                                Users are advised to verify project registration details on the
                                official MahaRERA website before making investment decisions.
                            </p>
                            <p>Nothing on this Website constitutes a legal offer or contract.</p>

                            <h2>4. Intellectual Property</h2>
                            <p>All content including:</p>

                            <ul className="point-marker-list">
                                <li>Text</li>
                                <li>Graphics</li>
                                <li>Logos</li>
                                <li>Designs</li>
                                <li>Brand identity</li>
                                <li>Images</li>
                                <li>Videos</li>
                            </ul>

                            <p>
                                are the intellectual property of Blanca Developers and may not be
                                reproduced without written consent.
                            </p>

                            <h2>5. Limitation of Liability</h2>
                            <p>Blanca Developers shall not be liable for:</p>

                            <ul className="point-list-datainfo">
                                <li>Any direct or indirect loss arising from use of the Website</li>
                                <li>Technical errors or temporary unavailability</li>
                                <li>Decisions taken based on website information</li>
                            </ul>

                            <p>Users access and use the Website at their own risk.</p>

                            <h2>6. Governing Law</h2>
                            <p>
                                These Terms shall be governed by the laws of India. Any disputes
                                shall be subject to the jurisdiction of courts in Navi Mumbai /
                                Maharashtra.
                            </p>

                            <h2>
                                7. Website Disclaimer (RERA-Compliant Marketing Disclaimer)
                            </h2>

                            <p>
                                The content, images, renderings, specifications, amenities, and
                                facilities mentioned on this Website are artistic impressions and
                                for representation purposes only.
                            </p>

                            <p>
                                Actual project details may vary based on approvals, architectural
                                plans, and statutory requirements.
                            </p>

                            <p>
                                Blanca Developers reserves the right to make changes or alterations
                                without prior notice.
                            </p>

                            <p>
                                Project registration numbers (where applicable) will be displayed as
                                per MahaRERA guidelines. Prospective buyers are advised to verify
                                details on the official MahaRERA website.
                            </p>

                            <p>
                                Nothing contained on this Website constitutes an offer, invitation,
                                or contract of sale.
                            </p>
                        </div>
                    </Container>
                </section>
            </main>
            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default TermsAndConditions;
