import type { Metadata } from "next";
import { Suspense } from "react";
import { Pricing } from "@/components/sections/home/Pricing";
import { ContentUnavailable } from "@/components/ui/ContentUnavailable";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { getContent } from "@/lib/content";

// Content comes live from the API on every request, so an edit in the admin
// shows on the next page load.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Website packages from ORIK Webcraft. Every project is quoted after a free consultation.",
};

async function PricingPageContent() {
  const { error } = await getContent();
  if (error) return <ContentUnavailable error={error} />;

  return (
    <main>
      <Pricing titleAs="h1" className="mt-15" />
    </main>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PricingPageContent />
    </Suspense>
  );
}
