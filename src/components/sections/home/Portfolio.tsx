import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { LearnMoreLink } from "@/components/ui/LearnMoreLink";
import { BrowserMockup, PhoneMockup } from "@/components/ui/SiteMockup";
import { requireContent } from "@/lib/content";

type PortfolioProps = {
  titleAs?: "h1" | "h2";
  className?: string;
};

export async function Portfolio({ titleAs: Title = "h2", className = "mt-30" }: PortfolioProps) {
  const { projects } = await requireContent();

  return (
    <section id="work" aria-labelledby="work-heading" className={`scroll-mt-6 ${className}`}>
      <div className="mx-auto max-w-285 px-4 text-center xl:px-0">
        <Title id="work-heading" className="font-inter text-[48px] leading-14 font-bold tracking-[-1px] text-navy">
          See what we&apos;ve built
        </Title>
        <div className="mt-6 flex justify-center">
          <ButtonLink href="/contact">Start your project</ButtonLink>
        </div>
      </div>

      {projects.map((project, index) => {
        const reversed = index % 2 === 1;
        return (
          <article key={project.title} className="overflow-hidden px-4 py-15 md:px-10 xl:px-37.5">
            <div
              className={`mx-auto flex max-w-285 flex-col items-center gap-10 xl:px-2.5 ${
                reversed ? "xl:flex-row-reverse xl:gap-28.75" : "xl:flex-row xl:gap-5"
              }`}
            >
              <div className={`w-full ${reversed ? "max-w-116.25" : "max-w-137.5"}`}>
                <p className="text-[18px] leading-6 text-navy/60">{project.category} · Demo project</p>
                <h3 className="mt-2 font-inter text-[48px] leading-14 font-bold tracking-[-1px] text-navy">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-[453.7px] font-inter text-[18px] leading-6 text-navy/60">{project.description}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {project.features.map((feature) => (
                    <li key={feature} className="relative pl-9.5 text-[18px] leading-6 text-navy/60">
                      <Check aria-hidden className="absolute top-0.5 left-1.5 size-4.5 text-navy" strokeWidth={2.5} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <LearnMoreLink href="#" label="View project" srLabel={project.title} className="mt-10" />
              </div>

              <div className="relative w-full max-w-137.5 pb-10 sm:pr-16">
                <BrowserMockup theme={project.theme} />
                <PhoneMockup theme={project.theme} className="absolute right-0 bottom-0 hidden sm:block" />
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
