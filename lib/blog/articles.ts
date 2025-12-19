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
    slug: "screen-recordings-prize-draw-evidence",
    title: "Why Screen Recordings Became the Default Evidence for Prize Draws",
    description:
      "How screen recordings became the standard for demonstrating prize draw fairness, what they do well, what they cannot show, and when they may not be enough.",
    publishedAt: "2025-12-15",
    author: "Veristiq Team",
    category: "industry",
    readingTime: "5 min read",
    featured: true,
  },
  {
    slug: "evidence-of-fairness-prize-draws",
    title: "What 'Evidence of Fairness' Means in Practice for Prize Draws",
    description:
      "The difference between running a fair draw and proving it. What players and regulators expect, common approaches to demonstrating fairness, and what 'verifiably random and auditable' actually requires.",
    publishedAt: "2025-12-08",
    author: "Veristiq Team",
    category: "compliance",
    readingTime: "6 min read",
    featured: false,
  },
  {
    slug: "dcms-voluntary-code-explained",
    title:
      "Understanding the DCMS Voluntary Code of Good Practice for Prize Draw Operators",
    description:
      "A plain-language guide to the DCMS Voluntary Code of Good Practice for Prize Draw Operators, covering scope, transparency requirements, and the May 2026 deadline.",
    publishedAt: "2025-12-01",
    author: "Veristiq Team",
    category: "compliance",
    readingTime: "8 min read",
    featured: false,
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



