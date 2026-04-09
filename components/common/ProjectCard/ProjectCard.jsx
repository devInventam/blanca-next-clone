import React from "react";
import { Icon } from "@iconify/react";
import ThemeBtn from "../Button/ThemeBtn";
import { useContactModal } from "../../../context/ContactModalContext";
import "./ProjectCard.css";
import { PROJECT_STATUS_LABELS } from "../../../utils/constant";

const ProjectCard = ({ project, layout = "grid" }) => {
  const { openContactModal } = useContactModal();
  if (!project) return null;

  if (layout === "horizontal") {
    return (
      <div className="project-card-horizontal">
        <div className="horiz-img-wrapper">
          <img src={project.image} alt={project.title} />
        </div>
        <div className="horiz-content">
          <h5>{project.title}</h5>
          <p className="horiz-meta">
            <i className="fas fa-map-marker-alt"></i> {project.location}
          </p>
          <p className="horiz-desc">
            {project.propertyType} | {project.configuration}
          </p>
          <div className="project-download-options-horizontal">
            <div
              className="download-link brochure"
              onClick={() => openContactModal({ type: 'Brochure', project: project.title })}
              role="button"
            >
              <div className="download-icon">
                <Icon icon="solar:document-text-outline" />
              </div>
              <div className="download-text">
                <span className="title">PROJECT BROCHURE</span>
                <span className="action">
                  DOWNLOAD <i className="fas fa-arrow-down"></i>
                </span>
              </div>
            </div>
            <div
              className="download-link fact-sheet"
              onClick={() => openContactModal({ type: 'Fact Sheet', project: project.title })}
              role="button"
            >
              <div className="download-icon">
                <Icon icon="solar:bill-list-outline" />
              </div>
              <div className="download-text">
                <span className="title">FACT SHEET</span>
                <span className="action">
                  DOWNLOAD <i className="fas fa-arrow-down"></i>
                </span>
              </div>
            </div>
          </div>
          <ThemeBtn to={project.href} className="read-more-link">
            Read More
          </ThemeBtn>
        </div>
      </div>
    );
  }

  return (
    <div className="project-card-item wow fadeInUp">
      <div className="project-img-wrapper">
        <img src={project.image} alt={project.title} />
        <div
          className={`project-status-badge status-${project.status?.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {PROJECT_STATUS_LABELS[project.status]}
        </div>
      </div>
      <div className="project-content-body">
        <h4>{project.title}</h4>
        <div className="project-info-list">
          <div className="info-item">
            <span>Location:</span>
            <strong>{project.location}</strong>
          </div>
          <div className="info-item">
            <span>Property Type:</span>
            <strong>{project.propertyType}</strong>
          </div>
          <div className="info-item">
            <span>Configuration:</span>
            <strong>{project.configuration}</strong>
          </div>
          <div className="info-item">
            <span>Area – Carpet:</span>
            <strong>{project.area}</strong>
          </div>
        </div>

        <div className="project-download-options-horizontal">
          <div
            className="download-link brochure"
            onClick={() => openContactModal({ type: 'Brochure', project: project.title })}
            role="button"
          >
            <div className="download-icon">
              <Icon icon="solar:document-text-outline" />
            </div>
            <div className="download-text">
              <span className="title">PROJECT BROCHURE</span>
              <span className="action">
                DOWNLOAD <i className="fas fa-arrow-down"></i>
              </span>
            </div>
          </div>
          <div
            className="download-link fact-sheet"
            onClick={() => openContactModal({ type: 'Fact Sheet', project: project.title })}
            role="button"
          >
            <div className="download-icon">
              <Icon icon="solar:bill-list-outline" />
            </div>
            <div className="download-text">
              <span className="title">FACT SHEET</span>
              <span className="action">
                DOWNLOAD <i className="fas fa-arrow-down"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="project-card-button-section">
          <ThemeBtn
            to={`/project/${project.id}`}
            className="view-details-btn"
          >
            View Details
          </ThemeBtn>
          <ThemeBtn
            to={`/project/${project.id}#enquiry`}
            className="view-details-btn"
          >
            Enquireies
          </ThemeBtn>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
