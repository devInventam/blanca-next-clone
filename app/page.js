import Home from "@/screens/Home";
import { getProjects } from "@/services/projectService";
import { HOME_PAGE_URL } from "@/utils/constant";
import { getGlobalSeo } from "@/utils/getGlobalSeo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  const BASE_URL = HOME_PAGE_URL;

  const { title, description, LOGO_URL, version } = await getGlobalSeo();

  console.log("🚀 ~ generateMetadata ~ title:", title)
  console.log("🚀 ~ generateMetadata ~ description:", description)
  console.log("🚀 ~ generateMetadata ~ LOGO_URL:", LOGO_URL)

  return {
    metadataBase: new URL(BASE_URL),

    title,
    description,

    alternates: {
      canonical: `${BASE_URL}?v=${version}`,
    },

    openGraph: {
      type: "website",
      url: `${BASE_URL}?v=${version}`,
      title,
      description,
      images: [
        {
          url: `${LOGO_URL}?v=${version}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${LOGO_URL}?v=${version}`],
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
