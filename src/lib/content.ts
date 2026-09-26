/**
 * Site copy, served live from the Django admin.
 *
 * There is deliberately no bundled fallback: if the API cannot be reached the
 * site says so, with the reason, rather than quietly serving stale copy that
 * hides a broken backend. Mockup designs still arrive as whole Template
 * objects from the API.
 */

import type {
  DigitalExperiences,
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

type ApiIndustry = Omit<Industry, "theme"> & { template?: MockupTheme | null };
type ApiProject = Omit<Project, "theme"> & { template?: MockupTheme | null };

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

function shape(data: Record<string, unknown>): SiteContent {
  const withTheme = <T extends { template?: MockupTheme | null }>(row: T) => {
    const { template, ...rest } = row;
    return { ...rest, theme: template ?? PLACEHOLDER_THEME };
  };

  return {
    ...(data as unknown as SiteContent),
    industries: ((data.industries ?? []) as ApiIndustry[]).map(withTheme) as Industry[],
    projects: ((data.projects ?? []) as ApiProject[]).map(withTheme) as Project[],
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

export async function getContent(): Promise<ContentResult> {
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
    console.error(`[content] ${described.summary} (${described.endpoint}) — ${described.detail}`);
    return { content: null, error: described };
  }
}

/**
 * For sections, which only render once their page has confirmed the API is
 * reachable. Within one render React reuses the same fetch, so this cannot
 * disagree with the check the page already made.
 */
export async function requireContent(): Promise<SiteContent> {
  const { content, error } = await getContent();
  if (!content) throw new Error(`${error.summary} ${error.detail}`);
  return content;
}
