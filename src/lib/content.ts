/**
 * Site copy, served live from the Django admin.
 *
 * When the API cannot be reached, fallback content is served to ensure
 * the site remains functional. A warning is logged to the console.
 */

import { cache } from "react";
import { FALLBACK_CONTENT } from "./fallback-content";
import type {
  DigitalExperiences,
  FooterBottom,
  FooterTop,
  FaqItem,
  Hero,
  IndustriesSectionCopy,
  Industry,
  MockupTheme,
  Problem,
  ProcessStep,
  Project,
  Stat,
  TeamMember,
  Testimonial,
  WebsitePackage,
  YourIdea,
} from "@/data/home";
import type { ContactDetails, SocialLink } from "@/data/site";

export type SiteContent = {
  site: { name: string; description: string; contact: ContactDetails; socials: SocialLink[] };
  hero: Hero;
  yourIdea: YourIdea;
  digitalExperiences: DigitalExperiences;
  industriesSection: IndustriesSectionCopy;
  footerTop: FooterTop;
  footerBottom: FooterBottom;
  stats: Stat[];
  problems: Problem[];
  industries: Industry[];
  projects: Project[];
  processSteps: ProcessStep[];
  packages: WebsitePackage[];
  team: TeamMember[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
};

export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001").replace(/\/$/, "");
export const CONTENT_ENDPOINT = `${API_URL}/api/content/`;

/** Long enough for a sleeping free-tier backend to wake, short enough to fail visibly. */
const TIMEOUT_MS = 45_000;

export type ContentResult =
  | { content: SiteContent; error: null }
  | { content: null; error: ContentError };

export type ContentError = {
  /** One line a non-developer can act on. */
  summary: string;
  /** The underlying technical reason. */
  detail: string;
  endpoint: string;
};

/** A row with no template selected still has to render something. */
const PLACEHOLDER_THEME: MockupTheme = {
  name: "Demo",
  domain: "demo.site",
  headline: "A website for your business",
  subline: "Pick a template in the admin to change this preview.",
  cta: "Get in touch",
  nav: ["Home", "About", "Contact"],
  cards: ["One", "Two", "Three"],
  accent: "#008454",
  accentDark: "#00683e",
  soft: "#f0f8f5",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Merge API fields without allowing null/undefined values to erase defaults. */
function mergeDefined<T>(fallback: T, value: unknown): T {
  if (!isRecord(value)) return fallback;

  const defined = Object.fromEntries(Object.entries(value).filter(([, item]) => item !== null && item !== undefined));
  return { ...fallback, ...defined } as T;
}

function arrayOrFallback<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) && value.length > 0 ? (value as T[]) : fallback;
}

function identity(value: unknown): string | undefined {
  if (!isRecord(value)) return undefined;
  const name = value.name ?? value.title;
  return typeof name === "string" ? name : undefined;
}

/** Keep valid API rows, filling omitted fields from the matching local row. */
function normalizeRows<T extends object>(value: unknown, fallback: T[]): T[] {
  const source = arrayOrFallback(value, fallback);

  return source.map((item, index) => {
    const key = identity(item);
    const base =
      (key ? fallback.find((candidate) => identity(candidate) === key) : undefined) ??
      fallback[index] ??
      fallback[0];

    return mergeDefined(base, item);
  });
}

function normalizeMockupRows<T extends { theme: MockupTheme }>(value: unknown, fallback: T[]): T[] {
  return normalizeRows(value, fallback).map((row) => {
    const record = row as T & { template?: unknown };
    const template = isRecord(record.template)
      ? record.template
      : isRecord(record.theme)
        ? record.theme
        : undefined;

    return {
      ...row,
      theme: mergeDefined(row.theme ?? PLACEHOLDER_THEME, template),
    };
  });
}

