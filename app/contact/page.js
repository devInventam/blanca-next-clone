import Contact from "@/screens/Contect";
import { getSetting } from "@/services/settingService";
import { HOME_PAGE_URL } from "@/utils/constant";

export async function generateMetadata() {
  const BASE_URL = HOME_PAGE_URL;

  return {
    alternates: {
      canonical: `${BASE_URL}/contact`,
    },
    openGraph: {
      url: `${BASE_URL}/contact`,
    },
  };
}

export default async function Page() {
  
   const settingResponse = await getSetting();
  

  return <Contact settingResponse={settingResponse} />;
}
