import Projects from "@/screens/Projects";
import { HOME_PAGE_URL } from "@/utils/constant";

export async function generateMetadata() {
  const BASE_URL = HOME_PAGE_URL;

  return {
    alternates: {
      canonical: `${BASE_URL}/projects`,
    },
    openGraph: {
      url: `${BASE_URL}/projects`,
    },
  };
}

export default function Page() {
  return (
    <Projects />
  );
}
