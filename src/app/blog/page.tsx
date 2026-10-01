import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/StructuredData";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Web Design & SEO Blog Nepal | Expert Tips 2027",
  description:
    "Expert insights on website design, SEO, pricing, and digital marketing in Nepal. Learn how to build better websites and grow your online presence.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Web Design & SEO Blog Nepal | ORIK Webcraft",
    description: "Expert insights on web design, development, SEO and digital marketing for Nepal businesses",
    url: "/blog",
  },
};

const categoryColors: Record<string, string> = {
  Pricing: "bg-purple-50 text-purple-700 border-purple-200",
  SEO: "bg-blue-50 text-blue-700 border-blue-200",
  Design: "bg-pink-50 text-pink-700 border-pink-200",
  Marketing: "bg-orange-50 text-orange-700 border-orange-200",
  Performance: "bg-green-50 text-green-700 border-green-200",
};

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <>
      <Breadcrumbs trail={[{ name: "Blog", path: "/blog" }]} />
      <main className="mx-auto max-w-[1200px] px-4 py-16 md:px-10">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-green-50 px-4 py-1.5 text-sm font-semibold text-green-700">
            Latest Insights
          </div>
          <h1 className="mb-4 font-inter text-4xl font-bold leading-tight text-navy md:text-5xl lg:text-6xl">
            Web Design & SEO Blog
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-navy/70">
            Expert guides on website design costs, SEO strategies, and digital marketing for Nepal businesses
          </p>
        </div>

        {/* Featured Post */}
        <Link href={`/blog/${featuredPost.slug}`} className="group mb-16 block">
          <article className="overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 via-white to-blue-50 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
            <div className="grid gap-8 p-8 md:grid-cols-2 md:p-12">
              <div className="flex flex-col justify-center">
                <div className="mb-4 flex items-center gap-3">
                  <span className={`inline-block rounded-full border px-4 py-1.5 text-sm font-semibold ${categoryColors[featuredPost.category] || "bg-gray-50 text-gray-700 border-gray-200"}`}>
                    {featuredPost.category}
                  </span>
                  <span className="text-sm text-navy/60">Featured</span>
                </div>
                <h2 className="mb-4 font-inter text-3xl font-bold text-navy group-hover:text-green-600 transition-colors md:text-4xl">
                  {featuredPost.title}
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-navy/70">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-navy/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(featuredPost.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 font-semibold text-green-600 group-hover:gap-3 transition-all">
                    Read Full Guide
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-green-400 to-blue-500 md:h-full">
                  <div className="flex h-full items-center justify-center p-8 text-center text-white">
                    <div>
                      <div className="mb-4 text-6xl font-bold opacity-90">#{1}</div>
                      <div className="text-xl font-semibold opacity-90">Most Popular Guide</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Link>

        {/* Other Posts Grid */}
        <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {otherPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1">
                <div className="flex-1 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${categoryColors[post.category] || "bg-gray-50 text-gray-700 border-gray-200"}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-navy/50">{post.readTime}</span>
                  </div>
                  <h3 className="mb-3 font-inter text-xl font-bold leading-tight text-navy group-hover:text-green-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-navy/70">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-navy/60">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div className="border-t border-gray-100 px-6 py-4">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 group-hover:gap-3 transition-all">
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="rounded-3xl bg-gradient-to-r from-green-600 to-blue-600 p-8 text-center text-white shadow-lg md:p-12">
          <h2 className="mb-4 font-inter text-3xl font-bold">
            Need Help With Your Website?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Get expert advice on website design, SEO, and digital marketing for your Nepal business
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-block rounded-full bg-white px-8 py-4 font-semibold text-green-600 shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/pricing"
              className="inline-block rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white hover:text-green-600"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
