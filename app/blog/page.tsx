import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { articles } from "@/lib/blog/articles";
import { BlogArticleCard } from "@/components/blog-article-card";

export const metadata: Metadata = {
  title: "Blog — Veristiq | Prize Draw Compliance & Industry Insights",
  description:
    "Expert insights on prize draw compliance, DCMS regulations, transparency requirements, and industry best practices for UK competition operators.",
  keywords: [
    "prize draw compliance",
    "DCMS voluntary code",
    "UK competition operators",
    "prize draw regulations",
    "free entry draws",
    "competition transparency",
  ],
  openGraph: {
    title: "Blog — Veristiq | Prize Draw Compliance & Industry Insights",
    description:
      "Expert insights on prize draw compliance, DCMS regulations, and industry best practices for UK operators.",
    type: "website",
    url: "https://veristiq.com/blog",
    siteName: "Veristiq",
  },
  twitter: {
    card: "summary",
    title: "Blog — Veristiq",
    description:
      "Expert insights on prize draw compliance, DCMS regulations, and industry best practices.",
  },
  alternates: {
    canonical: "https://veristiq.com/blog",
    types: {
      "application/rss+xml": "https://veristiq.com/blog/feed.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Breadcrumb JSON-LD
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://veristiq.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://veristiq.com/blog",
    },
  ],
};

// JSON-LD Structured Data for Blog
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Veristiq Blog",
  description:
    "Expert insights on prize draw compliance, DCMS regulations, transparency requirements, and industry best practices for UK competition operators.",
  url: "https://veristiq.com/blog",
  publisher: {
    "@type": "Organization",
    name: "Veristiq",
    url: "https://veristiq.com",
    logo: {
      "@type": "ImageObject",
      url: "https://veristiq.com/logo.png",
    },
  },
  blogPost: articles.map((article) => ({
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    url: `https://veristiq.com/blog/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Organization",
      name: article.author,
    },
  })),
};

export default function BlogPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="py-24 bg-[var(--veristiq-slate)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

        <div className="container mx-auto px-6 text-center max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
            <BookOpen className="w-8 h-8 text-[var(--veristiq-primary-blue)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Insights on prize draw compliance, industry regulations, and best
            practices for UK competition operators.
          </p>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[var(--veristiq-slate-light)] text-lg">
                No articles yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {articles.map((article) => (
                <BlogArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
