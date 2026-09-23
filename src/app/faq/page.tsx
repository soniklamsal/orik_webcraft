import type { Metadata } from "next";
import { Faq } from "@/components/sections/home/Faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about website cost, mobile-friendly design, WhatsApp, chatbots, SEO and support from ORIK Webcraft.",
};

export default function FaqPage() {
  return (
    <main>
      <Faq titleAs="h1" className="mt-15" />
    </main>
  );
}
