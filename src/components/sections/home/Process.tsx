import { getContent } from "@/lib/content";

type ProcessProps = {
  titleAs?: "h1" | "h2";
  className?: string;
};

export async function Process({ titleAs: Title = "h2", className = "mt-30" }: ProcessProps) {
  const { processSteps } = await getContent();

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className={`mx-auto max-w-285 scroll-mt-6 px-4 md:px-10 xl:px-0 ${className}`}
    >
      <Title
        id="process-heading"
        className="text-center font-inter text-[48px] leading-14 font-bold tracking-[-1px] text-navy"
      >
        From idea to online
      </Title>
      <p className="mx-auto mt-4 max-w-190 text-center text-[18px] leading-6 text-navy/72">
        A simple, transparent process that keeps you involved at every step.
      </p>

      <ol className="mt-3 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:px-2.5">
        {processSteps.map((step, index) => (
          <li key={step.title} className="pt-6 pb-11 pl-6">
            <p className="font-inter text-[18px] leading-6 font-bold text-primary">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 font-inter text-[24px] leading-7 font-bold tracking-[-0.5px] text-navy">{step.title}</h3>
            <p className="mt-7 max-w-78 text-[18px] leading-6 text-navy/60">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
