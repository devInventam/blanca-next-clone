import "./About.css";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ThemeBtn from "../../common/Button/ThemeBtn";
import { motion as Motion } from "framer-motion";
import { useOtherField } from "../../../hooks/useOtherField";

const About = () => {
  const {
    data: homeAboutResponse,
    isPending,
    isError,
    isSuccess,
  } = useOtherField();

  const aboutContent = React.useMemo(() => {
    const raw = homeAboutResponse;
    const groups = raw?.data ?? raw?.message?.data ?? raw;
    const list = Array.isArray(groups) ? groups : [];

    const homeModelGroup = list?.find(
      (group) => String(group?.model ?? "") === "Home",
    );
    const homeModelData = Array.isArray(homeModelGroup?.data)
      ? homeModelGroup?.data
      : [];
    const firstHomeItem = homeModelData[0]?.fields ?? {};

    const title =
      typeof firstHomeItem?.title === "string"
        ? firstHomeItem?.title.trim()
        : "";

    const descriptionRaw =
      typeof firstHomeItem?.description === "string"
        ? firstHomeItem?.description.trim()
        : "";

    const media =
      typeof firstHomeItem?.image === "string"
        ? firstHomeItem?.image.trim()
        : "";

    const hasApiContent = Boolean(title || descriptionRaw || media);
    if (!hasApiContent) return null;

    return {
      title,
      descriptionHtml: descriptionRaw,
      media: media || null,
    };
  }, [homeAboutResponse]);

  const isVideoMedia = React.useMemo(() => {
    const media = aboutContent?.media;
    if (!media) return false;
    const cleanPath = String(media).split("?")[0].toLowerCase();
    return /\.(mp4|webm|ogg|mov|m4v)$/i.test(cleanPath);
  }, [aboutContent?.media]);

  if (isPending || isError) return null;
  if (!isSuccess || !aboutContent) return null;

  return (
    <section className="about-area about-modern" id="about">
      <Container>
        <Row className="about-modern__wrap align-items-center g-5">
          {/* Media Section — supports both image and video */}
          {aboutContent?.media ? (
            <Col lg={6} className="about-modern__media">
              <Motion.div
                className="video-mask-wrapper"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {isVideoMedia ? (
                  <video
                    src={aboutContent?.media}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label="About us banner video"
                  />
                ) : (
                  <img
                    src={aboutContent?.media}
                    alt={aboutContent?.title || "About us banner image"}
                  />
                )}
              </Motion.div>
            </Col>
          ) : null}

          {/* Content Section */}
          <Col
            lg={aboutContent?.media ? 6 : 12}
            className="about-modern__content"
          >
            {aboutContent?.title ? (
              <h2 className="about-modern__title bs-font-Smothing">
                {aboutContent?.title}
              </h2>
            ) : null}

            {aboutContent?.descriptionHtml ? (
              <div
                className="about-modern__text about_contains_div"
                dangerouslySetInnerHTML={{
                  __html: aboutContent?.descriptionHtml,
                }}
              />
            ) : null}

            <div className="buttons">
              <ThemeBtn to="/projects" className="bs-font-montserrat">
                Explore More Projects
              </ThemeBtn>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
