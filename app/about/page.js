import About from "@/screens/About";
import { getOtherField } from "@/services/otherFieldService";
import { getSetting } from "@/services/settingService";
import { getProjectByYearWithCategory } from "@/services/aboutService";
import { HOME_PAGE_URL } from "@/utils/constant";

export async function generateMetadata() {
  const BASE_URL = HOME_PAGE_URL;

  return {
    alternates: {
      canonical: `${BASE_URL}/about`,
    },
    openGraph: {
      url: `${BASE_URL}/about`,
    },
  };
}

export default async function Page() {
  const aboutPageResponse = await getOtherField();
  const [settingResponse, journeyResponse] = await Promise.all([
    getSetting(),
    getProjectByYearWithCategory(),
  ]);

  return (
    <About
      aboutPageResponse={aboutPageResponse}
      settingResponse={settingResponse}
      journeyResponse={journeyResponse}
    />
  );
}
