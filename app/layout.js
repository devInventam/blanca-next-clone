import { headers } from "next/headers";
import "./globals.css";

import Providers from "./providers";
import AppShell from "./AppShell";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { getSetting } from "@/services/settingService";
import {
  DEFAULT_META_DESCRIPTION,
  DEFAULT_META_TITLE,
  HOME_PAGE_URL,
  WEBSITE_MAIN_LOGO,
} from "@/utils/constant";

export const dynamic = "force-dynamic";

  export async function generateMetadata() {
    let TITLE = DEFAULT_META_TITLE;
    let DESCRIPTION = DEFAULT_META_DESCRIPTION;
  
    const BASE_URL = HOME_PAGE_URL;
  
    try {
      const settingResponse = await getSetting({ offset: 0, limit: 1 });
  
      const settingRecord =
        settingResponse?.data?.[0] || settingResponse?.data || null;
  
      TITLE = settingRecord?.setting_meta_title || TITLE;
      DESCRIPTION =
        settingRecord?.setting_meta_description || DESCRIPTION;
    } catch (error) {
      console.error("Metadata error:", error);
    }
  
    return {
      metadataBase: new URL(BASE_URL),
  
      title: TITLE,
      description: DESCRIPTION,
  
      openGraph: {
        type: "website",
        title: TITLE,
        description: DESCRIPTION,
        images: [
          {
            url: WEBSITE_MAIN_LOGO,
            width: 500,
            height: 163,
            alt: TITLE,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: [WEBSITE_MAIN_LOGO],
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
