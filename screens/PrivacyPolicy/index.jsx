import React, { useState, useEffect } from "react";
import Preloader from "../../components/common/Preloader";
import ScrollToTop from "../../components/common/ScrollToTop";
import SmallHeroBanner from "../../components/common/Small-hero-banner";
// import PrivacyPolicyContent from "../../components/privacy/PrivacyPolicyContent";
import "./privacypolicy.css";
import { AnimatePresence } from "framer-motion";
import { Container } from "react-bootstrap";
// import SEO from '../../components/common/Seo/Seo';
const PrivacyPolicy = () => {
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
      <main>
        <SmallHeroBanner
          title="Privacy Policy"
          image="/images/background/privacy-policy.png"
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

              <p style={{ textAlign: "center" }}>
                This Privacy Policy applies to the website of Blanca Developers
                (“Company”, “we”, “our”, or “us”) accessible at{" "}
                <a href="https://blanca.co.in" target="_blank" rel="noreferrer">
                  https://blanca.co.in
                </a>{" "}
                (“Website”). Blanca Developers is committed to safeguarding the
                privacy of visitors, customers, channel partners, investors, and job
                applicants in accordance with:
              </p>

              <ul className="policy-compliance-list">
                <li>The Information Technology Act, 2000 (India)</li>
                <li>The SPDI Rules under the IT Act</li>
                <li>
                  Applicable provisions of Maharashtra Real Estate Regulatory
                  Authority (MahaRERA) guidelines
                </li>
              </ul>

              <h2>1. Information We Collect</h2>
              <p>
                We collect personal information only when voluntarily provided by
                you through:
              </p>

              <ul className="point-marker-list">
                <li>Enquiry forms</li>
                <li>Project registration forms</li>
                <li>Brochure downloads</li>
                <li>Site visit bookings</li>
                <li>Career applications (CV submission)</li>
                <li>Contact forms</li>
                <li>WhatsApp or phone enquiries</li>
              </ul>

              <p>The information may include:</p>

              <ul className="point-marker-list">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Mobile Number</li>
                <li>Residential Address</li>
                <li>Company Name (if applicable)</li>
                <li>PAN (only if required during booking process)</li>
                <li>
                  Any other details relevant to property enquiry or transaction
                </li>
              </ul>

              <p>
                We may also collect non-personal data such as IP address, browser
                type, device details, and browsing behavior for analytics and
                website improvement.
              </p>

              <h2>2. Purpose of Collection</h2>
              <p>Your information may be used for:</p>

              <ul className="point-list-datainfo">
                <li>Responding to project enquiries</li>
                <li>
                  Sharing project details, brochures, price lists, and availability
                </li>
                <li>Scheduling site visits</li>
                <li>Processing booking interest</li>
                <li>
                  Providing updates related to registered projects under MahaRERA
                </li>
                <li>Sending marketing and promotional communication</li>
                <li>Internal record keeping and compliance</li>
              </ul>

              <p>
                You may opt out of marketing communication at any time by using the
                “unsubscribe” option or by contacting us directly.
              </p>

              <h2>3. Cookies and Tracking Technologies</h2>
              <p>Our Website may use cookies and similar technologies to:</p>

              <ul className="point-list-datainfo">
                <li>Improve user experience</li>
                <li>Analyze website traffic</li>
                <li>Personalize content</li>
                <li>Support marketing campaigns</li>
              </ul>

              <p>
                By continuing to browse the Website, you consent to our use of
                cookies. You may disable cookies through your browser settings,
                though certain features may not function properly.
              </p>

              <h2>4. Data Security</h2>
              <p>
                Blanca Developers implements reasonable security practices and
                procedures as mandated under the Information Technology Act, 2000 to
                protect personal information from unauthorized access, misuse,
                alteration, or disclosure.
              </p>

              <p>
                However, no method of transmission over the internet or electronic
                storage is completely secure. While we strive to protect your data,
                we cannot guarantee absolute security.
              </p>

              <h2>5. Sharing of Information</h2>
              <p>We do not sell or rent personal information to third parties.</p>

              <p>Information may be shared only:</p>

              <ul className="point-list-datainfo">
                <li>With internal teams for processing enquiries</li>
                <li>With authorized sales partners or channel partners</li>
                <li>
                  With service providers assisting in CRM, marketing, or website
                  management
                </li>
                <li>When required by law or government authorities</li>
              </ul>

              <p>All such sharing will be strictly for legitimate business purposes.</p>

              <h2>6. Data Retention</h2>
              <p>
                Personal information will be retained only for as long as necessary
                to fulfill the purposes outlined in this Privacy Policy or as
                required under applicable laws.
              </p>

              <h2>7. Third-Party Links</h2>
              <p>
                Our Website may contain links to external websites. Blanca
                Developers is not responsible for the privacy practices or content
                of third-party websites.
              </p>

              <h2>8. Your Rights</h2>
              <p>You may:</p>

              <ul className="point-list-datainfo">
                <li>Request access to your personal data</li>
                <li>Request correction or update of inaccurate data</li>
                <li>Withdraw consent for marketing communication</li>
                <li>
                  Request deletion of data (subject to legal retention requirements)
                </li>
              </ul>

              <p>
                For such requests, please contact us using the details below.
              </p>

              <h2>9. Data Security</h2>
              <p>
                Where applicable, project-related information provided through the
                Website will be in accordance with Maharashtra Real Estate
                Regulatory Authority (MahaRERA) guidelines.
              </p>

              <p>
                All project details, approvals, and registration numbers shall be
                subject to official disclosures as required by law.
              </p>

              <p>
                Visitors are advised to verify project registration details on the
                official MahaRERA website before making any booking or investment
                decision.
              </p>

              <h2>10. Changes to This Policy</h2>
              <p>
                Blanca Developers reserves the right to update or modify this
                Privacy Policy at any time. Changes will become effective immediately
                upon posting on the Website.
              </p>

              <p>We recommend reviewing this page periodically.</p>

              <h2>11. Contact Information</h2>
              <p>
                For any queries regarding this Privacy Policy or your personal data,
                please contact:
              </p>

              <div className="contact-details-wrapper">
                <span className="last-point-title">Blanca Real Estate</span>

                <ul className="contact-icon-list">
                  <li>
                    <i className="far fa-envelope"></i>{" "}
                    <a href="mailto:reachus.blanca@gmail.com">
                      reachus.blanca@gmail.com
                    </a>
                  </li>

                  <li>
                    <i className="fas fa-globe"></i>{" "}
                    <a href="https://blanca.co.in" target="_blank" rel="noreferrer">
                      https://blanca.co.in
                    </a>
                  </li>

                  <li>
                    <i className="fas fa-map-marker-alt"></i>{" "}
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Greenland+CHS+16+Plot+20+Sector+40+Nerul+Seawood+Navi+Mumbai+400706"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Greenland CHS 16 Plot 20 Sector 40 Nerul Seawood Navi Mumbai,
                      400706.
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <ScrollToTop />
    </div>
  );
};

export default PrivacyPolicy;
