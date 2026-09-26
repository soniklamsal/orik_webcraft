import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { requireContent } from "@/lib/content";

const textWidths = [314.6, 302.4, 311.4];

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
          {`\n${yourIdea.heading}`}
        </h2>

        <div className="mt-3 grid gap-5 xl:grid-cols-3 xl:px-2.5">
          {problems.map((problem, index) => (
            <article key={problem.title} className="pt-6 pb-11 pl-6">
              <h3 className="font-inter text-[24px] leading-7 font-bold tracking-[-0.5px] text-navy">{problem.title}</h3>
              <p className="mt-7 text-[18px] leading-6 text-navy/60" style={{ maxWidth: textWidths[index] }}>
                {problem.description}
              </p>
            </article>
          ))}
        </div>

        <p className="relative mx-auto max-w-190 px-6 text-center text-[18px] leading-6 text-navy/60">
          {yourIdea.closingText}
        </p>
      </div>

      <div className="mt-7 flex justify-center">
        <ButtonLink href={yourIdea.ctaHref}>{yourIdea.ctaLabel}</ButtonLink>
      </div>
    </section>
  );
}