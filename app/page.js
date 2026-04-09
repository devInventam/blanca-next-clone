import Home from "@/screens/Home";
import { getProjects } from "@/services/projectService";
import { HOME_PAGE_URL } from "@/utils/constant";

export async function generateMetadata() {
  const BASE_URL = HOME_PAGE_URL;

  return {
    alternates: {
      canonical: `${BASE_URL}`,
    },
    openGraph: {
      url: `${BASE_URL}`,
    },
  };
}

export default async function Page() {
  const projectsResponse = await getProjects({
    page: 1,
    limit: 5,
    sort_column: "project_home_sequence",
    sort_order: "asc",
    show_on_home_page: true,
  });

  return <Home projectsResponse={projectsResponse} />;
}
