import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/StructuredData";
import { Suspense } from "react";
import { ContactSection } from "@/components/sections/home/ContactSection";
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
  title: "Get a Free Website Consultation",
  description:
    "Tell ORIK Webcraft about your business and get a free consultation. Call, WhatsApp or send an enquiry, and we reply within one working day.",
  alternates: { canonical: "/contact" },
};

async function ContactPageContent() {
  const { error } = await getContent();
  if (error) return <ContentUnavailable error={error} />;

  return (
    <>
      <Breadcrumbs trail={[{ name: "Contact", path: "/contact" }]} />
      <main>
      <ContactSection titleAs="h1" className="mt-15" />
      </main>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ContactPageContent />
    </Suspense>
  );
}
