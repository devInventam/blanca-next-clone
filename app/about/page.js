import About from "@/screens/About";
import { getOtherField } from "@/services/otherFieldService";
import { getSetting } from "@/services/settingService";
import { getProjectByYearWithCategory } from "@/services/aboutService";
import { HOME_PAGE_URL } from "@/utils/constant";
import { getGlobalSeo } from "@/utils/getGlobalSeo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const BASE_URL = HOME_PAGE_URL;

  const { title, description, LOGO_URL } = await getGlobalSeo();

  return {
    metadataBase: new URL(BASE_URL),

    title: `About | ${title}`,
    description,

    alternates: {
      canonical: `${BASE_URL}/about`,
    },

    openGraph: {
      type: "website",
      url: `${BASE_URL}/about`,
      title: `About | ${title}`,
      description,
      images: [
        {
          url: LOGO_URL,
          width: 1200,
          height: 630,
          alt: "About Page",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `About | ${title}`,
      description,
      images: [LOGO_URL],
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
