import type { Metadata } from "next";
import { Suspense } from "react";
import { Portfolio } from "@/components/sections/home/Portfolio";
import { ContentUnavailable } from "@/components/ui/ContentUnavailable";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { getContent } from "@/lib/content";

// Content comes live from the API on every request, so an edit in the admin
// shows on the next page load.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Demo websites by ORIK Webcraft for an online store, an education consultancy and a corporate business.",
};

async function WorkPageContent() {
  const { error } = await getContent();
  if (error) return <ContentUnavailable error={error} />;

  return (
    <main>
      <Portfolio titleAs="h1" className="mt-15" />
    </main>
  );
}

export default function WorkPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <WorkPageContent />
    </Suspense>
  );
}
