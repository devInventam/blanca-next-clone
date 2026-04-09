import { Col } from "react-bootstrap";
import { motion as Montion } from "framer-motion";
const missionImg1 = "/images/intro/mission-image-1.png";
const missionImg2 = "/images/intro/mission-image-2.png";
import "./MissionSection.css";

const MissionSection = () => {
  return (
    <section
      className="about-vision-section-four"
      id="about-mission-section-four"
    >
      <div className="container">
        <div className="row align-items-center gx-4 mission-data-row">
          <Col md={6}>
            <Montion.div
              className="vision-image-collage"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="collage-item mission-collage-item-1">
                <img src={missionImg2} alt="Vision Image 1" />
              </div>

              <div className="collage-item mission-collage-item-2">
                <img src={missionImg1} alt="Vision Image 2" />
              </div>
            </Montion.div>
          </Col>

          <Col lg={6} md={6}>
            <Montion.div
              className="vision-content-part"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="sub-title mb-15 d-block text-uppercase">
                Real Estate, Real Connections
              </span>

              {/* <h2 className="vision-title text-white mb-30">Our Vision</h2> */}

              <p className="vision-text text-white-50 mb-40">
                Our mission is to bridge the gap between premium real estate in
                Mumbai and Navi Mumbai and the legacies our clients aspire to
                build.
              </p>

              <p className="vision-text text-white-50 mb-40">
                We treat every property not just as an asset, but as a sanctuary
                for families and a high-yield opportunity for investors. By
                prioritizing strategic growth and exceptional service, we
                maximize value and ensure long-term security for every
                stakeholder. We are dedicated to fostering trust through
                transparent connections, creating luxury at affordable
                residential and commercial spaces that serve as a foundation for
                future generations. At Blanca, we don't just open doors; we
                unlock a lifetime of endless possibilities.
              </p>

              <h1 className="mission-outline-text">mission</h1>
            </Montion.div>
          </Col>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
