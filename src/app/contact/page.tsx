import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/home/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell ORIK Webcraft about your project and we'll recommend the right website package for your business.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactSection titleAs="h1" className="mt-15" />
    </main>
  );
}
