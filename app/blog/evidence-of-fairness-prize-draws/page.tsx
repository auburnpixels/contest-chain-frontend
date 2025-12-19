import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ChevronRight,
  ArrowRight,
  Video,
  Database,
  Users,
  Shuffle,
  ShieldCheck,
  Lock,
  Eye,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getArticleBySlug } from "@/lib/blog/articles";

const article = getArticleBySlug("evidence-of-fairness-prize-draws")!;

export const metadata: Metadata = {
  title:
    "What 'Evidence of Fairness' Means in Practice for Prize Draw Operators — Veristiq",
  description:
    "The difference between running a fair draw and proving it. What players and regulators expect, common approaches to demonstrating fairness, and what 'verifiably random and auditable' actually requires.",
  keywords: [
    "prize draw fairness",
    "evidence of fairness",
    "verifiable prize draws",
    "auditable competition draws",
    "prize draw transparency",
    "random number generator audit",
    "competition verification",
  ],
  authors: [{ name: "Veristiq Team" }],
  openGraph: {
    title: "What 'Evidence of Fairness' Means in Practice for Prize Draw Operators",
    description:
      "The difference between running a fair draw and proving it. What players and regulators expect, and what 'verifiably random and auditable' actually requires.",
    type: "article",
    url: "https://veristiq.io/blog/evidence-of-fairness-prize-draws",
    siteName: "Veristiq",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt || article.publishedAt,
    authors: [article.author],
    tags: ["Fairness", "Transparency", "Prize Draws", "Verification", "Audit"],
  },
  twitter: {
    card: "summary_large_image",
    title: "What 'Evidence of Fairness' Means in Practice for Prize Draw Operators",
    description:
      "The difference between running a fair draw and proving it.",
  },
  alternates: {
    canonical: "https://veristiq.io/blog/evidence-of-fairness-prize-draws",
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

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What 'Evidence of Fairness' Means in Practice for Prize Draw Operators",
  description:
    "The difference between running a fair draw and proving it. What players and regulators expect, common approaches to demonstrating fairness, and what 'verifiably random and auditable' actually requires.",
  author: {
    "@type": "Organization",
    name: "Veristiq",
    url: "https://veristiq.io",
  },
  publisher: {
    "@type": "Organization",
    name: "Veristiq",
    url: "https://veristiq.io",
    logo: {
      "@type": "ImageObject",
      url: "https://veristiq.io/logo.png",
    },
  },
  datePublished: article.publishedAt,
  dateModified: article.updatedAt || article.publishedAt,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://veristiq.io/blog/evidence-of-fairness-prize-draws",
  },
  articleSection: "Compliance",
  wordCount: 1800,
  keywords: [
    "prize draw fairness",
    "evidence of fairness",
    "verifiable draws",
    "audit trail",
    "competition transparency",
  ],
  about: {
    "@type": "Thing",
    name: "Prize Draw Verification and Evidence",
  },
};

// FAQ JSON-LD for rich results
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is 'evidence of fairness' in prize draws?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evidence of fairness refers to verifiable proof that a prize draw was conducted properly — that entries were counted correctly, the selection was random, and the rules were followed. It goes beyond simply running a fair draw; it means being able to demonstrate fairness to players, regulators, or media if questioned.",
      },
    },
    {
      "@type": "Question",
      name: "What does 'verifiably random and auditable' mean for prize draws?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The DCMS Voluntary Code asks operators to use a 'verifiably random and auditable computer process' for winner selection. This means the randomness can be verified after the fact, records cannot be altered, evidence exists independently of the operator, and relevant parties can inspect the evidence if required.",
      },
    },
    {
      "@type": "Question",
      name: "Why are screen recordings not sufficient evidence for prize draws?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Screen recordings show what appeared on screen but not what happened at the data level. They cannot prove the entry pool was complete, that the selection was truly random, or that the database matched what was displayed. For high-stakes draws or regulatory scrutiny, additional forms of evidence may be needed.",
      },
    },
  ],
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
      item: "https://veristiq.io",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://veristiq.io/blog",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Evidence of Fairness",
      item: "https://veristiq.io/blog/evidence-of-fairness-prize-draws",
    },
  ],
};

