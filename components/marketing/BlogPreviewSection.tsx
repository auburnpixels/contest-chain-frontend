import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { articles } from "@/lib/blog/articles";

export function BlogPreviewSection() {
  // Get the 3 most recent articles
  const recentArticles = articles.slice(0, 3);

  const categoryColors: Record<string, string> = {
    compliance: "bg-blue-100 text-blue-700",
    product: "bg-purple-100 text-purple-700",
    industry: "bg-teal-100 text-teal-700",
  };

  return (
    <section className="py-24 bg-[var(--veristiq-snow)]">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-[var(--veristiq-primary-blue)] text-sm font-medium mb-4">
            Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--veristiq-slate)] mb-4">
            From the Blog
          </h2>
          <p className="text-lg text-[var(--veristiq-slate-light)] max-w-2xl mx-auto">
            Expert insights on prize draw compliance, DCMS regulations, and
            industry best practices.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {recentArticles.map((article) => {
            const formattedDate = new Date(
              article.publishedAt
            ).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            return (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group"
              >
                <article className="bg-white rounded-xl border border-gray-200 p-6 h-full flex flex-col transition-all hover:shadow-lg hover:border-gray-300 hover:-translate-y-1">
                  {/* Category Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${categoryColors[article.category]}`}
                    >
                      {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[var(--veristiq-slate)] mb-3 group-hover:text-[var(--veristiq-primary-blue)] transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--veristiq-slate-light)] mb-4 flex-grow line-clamp-3">
                    {article.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={article.publishedAt}>{formattedDate}</time>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readingTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--veristiq-primary-blue)] font-medium hover:gap-3 transition-all"
          >
            View all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

