import PrivacyPolicy from "@/screens/PrivacyPolicy";
import { HOME_PAGE_URL } from "@/utils/constant";

export async function generateMetadata() {
  const BASE_URL = HOME_PAGE_URL;

  return {
    alternates: {
      canonical: `${BASE_URL}/privacy-policy`,
    },
    openGraph: {
      url: `${BASE_URL}/privacy-policy`,
    },
  };
}

export default function Page() {
  return <PrivacyPolicy />;
}
