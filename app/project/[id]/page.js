import ProjectDetails from "@/screens/ProjectDetails";
import { getSetting } from "@/services/settingService";
import { getProjectById } from "@/services/projectService";
import {
  DEFAULT_META_DESCRIPTION,
  DEFAULT_META_TITLE,
  HOME_PAGE_URL,
  WEBSITE_MAIN_LOGO,
} from "@/utils/constant";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const BASE_URL = HOME_PAGE_URL;

  let fallbackTitle = DEFAULT_META_TITLE;
  let fallbackDescription = DEFAULT_META_DESCRIPTION;

  try {
    const settingResponse = await getSetting({ offset: 0, limit: 1 });
    const settingRecord =
      settingResponse?.data?.[0] || settingResponse?.data || null;

    fallbackTitle = settingRecord?.setting_meta_title || fallbackTitle;
    fallbackDescription =
      settingRecord?.setting_meta_description || fallbackDescription;
  } catch {
    // ignore; keep defaults
  }

  try {
    const projectResponse = await getProjectById(id);
    const project = projectResponse?.data || null;

    const title =
      project?.project_meta_title ||
      (project?.project_name
        ? `${project?.project_name} - Blanca Real Estate`
        : fallbackTitle);

    const description =
      project?.project_meta_description || fallbackDescription;

    const images = project?.project_card_image
      ? [project?.project_card_image]
      : [WEBSITE_MAIN_LOGO];

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images,
        type: "website",
        url: `${BASE_URL}/project/${id}`,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images,
      },
      alternates: {
        canonical: `${BASE_URL}/project/${id}`,
      },
    };
  } catch {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
    };
  }
}

export default async function Page({ params }) {
  const { id } = await params;
  
  const projectResponse = await getProjectById(id);
  const project = projectResponse?.data || null;

  if(!projectResponse?.data) {
    return "Project not found";
  }

  return <ProjectDetails project={project} />;
}
