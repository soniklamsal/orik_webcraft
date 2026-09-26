import { getContent } from "@/lib/content";
import { SITE_URL } from "@/lib/site-url";

export const ORGANISATION_ID = `${SITE_URL}/#organisation`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Serialises to JSON-LD. `<` is escaped so a stray "</script>" inside any
 * admin-entered text cannot close the tag and inject markup.
 */
function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/**
 * Drops empty values. Search engines treat a property with an empty string as
 * a claim about the business, so an unfilled admin field must be absent
 * rather than blank.
 */
function compact<T extends Record<string, unknown>>(input: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => {
      if (value == null || value === "") return false;
      return !(Array.isArray(value) && value.length === 0);
    }),
  ) as Partial<T>;
}

/**
 * The business itself, on every page. Nothing here is invented: each field is
 * either a constant of the site or something filled in through the admin, so
 * an empty Site settings simply yields a smaller graph.
 *
 * Deliberately no aggregateRating — inventing review scores is a policy
 * violation that earns a manual action, and there are no real reviews yet.
 */
export async function SiteStructuredData() {
  const { content } = await getContent();
  if (!content) return null;

  const { name, description, contact, socials } = content.site;

  const organisation = compact({
    "@type": "ProfessionalService",
    "@id": ORGANISATION_ID,
    name,
    url: SITE_URL,
    description,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logos/brand/orik-webcraft.png` },
    image: `${SITE_URL}/logos/brand/orik-webcraft.png`,
    email: contact.email,
    telephone: contact.phone,
    address: compact({
      "@type": "PostalAddress",
      addressCountry: "NP",
      addressLocality: contact.location,
    }),
    areaServed: { "@type": "Country", name: "Nepal" },
    knowsAbout: [
      "Website design",
      "Website development",
      "Landing pages",
      "E-commerce websites",
      "Chatbots",
      "Search engine optimisation",
    ],
    sameAs: socials.map((link) => link.href),
  });

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name,
    inLanguage: "en",
    publisher: { "@id": ORGANISATION_ID },
  };

  return <JsonLd data={{ "@context": "https://schema.org", "@graph": [organisation, website] }} />;
}

/** The trail Google prints under a result instead of a bare URL. */
export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: `${SITE_URL}${crumb.path}`,
        })),
      }}
    />
  );
}

/** What is actually for sale, tied back to the business. */
export function ServiceCatalogue({ packages }: { packages: { name: string; tagline: string; features: string[] }[] }) {
  if (packages.length === 0) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        name: "Website packages",
        url: `${SITE_URL}/pricing`,
        provider: { "@id": ORGANISATION_ID },
        // No price: every project is quoted after a consultation, and a made-up
        // figure in the markup would be a mismatch with the page.
        itemListElement: packages.map((pkg, index) => ({
          "@type": "Offer",
          position: index + 1,
          priceCurrency: "NPR",
          availability: "https://schema.org/InStock",
          itemOffered: compact({
            "@type": "Service",
            name: pkg.name,
            description: pkg.tagline,
            serviceType: pkg.features.join(", "),
            provider: { "@id": ORGANISATION_ID },
          }),
        })),
      }}
    />
  );
}

/**
 * Google retired FAQ rich results in May 2026, so this earns no snippet. It is
 * kept because the markup is still parsed to understand what the page covers,
 * and other engines still read it.
 */
export function FaqStructuredData({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (faqs.length === 0) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }}
    />
  );
}
