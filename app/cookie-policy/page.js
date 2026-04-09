import CookiePolicy from "@/screens/CookiePolicy";
import { HOME_PAGE_URL } from "@/utils/constant";

export async function generateMetadata() {
  const BASE_URL = HOME_PAGE_URL;

  return {
    alternates: {
      canonical: `${BASE_URL}/cookie-policy`,
    },
    openGraph: {
      url: `${BASE_URL}/cookie-policy`,
    },
  };
}

export default function Page() {
  return <CookiePolicy />;
}
