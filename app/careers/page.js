import Careers from "@/screens/Careers";
import { getCareerCategories } from "@/services/careerService";

export default async function Page() {
  const categoryData = await getCareerCategories({
    page: 1,
    limit: 10,
    is_parent: true,
});

  return <Careers categoryData={categoryData} />;
}
