import type { Metadata } from "next";
import { Pricing } from "@/components/sections/home/Pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Website packages from ORIK Webcraft: Starter, Business, Growth and Custom. Every project is quoted after a free consultation.",
};

export default function PricingPage() {
  return (
    <main>
      <Pricing titleAs="h1" className="mt-15" />
    </main>
  );
}
