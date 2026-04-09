import TermsAndConditions from "@/screens/TermsConditions";
import { HOME_PAGE_URL } from "@/utils/constant";

export async function generateMetadata() {
  const BASE_URL = HOME_PAGE_URL;

  return {
    alternates: {
      canonical: `${BASE_URL}/terms-and-conditions`,
    },
    openGraph: {
      url: `${BASE_URL}/terms-and-conditions`,
    },
  };
}

export default function Page() {
  return <TermsAndConditions />;
}
