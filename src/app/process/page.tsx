import type { Metadata } from "next";
import { Suspense } from "react";
import { Process } from "@/components/sections/home/Process";
import { ContentUnavailable } from "@/components/ui/ContentUnavailable";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { getContent } from "@/lib/content";

// Content comes live from the API on every request, so an edit in the admin
// shows on the next page load.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Process",
  description: "How ORIK Webcraft takes your website from idea to online: discover, plan, design, develop, launch and support.",
};

async function ProcessPageContent() {
  const { error } = await getContent();
  if (error) return <ContentUnavailable error={error} />;

  return (
    <main>
      <Process titleAs="h1" className="mt-15" />
    </main>
  );
}

export default function ProcessPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProcessPageContent />
    </Suspense>
  );
}
