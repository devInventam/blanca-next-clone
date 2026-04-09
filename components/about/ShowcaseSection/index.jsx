import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// import { Container } from "react-bootstrap";
import { gsap } from "gsap";
import "./ShowcaseSection.css";

const ShowcaseSection = ({ slides = [] }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const validSlides = useMemo(() => {
    if (!Array.isArray(slides)) return [];
    return slides.filter(
      (s) =>
        (typeof s?.image === "string" && s.image.trim()) ||
        (typeof s?.title === "string" && s.title.trim()) ||
        (typeof s?.text === "string" && s.text.trim()),
    );
  }, [slides]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % validSlides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      (prev - 1 + validSlides.length) % validSlides.length,
    );
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const teamSlides = slidesRef.current.filter((el) => el !== null);
      if (!containerRef.current || teamSlides.length === 0) return;

      // Animate current slide
      const currentSlide = teamSlides[currentIndex];
      if (!currentSlide) return;

      const currentImage = currentSlide.querySelector("img");
      const memberInfo = currentSlide.querySelectorAll(
        ".member-name, .member-quote",
      );

      // Hide all slides first (reset state)
      gsap.set(teamSlides, { visibility: "hidden", y: "0%", zIndex: 1 });

      // Setup current slide
      gsap.set(currentSlide, { visibility: "visible", zIndex: 10 });

      // Animation timeline
      const tl = gsap.timeline();

      if (currentImage) {
        tl.fromTo(
          currentImage,
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
        );
      }

      if (memberInfo.length > 0) {
        tl.fromTo(
          memberInfo,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
          "-=0.8",
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [currentIndex, validSlides.length]);

  useEffect(() => {
    if (validSlides.length === 0) return;
    setCurrentIndex((i) => (i >= validSlides.length ? 0 : i));
  }, [validSlides.length]);

  if (validSlides.length === 0) return null;

  return (
    <section
      className="team-showcase-section"
      id="showcase-section"
      ref={sectionRef}
    >
      <div className="container">
        <div className="section-title text-center mb-0">
          <div className="sub-title-wrapper">
            <span className="sub-title common-subtitle">Value</span>
          </div>
          <div className="showcase-section-title bs-font-playfair-display">
            {/* Mumbai Real Estate Developer Insights */}
            Real Estate Developer Insights
          </div>
        </div>
      </div>
      {/* <Container> */}
      <div className="team-slides-container" ref={containerRef}>
        {validSlides.map((slide, index) => (
          <div
            key={index}
            className={`team-slide ${index === currentIndex ? "active" : ""}`}
            ref={(el) => (slidesRef.current[index] = el)}
          >
            <div className="team-slide-image">
              {/* Slide Counter */}
              <div className="slide-counter">
                <span className="counter-current">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="counter-total">
                  / {String(validSlides.length).padStart(2, "0")}
                </span>
              </div>

              <img src={slide.image} alt={slide.title} />
              {/* Navigation Arrows */}
              <div className="navigation-arrows">
                <button
                  className="nav-arrow prev"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 12H5M5 12L12 19M5 12L12 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  className="nav-arrow next"
                  onClick={nextSlide}
                  aria-label="Next slide"
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="team-slide-content">
              <h3 className="member-name">{slide.title}</h3>
              <p className="member-quote">{slide.text}</p>
            </div>
          </div>
        ))}
      </div>
      {/* </Container> */}
    </section>
  );
};

export default ShowcaseSection;
