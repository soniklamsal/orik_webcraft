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

// Vercel kills a function at 10s without Fluid compute, which is shorter than
// the content fetch's own timeout -- so a cold backend killed the request
// before it could render the "content unavailable" panel and the visitor got
// a bare server error. 60s is allowed on every plan and leaves the fetch to
// time out first, so the page always explains itself.
export const maxDuration = 60;

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
