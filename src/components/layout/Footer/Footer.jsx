"use client";

import React, { useEffect } from "react";
import Link from "next/link";
// import { Container } from 'react-bootstrap';
import { Icon } from "@iconify/react";
import ThankYouModal from "../../common/ThankYouModal/ThankYouModal";
import { useSetting } from "../../../hooks/useSetting";
import { useCategories } from "../../../hooks/useCategories";
import { useContactUs } from "../../../hooks/useContactUs";
import "./Footer.css";

const logo = "/images/logos/blanca-logo.png";

const Footer = () => {
  const footerRef = React.useRef(null);
  const [showThankYou, setShowThankYou] = React.useState(false);
  const [subscribeEmail, setSubscribeEmail] = React.useState("");
  const { data: settingResponse } = useSetting({ show_on_home_page: true });
  const { data: categoryResponse } = useCategories({ limit: 10, page: 1 });
  const { mutate: sendContact, isPending: isSubmittingSubscription } =
    useContactUs();

  const settingRecord = React.useMemo(() => {
    return settingResponse?.data?.[0] || null;
  }, [settingResponse]);

  const toTelHref = React.useCallback((value) => {
    if (!value) return "";
    const trimmed = String(value).trim();
    const normalized = trimmed.replace(/[^\d+]/g, "");
    return normalized ? `tel:${normalized}` : "";
  }, []);

  const toWaHref = React.useCallback((value) => {
    if (!value) return "";
    const normalized = String(value).replace(/[^\d]/g, "");
    return normalized ? `https://wa.me/${normalized}` : "";
  }, []);

  const getLink = React.useCallback((obj, keys) => {
    for (const key of keys) {
      const value = obj?.[key];
      if (value) return String(value);
    }
    return "";
  }, []);

  const websiteUrl =
    settingRecord?.setting_website || "https://www.blanca.co.in";
  const websiteLabel = settingRecord?.setting_website || "www.blanca.co.in";

  const email = settingRecord?.setting_email || "reachus.blanca@gmail.com";

  const contactNumbers = React.useMemo(() => {
    const raw = settingRecord?.setting_contact_number;
    if (!raw) return [];

    if (Array.isArray(raw)) return raw;

    if (typeof raw === "string") {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      } catch (_e) {
        // fallback to plain string format
      }
      return [{ title: "Contact", number: raw }];
    }

    if (typeof raw === "object") return [raw];
    return [];
  }, [settingRecord?.setting_contact_number]);

  const primaryContact = contactNumbers[0] || null;
  const phone = primaryContact?.number || "+91 7021913284";
  const phoneTitle = primaryContact?.title || "Call Us";

  const address =
    settingRecord?.setting_address ||
    "Greenland CHS 16 Plot 20 Sector 40 Nerul Seawood Navi Mumbai, 400706.";

  const social = React.useMemo(() => {
    const list = settingRecord?.setting_social_media || [];

    const findLink = (platform) =>
      list.find((item) => item.platform === platform)?.link || "#";

    return {
      instagram: findLink("instagram"),
      facebook: findLink("facebook"),
      twitter: findLink("twitter"),
      youtube: findLink("youtube"),
      linkedin: findLink("linkedin"),
    };
  }, [settingRecord]);

  const propertyCategories = React.useMemo(() => {
    const fallback = [
      { name: "Commercial", slug: "commercial" },
      { name: "Residential", slug: "residential" },
    ];

    const list = categoryResponse?.data;
    if (!Array.isArray(list) || list?.length === 0) return fallback;

    const mapped = list
      ?.map((item) => {
        const name =
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

        const normalizedName = String(name).trim();
        const normalizedSlug =
          String(slug).trim() ||
          normalizedName.toLowerCase().replace(/\s+/g, "-");

        if (!normalizedName) return null;
        return { name: normalizedName, slug: normalizedSlug };
      })
      .filter(Boolean);

    return mapped.length ? mapped : fallback;
  }, [categoryResponse]);

  useEffect(() => {
    let isMounted = true;
    let $ = null;
    let observedEl = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const el = footerRef.current;
        if (!entries[0].isIntersecting || !el) return;

        (async () => {
          try {
            const jq = await import("jquery");
            if (!isMounted) return;
            $ = jq.default ?? jq;

            // jquery.ripples registers itself on the global jQuery instance
            await import("jquery.ripples");
            if (!isMounted) return;

            if ($?.fn?.ripples) {
              $(el).ripples({
                resolution: 512,
                dropRadius: 20,
                perturbance: 0.04,
                interactive: true,
                crossOrigin: "",
              });
              observer.unobserve(el);
              observedEl = el;
            }
          } catch (_e) {
            // If ripples can't initialize (SSR/build/no-window), silently ignore.
          }
        })();
      },
      { threshold: 0.1 },
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      isMounted = false;
      const el = observedEl ?? footerRef.current;
      if (el && $?.fn?.ripples) {
        try {
          $(el).ripples("destroy");
        } catch (_e) {
          // ignore
        }
      }
      observer.disconnect();
    };
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = String(subscribeEmail || "").trim();
    if (!email) return;

    sendContact(
      { email, is_notified: true },
      {
        onSuccess: () => {
          setShowThankYou(true);
          setSubscribeEmail("");
        },
        onError: () => {
          alert("Something went wrong. Please try again.");
        },
      },
    );
  };

  return (
    <footer ref={footerRef} className="main-footer modern-footer">
      <div className="footer-container">
        {/* Footer Main Content */}
        <div className="footer-content">
          <div className="footer-main">
            {/* Intro Section */}
            <div className="footer-section footer-intro">
              <h2 className="footer-heading bs-font-playfair-display">
                Let's Work Together
              </h2>
              <p className="footer-description">
                Dream home or smart investment connect with blanca today and
                start building your future in mumbai & navi mumbai.
              </p>

              <div className="footer-stay-updated">
                <span className="update-label">STAY UPDATED</span>
                <form className="update-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    value={subscribeEmail}
                    onChange={(event) => setSubscribeEmail(event?.target?.value)}
                    placeholder="Enter your email address*"
                    required
                  />
                  <button
                    type="submit"
                    className="update-btn"
                    disabled={isSubmittingSubscription}
                  >
                    {isSubmittingSubscription ? "Sending..." : "Send"}
                  </button>
                </form>
              </div>
            </div>

            {/* Footer Links */}
            <div className="footer-section footer-links-group">
              <div className="footer-links-column">
                <h5 className="footer-title">About Us</h5>
                <ul className="footer-links">
                  <li>
                    <Link href="/about#showcase-section">Value</Link>
                  </li>
                  <li>
                    <Link href="/about#about-vision-section-four">
                      Our Vision
                    </Link>
                  </li>
                  <li>
                    <Link href="/about#about-mission-section-four">
                      Our Mission
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">Journey of Innovation</Link>
                  </li>
                </ul>
              </div>

              <div className="footer-links-column">
                <h5 className="footer-title">Communities</h5>
                <ul className="footer-links">
                  <li>
                    <Link href="/projects">New Launches</Link>
                  </li>
                  <li>
                    <Link href="/projects">Coming Soon</Link>
                  </li>
                  <li>
                    <Link href="/projects">Ongoing Projects</Link>
                  </li>
                </ul>
              </div>

              <div className="footer-links-column">
                <h5 className="footer-title">Properties</h5>
                <ul className="footer-links">
                  {propertyCategories?.map((category) => (
                    <li key={category?.slug}>
                      <Link href={`/projects?filter=${encodeURIComponent(category?.slug)}`}>
                        {category?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="footer-social-container-sec">
          {/* Highlights */}
          <div className="footer-social-center footer-highlight">
            <ul className="footer-highlight-list">
              {[
                { title: "Trusted", subtitle: "Partnership" },
                { title: "Efficient", subtitle: "Solutions" },
                { title: "Urban", subtitle: "Excellence" },
                { title: "Reliable", subtitle: "Quality" },
              ].map((item, index) => (
                <li key={index} className="footer-highlight-item">
                  <span
                    className="footer-highlight-slash"
                    aria-hidden="true"
                  ></span>
                  <span className="footer-highlight-text">
                    <span className="footer-highlight-title">{item?.title}</span>
                    <span className="footer-highlight-subtitle">
                      {item?.subtitle}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <div className="footer-logo">
            <Link href="/">
              <div className="footer-logo-shine-wrapper">
                <img
                  className="footer-logo-image"
                  src={logo}
                  alt="Logo"
                  title="Logo"
                />
              </div>
            </Link>
          </div>

          {/* Contact */}
          <div className="footer-section footer-contact-card">
            <h5 className="footer-title">Get In Touch</h5>
            <ul className="footer-contact">
              <li className="contact-item">
                <Icon icon="lucide:globe" className="contact-icon" />
                <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                  {websiteLabel}
                </a>
              </li>

              <li className="contact-item">
                <Icon icon="lucide:mail" className="contact-icon" />
                <a href={`mailto:${email}`}>{email}</a>
              </li>

              <li className="contact-item">
                <Icon icon="lucide:phone" className="contact-icon" />
                <div>
                  {/* <span className="d-block">{phoneTitle}</span> */}
                  <a href={toTelHref(phone)}>{phone}</a>
                </div>
              </li>

              <li className="contact-item" style={{ marginBottom: "0px" }}>
                <Icon icon="lucide:map-pin" className="contact-icon" />
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2025 Blanca Real Estate. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="footer-social-center">
              <div className="social-links">
                {settingRecord?.setting_social_media?.map((item) => (
                  <a
                    key={item?.platform}
                    href={item?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <Icon icon={`lucide:${item?.platform?.toLowerCase()}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div className="footer-legal-links">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <span className="divider">|</span>
              <Link href="/terms-and-conditions">Terms and Conditions</Link>
              <span className="divider">|</span>
              <Link href="/cookie-policy">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>

      <ThankYouModal
        isOpen={showThankYou}
        onClose={() => setShowThankYou(false)}
        title="Subscription Successful"
        message="Welcome to Blanca! Thank you for connecting. You’re now on the list to receive first exclusive property insights and investment updates across Mumbai and Navi Mumbai check your inbox soon!"
      />
    </footer>
  );
};

export default Footer;
