import Projects from "@/screens/Projects";
import { HOME_PAGE_URL } from "@/utils/constant";
import { getGlobalSeo } from "@/utils/getGlobalSeo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  const BASE_URL = HOME_PAGE_URL;

  const { title, description, LOGO_URL } = await getGlobalSeo();

  return {
    metadataBase: new URL(BASE_URL),

    title: `Projects | ${title}`,
    description,

    alternates: {
      canonical: `${BASE_URL}/projects`,
    },

    openGraph: {
      type: "website",
      url: `${BASE_URL}/projects`,
      title: `Projects | ${title}`,
      description,
      images: [
        {
          url: LOGO_URL,
          width: 1200,
          height: 630,
          alt: "Projects Page",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `Projects | ${title}`,
      description,
      images: [LOGO_URL],
    },
  };
}

export default function Page() {
  return (
    <Projects />
  );
}