export default function EvidenceOfFairnessArticle() {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Article Header */}
      <header className="py-16 md:py-24 bg-[var(--veristiq-slate)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm text-gray-400 mb-8"
            aria-label="Breadcrumb"
          >
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-300">Compliance</span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
            What &quot;Evidence of Fairness&quot; Means in Practice for Prize Draw Operators
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.publishedAt}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readingTime}</span>
            </div>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
              Compliance
            </span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Lead Paragraph */}
          <p className="text-xl text-[var(--veristiq-slate)] leading-relaxed mb-8">
            Most prize draw operators believe their draws are fair. Many are
            right. But fairness and evidence of fairness are not the same thing
            — and the gap between them is becoming increasingly important.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            Research commissioned by DCMS in 2023 found that while the UK prize
            draw market has grown to over £1.3 billion annually, player trust
            has not kept pace. Many participants remain sceptical about whether
            draws are conducted fairly, and operators often lack the tools to
            demonstrate otherwise in a way that satisfies scrutiny.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            This article explores what &quot;evidence of fairness&quot; actually
            means, why it matters, and how operators can think about
            demonstrating it — not just asserting it. This article is intended
            to explain the concept in context, not to provide legal advice or
            compliance guidance.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: What players and regulators expect */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            What players and regulators expect
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            When a player asks &quot;was this draw fair?&quot;, they are rarely
            asking a technical question about random number generation. They are
            asking something closer to: &quot;Can I trust this outcome?&quot;
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            That trust depends on two things:
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              <span>
                <strong className="text-[var(--veristiq-slate)]">
                  The process was fair
                </strong>{" "}
                — entries were counted correctly, the selection was random, and
                the rules were followed.
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              <span>
                <strong className="text-[var(--veristiq-slate)]">
                  The process can be verified
                </strong>{" "}
                — there is evidence, accessible to those who need it, that shows
                what happened and how.
              </span>
            </li>
          </ul>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            The DCMS Voluntary Code reflects this distinction. It asks operators
            to use a &quot;verifiably random and auditable computer
            process&quot; for winner selection. The key words are not just
            &quot;random&quot; but also &quot;verifiable&quot; and
            &quot;auditable&quot;.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            Regulators, media, and increasingly players want to know: if
            questioned, can you explain exactly how a draw was conducted — and
            can you prove it?
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: Common approaches */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            Common approaches to demonstrating fairness
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-8">
            Operators typically use one or more of the following methods to
            demonstrate that draws are conducted fairly. Each has strengths and
            limitations.
          </p>

          {/* Approach Cards */}
          <div className="space-y-6 mb-12">
            {/* Screen Recordings */}
            <div className="bg-[var(--veristiq-snow)] rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Video className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-2">
                    Screen recordings
                  </h3>
                  <p className="text-[var(--veristiq-slate-light)] mb-3">
                    Videos showing the draw taking place on screen.
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Limitation:</strong> Shows what appeared on screen,
                    but not what happened at the data level. Does not prove the
                    entry pool was complete or that the selection was truly
                    random.{" "}
                    <Link
                      href="/blog/screen-recordings-prize-draw-evidence"
                      className="text-[var(--veristiq-primary-blue)] hover:underline"
                    >
                      Read more about screen recordings as evidence →
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Internal Logs */}
            <div className="bg-[var(--veristiq-snow)] rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-2">
                    Internal database logs
                  </h3>
                  <p className="text-[var(--veristiq-slate-light)] mb-3">
                    Records stored in the operator&apos;s own systems.
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Limitation:</strong> Logs controlled by the operator
                    can be edited. There is no independent verification that the
                    records are complete or unaltered.
                  </p>
                </div>
              </div>
            </div>

            {/* Witnessed Draws */}
            <div className="bg-[var(--veristiq-snow)] rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-2">
                    Witnessed or supervised draws
                  </h3>
                  <p className="text-[var(--veristiq-slate-light)] mb-3">
                    An independent person observes the draw in real time.
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Limitation:</strong> Practical for occasional,
                    high-value draws. Not scalable for operators running
                    multiple draws daily or instant-win formats.
                  </p>
                </div>
              </div>
            </div>

            {/* Third-party RNGs */}
            <div className="bg-[var(--veristiq-snow)] rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shuffle className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-2">
                    Third-party random number generators
                  </h3>
                  <p className="text-[var(--veristiq-slate-light)] mb-3">
                    Using an external service to generate random numbers.
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Limitation:</strong> Randomness is only one part of
                    fairness. An RNG does not verify that all entries were
                    included, that the correct pool was used, or that the result
                    was correctly applied.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            None of these approaches are wrong. Many operators use them
            effectively. But each addresses only part of the evidence question —
            and none produces independent, tamper-evident proof of the full draw
            process.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: What verifiable and auditable requires */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            What &quot;verifiably random and auditable&quot; actually requires
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-8">
            If evidence of fairness is to satisfy regulatory expectations and
            withstand scrutiny, it typically needs to meet several criteria:
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-5 h-5 text-[var(--veristiq-primary-blue)]" />
              </div>
              <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-2">
                Immutability
              </h3>
              <p className="text-sm text-[var(--veristiq-slate-light)]">
                Records cannot be altered or deleted after the fact. Any
                modification is detectable.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-[var(--veristiq-primary-blue)]" />
              </div>
              <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-2">
                Independence
              </h3>
              <p className="text-sm text-[var(--veristiq-slate-light)]">
                Evidence exists outside the operator&apos;s direct control, so
                it cannot be dismissed as self-serving.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-5 h-5 text-[var(--veristiq-primary-blue)]" />
              </div>
              <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-2">
                Accessibility
              </h3>
              <p className="text-sm text-[var(--veristiq-slate-light)]">
                Relevant parties — players, regulators, or media — can inspect
                the evidence if required.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileCheck className="w-5 h-5 text-[var(--veristiq-primary-blue)]" />
              </div>
              <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-2">
                Reproducibility
              </h3>
              <p className="text-sm text-[var(--veristiq-slate-light)]">
                The process can be explained and reviewed. It is clear how
                entries were collected, how the draw was executed, and how the
                winner was selected.
              </p>
            </div>
          </div>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            Meeting these criteria is not about choosing the right technology.
            It is about being able to answer a simple question with evidence:
            &quot;How do you know this draw was fair?&quot;
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: The gap */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            The gap between running a fair draw and proving it
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            Most competition platforms are built to operate competitions
            efficiently: manage entries, process payments, run draws, notify
            winners. They are not typically designed to produce independent,
            tamper-evident evidence of what occurred.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            This is not a failing. It is a design purpose. A car is built to
            drive, not to prove where it has been. But if you need to
            demonstrate your journey, you need a separate record — a GPS log, a
            dashcam, a receipt.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            The same logic applies to prize draws. Running a fair draw and
            proving you ran a fair draw are two different problems, and they may
            require different tools.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: Independent verification */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            Independent verification as one approach
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            Independent verification is not required by regulation, nor is it
            appropriate for every operator.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            One way some operators address this gap is by separating draw
            execution from verification and proof. In this model, the operator
            continues to control competitions and customer experience, while an
            external system records draw inputs and outcomes in a tamper-evident
            way and produces verifiable audit records.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            This separation of concerns means:
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Operators focus on running competitions
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Verification systems focus on producing proof
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Evidence is independent, not self-attested
            </li>
          </ul>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            Veristiq is one example of this type of infrastructure. It is
            designed to provide independent technical evidence of how a draw was
            conducted, rather than to replace operator responsibilities or
            provide compliance advice.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: Conclusion */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            Evidence as a baseline expectation
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            The DCMS Voluntary Code signals a shift in expectations. Fairness is
            no longer assumed — it must be demonstrated. And demonstration
            requires evidence that can withstand scrutiny.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            Operators should consider: if a player, journalist, or regulator
            asked how a specific draw was conducted, what would you show them?
            Would that evidence be sufficient?
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            Evidence of fairness is becoming a baseline expectation, not a
            differentiator. Operators who can explain and prove their processes
            will be better positioned as the sector matures.
          </p>

          {/* Responsibility Statement */}
          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            Ultimately, responsibility for lawful operation, player protection,
            advertising standards, and compliance with all applicable regulation
            remains with the operator. No technology replaces that
            responsibility. This article is intended to explain concepts around
            evidence of fairness, not to provide legal or compliance advice.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* FAQ Section */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-8">
            Common Questions About Evidence of Fairness
          </h2>

          <div className="space-y-6 mb-12">
            <div className="bg-[var(--veristiq-snow)] rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-3">
                What is &quot;evidence of fairness&quot; in prize draws?
              </h3>
              <p className="text-[var(--veristiq-slate-light)]">
                Evidence of fairness refers to verifiable proof that a prize
                draw was conducted properly — that entries were counted
                correctly, the selection was random, and the rules were
                followed. It goes beyond simply running a fair draw; it means
                being able to demonstrate fairness to players, regulators, or
                media if questioned.
              </p>
            </div>

            <div className="bg-[var(--veristiq-snow)] rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-3">
                What does &quot;verifiably random and auditable&quot; mean?
              </h3>
              <p className="text-[var(--veristiq-slate-light)]">
                The DCMS Voluntary Code asks operators to use a &quot;verifiably
                random and auditable computer process&quot; for winner
                selection. This means the randomness can be verified after the
                fact, records cannot be altered, evidence exists independently
                of the operator, and relevant parties can inspect the evidence
                if required.
              </p>
            </div>

            <div className="bg-[var(--veristiq-snow)] rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-3">
                Why are screen recordings not sufficient evidence?
              </h3>
              <p className="text-[var(--veristiq-slate-light)]">
                Screen recordings show what appeared on screen but not what
                happened at the data level. They cannot prove the entry pool was
                complete, that the selection was truly random, or that the
                database matched what was displayed. For high-stakes draws or
                regulatory scrutiny, additional forms of evidence may be needed.
              </p>
            </div>
          </div>

          {/* Related Articles */}
          <div className="p-6 bg-[var(--veristiq-snow)] rounded-xl border border-gray-200 mb-8">
            <h3 className="font-semibold text-[var(--veristiq-slate)] mb-4">
              Related articles
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog/dcms-voluntary-code-explained"
                  className="text-[var(--veristiq-primary-blue)] hover:underline"
                >
                  Understanding the DCMS Voluntary Code of Good Practice for
                  Prize Draw Operators →
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/screen-recordings-prize-draw-evidence"
                  className="text-[var(--veristiq-primary-blue)] hover:underline"
                >
                  Why Screen Recordings Became the Default Evidence for Prize
                  Draws →
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="p-6 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> This article is intended to explain the
              concept of evidence of fairness in prize draws. It does not
              constitute legal advice. Operators should consult appropriate
              advisors when assessing their own compliance obligations.
            </p>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--veristiq-slate)] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-10"></div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Learn more about verification approaches
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Veristiq is one example of infrastructure designed to produce
            tamper-evident audit records of prize draws.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/how-it-works">
              <Button className="bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white px-8 py-6 text-lg h-auto shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5">
                See How It Works
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/blog/dcms-voluntary-code-explained">
              <Button
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 px-8 py-6 text-lg h-auto transition-all hover:-translate-y-0.5"
              >
                Read About the DCMS Code
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--veristiq-primary-blue)] hover:underline font-medium"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to all articles
          </Link>
        </div>
      </section>
    </>
  );
}


