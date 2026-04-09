"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./CookieConsent.css";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-banner wow fadeInUp" data-wow-delay="0.1s">
        <div className="cookie-content">
          <div className="cookie-icon">
            <i className="fas fa-cookie-bite"></i>
          </div>
          <div className="cookie-text">
            <h3>Cookie Policy</h3>
            <p>
              We use cookies to enhance your experience. By continuing to visit
              this site you agree to our use of cookies.{" "}
              <Link href="/cookie-policy">Learn more</Link>
            </p>
          </div>
        </div>
        <div className="cookie-actions">
          <button className="decline-btn" onClick={handleDecline}>
            Decline
          </button>
          <button className="accept-btn theme-btn" onClick={handleAccept}>
            <span>Accept All</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
