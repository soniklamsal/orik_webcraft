import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/StructuredData";
import { TeamContent } from "./TeamContent";

export const metadata: Metadata = {
  title: "Meet Our Web Design Team",
  description:
    "Meet the talented team at ORIK Webcraft - Rohan Shah (Founder & CEO), Sonik Lamsal (Co-Founder & CTO), and Subham Karki (Lead Designer). Expert web designers and developers serving businesses worldwide.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Meet Our Web Design Team | ORIK Webcraft",
    description: "Meet the experts behind ORIK Webcraft - passionate web designers and developers dedicated to building exceptional websites.",
    url: "/team",
  },
};

export default function TeamPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Team", path: "/team" }]} />
      <TeamContent />
    </>
  );
}
