import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BlogArticle } from "@/lib/blog/articles";

interface BlogArticleCardProps {
  article: BlogArticle;
}

const categoryColors: Record<BlogArticle["category"], string> = {
  compliance: "bg-blue-100 text-blue-700",
  product: "bg-purple-100 text-purple-700",
  industry: "bg-teal-100 text-teal-700",
};

export function BlogArticleCard({ article }: BlogArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <article className="py-8 transition-colors">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <Badge
            variant="secondary"
            className={`${categoryColors[article.category]} font-medium capitalize text-xs`}
          >
            {article.category}
          </Badge>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={article.publishedAt}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readingTime}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-[var(--veristiq-slate)] mb-2 group-hover:text-[var(--veristiq-primary-blue)] transition-colors">
          {article.title}
        </h2>

        {/* Description */}
        <p className="text-[var(--veristiq-slate-light)] leading-relaxed mb-4">
          {article.description}
        </p>

        {/* Read more */}
        <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--veristiq-primary-blue)] group-hover:gap-2 transition-all">
          Read article
          <ArrowRight className="w-4 h-4" />
        </span>
      </article>
    </Link>
  );
}
