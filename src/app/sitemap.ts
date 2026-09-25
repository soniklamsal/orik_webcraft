import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

// Priority reflects how much each page matters for enquiries, not how often it
// changes. /industries is excluded: it is one page behind a query parameter.
const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/pricing", priority: 0.9 },
  { path: "/contact", priority: 0.9 },
  { path: "/work", priority: 0.8 },
  { path: "/industries", priority: 0.8 },
  { path: "/process", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/faq", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
