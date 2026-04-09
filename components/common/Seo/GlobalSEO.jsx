"use client";

import { useSeoSetting } from "../../../hooks/useSeoSetting";
import { usePathname } from "next/navigation";
import SEO from "./Seo";

const GlobalSEO = () => {
  const { data } = useSeoSetting();
  const pathname = usePathname();

  if (/^\/project\/[^/]+/.test(pathname)) return null;

  return (
    <SEO
      title={data?.setting_meta_title}
      description={data?.setting_meta_description}
      image="/images/logos/favicon.png"
      url={pathname}
    />
  );
};

export default GlobalSEO;
