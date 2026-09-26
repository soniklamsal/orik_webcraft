import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    url: "/",
    title: `${siteName} | Websites that work for your business`,
    description: siteDescription,
  },
  title: {
    default: `${siteName} | Websites that work for your business`,
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
        <ScrollToTop />
        <Header />
        {children}
        <Suspense fallback={<FooterSkeleton />}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}