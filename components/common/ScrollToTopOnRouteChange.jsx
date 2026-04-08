"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTopOnRouteChange = () => {
  const pathname = usePathname();

  useEffect(() => {
    const run = () => {
      const hash = window.location.hash;

      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          window.setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
          return;
        }
      }

      window.scrollTo(0, 0);
    };

    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, [pathname]);

  return null;
};

export default ScrollToTopOnRouteChange;
