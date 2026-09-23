import { ButtonLink } from "@/components/ui/Button";
import { getContent } from "@/lib/content";
import { ContactForm } from "./ContactForm";

type ContactSectionProps = {
  titleAs?: "h1" | "h2";
  className?: string;
};

export async function ContactSection({ titleAs: Title = "h2", className = "mt-30" }: ContactSectionProps) {
  const { packages } = await getContent();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={`mx-auto max-w-285 scroll-mt-6 px-4 md:px-10 xl:px-0 ${className}`}
    >
      <div className="grid gap-12 xl:grid-cols-[1fr_560px] xl:gap-20">
        <div>
          <Title
            id="contact-heading"
            className="font-inter text-[48px] leading-14 font-bold tracking-[-1px] text-navy sm:whitespace-pre-line"
          >
            {"Tell us about\nyour project."}
          </Title>
          <p className="mt-4 max-w-107 text-[18px] leading-6 text-navy/72">
            Share a few details and we&apos;ll get back to you to talk about your goals, timeline and the best package
            for your business.
          </p>
          <ButtonLink href="/pricing" className="mt-8">See our packages</ButtonLink>
        </div>

        <div className="rounded-lg bg-surface p-6 sm:p-10">
          <ContactForm packages={packages} />
        </div>
      </div>
    </section>
  );
}
