import "./globals.css";
import Providers from "./providers";
import AppShell from "./AppShell";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
