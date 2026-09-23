import type { Metadata } from "next";
import { Portfolio } from "@/components/sections/home/Portfolio";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Demo websites by ORIK Webcraft for an online store, an education consultancy and a corporate business.",
};

export default function WorkPage() {
  return (
    <main>
      <Portfolio titleAs="h1" className="mt-15" />
    </main>
  );
}