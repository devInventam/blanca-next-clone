import ProjectDetails from "@/screens/ProjectDetails";
import { getSetting } from "@/services/settingService";
import { getProjectById } from "@/services/projectService";
import {
  DEFAULT_META_DESCRIPTION,
  DEFAULT_META_TITLE,
} from "@/utils/constant";

export async function generateMetadata({ params }) {
  const id = params?.id;

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
      project?.project_meta_description ||
      project?.project_overview_description ||
      fallbackDescription;

    const images = project?.project_card_image
      ? [project?.project_card_image]
      : ["/images/logos/favicon.png"];

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images,
      },
    };
  } catch {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
    };
  }
}

export default function Page() {
  return <ProjectDetails />;
}
