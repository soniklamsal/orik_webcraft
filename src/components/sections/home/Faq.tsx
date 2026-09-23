import { Plus } from "lucide-react";
import { getContent } from "@/lib/content";

type FaqProps = {
  titleAs?: "h1" | "h2";
  className?: string;
};

export async function Faq({ titleAs: Title = "h2", className = "mt-30" }: FaqProps) {
  const { faqs } = await getContent();

  return (
    <section id="faq" aria-labelledby="faq-heading" className={`mx-auto max-w-220 scroll-mt-6 px-4 md:px-10 ${className}`}>
      <Title id="faq-heading" className="text-center font-inter text-[48px] leading-14 font-bold tracking-[-1px] text-navy">
        Frequently asked questions
      </Title>

      <div className="mt-10 border-t border-navy/10">
        {faqs.map((faq) => (
          <details key={faq.question} className="group border-b border-navy/10 py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-inter text-[20px] leading-7 font-bold tracking-[-0.3px] text-navy [&::-webkit-details-marker]:hidden">
              {faq.question}
              <Plus
                aria-hidden
                className="size-6 shrink-0 text-primary transition-transform group-open:rotate-45"
                strokeWidth={1.75}
              />
            </summary>
            <p className="mt-3 max-w-180 text-[18px] leading-6 text-navy/60">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
