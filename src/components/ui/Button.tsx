import Link from "next/link";
import type { ComponentProps } from "react";

const sizeClasses = {
  xs: "h-10 pl-4 text-[14px] leading-5",
  sm: "h-12.5 pl-5 text-[15px] leading-6",
  md: "h-14.5 pl-6.25 text-[16px] leading-6",
  lg: "h-14.5 w-full justify-between pl-6.25 text-[16px] leading-6",
} as const;

const arrowSizes = {
  xs: { box: "size-10", icon: "size-7" },
  sm: { box: "size-12.5", icon: "size-9" },
  md: { box: "size-[63.514px]", icon: "size-[45.083px]" },
  lg: { box: "size-[63.514px]", icon: "size-[45.083px]" },
} as const;

type ButtonSize = keyof typeof sizeClasses;

// The border is invisible at rest (it matches the fill) and becomes the outline
// that keeps the button readable once hover turns it white.
const baseClasses =
  "inline-flex cursor-pointer items-center border border-primary-dark bg-primary-dark font-manrope font-extralight whitespace-nowrap text-white transition-colors hover:bg-white hover:text-primary-dark";

function buttonClasses(size: ButtonSize, className?: string) {
  return [baseClasses, sizeClasses[size], className].filter(Boolean).join(" ");
}

/** Inlined so the arrow follows the label colour on hover, unlike the white-filled asset. */
function ButtonArrow({ size }: { size: ButtonSize }) {
  const { box, icon } = arrowSizes[size];
  return (
    <span aria-hidden="true" className={`flex shrink-0 items-center justify-center ${box}`}>
      <svg
        viewBox="0 0 45.0825 45.0825"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={`max-w-none -rotate-40 ${icon}`}
      >
        <path d="M24.6987 31.6373C24.4336 31.3721 24.301 31.0552 24.301 30.6869C24.301 30.3188 24.4188 30.0167 24.6545 29.781L31.1518 23.2837H9.22924C8.8462 23.2837 8.52945 23.1585 8.27898 22.908C8.02853 22.6576 7.90328 22.3408 7.90328 21.9578C7.90328 21.5747 8.02853 21.258 8.27898 21.0075C8.52945 20.7571 8.8462 20.6318 9.22924 20.6318H31.1518L24.6103 14.0904C24.3451 13.8252 24.2199 13.5159 24.2347 13.1623C24.2494 12.8087 24.3894 12.4993 24.6545 12.2341C24.9197 11.9984 25.2365 11.8805 25.6048 11.8805C25.9731 11.8805 26.2752 11.9984 26.5109 12.2341L35.3065 21.0296C35.4537 21.177 35.5568 21.3243 35.6157 21.4716C35.6746 21.6189 35.7043 21.781 35.7043 21.9578C35.7043 22.1346 35.6746 22.2966 35.6157 22.444C35.5568 22.5913 35.4537 22.7386 35.3065 22.886L26.5552 31.6373C26.2899 31.9025 25.9805 32.0351 25.6269 32.0351C25.2733 32.0351 24.9639 31.9025 24.6987 31.6373Z" />
      </svg>
    </span>
  );
}

type ButtonProps = ComponentProps<"button"> & { size?: ButtonSize };

export function Button({ size = "md", type = "button", className, children, ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(size, className)} {...props}>
      {children}
      <ButtonArrow size={size} />
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & { size?: ButtonSize };

export function ButtonLink({ size = "md", className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(size, className)} {...props}>
      {children}
      <ButtonArrow size={size} />
    </Link>
  );
}
