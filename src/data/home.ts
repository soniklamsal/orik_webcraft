export const heroHighlights = ["Mobile friendly", "Fast & modern", "Business focused"];

export type HeroBadgeIcon = "enquiries" | "whatsapp" | "mobile" | "seo" | "speed" | "target";

export type HeroBadge = {
  label: string;
  icon: HeroBadgeIcon;
};

export type Hero = {
  heading: string;
  subheading: string;
  qualitiesLabel: string;
  qualities: string[];
  /** Absolute URL of an uploaded image; empty means use the bundled one. */
  image?: string;
  imageAlt?: string;
  badges: HeroBadge[];
};

/** Fallback copy, used when the API is unreachable. */
export const hero: Hero = {
  heading: "We build websites that work for your business.",
  subheading:
    "Modern websites, landing pages, chatbots and digital solutions designed to help businesses build credibility, reach customers and generate enquiries.",
  qualitiesLabel: "Every ORIK website is:",
  qualities: ["Mobile", "Fast", "Modern"],
  badges: [
    { label: "More enquiries", icon: "enquiries" },
    { label: "WhatsApp ready", icon: "whatsapp" },
    { label: "Mobile ready", icon: "mobile" },
    { label: "SEO ready", icon: "seo" },
  ],
};

export type ReviewPlatform = {
  name: string;
  logo?: { src: string; width: number; height: number };
};

export type HeroReviews = {
  rating: number;
  count: string;
  platforms: ReviewPlatform[];
};

export const heroReviews: HeroReviews | null = null;

export type Stat = {
  value: string;
  label: string;
};

export type DigitalExperiences = {
  /** Newlines are preserved on wide screens. */
  heading: string;
  linkLabel: string;
  linkHref: string;
};

/** Fallback copy, used when the API is unreachable. */
export const digitalExperiences: DigitalExperiences = {
  heading: "Digital experiences built\nfor modern business.",
  linkLabel: "Get a free consultation",
  linkHref: "/contact",
};

export const quickStats: Stat[] = [
  { value: "10+", label: "projects and concepts" },
  { value: "5+", label: "industries served" },
  { value: "100%", label: "responsive websites" },
  { value: "24/7", label: "online presence for your business" },
  { value: "5+", label: "demo projects to explore" },
  { value: "6", label: "digital services under one roof" },
];

/** Chosen per card in the admin; mapped to a lucide icon in ProblemSolution. */
export type ProblemIcon = "search-x" | "history" | "message-circle-off" | "monitor-x" | "hourglass" | "triangle-alert";

export type Problem = {
  title: string;
  description: string;
  icon: ProblemIcon;
};

export type YourIdea = {
  /** Newlines are preserved on wide screens. */
  heading: string;
  /** Words from the heading to mark in yellow; empty means no highlight. */
  headingHighlight: string;
  closingText: string;
  ctaLabel: string;
  ctaHref: string;
};

/** Fallback copy, used when the API is unreachable. */
export const yourIdea: YourIdea = {
  heading: "Your business deserves more\nthan just a social media page.",
  headingHighlight: "social media page.",
  closingText:
    "We turn those problems into a simple digital experience that helps customers discover, understand and contact your business.",
  ctaLabel: "Get a free consultation",
  ctaHref: "/contact",
};

export const problems: Problem[] = [
  {
    title: "No website",
    icon: "search-x",
    description:
      "Customers search online first. Without a website they can't find you, so they find a competitor instead.",
  },
  {
    title: "Outdated website",
    icon: "history",
    description: "A slow or old-looking site makes a great business look unreliable, especially on a phone.",
  },
  {
    title: "Difficult to contact",
    icon: "message-circle-off",
    description: "If people can't quickly call, message or send an enquiry, they leave before they ever reach you.",
  },
];

export type MockupTheme = {
  name: string;
  domain: string;
  headline: string;
  subline: string;
  cta: string;
  nav: string[];
  cards: string[];
  accent: string;
  accentDark: string;
  soft: string;
};

export type MockupOverlay = "chat" | "whatsapp" | "maintenance";

// Demo mockups use the ORIK brand green (same values as the primary tokens in globals.css).
// Plain hex so the mockups can append alpha, e.g. `${accent}33`.
const brandGreen = {
  accent: "#008454",
  accentDark: "#00683e",
  soft: "#f0f8f5",
};

