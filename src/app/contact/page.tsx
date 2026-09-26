import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactSection } from "@/components/sections/home/ContactSection";
import { ContentUnavailable } from "@/components/ui/ContentUnavailable";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { getContent } from "@/lib/content";

// Content comes live from the API on every request, so an edit in the admin
// shows on the next page load.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell ORIK Webcraft about your project and get a free consultation.",
};

async function ContactPageContent() {
  const { error } = await getContent();
  if (error) return <ContentUnavailable error={error} />;

  return (
    <main>
      <ContactSection titleAs="h1" className="mt-15" />
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ContactPageContent />
    </Suspense>
  );
}
