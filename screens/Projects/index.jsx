import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import SmallHeroBanner from "../../components/common/Small-hero-banner";
import "./Projects.css";
import ThemeBtn from "../../components/common/Button/ThemeBtn";
import ProjectCard from "../../components/common/ProjectCard/ProjectCard";
import Preloader from "../../components/common/Preloader";
import { AnimatePresence } from "framer-motion";
import { useProjectLocations, useProjectsWithFilter } from "../../hooks/useProjects";
import { useCategories } from "../../hooks/useCategories";
// import SEO from '../../components/common/Seo/Seo';

const Projects = () => {
  const defaultMapUrl =
    "https://www.google.com/maps?q=Navi%20Mumbai%2C%20Maharashtra&output=embed";
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const statusParam = searchParams.get("status") || "all";
  const areaParam = searchParams.get("area") || "all";

  const projectBg = "/images/background/project-listing-bg.png"; // Fixed path for public asset
  const dropdownRef = useRef(null);
  const [status, setStatus] = useState(statusParam);
  const [area, setArea] = useState(areaParam);
  const [view, setView] = useState("grid");
  const [activeDropdown, setActiveDropdown] = useState(null); // 'type' or 'status' or null
  const [activeProjectId, setActiveProjectId] = useState(null);

  // const filteredProjects = projectsData.filter((project) => {
  //   const matchesType =
  //     type === "all" ||
  //     project.propertyType.toLowerCase() === type.toLowerCase();
  //   const matchesStatus =
  //     status === "all" || project.status.toLowerCase() === status.toLowerCase();
  //   return matchesType && matchesStatus;
  // });


  const { data: locationData } = useProjectLocations();
  const { data: categoryResponse } = useCategories({ limit: 10, page: 1 });

  const { data, isLoading } = useProjectsWithFilter({
    page: 1,
    limit: 10,
    category: filter || "all",
    status: status,
    location: area,
  });

  const apiProjects = data?.data || [];

  const projects = apiProjects?.map((project) => ({
    id: project?.project_project_id,
    title: project?.project_name,
    image: project?.project_card_image,
    href: `/project/${project?.project_project_id}`,
    location: project?.project_location,
    propertyType:
      project?.categories?.map((cat) => cat.category_name).join(" & ") ||
      project?.propertyType,
    configuration: project?.project_configuration,
    area: project?.project_sq_ft,
    status: project?.project_status,
    animationDelay: project?.animationDelay || "0.2s",
    mapUrl: project?.project_map_link,
  }));

  const filteredProjects = projects;
  const hasProjects = filteredProjects.length > 0;

  useEffect(() => {
    if (filteredProjects.length > 0) {
      const isCurrentlyActiveValid = filteredProjects.some(
        (project) => project?.id === activeProjectId
      );
      if (!isCurrentlyActiveValid) {
        setActiveProjectId(filteredProjects[0]?.id);
      }
    } else {
      setActiveProjectId(null);
    }
  }, [filteredProjects, activeProjectId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setStatus(statusParam);
  }, [statusParam]);

  useEffect(() => {
    setArea(areaParam);
  }, [areaParam]);

  useEffect(() => {
    if (!hasProjects) setActiveProjectId(null);
  }, [hasProjects]);

  const typeOptions = React.useMemo(() => {
    const fallback = [
      { label: "Commercial", value: "commercial" },
      { label: "Residential", value: "residential" },
    ];

    const list = categoryResponse?.data;
    const categoryOptions = Array.isArray(list)
      ? list
          .map((item) => {
            const label =
              item?.category_name ??
              item?.career_category_name ??
              item?.name ??
              item?.title ??
              "";
            const slug =
              item?.category_slug ??
              item?.career_category_slug ??
              item?.slug ??
              "";

            const normalizedLabel = String(label).trim();
            const normalizedValue =
              String(slug).trim() ||
              normalizedLabel.toLowerCase().replace(/\s+/g, "-");

            if (!normalizedLabel) return null;
            return { label: normalizedLabel, value: normalizedValue };
          })
          .filter(Boolean)
      : [];

    return [
      { label: "All Projects", value: "all" },
      ...(categoryOptions.length ? categoryOptions : fallback),
    ];
  }, [categoryResponse]);
  // ... rest of the file

  const statusOptions = [
    { label: "All Status", value: "all" },
    { label: "New Launches", value: "new-launches" },
    { label: "Coming Soon", value: "coming-soon" },
    { label: "Ongoing Projects", value: "on-going" },
    { label: "Completed", value: "completed" },
    { label: "Sold Out", value: "sold-out" },
  ];

  const apiLocations = locationData?.data;
  const locationList = Array.isArray(apiLocations) ? apiLocations : [];
  const areaOptions = [
    { label: "All Areas", value: "all" },
    ...locationList.map((loc) => ({ label: String(loc), value: String(loc) })),
  ];

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const handleTypeSelect = (value) => {
    const params = new URLSearchParams();
    if (value && value !== "all") params.set("filter", value);
    if (status && status !== "all") params.set("status", status);
    if (area && area !== "all") params.set("area", area);
    const qs = params.toString();
    router.push(qs ? `/projects?${qs}` : "/projects");
    setActiveDropdown(null);
  };

  const handleStatusSelect = (value) => {
    setStatus(value);
    const params = new URLSearchParams();
    if (filter && filter !== "all") params.set("filter", filter);
    if (value && value !== "all") params.set("status", value);
    if (area && area !== "all") params.set("area", area);
    const qs = params.toString();
    router.push(qs ? `/projects?${qs}` : "/projects");
    setActiveDropdown(null);
  };

  const handleAreaSelect = (value) => {
    setArea(value);
    const params = new URLSearchParams();
    if (filter && filter !== "all") params.set("filter", filter);
    if (status && status !== "all") params.set("status", status);
    if (value && value !== "all") params.set("area", value);
    const qs = params.toString();
    router.push(qs ? `/projects?${qs}` : "/projects");
    setActiveDropdown(null);
  };

  return (
    <div className="projects-page">
      {/* <SEO /> */}
      <AnimatePresence>
        {isLoading && <Preloader key="preloader" isLoading={isLoading} />}
      </AnimatePresence>
      <Header />
      <main>
        <SmallHeroBanner
          title="Our Projects"
          description=""
          image={projectBg}
        />

        <div className="filter-container" id="filter-section">
          <Container>
            <Row className="filter-row wow fadeInUp">
              <Col>
                <div className="subfilter-row d-flex justify-content-between align-items-center flex-wrap">
                  {/* ================= Dropdowns ================= */}
                  <div
                    className="filter-dropdowns d-flex gap-3"
                    ref={dropdownRef}
                  >
                    {/* Category Dropdown */}
                    <div
                      className={`custom-dropdown ${activeDropdown === "type" ? "active" : ""}`}
                    >
                      <div
                        className="dropdown-selected"
                        onClick={() => toggleDropdown("type")}
                      >
                        <span>
                          {
                            typeOptions.find(
                              (item) => item?.value === (filter || "all"),
                            )?.label
                          }
                        </span>
                        <i className="fas fa-chevron-down"></i>
                      </div>

                      <ul className="dropdown-list">
                        {typeOptions?.map((item) => (
                          <li
                            key={item?.value}
                            className={
                              (filter || "all") === item?.value ? "selected" : ""
                            }
                            onClick={() => handleTypeSelect(item?.value)}
                          >
                            {item?.label}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Status Dropdown */}
                    <div
                      className={`custom-dropdown ${activeDropdown === "status" ? "active" : ""}`}
                    >
                      <div
                        className="dropdown-selected"
                        onClick={() => toggleDropdown("status")}
                      >
                        <span>
                          {
                            statusOptions.find(
                              (item) =>
                                item.value === status ||
                                (status === "all" && item.value === "all"),
                            )?.label
                          }
                        </span>
                        <i className="fas fa-chevron-down"></i>
                      </div>

                      <ul className="dropdown-list">
                        {statusOptions?.map((item) => (
                          <li
                            key={item?.value}
                            className={status === item?.value ? "selected" : ""}
                            onClick={() => handleStatusSelect(item?.value)}
                          >
                            {item?.label}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Area Dropdown */}
                    <div
                      className={`custom-dropdown ${activeDropdown === "area" ? "active" : ""}`}
                    >
                      <div
                        className="dropdown-selected"
                        onClick={() => toggleDropdown("area")}
                      >
                        <span>
                          {areaOptions?.find((item) => item?.value === area)?.label}
                        </span>
                        <i className="fas fa-chevron-down"></i>
                      </div>

                      <ul className="dropdown-list">
                        {areaOptions?.map((item) => (
                          <li
                            key={item?.value}
                            className={area === item?.value ? "selected" : ""}
                            onClick={() => handleAreaSelect(item?.value)}
                          >
                            {item?.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* ================= View Toggle ================= */}
                  <div className="view-toggles">
                    <ThemeBtn
                      className={`view-toggle-btn ${
                        view === "grid" ? "active" : ""
                      }`}
                      onClick={() => setView("grid")}
                    >
                      GRID VIEW
                    </ThemeBtn>

                    <ThemeBtn
                      className={`view-toggle-btn ${
                        view === "map" ? "active" : ""
                      }`}
                      onClick={() => setView("map")}
                    >
                      MAP VIEW
                    </ThemeBtn>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="projects-list-area">
          <Container>
            {!hasProjects && (
              <div className="text-center py-5">
                <h3 className="text-white">
                  No projects found matching your criteria.
                </h3>
              </div>
            )}

            {hasProjects && view === "grid" && (
              <div className="projects-grid">
                {filteredProjects?.map((project) => (
                  <ProjectCard
                    key={project?.id}
                    project={project}
                    layout="grid"
                  />
                ))}
              </div>
            )}

            {hasProjects && view === "map" && (
              <div className="map-view-container">
                <div className="map-side-list">
                  {filteredProjects?.map((project) => (
                    <div
                      key={project?.id}
                      onClick={() => setActiveProjectId(project?.id)}
                      className={`map-project-item ${activeProjectId === project?.id ? "active-project" : ""
                        }`}
                    >
                      <ProjectCard project={project} layout="horizontal" />
                    </div>
                  ))}
                </div>
                <div className="map-side-view">
                  <div id="project-map-placeholder" className="h-100 w-100">
                    {filteredProjects?.map((project) => (
                      <div
                        key={project?.id}
                        style={{
                          display: activeProjectId === project?.id ? "block" : "none",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <iframe
                          title={`Map for ${project?.title}`}
                          src={project?.mapUrl || defaultMapUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="eager"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    ))}
                    {!activeProjectId && (
                      <div className="d-flex align-items-center justify-content-center h-100 bg-dark text-white">
                        Select a project to view on map
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Container>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
