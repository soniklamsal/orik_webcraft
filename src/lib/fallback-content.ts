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
    heading: "Your business deserves more\nthan just a social media page.",
    headingHighlight: "social media page.",
    closingText: "We turn those problems into a simple digital experience that helps customers discover, understand and contact your business.",
    ctaLabel: "Get a free consultation",
    ctaHref: "/contact",
  },
  digitalExperiences: {
    heading: "Digital experiences built\nfor modern business.",
    linkLabel: "Get a free consultation",
    linkHref: "/contact",
  },
  industriesSection: {
    heading: "Built for businesses like yours.",
    linkLabel: "See all industries",
    linkHref: "/industries",
    footnoteLabel: "Industries",
    footnoteItems: [],
  },
  footerTop: {
    left: {
      heading: "Ready to get started?",
      ctaLabel: "Get a free consultation",
      ctaHref: "/contact",
    },
    right: {
      eyebrow: "Or explore",
      heading: "See what we can build\nfor your business.",
      ctaLabel: "View our work",
      ctaHref: "/work",
    },
  },
  footerBottom: {
    menuLabel: "Menu",
    menu: [],
    contactLabel: "Contact",
    enquiryLabel: "Send enquiry",
    enquiryHref: "/contact",
    copyrightNote: "All rights reserved.",
  },
  stats: [
    { label: "Projects Delivered", value: "50+" },
    { label: "Happy Clients", value: "40+" },
    { label: "Years Experience", value: "3+" },
  ],
  problems: [],
  industries: [],
  projects: [],
  processSteps: [
    { title: "Consultation", description: "Understand your needs and goals" },
    { title: "Design", description: "Create mockups and prototypes" },
    { title: "Development", description: "Build your website" },
    { title: "Launch", description: "Deploy and go live" },
  ],
  packages: [],
  team: [
    {
      name: "Rohan Shah",
      role: "Founder & CEO",
      bio: "",
      photo: "https://res.cloudinary.com/dr54mqokd/image/upload/v1790863259/aflkdsf_gsqqqr.jpg",
      links: [
        { platform: "linkedin", href: "https://www.linkedin.com/in/rohan-shah" },
        { platform: "facebook", href: "https://www.facebook.com/rohan.shah" },
        { platform: "instagram", href: "https://www.instagram.com/rohan_shah" },
        { platform: "whatsapp", href: "https://wa.me/9779823757751" },
        { platform: "email", href: "mailto:rohaanshah040@gmail.com" },
      ],
    },
    {
      name: "Sonik Lamsal",
      role: "Co-Founder & CTO",
      bio: "",
      photo: "https://res.cloudinary.com/dr54mqokd/image/upload/v1790856602/Gemini_Generated_Image_qzpw7oqzpw7oqzpw_mkfzn5.jpg",
      links: [
        { platform: "linkedin", href: "https://www.linkedin.com/in/sonik-lamsal" },
        { platform: "facebook", href: "https://www.facebook.com/sonik.lamsal" },
        { platform: "instagram", href: "https://www.instagram.com/sonik_lamsal" },
        { platform: "whatsapp", href: "https://wa.me/9779842416371" },
        { platform: "email", href: "mailto:soniklamsal111@gmail.com" },
      ],
    },
    {
      name: "Subham Karki",
      role: "Co-Founder & Lead Designer",
      bio: "",
      photo: "",
      links: [
        { platform: "linkedin", href: "https://www.linkedin.com/in/subham-karki" },
        { platform: "facebook", href: "https://www.facebook.com/subham.karki" },
        { platform: "instagram", href: "https://www.instagram.com/subham_karki" },
        { platform: "whatsapp", href: "https://wa.me/9779842416371" },
        { platform: "email", href: "mailto:subham@orikwebcraft.com" },
      ],
    },
  ],
  testimonials: [],
  faqs: [
    {
      question: "How long does it take to build a website?",
      answer: "It depends on the package and how quickly your content is ready. A one-page website is faster than a multi-page site, and we'll give you a clear timeline after the free consultation.",
    },
    {
      question: "Do you offer website maintenance?",
      answer: "Yes, we provide ongoing maintenance and support packages to keep your website updated and secure.",
    },
    {
      question: "Can you help with SEO?",
      answer: "Absolutely! All our websites are built with SEO best practices, and we offer additional SEO services to improve your search rankings.",
    },
  ],
};