function shape(data: unknown): SiteContent {
  if (!isRecord(data)) throw new Error("The content service returned an invalid payload.");

  const site = mergeDefined(FALLBACK_CONTENT.site, data.site);
  const siteRecord = isRecord(data.site) ? data.site : {};
  const hero = mergeDefined(FALLBACK_CONTENT.hero, data.hero);
  const heroRecord = isRecord(data.hero) ? data.hero : {};
  const industriesSection = mergeDefined(FALLBACK_CONTENT.industriesSection, data.industriesSection);
  const footerTop = mergeDefined(FALLBACK_CONTENT.footerTop, data.footerTop);
  const footerTopRecord = isRecord(data.footerTop) ? data.footerTop : {};
  const footerBottom = mergeDefined(FALLBACK_CONTENT.footerBottom, data.footerBottom);

  return {
    site: {
      ...site,
      contact: mergeDefined(FALLBACK_CONTENT.site.contact, siteRecord.contact),
      socials: arrayOrFallback(siteRecord.socials, FALLBACK_CONTENT.site.socials),
    },
    hero: {
      ...hero,
      qualities: arrayOrFallback(heroRecord.qualities, FALLBACK_CONTENT.hero.qualities),
      badges: arrayOrFallback(heroRecord.badges, FALLBACK_CONTENT.hero.badges),
    },
    yourIdea: mergeDefined(FALLBACK_CONTENT.yourIdea, data.yourIdea),
    digitalExperiences: mergeDefined(FALLBACK_CONTENT.digitalExperiences, data.digitalExperiences),
    industriesSection: {
      ...industriesSection,
      footnoteItems: arrayOrFallback(
        isRecord(data.industriesSection) ? data.industriesSection.footnoteItems : undefined,
        FALLBACK_CONTENT.industriesSection.footnoteItems,
      ),
    },
    footerTop: {
      ...footerTop,
      left: mergeDefined(FALLBACK_CONTENT.footerTop.left, footerTopRecord.left),
      right: mergeDefined(FALLBACK_CONTENT.footerTop.right, footerTopRecord.right),
    },
    footerBottom: {
      ...footerBottom,
      menu: arrayOrFallback(
        isRecord(data.footerBottom) ? data.footerBottom.menu : undefined,
        FALLBACK_CONTENT.footerBottom.menu,
      ),
    },
    stats: normalizeRows(data.stats, FALLBACK_CONTENT.stats),
    problems: normalizeRows(data.problems, FALLBACK_CONTENT.problems),
    industries: normalizeMockupRows(data.industries, FALLBACK_CONTENT.industries),
    projects: normalizeMockupRows(data.projects, FALLBACK_CONTENT.projects),
    processSteps: normalizeRows(data.processSteps, FALLBACK_CONTENT.processSteps),
    packages: normalizeRows(data.packages, FALLBACK_CONTENT.packages),
    team: normalizeRows(data.team, FALLBACK_CONTENT.team),
    testimonials: normalizeRows(data.testimonials, FALLBACK_CONTENT.testimonials),
    faqs: normalizeRows(data.faqs, FALLBACK_CONTENT.faqs),
  };
}

/** Next marks its bail-out error with this digest; it must not be caught. */
function isDynamicUsage(error: unknown): boolean {
  return typeof (error as { digest?: unknown })?.digest === "string" &&
    (error as { digest: string }).digest === "DYNAMIC_SERVER_USAGE";
}

function describe(error: unknown): ContentError {
  const endpoint = CONTENT_ENDPOINT;

  if (error instanceof DOMException && error.name === "TimeoutError") {
    return {
      summary: `The content service did not answer within ${TIMEOUT_MS / 1000} seconds.`,
      detail: "On a free hosting plan the server sleeps when idle and can take a while to wake. Reloading often fixes it.",
      endpoint,
    };
  }

  if (error instanceof Error && error.message.startsWith("HTTP ")) {
    return {
      summary: `The content service replied with an error (${error.message.slice(5)}).`,
      detail: "The server is reachable but could not serve the content. Check its logs.",
      endpoint,
    };
  }

  return {
    summary: "The content service could not be reached.",
    detail:
      error instanceof Error
        ? `${error.message}. Check that the API is running and that NEXT_PUBLIC_API_URL points at it.`
        : "Check that the API is running and that NEXT_PUBLIC_API_URL points at it.",
    endpoint,
  };
}

async function loadContent(): Promise<ContentResult> {
  try {
    const response = await fetch(CONTENT_ENDPOINT, {
      // Always live: an edit in the admin shows on the next page load.
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`.trim());

    return { content: shape(await response.json()), error: null };
  } catch (error) {
    // Next signals "this route cannot be static" by throwing through fetch.
    // That is control flow, not a failure: swallowing it breaks the build.
    if (isDynamicUsage(error)) throw error;

    const described = describe(error);
    console.warn(
      `[content] Backend unavailable: ${described.summary} (${described.endpoint})\n` +
      `Using fallback content. ${described.detail}`
    );
    
    // Return fallback content instead of failing. Every section can therefore
    // render even when the backend is asleep, unavailable, or malformed.
    return { content: FALLBACK_CONTENT, error: null };
  }
}

// All homepage sections request the same content. React cache deduplicates
// those calls for one render, so sections cannot disagree about the source.
export const getContent = cache(loadContent);

/**
 * For sections, which only render once their page has confirmed the API is
 * reachable. Within one render React reuses the same fetch, so this cannot
 * disagree with the check the page already made.
 */
export async function requireContent(): Promise<SiteContent> {
  const { content } = await getContent();
  return content ?? FALLBACK_CONTENT;
}
