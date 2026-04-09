"use client";

import LiquidFilters from "@/components/common/LiquidFilters";
import FloatingContactButtons from "@/components/common/FloatingContactButtons/FloatingContactButtons";
import { ContactModalProvider } from "@/context/ContactModalContext";
import ContactModal from "@/components/common/ContactModal/ContactModal";
import CookieConsent from "@/components/common/CookieConsent/CookieConsent";
import GlobalSEO from "@/components/common/Seo/GlobalSEO";
import ScrollToTopOnRouteChange from "@/components/common/ScrollToTopOnRouteChange";

export default function AppShell({ children }) {
  return (
    <ContactModalProvider>
      <GlobalSEO />
      <ScrollToTopOnRouteChange />
      <LiquidFilters />
      <FloatingContactButtons />
      <ContactModal />
      <CookieConsent />
      {children}
    </ContactModalProvider>
  );
}
