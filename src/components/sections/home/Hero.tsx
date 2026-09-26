import { MessageCircle, Search, Smartphone, Target, TrendingUp, Zap } from "lucide-react";
import Image from "next/image";
import { heroReviews, type Hero as HeroContent, type HeroBadgeIcon } from "@/data/home";
import { requireContent } from "@/lib/content";
import { ReviewRating } from "./ReviewRating";

const cardIcons = [Smartphone, Zap, Target];

const badgeIcons: Record<HeroBadgeIcon, typeof TrendingUp> = {
  enquiries: TrendingUp,
  whatsapp: MessageCircle,
  mobile: Smartphone,
  seo: Search,
  speed: Zap,
  target: Target,
};

// Where each badge floats, by position in the list. Editing wording in the
// admin never moves them; a fifth badge would have nowhere to go, so extras are
// ignored.
const badgePlacements = [
  { position: "top-6 -left-3 xl:-left-10", delay: "0s" },
  { position: "top-1/3 -right-3 xl:-right-8", delay: "1.5s" },
  { position: "bottom-24 -left-3 xl:-left-8", delay: "3s" },
  { position: "-bottom-5 right-10", delay: "4.5s" },
];

const FALLBACK_IMAGE = "/images/orik/hero-showcase.jpg";
const FALLBACK_IMAGE_ALT = "A laptop and a phone showing modern business website designs";

function QualitiesCard({ hero, className = "" }: { hero: HeroContent; className?: string }) {
  return (
    <div className={`flex h-15 w-full max-w-87.5 items-center rounded-[8px] bg-surface p-3.5 ${className}`}>
      <div className="flex w-[136.6px] shrink-0 flex-col gap-0.5">
        <div className="flex h-3.75 gap-1.5 text-[#ff9d48]">
          {cardIcons.map((Icon, index) => (
            <Icon key={index} aria-hidden className="size-3.75" strokeWidth={2.25} />
          ))}
        </div>
        <p className="text-[11px] leading-3.75 text-navy">{hero.qualitiesLabel}</p>
      </div>
      <ul className="flex items-center gap-[14.33px] px-[14.33px] font-inter text-[13px] leading-5 font-bold text-navy">
        {hero.qualities.map((quality) => (
          <li key={quality}>{quality}</li>
        ))}
      </ul>
    </div>
  );
}

export async function Hero() {
  const { hero } = await requireContent();
  const badges = hero.badges.slice(0, badgePlacements.length);

  return (
    <section className="mx-auto mt-15.25 flex w-full max-w-300 flex-col items-center gap-10 px-4 md:px-10 xl:flex-row xl:items-start">
      <div className="w-full max-w-110 shrink-0 xl:pb-6">
        <h1 className="font-inter text-[48px] leading-14 font-bold tracking-[-1px] text-navy">{hero.heading}</h1>
        <p className="mt-4 max-w-107 text-[18px] leading-6 text-navy/72">{hero.subheading}</p>

        {heroReviews ? (
          <ReviewRating reviews={heroReviews} className="mt-8" />
        ) : (
          <QualitiesCard hero={hero} className="mt-8" />
        )}
      </div>

      <div className="relative w-full max-w-160">
        <div className="overflow-hidden rounded-3xl shadow-[0_24px_60px_-20px_rgba(5,0,56,0.35)]">
          <Image
            src={hero.image || FALLBACK_IMAGE}
            alt={hero.image ? (hero.imageAlt ?? "") : FALLBACK_IMAGE_ALT}
            width={2400}
            height={1792}
            sizes="(min-width: 1280px) 640px, 100vw"
            loading="eager"
            fetchPriority="high"
            className="h-auto w-full"
          />
        </div>
        {badges.map((badge, index) => {
          const Icon = badgeIcons[badge.icon] ?? TrendingUp;
          const { position, delay } = badgePlacements[index];

          return (
            <div
              key={badge.label}
              className={`absolute hidden items-center gap-2.5 rounded-2xl bg-white py-2.5 pr-4 pl-2.5 font-inter text-[14px] font-semibold text-navy shadow-[0_12px_30px_-12px_rgba(5,0,56,0.35)] motion-safe:animate-float sm:flex ${position}`}
              style={{ animationDelay: delay }}
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-tab-active text-primary">
                <Icon aria-hidden className="size-4.5" />
              </span>
              {badge.label}
            </div>
          );
        })}
      </div>
    </section>
  );
}
