import { getSetting } from "@/services/settingService";
import {
  DEFAULT_META_DESCRIPTION,
  DEFAULT_META_TITLE,
  HOME_PAGE_URL,
  WEBSITE_MAIN_LOGO,
} from "@/utils/constant";

export async function getGlobalSeo() {
  let title = DEFAULT_META_TITLE;
  let description = DEFAULT_META_DESCRIPTION;

  const LOGO_URL = WEBSITE_MAIN_LOGO.startsWith("http")
    ? WEBSITE_MAIN_LOGO
    : `${HOME_PAGE_URL}/uploads/images/blanca-logo.png`;

  try {
    const settingResponse = await getSetting({
      offset: 0,
      limit: 1,
      t: Date.now(),
    });

    const settingRecord =
      settingResponse?.data?.[0] || settingResponse?.data || null;

    title = settingRecord?.setting_meta_title || title;
    description =
      settingRecord?.setting_meta_description || description;
  } catch {}

  return {
    title,
    description,
    LOGO_URL,
  };
}