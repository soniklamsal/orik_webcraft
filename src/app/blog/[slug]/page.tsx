import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/StructuredData";
import { getBlogPost, getAllBlogSlugs } from "@/data/blog";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords.join(", "),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      url: `/blog/${post.slug}`,
    },
    authors: [{ name: post.author.name }],
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs 
        trail={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` }
        ]} 
      />
      
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": post.author.name,
              "jobTitle": post.author.role
            },
            "publisher": {
              "@type": "Organization",
              "name": "ORIK Webcraft",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.orikwebcraft.com/logos/brand/orik-webcraft.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.orikwebcraft.com/blog/${post.slug}`
            }
          })
        }}
      />

      <article className="mx-auto max-w-[900px] px-4 py-8 md:px-10">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-navy/70 hover:text-green-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-green-50 border border-green-200 px-4 py-1.5 text-sm font-semibold text-green-700">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-navy/60">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2 text-sm text-navy/60">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
          </div>

          <h1 className="mb-6 font-inter text-4xl font-bold leading-tight text-navy md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <p className="mb-8 text-xl leading-relaxed text-navy/70">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between border-y border-gray-200 py-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-navy/60" />
                  <span className="font-semibold text-navy">{post.author.name}</span>
                </div>
                <p className="text-sm text-navy/60">{post.author.role}</p>
              </div>
            </div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                  });
                }
              }}
              className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-green-600 hover:text-green-600"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </header>

        {/* Article Content */}
        <div 
          className="prose prose-lg prose-slate max-w-none
            prose-headings:font-inter prose-headings:font-bold prose-headings:text-navy
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-navy/80 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-navy prose-strong:font-bold
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
            prose-li:my-2 prose-li:text-navy/80
            prose-blockquote:border-l-4 prose-blockquote:border-green-600 prose-blockquote:pl-6 prose-blockquote:italic
            prose-code:text-green-600 prose-code:bg-green-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-navy/5 prose-pre:border prose-pre:border-gray-200"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />').replace(/## /g, '<h2>').replace(/### /g, '<h3>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/- (.*?)(<br \/>|$)/g, '<li>$1</li>') }}
        />

        {/* CTA Box */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-green-50 to-blue-50 p-8 md:p-12">
          <div className="text-center">
            <h2 className="mb-4 font-inter text-3xl font-bold text-navy">
              Ready to Build Your Website?
            </h2>
            <p className="mb-8 text-lg text-navy/70">
              Get a professional, SEO-optimized website for your Nepal business
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-block rounded-full bg-green-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl hover:scale-105"
              >
                Get Free Quote
              </Link>
              <Link
                href="/pricing"
                className="inline-block rounded-full border-2 border-green-600 px-8 py-4 font-semibold text-green-600 transition-all hover:bg-green-600 hover:text-white"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* Keywords for LLM Optimization */}
        <div className="mt-8 text-sm text-navy/40">
          <p>Keywords: {post.seo.keywords.join(", ")}</p>
        </div>
      </article>
    </>
  );
}
