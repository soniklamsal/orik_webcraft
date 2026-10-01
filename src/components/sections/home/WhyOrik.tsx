import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { getContent } from "@/lib/content";

// Kept in code: these are the built-in photos, used until one is uploaded.
// Both are from Unsplash, which licenses them for commercial use without
// attribution: Vitaly Gariev (left) and David Kristianto (right).
const FALLBACK_LEFT_IMAGE = "/images/why-orik/team.jpg";
const FALLBACK_LEFT_ALT = "A smiling man in glasses at his laptop, in an office with a strategy board behind him";
const FALLBACK_RIGHT_IMAGE = "/images/why-orik/laptop.jpg";
const FALLBACK_RIGHT_ALT = "A tidy modern desk with an open laptop, a lamp and a wall organiser";

export async function WhyOrik() {
  const { content } = await getContent();
  if (!content) return null;

  const { left, right } = content.footerTop;

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
        {/* The heading and button sit low on this panel, so the photo is darkened
            from the bottom up. Without it, white text lands on whatever the
            uploaded photo happens to have there. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75),rgba(0,0,0,0.45)_30%,rgba(0,0,0,0)_62%)]"
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