export const themes = {
  restaurant: {
    name: "Saffron Table",
    domain: "saffrontable.demo",
    headline: "Fresh flavours, served daily",
    subline: "Book a table or order online in seconds.",
    cta: "Book a table",
    nav: ["Menu", "Book", "Contact"],
    cards: ["Breakfast", "Lunch", "Dinner"],
    ...brandGreen,
  },
  corporate: {
    name: "Summit Group",
    domain: "summitgroup.demo",
    headline: "Business solutions that scale",
    subline: "Consulting and services for growing companies.",
    cta: "Talk to us",
    nav: ["About", "Services", "Careers"],
    cards: ["Strategy", "Operations", "Support"],
    ...brandGreen,
  },
  education: {
    name: "BrightPath Education",
    domain: "brightpath.demo",
    headline: "Study abroad with confidence",
    subline: "Guidance for courses, visas and applications.",
    cta: "Book a consultation",
    nav: ["Courses", "Countries", "Contact"],
    cards: ["Australia", "UK", "Canada"],
    ...brandGreen,
  },
  travel: {
    name: "Horizon Trails",
    domain: "horizontrails.demo",
    headline: "Plan your next adventure",
    subline: "Guided tours, treks and holidays made simple.",
    cta: "Explore tours",
    nav: ["Tours", "Destinations", "Contact"],
    cards: ["Trekking", "City tours", "Adventure"],
    ...brandGreen,
  },
  retail: {
    name: "Urban Thread",
    domain: "urbanthread.demo",
    headline: "New season, new styles",
    subline: "Shop the latest collection online.",
    cta: "Shop now",
    nav: ["Women", "Men", "Sale"],
    cards: ["Jackets", "Dresses", "Sneakers"],
    ...brandGreen,
  },
  realEstate: {
    name: "Keystone Realty",
    domain: "keystonerealty.demo",
    headline: "Find the home that fits your life",
    subline: "Apartments, houses and land in great locations.",
    cta: "View listings",
    nav: ["Buy", "Rent", "Agents"],
    cards: ["Apartments", "Houses", "Land"],
    ...brandGreen,
  },
  professional: {
    name: "Clarity Advisors",
    domain: "clarityadvisors.demo",
    headline: "Expert advice you can rely on",
    subline: "Accounting, tax and legal support for small businesses.",
    cta: "Schedule a call",
    nav: ["Services", "Team", "Insights"],
    cards: ["Accounting", "Tax", "Legal"],
    ...brandGreen,
  },
  local: {
    name: "Corner Bakery",
    domain: "cornerbakery.demo",
    headline: "Baked fresh every morning",
    subline: "Cakes, breads and coffee just around the corner.",
    cta: "Order now",
    nav: ["Menu", "Offers", "Visit"],
    cards: ["Cakes", "Breads", "Coffee"],
    ...brandGreen,
  },
} satisfies Record<string, MockupTheme>;

export type FooterTopPanel = {
  /** Newlines are preserved on wide screens. */
  heading: string;
  ctaLabel: string;
  ctaHref: string;
  /** Absolute URL of an uploaded image; empty means use the bundled one. */
  image?: string;
  imageAlt?: string;
};

export type FooterTop = {
  left: FooterTopPanel;
  right: FooterTopPanel & { eyebrow: string };
};

export type FooterMenuLink = {
  label: string;
  href: string;
};

export type FooterBottom = {
  menuLabel: string;
  menu: FooterMenuLink[];
  contactLabel: string;
  enquiryLabel: string;
  enquiryHref: string;
  /** Follows the year and the site name in the copyright line. */
  copyrightNote: string;
};

export type IndustriesSectionCopy = {
  heading: string;
  linkLabel: string;
  linkHref: string;
  footnoteLabel: string;
  footnoteItems: string[];
};

/** Fallback copy, used when the API is unreachable. */
export const industriesSection: IndustriesSectionCopy = {
  heading: "Built for businesses like yours.",
  linkLabel: "Start a project",
  linkHref: "/contact",
  footnoteLabel: "Every demo we build is",
  footnoteItems: heroHighlights,
};

export type Industry = {
  name: string;
  /** Supplied by the API; bundled fallback data derives it with industrySlug(). */
  slug?: string;
  pitch: string;
  features: string[];
  theme: MockupTheme;
};

/** "Restaurants & Cafes" -> "restaurants-cafes", used for /industries#<slug> links. */
export function industrySlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const industries: Industry[] = [
  {
    name: "Restaurants & Cafes",
    pitch: "Show your menu, take bookings and get found by hungry customers nearby.",
    features: ["Digital menu with photos", "Table booking and WhatsApp orders", "Google Maps and opening hours"],
    theme: themes.restaurant,
  },
  {
    name: "Corporate Businesses",
    pitch: "A credible website that builds trust with clients and partners.",
    features: [
      "Company profile and service pages",
      "Team and leadership sections",
      "Enquiry forms that reach the right people",
    ],
    theme: themes.corporate,
  },
  {
    name: "Education & Consultancies",
    pitch: "Help students understand your programs and book consultations with confidence.",
    features: ["Course and destination pages", "Consultation booking form", "Success stories and FAQs"],
    theme: themes.education,
  },
  {
    name: "Travel & Tourism",
    pitch: "Inspire travellers with beautiful tour pages and effortless enquiries.",
    features: ["Tour packages with itineraries", "Enquiry and booking forms", "Photo galleries and reviews"],
    theme: themes.travel,
  },
  {
    name: "Retail & E-commerce",
    pitch: "Sell online with a fast store that looks great on phones.",
    features: ["Product catalogue and categories", "Cart, checkout and payments", "Order updates on WhatsApp"],
    theme: themes.retail,
  },
  {
    name: "Real Estate",
    pitch: "Showcase listings with rich photos and let buyers contact agents instantly.",
    features: [
      "Property listings with filters",
      "Photo galleries and floor plans",
      "Agent contact and site-visit requests",
    ],
    theme: themes.realEstate,
  },
  {
    name: "Professional Services",
    pitch: "Build authority for your practice and make booking a call easy.",
    features: ["Service and expertise pages", "Appointment booking", "Client resources and insights"],
    theme: themes.professional,
  },
  {
    name: "Local Business",
    pitch: "Get discovered by people nearby and turn searches into calls and visits.",
    features: ["Google Maps and click-to-call", "Opening hours and offers", "WhatsApp enquiry button"],
    theme: themes.local,
  },
];

