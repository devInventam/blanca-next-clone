import "./globals.css";

import Providers from "./providers";
import AppShell from "./_components/AppShell";
import Header from "components/layout/Header/Header";

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
          <Header />
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}

