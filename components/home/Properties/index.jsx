import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Properties.css";
import { Col, Row } from "react-bootstrap";
// import { projectsData } from "../../../data/projectsData";
import ThemeBtn from "../../common/Button/ThemeBtn";
import { useRouter } from "next/navigation";
import { motion as Motion } from "framer-motion";
import { useProjects } from "../../../hooks/useProjects";
import { PROJECT_STATUS_LABELS } from "../../../utils/constant";
import { useContactModal } from "../../../context/ContactModalContext";


const Properties = () => {
  const router = useRouter();
  const { data } = useProjects({ page: 1, limit: 50, is_active: true });

  const projects = data?.data || [];

  const { openContactModal } = useContactModal();


  return (
    <section className="homeproject-area py-128" id="our-projects">
      <Row className="projects-shell align-items-center g-4">
        {/* Left Intro Section */}
        <Col lg={5} className="projects-intro">
          <Motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="main-title-badge">
              <span className="sub-title common-subtitle">Projects</span>
            </div>

            <h2 className="common-title bs-font-playfair-display">
              Your Next Address Awaits – Discover Blanca's Signature Creations
            </h2>

            <p className="about-modern__text">
              Discover premium residential/commercial developments by Blanca in
              Mumbai and Navi Mumbai, where contemporary design blends
              seamlessly with everyday comfort and accessible luxury.
            </p>

            <p className="about-modern__text">
              Each property is thoughtfully planned to support your evolving
              lifestyle, long term aspirations, and future growth{" "}
              <span className="bs-font-Marjorie-italic">
                creating addresses that offer both value and pride of ownership.
              </span>
            </p>

            <div className="buttons project-buttons-div">
              <ThemeBtn className="bs-font-montserrat" to="/projects">
                View All Projects
              </ThemeBtn>
              <ThemeBtn className="bs-font-montserrat" onClick={openContactModal}>
                Schedule a Visit
              </ThemeBtn>
            </div>
          </Motion.div>
        </Col>

        {/* Project Cards */}
        <Col lg={7} className="projects-strip">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={12}
            slidesPerView={2}
            loop={projects?.length > 1}
            watchOverflow={true}
            speed={1000}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              1025: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1200: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
            }}
            className="property-swiper"
          >
            {projects?.map((project) => (
              <SwiperSlide key={project?.project_project_id}>
                <div className="project-card-wrapper">
                  <Motion.div
                    className="project-card"
                    onClick={() => router.push(`/project/${project?.project_project_id}`)}
                    style={{ cursor: "pointer" }}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: parseFloat(project?.animationDelay) || 0,
                    }}
                    viewport={{ once: true }}
                  >
                    <img src={project?.project_card_image} alt={project?.project_name} />
                    <div className="project-card__content">
                      <h4>{project?.project_name}</h4>
                      <div className="project-card__meta">
                        <div className="properties-meta-detail">
                          <div>
                            <span>Location:</span>
                            <strong>{project?.project_location}</strong>
                          </div>
                          <div>
                            <span>Property Type:</span>
                            <strong>{project?.categories?.map((cat) => cat?.category_name).join(" & ")}</strong>
                          </div>
                        </div>
                        <div className="properties-meta-detail">
                          <div>
                            <span>Configuration:</span>
                            <strong>{project?.project_configuration}</strong>
                          </div>
                          <div>
                            <span>Area – Carpet:</span>
                            <strong>{project?.project_sq_ft}</strong>
                          </div>
                        </div>
                        <div className="properties-meta-detail">
                          {/* <Col xxl={6} xl={12} lg={12} md={12}>
                            <span>From INR:</span>
                            <strong>{project?.price}</strong>
                          </Col> */}
                          <div>
                            <span>Status:</span>
                            <strong>{PROJECT_STATUS_LABELS[project?.project_status] || project?.project_status}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
      </Row>
    </section>
  );
};

export default Properties;
