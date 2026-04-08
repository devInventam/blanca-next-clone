"use client";

import LiquidFilters from "../../src/components/common/LiquidFilters";
import FloatingContactButtons from "../../src/components/common/FloatingContactButtons/FloatingContactButtons";
import ContactModal from "../../src/components/common/ContactModal/ContactModal";
import CookieConsent from "../../src/components/common/CookieConsent/CookieConsent";
import GlobalSEO from "../../src/components/common/Seo/GlobalSEO";
import ScrollToTopOnRouteChange from "../../src/components/common/ScrollToTopOnRouteChange";

export default function AppShell({ children }) {
  return (
    <>
      <GlobalSEO />
      <ScrollToTopOnRouteChange />
      <LiquidFilters />
      <FloatingContactButtons />
      <ContactModal />
      <CookieConsent />
      {children}
    </>
  );
}

