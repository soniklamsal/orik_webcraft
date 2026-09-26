import { History, Hourglass, MessageCircleOff, MonitorX, SearchX, TriangleAlert, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import type { ProblemIcon } from "@/data/home";
import { requireContent } from "@/lib/content";

const problemIcons: Record<ProblemIcon, LucideIcon> = {
  "search-x": SearchX,
  history: History,
  "message-circle-off": MessageCircleOff,
  "monitor-x": MonitorX,
  hourglass: Hourglass,
  "triangle-alert": TriangleAlert,
};

/**
 * Wraps the phrase chosen in the admin in a marker sweep. Matching is
 * case-insensitive, and a phrase that is not in the heading simply does
 * nothing rather than breaking the headline.
 */
function markHighlight(heading: string, phrase: string) {
  const at = phrase ? heading.toLowerCase().indexOf(phrase.toLowerCase()) : -1;
  if (at === -1) return heading;

  // Painted as a background rather than an overlay: box-decoration-clone
  // repeats it on each line, so a phrase that wraps gets one sweep per line
  // instead of a single bar across the whole block.
  return (
    <>
      {heading.slice(0, at)}
      <span className="box-decoration-clone bg-[linear-gradient(to_top,transparent_0.04em,var(--color-accent-yellow)_0.04em,var(--color-accent-yellow)_0.36em,transparent_0.36em)]">
        {heading.slice(at, at + phrase.length)}
      </span>
      {heading.slice(at + phrase.length)}
    </>
  );
}

export async function ProblemSolution() {
  const { problems, yourIdea } = await requireContent();

  return (
    <section aria-labelledby="problem-heading" className="mt-24 px-4 md:px-10 xl:px-0">
      <div className="relative mx-auto max-w-285">
        <Image
          src="/images/home/idea-sticker.svg"
          alt=""
          width={323}
          height={323}
          className="pointer-events-none absolute -top-38.75 left-134.25 hidden xl:block"
        />
        <h2
          id="problem-heading"
          className="relative pt-7 text-center font-inter text-[48px] leading-14 font-bold tracking-[-1px] text-navy xl:whitespace-pre"
        >
          {/* The leading newline keeps the sticker clear of the first line. */}
          {"\n"}
          {markHighlight(yourIdea.heading, yourIdea.headingHighlight)}
        </h2>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:px-2.5">
          {problems.map((problem) => {
            const Icon = problemIcons[problem.icon] ?? TriangleAlert;
            return (
              <li
                key={problem.title}
                className="group rounded-[8px] bg-surface p-7 transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_40px_-24px_rgba(5,0,56,0.45)] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <span className="grid size-12 place-items-center rounded-[8px] bg-white text-navy/70 transition-colors group-hover:bg-tab-active group-hover:text-primary">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 font-inter text-[24px] leading-7 font-bold tracking-[-0.5px] text-navy">
                  {problem.title}
                </h3>
                <p className="mt-3 text-[18px] leading-6 text-navy/60">{problem.description}</p>
              </li>
            );
          })}
        </ul>

        <div className="relative mt-5 overflow-hidden rounded-[8px] bg-navy px-6 py-14 text-center sm:px-12 xl:mx-2.5">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 h-80 w-160 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl"
          />
          <p className="relative mx-auto max-w-175 font-inter text-[22px] leading-8 text-white/85">
            {yourIdea.closingText}
          </p>
          <div className="relative mt-8 flex justify-center">
            <ButtonLink href={yourIdea.ctaHref}>
              {yourIdea.ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}