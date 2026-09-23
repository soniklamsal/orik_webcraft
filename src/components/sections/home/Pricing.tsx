import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { getContent } from "@/lib/content";

type PricingProps = {
  titleAs?: "h1" | "h2";
  className?: string;
};

export async function Pricing({ titleAs: Title = "h2", className = "mt-15" }: PricingProps) {
  const { packages } = await getContent();

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className={`mx-auto max-w-285 scroll-mt-6 px-4 md:px-10 xl:px-0 ${className}`}
    >
      <Title
        id="pricing-heading"
        className="text-center font-inter text-[48px] leading-14 font-bold tracking-[-1px] text-navy"
      >
        Choose the right package
      </Title>
      <p className="mx-auto mt-4 max-w-190 text-center text-[18px] leading-6 text-navy/72">
        Every business is different, so each project is quoted after a free consultation.
      </p>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:px-2.5">
        {packages.map((pkg) => (
          <li key={pkg.name} className="flex flex-col rounded-[8px] bg-surface p-7">
            <h3 className="font-inter text-[24px] leading-7 font-bold tracking-[-0.5px] text-navy">{pkg.name}</h3>
            <p className="mt-3 text-[18px] leading-6 text-navy/60 xl:min-h-18">{pkg.tagline}</p>
            <p className="mt-6 text-[14px] leading-5 text-navy/40">Quote on request</p>
            <ul className="mt-6 flex flex-1 flex-col gap-4">
              {pkg.features.map((feature) => (
                <li key={feature} className="relative pl-7 text-[16px] leading-6 text-navy/70">
                  <Check aria-hidden className="absolute top-1 left-0 size-4 text-navy" strokeWidth={2.5} />
                  {feature}
                </li>
              ))}
            </ul>
            <ButtonLink href="/contact" size="lg" className="mt-8">
              Get a quote<span className="sr-only"> for the {pkg.name} package</span>
            </ButtonLink>
          </li>
        ))}
      </ul>
    </section>
  );
}