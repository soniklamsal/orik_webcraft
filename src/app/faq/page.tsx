import type { Metadata } from "next";
import { Suspense } from "react";
import { Faq } from "@/components/sections/home/Faq";
import { ContentUnavailable } from "@/components/ui/ContentUnavailable";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { getContent } from "@/lib/content";

// Content comes live from the API on every request, so an edit in the admin
// shows on the next page load.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about website cost, mobile-friendly design, WhatsApp, chatbots, SEO and support from ORIK Webcraft.",
};

async function FaqPageContent() {
  const { error } = await getContent();
  if (error) return <ContentUnavailable error={error} />;

  return (
    <main>
      <Faq titleAs="h1" className="mt-15" />
    </main>
  );
}

export default function FaqPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <FaqPageContent />
    </Suspense>
  );
}
