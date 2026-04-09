import Careers from "@/screens/Careers";
import { getCareerCategories } from "@/services/careerService";
import { HOME_PAGE_URL } from "@/utils/constant";

export async function generateMetadata() {
  const BASE_URL = HOME_PAGE_URL;

  return {
    alternates: {
      canonical: `${BASE_URL}/careers`,
    },
    openGraph: {
      url: `${BASE_URL}/careers`,
    },
  };
}

export default async function Page() {
  const categoryData = await getCareerCategories({
    page: 1,
    limit: 10,
    is_parent: true,
});

  return <Careers categoryData={categoryData} />;
}
