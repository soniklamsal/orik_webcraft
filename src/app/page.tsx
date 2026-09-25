import { Faq } from "@/components/sections/home/Faq";
import { Hero } from "@/components/sections/home/Hero";
import { Industries } from "@/components/sections/home/Industries";
import { Portfolio } from "@/components/sections/home/Portfolio";
import { Pricing } from "@/components/sections/home/Pricing";
import { ProblemSolution } from "@/components/sections/home/ProblemSolution";
import { Process } from "@/components/sections/home/Process";
import { QuickStats } from "@/components/sections/home/QuickStats";
import { Testimonials } from "@/components/sections/home/Testimonials";

export default function HomePage() {
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