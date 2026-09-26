import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SiteStructuredData } from "@/components/seo/StructuredData";
import { SocialDock } from "@/components/layout/SocialDock";
import { Suspense } from "react";
import { FooterSkeleton } from "@/components/ui/Skeleton";
import { siteDescription, siteName } from "@/data/site";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";
const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});
const interArrow = localFont({
  src: "./fonts/inter-arrow.woff2",
  variable: "--font-inter-arrow",
  weight: "400",
  adjustFontFallback: false,
});
const manrope = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});
// Static on purpose. Awaiting the API here would block the document head, and
// nothing could stream until the backend answered — so no page could show a
// skeleton. Page content is still entirely live.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // No canonical here on purpose. A canonical set on the root layout is
  // inherited by every page, so each one declared itself a duplicate of the
  // homepage. Each page sets its own instead.
  // No title, url or description here: set on the layout they are inherited by
  // every page, so each one advertised the homepage's. Left out, Next fills
  // them from each page's own title, canonical and description.
  openGraph: {
    type: "website",
    siteName,
  },
  twitter: {
    card: "summary_large_image",
  },
  title: {
    default: `Website Design & Development Company | ${siteName}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${interArrow.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-helvetica text-navy" suppressHydrationWarning>
        <Suspense fallback={null}>
          <SiteStructuredData />
        </Suspense>
        <ScrollToTop />
        <Header />
        {children}
        <Suspense fallback={<FooterSkeleton />}>
          <Footer />
        </Suspense>
        {/* No fallback: the dock is an extra, not part of the page shell. */}
        <Suspense fallback={null}>
          <SocialDock />
        </Suspense>
      </body>
    </html>
  );
}