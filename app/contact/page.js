import Contact from "@/screens/Contect";
import { getSetting } from "@/services/settingService";
import { HOME_PAGE_URL } from "@/utils/constant";
import { getGlobalSeo } from "@/utils/getGlobalSeo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const BASE_URL = HOME_PAGE_URL;

  const { title, description, LOGO_URL } = await getGlobalSeo();

  return {
    metadataBase: new URL(BASE_URL),

    title: `Contact | ${title}`,
    description,

    alternates: {
      canonical: `${BASE_URL}/contact`,
    },

    openGraph: {
      type: "website",
      url: `${BASE_URL}/contact`,
      title: `Contact | ${title}`,
      description,
      images: [
        {
          url: LOGO_URL,
          width: 1200,
          height: 630,
          alt: "Contact Page",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `Contact | ${title}`,
      description,
      images: [LOGO_URL],
    },
  };
}

export default async function Page() {
  
   const settingResponse = await getSetting();
  

  return <Contact settingResponse={settingResponse} />;
}
