import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/StructuredData";
import { Suspense } from "react";
import { Portfolio } from "@/components/sections/home/Portfolio";
import { ContentUnavailable } from "@/components/ui/ContentUnavailable";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { getContent } from "@/lib/content";

// Content comes live from the API on every request, so an edit in the admin
// shows on the next page load.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Website Design Portfolio",
  description:
    "Websites built by ORIK Webcraft for restaurants, retail, education and corporate businesses. See the design, the pages and what each one does.",
  alternates: { canonical: "/work" },
};

async function WorkPageContent() {
  const { error } = await getContent();
  if (error) return <ContentUnavailable error={error} />;

  return (
    <>
      <Breadcrumbs trail={[{ name: "Our Work", path: "/work" }]} />
      <main>
      <Portfolio titleAs="h1" className="mt-15" />
      </main>
    </>
  );
}

export default function WorkPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <WorkPageContent />
    </Suspense>
  );
}
