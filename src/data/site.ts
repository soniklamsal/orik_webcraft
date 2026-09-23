export const siteName = "ORIK Webcraft";

export const siteDescription =
  "ORIK Webcraft builds modern websites, landing pages, chatbots and digital solutions that help businesses build credibility, reach customers and generate enquiries.";

export type ContactDetails = {
  email?: string;
  phone?: string;
  location?: string;
};

// Fill these in to show them in the footer; empty fields stay hidden.
export const contactDetails: ContactDetails = {};

export type SocialPlatform = "twitter" | "facebook" | "youtube" | "linkedin" | "medium";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

// Replace "#" with your profile URLs.
export const socialLinks: SocialLink[] = [
  { platform: "twitter", label: "Twitter", href: "#" },
  { platform: "facebook", label: "Facebook", href: "#" },
  { platform: "youtube", label: "YouTube", href: "#" },
  { platform: "linkedin", label: "LinkedIn", href: "#" },
  { platform: "medium", label: "Medium", href: "#" },
];