"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

// Next.js only scrolls on navigation when the new page's top is off-screen, so a
// short page could open part-way down. Link navigations always start at the top;
// back/forward keeps the browser's restored position and hash links scroll to
// their section.
export function ScrollToTop() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const historyPath = useRef<string | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      historyPath.current = window.location.pathname;
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useLayoutEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    const fromHistory = historyPath.current === pathname;
    historyPath.current = null;
    if (fromHistory || window.location.hash) return;

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
