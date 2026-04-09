import Contact from "@/screens/Contect";
import { getSetting } from "@/services/settingService";

export default async function Page() {
  
   const settingResponse = await getSetting();
  

  return <Contact settingResponse={settingResponse} />;
}
