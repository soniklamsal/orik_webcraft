/**
 * Site copy, served from the Django admin.
 *
 * The data in `src/data/home.ts` and `src/data/site.ts` stays in the bundle as
 * the fallback: if the API is unreachable the site still renders its current
 * copy rather than going blank. Mockup themes and navigation remain in code;
 * the API only names a theme by key.
 */

import {
  digitalExperiences,
  faqs,
  hero,
  industries,
  industriesSection,
  packages,
  problems,
  processSteps,
  projects,
  quickStats,
  team,
  testimonials,
  themes,
  yourIdea,
  type DigitalExperiences,
  type FaqItem,
  type Hero,
  type IndustriesSectionCopy,
  type Industry,
  type MockupTheme,
  type Problem,
  type ProcessStep,
  type Project,
  type Stat,
  type TeamMember,
  type Testimonial,
  type WebsitePackage,
  type YourIdea,
} from "@/data/home";
import { contactDetails, siteDescription, siteName, socialLinks, type ContactDetails, type SocialLink } from "@/data/site";

export type SiteContent = {
  site: { name: string; description: string; contact: ContactDetails; socials: SocialLink[] };
  hero: Hero;
  yourIdea: YourIdea;
  digitalExperiences: DigitalExperiences;
  industriesSection: IndustriesSectionCopy;
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

const FALLBACK: SiteContent = {
  site: { name: siteName, description: siteDescription, contact: contactDetails, socials: socialLinks },
  hero,
  yourIdea,
  digitalExperiences,
  industriesSection,
  stats: quickStats,
  problems,
  industries,
  projects,
  processSteps,
  packages,
  team,
  testimonials,
  faqs,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001";

/** Seconds before a page rechecks the API. Admin edits appear within this window. */
const REVALIDATE_SECONDS = 300;

type ThemeKey = keyof typeof themes;

/**
 * Templates come from the API as whole objects. A row with no template selected
 * falls back to a bundled design, matched on key where possible.
 */
function resolveTheme(template: MockupTheme | undefined | null): MockupTheme {
  if (template && template.name) return template;
  const key = (template as { key?: string } | null | undefined)?.key;
  return themes[key as ThemeKey] ?? themes.corporate;
}

function list<T>(value: unknown, fallback: T[]): T[] {
  // An empty array is a real answer (everything unpublished); a missing key is not.
  return Array.isArray(value) ? (value as T[]) : fallback;
}

type ApiIndustry = Omit<Industry, "theme"> & { template?: MockupTheme };
type ApiProject = Omit<Project, "theme"> & { template?: MockupTheme };

function shape(data: Record<string, unknown>): SiteContent {
  const site = (data.site ?? {}) as Partial<SiteContent["site"]>;
  const apiHero = (data.hero ?? {}) as Partial<Hero>;
  const apiIdea = (data.yourIdea ?? {}) as Partial<YourIdea>;
  const apiDigital = (data.digitalExperiences ?? {}) as Partial<DigitalExperiences>;
  const apiIndustries = (data.industriesSection ?? {}) as Partial<IndustriesSectionCopy>;

  return {
    site: {
      name: site.name || FALLBACK.site.name,
      description: site.description || FALLBACK.site.description,
      contact: site.contact ?? {},
      // A social link with no URL yet would render as a dead icon.
      socials: (site.socials ?? FALLBACK.site.socials).filter((link) => link.href && link.href !== "#"),
    },
    hero: {
      // Each field falls back on its own, so one blank box in the admin can't
      // wipe the headline.
      heading: apiHero.heading || FALLBACK.hero.heading,
      subheading: apiHero.subheading || FALLBACK.hero.subheading,
      qualitiesLabel: apiHero.qualitiesLabel || FALLBACK.hero.qualitiesLabel,
      qualities: apiHero.qualities?.length ? apiHero.qualities : FALLBACK.hero.qualities,
      image: apiHero.image || undefined,
      imageAlt: apiHero.imageAlt || undefined,
      badges: apiHero.badges ?? FALLBACK.hero.badges,
    },
    yourIdea: {
      heading: apiIdea.heading || FALLBACK.yourIdea.heading,
      closingText: apiIdea.closingText || FALLBACK.yourIdea.closingText,
      ctaLabel: apiIdea.ctaLabel || FALLBACK.yourIdea.ctaLabel,
      ctaHref: apiIdea.ctaHref || FALLBACK.yourIdea.ctaHref,
    },
    digitalExperiences: {
      heading: apiDigital.heading || FALLBACK.digitalExperiences.heading,
      linkLabel: apiDigital.linkLabel || FALLBACK.digitalExperiences.linkLabel,
      linkHref: apiDigital.linkHref || FALLBACK.digitalExperiences.linkHref,
    },
    industriesSection: {
      heading: apiIndustries.heading || FALLBACK.industriesSection.heading,
      linkLabel: apiIndustries.linkLabel || FALLBACK.industriesSection.linkLabel,
      linkHref: apiIndustries.linkHref || FALLBACK.industriesSection.linkHref,
      footnoteLabel: apiIndustries.footnoteLabel || FALLBACK.industriesSection.footnoteLabel,
      footnoteItems: apiIndustries.footnoteItems?.length
        ? apiIndustries.footnoteItems
        : FALLBACK.industriesSection.footnoteItems,
    },
    stats: list<Stat>(data.stats, FALLBACK.stats),
    problems: list<Problem>(data.problems, FALLBACK.problems),
    industries: list<ApiIndustry>(data.industries, []).length
      ? list<ApiIndustry>(data.industries, []).map(({ template, ...rest }) => ({ ...rest, theme: resolveTheme(template) }))
      : FALLBACK.industries,
    projects: list<ApiProject>(data.projects, []).length
      ? list<ApiProject>(data.projects, []).map(({ template, ...rest }) => ({ ...rest, theme: resolveTheme(template) }))
      : FALLBACK.projects,
    processSteps: list<ProcessStep>(data.processSteps, FALLBACK.processSteps),
    packages: list<WebsitePackage>(data.packages, FALLBACK.packages),
    team: list<TeamMember>(data.team, FALLBACK.team),
    testimonials: list<Testimonial>(data.testimonials, FALLBACK.testimonials),
    faqs: list<FaqItem>(data.faqs, FALLBACK.faqs),
  };
}

export async function getContent(): Promise<SiteContent> {
  try {
    const response = await fetch(`${API_URL}/api/content/`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) throw new Error(`API responded ${response.status}`);
    return shape(await response.json());
  } catch (error) {
    // Never fail a page render because the CMS is down.
    console.warn("[content] using bundled copy —", error instanceof Error ? error.message : error);
    return FALLBACK;
  }
}
