/**
 * Fallback content used when the backend API is unreachable.
 * This ensures the site remains functional even if the backend is down.
 * 
 * Update this periodically to keep fallback data fresh.
 */

import type { SiteContent } from "./content";

export const FALLBACK_CONTENT: SiteContent = {
  site: {
    name: "ORIK Webcraft",
    description: "ORIK Webcraft builds modern websites, landing pages, chatbots and digital solutions that help businesses build credibility, reach customers and generate enquiries.",
    contact: {
      email: "orikwebcraft@gmail.com",
      phone: "+977 9842416371",
      location: "Kathmandu, Baneshwor",
    },
    socials: [
      { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/orik-webcraft" },
      { platform: "facebook", label: "Facebook", href: "https://www.facebook.com/orikwebcraft" },
      { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/orikwebcraft" },
      { platform: "whatsapp", label: "WhatsApp", href: "https://wa.me/9779842416371" },
    ],
  },
  hero: {
    heading: "Website design that works for your business.",
    subheading: "Modern websites, landing pages, chatbots and digital solutions designed to help businesses build credibility, reach customers and generate enquiries.",
    qualitiesLabel: "Every ORIK website is:",
    qualities: ["Mobile", "Fast", "Modern"],
    badges: [],
  },
  yourIdea: {
    heading: "We turn your idea into reality",
    subheading: "From concept to launch, we handle everything",
    benefits: [
      "Custom design tailored to your brand",
      "Responsive and mobile-friendly",
      "SEO optimized for better visibility",
      "Fast loading and performance",
    ],
  },
  digitalExperiences: {
    heading: "Digital experiences that drive results",
    subheading: "We create websites that convert visitors into customers",
  },
  industriesSection: {
    heading: "Industries we serve",
    subheading: "Specialized solutions for diverse sectors",
    footnotes: [],
  },
  footerTop: {
    cta: "Ready to get started?",
    ctaButton: "Contact Us",
  },
  footerBottom: {
    copyrightPrefix: "©",
    copyrightYear: new Date().getFullYear().toString(),
    links: [],
  },
  stats: [
    { label: "Projects Delivered", value: "50+", order: 0 },
    { label: "Happy Clients", value: "40+", order: 1 },
    { label: "Years Experience", value: "3+", order: 2 },
  ],
  problems: [],
  industries: [],
  projects: [],
  processSteps: [
    { title: "Consultation", description: "Understand your needs and goals", order: 0 },
    { title: "Design", description: "Create mockups and prototypes", order: 1 },
    { title: "Development", description: "Build your website", order: 2 },
    { title: "Launch", description: "Deploy and go live", order: 3 },
  ],
  packages: [],
  team: [
    {
      name: "Rohan Shah",
      role: "Founder & CEO",
      bio: "",
      photo: "https://res.cloudinary.com/dr54mqokd/image/upload/v1790863259/aflkdsf_gsqqqr.jpg",
      email: "rohaanshah040@gmail.com",
      whatsapp: "+977-9823757751",
      links: [
        { platform: "linkedin", url: "https://www.linkedin.com/in/rohan-shah" },
        { platform: "facebook", url: "https://www.facebook.com/rohan.shah" },
        { platform: "instagram", url: "https://www.instagram.com/rohan_shah" },
        { platform: "whatsapp", url: "https://wa.me/9779823757751" },
        { platform: "email", url: "mailto:rohaanshah040@gmail.com" },
      ],
    },
    {
      name: "Sonik Lamsal",
      role: "Co-Founder & CTO",
      bio: "",
      photo: "https://res.cloudinary.com/dr54mqokd/image/upload/v1790856602/Gemini_Generated_Image_qzpw7oqzpw7oqzpw_mkfzn5.jpg",
      email: "soniklamsal111@gmail.com",
      whatsapp: "+977-9842416371",
      links: [
        { platform: "linkedin", url: "https://www.linkedin.com/in/sonik-lamsal" },
        { platform: "facebook", url: "https://www.facebook.com/sonik.lamsal" },
        { platform: "instagram", url: "https://www.instagram.com/sonik_lamsal" },
        { platform: "whatsapp", url: "https://wa.me/9779842416371" },
        { platform: "email", url: "mailto:soniklamsal111@gmail.com" },
      ],
    },
    {
      name: "Subham Karki",
      role: "Co-Founder & Lead Designer",
      bio: "",
      photo: "",
      email: "subham@orikwebcraft.com",
      whatsapp: "+977-9842416371",
      links: [
        { platform: "linkedin", url: "https://www.linkedin.com/in/subham-karki" },
        { platform: "facebook", url: "https://www.facebook.com/subham.karki" },
        { platform: "instagram", url: "https://www.instagram.com/subham_karki" },
        { platform: "whatsapp", url: "https://wa.me/9779842416371" },
        { platform: "email", url: "mailto:subham@orikwebcraft.com" },
      ],
    },
  ],
  testimonials: [],
  faqs: [
    {
      question: "How long does it take to build a website?",
      answer: "It depends on the package and how quickly your content is ready. A one-page website is faster than a multi-page site, and we'll give you a clear timeline after the free consultation.",
      order: 0,
    },
    {
      question: "Do you offer website maintenance?",
      answer: "Yes, we provide ongoing maintenance and support packages to keep your website updated and secure.",
      order: 1,
    },
    {
      question: "Can you help with SEO?",
      answer: "Absolutely! All our websites are built with SEO best practices, and we offer additional SEO services to improve your search rankings.",
      order: 2,
    },
  ],
};
