import PrivacyPolicy from "@/screens/PrivacyPolicy";
import { HOME_PAGE_URL } from "@/utils/constant";
import { getGlobalSeo } from "@/utils/getGlobalSeo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const BASE_URL = HOME_PAGE_URL;

  const { title, description, LOGO_URL } = await getGlobalSeo();

  return {
    metadataBase: new URL(BASE_URL),

    title: `Privacy Policy | ${title}`,
    description,

    alternates: {
      canonical: `${BASE_URL}/privacy-policy`,
    },

    openGraph: {
      type: "website",
      url: `${BASE_URL}/privacy-policy`,
      title: `Privacy Policy | ${title}`,
      description,
      images: [
        {
          url: LOGO_URL,
          width: 1200,
          height: 630,
          alt: "Privacy Policy Page",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `Privacy Policy | ${title}`,
      description,
      images: [LOGO_URL],
    },
  };
}

export default function Page() {
  return <PrivacyPolicy />;
}
