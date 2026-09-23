"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PillTabs } from "@/components/ui/PillTabs";
import { MockupStage } from "@/components/ui/SiteMockup";
import { heroHighlights, industrySlug, type Industry } from "@/data/home";
import { ShowcaseLayout } from "./ShowcaseLayout";

type IndustriesTabsProps = {
  industries: Industry[];
  titleAs?: "h1" | "h2";
  className?: string;
  /** Slug of the tab to open, e.g. "real-estate" from a mega-menu link. */
  initialSlug?: string;
};

export function IndustriesTabs({ industries, titleAs = "h2", className = "mt-15", initialSlug }: IndustriesTabsProps) {
  // findIndex returns -1 for an unknown slug, which falls back to the first tab.
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(
      0,
      industries.findIndex((item) => (item.slug ?? industrySlug(item.name)) === initialSlug),
    ),
  );
  const industry = industries[activeIndex];

  return (
    <ShowcaseLayout
      id="industries"
      headingId="industries-heading"
      title="Built for businesses like yours."
      titleAs={titleAs}
      className={className}
      panelId="industries-panel"
      activeTabId={`industries-tab-${activeIndex}`}
      tabs={
        <PillTabs
          label="Industries"
          labels={industries.map((item) => item.name)}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
          idPrefix="industries-tab"
          panelId="industries-panel"
        />
      }
      content={
        <div className="pt-7.5 pl-3">
          <p className="max-w-80 text-[18px] leading-6 text-navy/70">{industry.pitch}</p>
          <ul className="mt-6 flex flex-col gap-4">
            {industry.features.map((feature) => (
              <li key={feature} className="relative pl-9.5 text-[18px] leading-6 text-navy/60">
                <Check aria-hidden className="absolute top-0.5 left-1.5 size-4.5 text-navy" strokeWidth={2.5} />
                {feature}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="mt-8.25 ml-1.75 block w-fit text-[18px] leading-6 text-primary">
            Start a project<span className="sr-only"> for {industry.name}</span> →
          </Link>
          <div className="mt-12 ml-1">
            <p className="text-[18px] leading-6 tracking-[-0.25px] text-navy/60">Every demo we build is</p>
            <p className="mt-3.5 text-[16px] leading-6 text-navy">{heroHighlights.join(" · ")}</p>
          </div>
        </div>
      }
      visual={<MockupStage theme={industry.theme} />}
    />
  );
}
