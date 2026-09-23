import Link from "next/link";

type LearnMoreLinkProps = {
  href: string;
  label: string;
  srLabel?: string;
  className?: string;
};

export function LearnMoreLink({ href, label, srLabel, className = "" }: LearnMoreLinkProps) {
  return (
    <Link
      href={href}
      className={`flex h-6 w-fit items-end gap-[5.02px] font-inter text-[18px] leading-6 text-primary ${className}`}
    >
      <span className="block h-5.75 border-b border-primary pr-2.5">
        {label}
        {srLabel && <span className="sr-only"> {srLabel}</span>}
      </span>
      <span aria-hidden="true" className="block w-4.5 font-arrow">
        →
      </span>
    </Link>
  );
}
