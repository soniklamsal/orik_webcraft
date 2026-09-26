import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/StructuredData";
import { AboutContent } from "./AboutContent";

// Vercel kills a function at 10s without Fluid compute, which is shorter than
// the content fetch's own timeout -- so a cold backend killed the request
// before it could render the "content unavailable" panel and the visitor got
// a bare server error. 60s is allowed on every plan and leaves the fetch to
// time out first, so the page always explains itself.
export const maxDuration = 60;

export const metadata: Metadata = {
  title: "About Our Web Design Team",
  description:
    "Who builds your website at ORIK Webcraft, how we work with the businesses we serve, and why we put clear communication ahead of jargon.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "About", path: "/about" }]} />
      <AboutContent />
    </>
  );
}
