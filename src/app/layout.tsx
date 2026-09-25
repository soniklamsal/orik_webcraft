import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { getContent } from "@/lib/content";
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

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  return {
    // Makes canonical and Open Graph URLs absolute against the live domain.
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: site.name,
      url: "/",
      title: `${site.name} | Websites that work for your business`,
      description: site.description,
    },
    title: {
      default: `${site.name} | Websites that work for your business`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
  };
}

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
        <Footer />
      </body>
    </html>
  );
}
