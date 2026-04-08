import "../src/assets/styles/index.css";
import "../src/assets/styles/App.css";
import "../src/assets/styles/fonts.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Providers from "./providers";
import AppShell from "./_components/AppShell";

export const metadata = {
  title: "Blanca Real Estate - Luxury at Affordable",
  description:
    "Discover luxury real estate projects with Blanca Real Estate. Explore premium properties, project details, and connect with our team.",
  icons: {
    icon: "/images/logos/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}

