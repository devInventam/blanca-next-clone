export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BUCKET_BASE_URL || "";

export const HOME_PAGE_URL = process.env.NEXT_PUBLIC_HOME_PAGE_URL;

export const UPLOAD_BASE_URL = BASE_API_URL || "";

/** Same-origin path for OG/Twitter previews (crawlers often fail on third-party image URLs). */
export const WEBSITE_MAIN_LOGO = "/images/logos/blanca-logo.png";

export const DEFAULT_META_TITLE = "Blanca Real Estate - Luxury at Affordable";

export const DEFAULT_META_DESCRIPTION =
  "Blanca Real Estate: trusted real estate since 1981. Premium residential, commercial and industrial projects across Ahmedabad, Surat, Mumbai and Navi Mumbai—explore listings and enquire online.";

export const acceptedDocsExtensions = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
};

export const PROJECT_STATUS_LABELS = {
  "new-launches": "New Launch",
  "coming-soon": "Coming Soon",
  "on-going": "Ongoing",
  completed: "Completed",
  "sold-out": "Sold Out",
};
