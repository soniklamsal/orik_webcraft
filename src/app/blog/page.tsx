import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/StructuredData";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Design & Development Blog",
  description:
    "Expert insights on web design, development, SEO, and digital marketing. Learn how to build better websites and grow your online presence.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Web Design & Development Blog | ORIK Webcraft",
    description: "Expert insights on web design, development, and digital marketing",
    url: "/blog",
  },
};

// Sample blog posts - replace with actual CMS/database later
const blogPosts = [
  {
    slug: "why-every-business-needs-website-2027",
    title: "Why Every Business Needs a Website in 2027",
    excerpt: "Discover why having a professional website is no longer optional for businesses in today's digital landscape.",
    date: "2027-01-15",
    category: "Business",
    readTime: "5 min read",
  },
  {
    slug: "seo-basics-beginners-guide",
    title: "SEO Basics: A Beginner's Guide to Search Engine Optimization",
    excerpt: "Learn the fundamentals of SEO and how to make your website more visible in search engine results.",
    date: "2027-01-10",
    category: "SEO",
    readTime: "8 min read",
  },
  {
    slug: "mobile-first-design-importance",
    title: "Why Mobile-First Design Matters More Than Ever",
    excerpt: "With mobile traffic surpassing desktop, mobile-first design is essential for business success.",
    date: "2027-01-05",
    category: "Design",
    readTime: "6 min read",
  },
  {
    slug: "whatsapp-business-integration",
    title: "How WhatsApp Business Integration Can Boost Your Sales",
    excerpt: "Learn how integrating WhatsApp into your website can improve customer engagement and drive sales.",
    date: "2026-12-28",
    category: "Marketing",
    readTime: "7 min read",
  },
  {
    slug: "website-speed-optimization-tips",
    title: "10 Website Speed Optimization Tips That Actually Work",
    excerpt: "Practical tips to make your website load faster and improve user experience and SEO rankings.",
    date: "2026-12-20",
    category: "Performance",
    readTime: "10 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Blog", path: "/blog" }]} />
      <main className="mx-auto max-w-300 px-4 py-20 md:px-10">
        <div className="mb-12 text-center">
          <h1 className="font-inter text-5xl font-bold text-navy">Web Design Blog</h1>
          <p className="mt-4 text-lg text-navy/72">
            Expert insights on web design, development, and digital marketing
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            >
              <div className="flex-1 p-6">
                <div className="mb-3 flex items-center gap-3 text-sm">
                  <span className="rounded-full bg-green-50 px-3 py-1 font-medium text-green-700">
                    {post.category}
                  </span>
                  <span className="text-navy/60">{post.readTime}</span>
                </div>
                <h2 className="mb-3 font-inter text-xl font-bold text-navy group-hover:text-green-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="mb-4 text-navy/72 leading-relaxed">
                  {post.excerpt}
                </p>
                <time className="text-sm text-navy/60">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="border-t border-gray-100 px-6 py-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 font-semibold text-green-600 hover:text-green-700 transition-colors"
                >
                  Read Article
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-green-50 p-8 text-center">
          <h2 className="mb-3 font-inter text-2xl font-bold text-navy">
            Want to stay updated?
          </h2>
          <p className="mb-6 text-navy/72">
            Subscribe to our newsletter for the latest web design tips and industry insights.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-green-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-green-700"
          >
            Get in Touch
          </Link>
        </div>
      </main>
    </>
  );
}
