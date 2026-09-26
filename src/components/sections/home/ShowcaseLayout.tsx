import type { ReactNode } from "react";

type ShowcaseLayoutProps = {
  id?: string;
  headingId: string;
  title: string;
  titleAs?: "h1" | "h2";
  tabs: ReactNode;
  panelId: string;
  activeTabId: string;
  content: ReactNode;
  visual: ReactNode;
  className?: string;
};

export function ShowcaseLayout({
  id,
  headingId,
  title,
  titleAs: Title = "h2",
  tabs,
  panelId,
  activeTabId,
  content,
  visual,
  className = "",
}: ShowcaseLayoutProps) {
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`mx-auto max-w-280 scroll-mt-6 px-4 py-7.5 md:px-7.5 ${className}`}
    >
      <Title id={headingId} className="font-inter text-[48px] leading-14 font-bold tracking-[-1px] text-navy">
        {title}
      </Title>
      <div className="mt-8">{tabs}</div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={activeTabId}
        className="mt-6.5 flex flex-col gap-8 xl:h-129.25 xl:flex-row xl:gap-0"
      >
        <div className="xl:w-90 xl:shrink-0">{content}</div>
        <div className="xl:w-175">{visual}</div>
      </div>
    </section>
  );
}