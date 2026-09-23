import type { Metadata } from "next";
import { Process } from "@/components/sections/home/Process";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "How ORIK Webcraft takes your website from idea to online: discover, plan, design, develop, launch and support.",
};

export default function ProcessPage() {
  return (
    <main>
      <Process titleAs="h1" className="mt-15" />
    </main>
  );
}
