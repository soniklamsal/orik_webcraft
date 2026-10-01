import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/StructuredData";
import { Suspense } from "react";
import { Industries } from "@/components/sections/home/Industries";
import { ContentUnavailable } from "@/components/ui/ContentUnavailable";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Website Design by Industry",
  description:
    "Websites for restaurants, retail, education, travel, real estate, professional services and corporate businesses, each built for how that trade sells.",
  alternates: { canonical: "/industries" },
};

async function IndustriesPageContent({ slug }: { slug?: string }) {
  const { error } = await getContent();
  if (error) return <ContentUnavailable error={error} />;

  return (
    <>
      <Breadcrumbs trail={[{ name: "Industries", path: "/industries" }]} />
      <main>
      {/* Keying on the slug remounts the section when another mega-menu link is
          clicked from this page, which a query change alone wouldn't do. */}
      <Industries key={slug ?? "default"} initialSlug={slug} titleAs="h1" className="mt-15" />
      </main>
    </>
  );
}

export default async function IndustriesPage({ searchParams }: PageProps<"/industries">) {
  const { industry } = await searchParams;
  const slug = typeof industry === "string" ? industry : undefined;

  return (
    <Suspense key={slug ?? "default"} fallback={<PageSkeleton />}>
      <IndustriesPageContent slug={slug} />
    </Suspense>
  );
}
