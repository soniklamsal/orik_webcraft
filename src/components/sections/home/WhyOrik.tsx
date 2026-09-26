import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { requireContent } from "@/lib/content";

// Kept in code: these are the built-in photos, used until one is uploaded.
const FALLBACK_LEFT_IMAGE = "/images/why-orik/team.png";
const FALLBACK_LEFT_ALT = "A smiling team member sitting at a table in a bright office";
const FALLBACK_RIGHT_IMAGE = "/images/why-orik/laptop.jpg";
const FALLBACK_RIGHT_ALT = "Hands resting on a closed laptop covered in stickers";

export async function WhyOrik() {
  const { footerTop } = await requireContent();
  const { left, right } = footerTop;

  return (
    <section aria-labelledby="why-heading" className="mt-30 grid xl:grid-cols-2">
      <h2 id="why-heading" className="sr-only">
        Why businesses choose ORIK Webcraft
      </h2>

      <div className="relative h-175 overflow-hidden">
        <Image
          src={left.image || FALLBACK_LEFT_IMAGE}
          alt={left.image ? (left.imageAlt ?? "") : FALLBACK_LEFT_ALT}
          fill
          sizes="(min-width: 1280px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute right-4 bottom-10 left-4 xl:top-[449.63px] xl:right-auto xl:bottom-auto xl:left-18 xl:w-126">
          <h3 className="max-w-[422.2px] font-manrope text-[36px] leading-[43.2px] font-extralight whitespace-pre-line text-white">
            {left.heading}
          </h3>
          <ButtonLink href={left.ctaHref} className="mt-6 xl:absolute xl:top-[122.38px] xl:left-0 xl:mt-0">
            {left.ctaLabel}
          </ButtonLink>
        </div>
      </div>

      <div className="relative h-175 overflow-hidden">
        <Image
          src={right.image || FALLBACK_RIGHT_IMAGE}
          alt={right.image ? (right.imageAlt ?? "") : FALLBACK_RIGHT_ALT}
          fill
          sizes="(min-width: 1280px) 50vw, 100vw"
          loading="eager"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.76),rgba(255,255,255,0))]"
        />
        <div className="absolute top-17.5 right-4 left-4 xl:right-auto xl:left-18">
          <p className="font-manrope text-[22px] leading-14 tracking-[0.04em] text-white">{right.eyebrow}</p>
          <h3 className="font-manrope text-[36px] leading-[43.2px] font-extralight whitespace-pre-line text-white">
            {right.heading}
          </h3>
        </div>
        <div className="absolute bottom-10 left-4 xl:top-63 xl:right-18 xl:bottom-auto xl:left-auto">
          <ButtonLink href={right.ctaHref}>{right.ctaLabel}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
