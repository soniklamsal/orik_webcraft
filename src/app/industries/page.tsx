import type { Metadata } from "next";
import { Industries } from "@/components/sections/home/Industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Websites ORIK Webcraft builds for restaurants, corporate businesses, education, travel, retail, real estate, professional services and local business.",
};

export default async function IndustriesPage({ searchParams }: PageProps<"/industries">) {
  const { industry } = await searchParams;
  const slug = typeof industry === "string" ? industry : undefined;

  // Keying on the slug remounts the section when another mega-menu link is
  // clicked from this page, which a client-side query change alone wouldn't do.
  return (
    <main>
      <Industries key={slug ?? "default"} initialSlug={slug} titleAs="h1" className="mt-15" />
    </main>
  );
}
