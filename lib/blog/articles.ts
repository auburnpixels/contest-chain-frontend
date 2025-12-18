export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: "compliance" | "product" | "industry";
  readingTime: string;
  featured?: boolean;
}

export const articles: BlogArticle[] = [
  {
    slug: "dcms-voluntary-code-explained",
    title:
      "Understanding the DCMS Voluntary Code of Good Practice for Prize Draw Operators",
    description:
      "A plain-language guide to the DCMS Voluntary Code of Good Practice for Prize Draw Operators, covering scope, transparency requirements, and the May 2026 deadline.",
    publishedAt: "2025-01-15",
    author: "Veristiq Team",
    category: "compliance",
    readingTime: "8 min read",
    featured: true,
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getFeaturedArticles(): BlogArticle[] {
  return articles.filter((article) => article.featured);
}

export function getArticlesByCategory(
  category: BlogArticle["category"]
): BlogArticle[] {
  return articles.filter((article) => article.category === category);
}



