/**
 * Fallback content used when the backend API is unreachable.
 * This ensures the site remains functional even if the backend is down.
 * 
 * Update this periodically to keep fallback data fresh.
 */

import type { SiteContent } from "./content";
import {
  faqs as defaultFaqs,
  hero as defaultHero,
  industries as defaultIndustries,
  packages as defaultPackages,
  processSteps as defaultProcessSteps,
  problems as defaultProblems,
  projects as defaultProjects,
} from "@/data/home";

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
    ...defaultHero,
    heading: "Website design that works for your business.",
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
    footnoteLabel: "Every demo we build is",
    footnoteItems: ["Mobile friendly", "Fast & modern", "Business focused"],
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
    menu: [
      { label: "Home", href: "/" },
      { label: "Industries", href: "/industries" },
      { label: "Our work", href: "/work" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQs", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
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
  problems: defaultProblems,
  industries: defaultIndustries,
  projects: defaultProjects,
  processSteps: defaultProcessSteps,
  packages: defaultPackages,
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
  testimonials: [
    {
      quote: "ORIK made our business look professional online and gave customers an easy way to reach us.",
      name: "Aarav Sharma",
      business: "Local business owner",
    },
    {
      quote: "The process was clear from the first call. We had a fast, mobile-friendly website ready to share.",
      name: "Maya Gurung",
      business: "Consultancy founder",
    },
    {
      quote: "The new site explains what we do quickly and brings our enquiries into one place.",
      name: "Nabin Thapa",
      business: "Service business owner",
    },
  ],
  faqs: defaultFaqs,
};
