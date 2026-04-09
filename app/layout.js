import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/assets/styles/index.css";
import "@/assets/styles/App.css";
import "./globals.css";

import Providers from "./providers";
import AppShell from "./AppShell";

/** Client-heavy UI (maps, sliders, jQuery, etc.); avoid static prerender issues. */
export const dynamic = "force-dynamic";

const siteUrl =
  process.env.NEXT_PUBLIC_HOME_PAGE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Blanca Real Estate - Luxury at Affordable",
  description:
    "Discover luxury real estate projects with Blanca Real Estate. Explore premium properties, project details, and connect with our team.",
  icons: {
    icon: "/images/logos/favicon.png",
  },
  openGraph: {
    type: "website",
    title: "Blanca Real Estate",
    description:
      "Discover luxury real estate projects with Blanca Real Estate. Explore premium properties, project details, and connect with our team.",
    images: ["/images/logos/favicon.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blanca Real Estate",
    description:
      "Discover luxury real estate projects with Blanca Real Estate. Explore premium properties, project details, and connect with our team.",
    images: ["/images/logos/favicon.png"],
  },
};

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
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
