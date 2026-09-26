import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/StructuredData";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Our Web Design Team",
  description:
    "Who builds your website at ORIK Webcraft, how we work with businesses in Nepal, and why we put clear communication ahead of jargon.",
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
