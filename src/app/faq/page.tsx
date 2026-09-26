import type { Metadata } from "next";
import { Breadcrumbs, FaqStructuredData } from "@/components/seo/StructuredData";
import { Suspense } from "react";
import { Faq } from "@/components/sections/home/Faq";
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
  title: "Website Design FAQs",
  description:
    "How much a website costs, how long it takes, whether it works on phones, and how WhatsApp, chatbots, SEO and ongoing support are handled.",
  alternates: { canonical: "/faq" },
};

async function FaqPageContent() {
  const { content, error } = await getContent();
  if (error) return <ContentUnavailable error={error} />;

  return (
    <>
      <Breadcrumbs trail={[{ name: "FAQ", path: "/faq" }]} />
      <FaqStructuredData faqs={content.faqs} />
      <main>
        <Faq titleAs="h1" className="mt-15" />
      </main>
    </>
  );
}

export default function FaqPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <FaqPageContent />
    </Suspense>
  );
}
