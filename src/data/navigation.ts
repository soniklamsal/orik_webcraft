import { industrySlug, projects } from "./home";

export type MegaIcon =
  | "website"
  | "ecommerce"
  | "landing"
  | "chatbot"
  | "whatsapp"
  | "maintenance"
  | "restaurant"
  | "corporate"
  | "education"
  | "travel"
  | "retail"
  | "realEstate"
  | "professional"
  | "local";

export type MegaLink = {
  label: string;
  description: string;
  href: string;
  icon?: MegaIcon;
};

const projectIcons: Record<string, MegaIcon> = {
  "BrightPath Education": "education",
  "Summit Group": "corporate",
  "Urban Thread": "ecommerce",
};

export type MegaFeature = {
  tone: "yellow" | "navy" | "tint";
  /** Decorative background art behind the card; matches the tone it sits on. */
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
};

export type MegaMenu = {
  title: string;
  description: string;
  links: MegaLink[];
  feature: MegaFeature;
  footer: { label: string; href: string };
};

export type NavLinkItem = {
  label: string;
  href: string;
};

export type NavItem = NavLinkItem & {
  menu?: MegaMenu;
};

export const primaryNav: NavItem[] = [
  {
    label: "Services",
    href: "/pricing",
    menu: {
      title: "Services",
      description: "Websites and digital tools that help customers find you and get in touch.",
      links: [
        {
          label: "Business Website",
          description: "Professional multi-page websites",
          href: "/pricing",
          icon: "website",
        },
        {
          label: "E-commerce",
          description: "Online stores with smooth checkout",
          href: "/pricing",
          icon: "ecommerce",
        },
        {
          label: "Landing Page",
          description: "Focused pages that capture leads",
          href: "/pricing",
          icon: "landing",
        },
        {
          label: "Chatbots",
          description: "Answer questions while you're busy",
          href: "/pricing",
          icon: "chatbot",
        },
        {
          label: "WhatsApp Integration",
          description: "Let customers reach you in one tap",
          href: "/pricing",
          icon: "whatsapp",
        },
        {
          label: "Website Maintenance",
          description: "Updates, fixes and backups",
          href: "/pricing",
          icon: "maintenance",
        },
      ],
      feature: {
        tone: "yellow",
        image: "/images/mega/services.svg",
        eyebrow: "Free consultation",
        title: "Not sure which service you need?",
        description: "Tell us about your business and we'll recommend the right package.",
        cta: { label: "Get a free consultation", href: "/contact" },
      },
      footer: { label: "Compare packages", href: "/pricing" },
    },
  },
  {
    label: "Industries",
    href: "/industries",
    menu: {
      title: "Industries",
      description: "Websites built around how your type of business wins customers.",
      links: [
        {
          label: "Restaurants & Cafes",
          description: "Menus, bookings and orders",
          href: `/industries?industry=${industrySlug("Restaurants & Cafes")}`,
          icon: "restaurant",
        },
        {
          label: "Corporate Businesses",
          description: "Credible company websites",
          href: `/industries?industry=${industrySlug("Corporate Businesses")}`,
          icon: "corporate",
        },
        {
          label: "Education & Consultancies",
          description: "Courses and consultations",
          href: `/industries?industry=${industrySlug("Education & Consultancies")}`,
          icon: "education",
        },
        {
          label: "Travel & Tourism",
          description: "Tours, treks and holidays",
          href: `/industries?industry=${industrySlug("Travel & Tourism")}`,
          icon: "travel",
        },
        {
          label: "Retail & E-commerce",
          description: "Stores that sell on mobile",
          href: `/industries?industry=${industrySlug("Retail & E-commerce")}`,
          icon: "retail",
        },
        {
          label: "Real Estate",
          description: "Listings and agent enquiries",
          href: `/industries?industry=${industrySlug("Real Estate")}`,
          icon: "realEstate",
        },
        {
          label: "Professional Services",
          description: "Build authority, book calls",
          href: `/industries?industry=${industrySlug("Professional Services")}`,
          icon: "professional",
        },
        {
          label: "Local Business",
          description: "Get found by people nearby",
          href: `/industries?industry=${industrySlug("Local Business")}`,
          icon: "local",
        },
      ],
      feature: {
        tone: "navy",
        image: "/images/mega/industries.svg",
        eyebrow: "Demo projects",
        title: "See websites we've designed",
        description: "E-commerce, education and corporate demos.",
        cta: { label: "View our work", href: "/work" },
      },
      footer: { label: "Start your project", href: "/contact" },
    },
  },
  {
    label: "Work",
    href: "/work",
    menu: {
      title: "Work",
      description: "Demo projects showing how we design for different businesses.",
      links: projects.map((project) => ({
        label: project.title,
        description: project.category,
        href: "/work",
        icon: projectIcons[project.title] ?? "website",
      })),
      feature: {
        tone: "tint",
        image: "/images/mega/work.svg",
        eyebrow: "Our process",
        title: "From idea to online in 6 steps",
        description: "Discover, plan, design, develop, launch and support.",
        cta: { label: "See how we work", href: "/process" },
      },
      footer: { label: "Start your project", href: "/contact" },
    },
  },
  { label: "Team", href: "/team" },
  { label: "Pricing", href: "/pricing" },
];

export const utilityNav: NavLinkItem[] = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];
