import "./globals.css";

import Providers from "./providers";
import AppShell from "./AppShell";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { getSetting } from "@/services/settingService";
import {
  DEFAULT_META_DESCRIPTION,
  DEFAULT_META_TITLE,
} from "@/utils/constant";

/** Client-heavy UI (maps, sliders, jQuery, etc.); avoid static prerender issues. */
export const dynamic = "force-dynamic";

const siteUrl =
  process.env.NEXT_PUBLIC_HOME_PAGE_URL || "http://localhost:3000";

export async function generateMetadata() {
  let title = DEFAULT_META_TITLE;
  let description = DEFAULT_META_DESCRIPTION;

  try {
    const settingResponse = await getSetting({ offset: 0, limit: 1 });
    const settingRecord =
      settingResponse?.data?.[0] || settingResponse?.data || null;

    title = settingRecord?.setting_meta_title || title;
    description = settingRecord?.setting_meta_description || description;
  } catch {
    // fall back to defaults
  }

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    icons: {
      icon: "/images/logos/favicon.png",
    },
    openGraph: {
      type: "website",
      title,
      description,
      images: ["/images/logos/favicon.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/logos/favicon.png"],
    },
  };
}

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/background/slider-1.png"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <Providers>
          <AppShell>
            <Header />
            {children}
            <Footer />
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}
