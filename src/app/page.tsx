import type { Metadata } from "next";
import { Suspense } from "react";
import { Faq } from "@/components/sections/home/Faq";
import { Hero } from "@/components/sections/home/Hero";
import { Industries } from "@/components/sections/home/Industries";
import { Portfolio } from "@/components/sections/home/Portfolio";
import { Pricing } from "@/components/sections/home/Pricing";
import { ProblemSolution } from "@/components/sections/home/ProblemSolution";
import { Process } from "@/components/sections/home/Process";
import { QuickStats } from "@/components/sections/home/QuickStats";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { ContentUnavailable } from "@/components/ui/ContentUnavailable";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { getContent } from "@/lib/content";

// Content comes live from the API on every request, so an edit in the admin
// shows on the next page load.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

async function HomePageContent() {
  // getContent now returns fallback data instead of error when backend is down
  const { content } = await getContent();

  // Content is always available (either from API or fallback)
  if (!content) {
    return <ContentUnavailable error={{
      summary: "Content could not be loaded",
      detail: "Please try refreshing the page",
      endpoint: ""
    }} />;
  }

  return (
    <main>
      <Hero />
      <ProblemSolution />
      <QuickStats />
      <Industries />
      <Portfolio />
      <Process />
      <Pricing />
      <Testimonials />
      <Faq />
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <HomePageContent />
    </Suspense>
  );
}
