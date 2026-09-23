import Image from "next/image";
import type { HeroReviews } from "@/data/home";

type ReviewRatingProps = {
  reviews: HeroReviews;
  className?: string;
};

export function ReviewRating({ reviews, className = "" }: ReviewRatingProps) {
  const roundedRating = Math.round(reviews.rating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const starIcons = [
    ...Array<string>(fullStars).fill("/icons/star.svg"),
    ...(roundedRating > fullStars ? ["/icons/star-half.svg"] : []),
  ];

  return (
    <div className={`flex h-15 w-full max-w-87.5 items-center rounded-[8px] bg-surface p-3.5 ${className}`}>
      <div className="flex w-[136.6px] shrink-0 flex-col gap-0.5">
        <div role="img" aria-label={`Rated ${reviews.rating} out of 5`} className="flex h-3.75 gap-1.5">
          {starIcons.map((src, index) => (
            <Image key={index} src={src} alt="" width={16} height={15} className="h-3.75 w-4" />
          ))}
        </div>
        <p className="text-[11px] leading-3.75 text-navy">Based on {reviews.count} reviews:</p>
      </div>

      <ul className="flex items-center gap-[14.33px] px-[14.33px]">
        {reviews.platforms.map((platform) => (
          <li key={platform.name}>
            {platform.logo ? (
              <Image
                src={platform.logo.src}
                alt={platform.name}
                width={platform.logo.width}
                height={platform.logo.height}
              />
            ) : (
              <span className="font-inter text-[14px] leading-5 font-bold text-navy">{platform.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
