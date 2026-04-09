import About from "@/screens/About";
import { getOtherField } from "@/services/otherFieldService";
import { getSetting } from "@/services/settingService";
import { getProjectByYearWithCategory } from "@/services/aboutService";

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