export type Project = {
  title: string;
  category: string;
  description: string;
  features: string[];
  theme: MockupTheme;
};

export const projects: Project[] = [
  {
    title: "Urban Thread",
    category: "E-commerce website",
    description: "An online clothing store concept with product categories, a cart and a mobile-first checkout.",
    features: ["Product catalogue", "Cart and checkout", "Mobile-first design"],
    theme: themes.retail,
  },
  {
    title: "BrightPath Education",
    category: "Education / Consultancy",
    description:
      "A consultancy website that guides students through courses and destinations and turns visits into consultations.",
    features: ["Course pages", "Consultation form", "FAQ section"],
    theme: themes.education,
  },
  {
    title: "Summit Group",
    category: "Corporate website",
    description: "A credible corporate website presenting services, team and expertise with clear enquiry paths.",
    features: ["Service pages", "Team profiles", "Lead capture"],
    theme: themes.corporate,
  },
];

export type ProcessStep = {
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Discover",
    description: "We learn about your business, customers and goals in a free consultation.",
  },
  {
    title: "Plan",
    description: "We map out pages, content and features, and agree on scope and timeline.",
  },
  {
    title: "Design",
    description: "We design a modern look for your brand and refine it with your feedback.",
  },
  {
    title: "Develop",
    description: "We build a fast, responsive website with forms, WhatsApp and the features you need.",
  },
  {
    title: "Launch",
    description: "We test everything, connect your domain and take your website live.",
  },
  {
    title: "Support",
    description: "We stay available for updates, fixes and improvements as your business grows.",
  },
];

export type WebsitePackage = {
  name: string;
  tagline: string;
  features: string[];
};

export const packages: WebsitePackage[] = [
  {
    name: "Starter",
    tagline: "For businesses getting online for the first time.",
    features: ["1-page business website", "Mobile-friendly design", "Contact section"],
  },
  {
    name: "Business",
    tagline: "For a complete, professional online presence.",
    features: ["4–6 page professional website", "Mobile-friendly design", "Contact form"],
  },
  {
    name: "Growth",
    tagline: "For businesses ready to turn visitors into enquiries.",
    features: ["Professional website", "WhatsApp integration", "Enquiry forms", "Basic SEO setup"],
  },
  {
    name: "Custom",
    tagline: "For businesses with special requirements.",
    features: ["Custom website", "Chatbot integration", "Special functionality"],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  business: string;
};

export const testimonials: Testimonial[] = [];

export type TeamSocial = {
  platform: "linkedin" | "facebook" | "instagram" | "whatsapp" | "email";
  href: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  links?: TeamSocial[];
};

/** Team lives in the database; this stays empty so the section hides if the API is down. */
export const team: TeamMember[] = [];

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "How long does it take to build a website?",
    answer:
      "It depends on the package and how quickly your content is ready. A one-page website is faster than a multi-page site, and we'll give you a clear timeline after the free consultation.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Every business has different needs, so we quote each project after understanding your goals. Choose a package and request a quote. The consultation is free.",
  },
  {
    question: "Will my website work on mobile phones?",
    answer: "Yes. Every website we build is responsive, so it looks and works great on phones, tablets and desktops.",
  },
  {
    question: "Can you add WhatsApp and a chatbot?",
    answer:
      "Yes. We can add WhatsApp click-to-chat buttons, enquiry flows and website chatbots so customers can reach you faster.",
  },
  {
    question: "Do you help with SEO?",
    answer:
      "Our Growth package includes a basic SEO setup, so search engines can understand your pages and customers can find you more easily.",
  },
  {
    question: "What happens after my website goes live?",
    answer:
      "We offer website maintenance and personal support for updates, fixes and content changes whenever you need them.",
  },
  {
    question: "What do I need to get started?",
    answer:
      "Just a short conversation about your business. If you have a logo, photos or text, great. If not, we'll guide you through what's needed.",
  },
];
