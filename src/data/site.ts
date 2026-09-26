export const siteName = "ORIK Webcraft";

export const siteDescription =
  "ORIK Webcraft builds modern websites, landing pages, chatbots and digital solutions that help businesses build credibility, reach customers and generate enquiries.";

export type ContactDetails = {
  email?: string;
  phone?: string;
  location?: string;
};

export type SocialPlatform = "whatsapp" | "instagram" | "facebook" | "linkedin";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};
