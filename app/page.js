import Home from "@/screens/Home";
import { getProjects } from "@/services/projectService";

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
