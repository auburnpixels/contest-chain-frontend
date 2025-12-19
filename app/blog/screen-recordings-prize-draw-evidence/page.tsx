import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ChevronRight,
  ArrowRight,
  Video,
  CheckCircle,
  XCircle,
  HelpCircle,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getArticleBySlug } from "@/lib/blog/articles";

const article = getArticleBySlug("screen-recordings-prize-draw-evidence")!;

export const metadata: Metadata = {
  title:
    "Why Screen Recordings Became the Default Evidence for Prize Draws — Veristiq",
  description:
    "How screen recordings became the standard for demonstrating prize draw fairness, what they do well, what they cannot show, and when they may not be enough.",
  keywords: [
    "screen recording prize draw",
    "prize draw evidence",
    "competition draw proof",
    "prize draw transparency",
    "draw recording",
    "prize draw verification",
    "competition fairness evidence",
  ],
  authors: [{ name: "Veristiq Team" }],
  openGraph: {
    title: "Why Screen Recordings Became the Default Evidence for Prize Draws",
    description:
      "How screen recordings became the standard for demonstrating prize draw fairness, and when they may not be enough.",
    type: "article",
    url: "https://veristiq.io/blog/screen-recordings-prize-draw-evidence",
    siteName: "Veristiq",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt || article.publishedAt,
    authors: [article.author],
    tags: ["Screen Recording", "Evidence", "Prize Draws", "Transparency"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Screen Recordings Became the Default Evidence for Prize Draws",
    description:
      "How screen recordings became the standard, and when they may not be enough.",
  },
  alternates: {
    canonical: "https://veristiq.io/blog/screen-recordings-prize-draw-evidence",
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
  headline: "Why Screen Recordings Became the Default Evidence for Prize Draws",
  description:
    "How screen recordings became the standard for demonstrating prize draw fairness, what they do well, what they cannot show, and when they may not be enough.",
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
    "@id": "https://veristiq.io/blog/screen-recordings-prize-draw-evidence",
  },
  articleSection: "Industry",
  wordCount: 1500,
  keywords: [
    "screen recording",
    "prize draw evidence",
    "competition proof",
    "draw transparency",
  ],
  about: {
    "@type": "Thing",
    name: "Screen Recordings as Prize Draw Evidence",
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
      name: "Screen Recordings as Evidence",
      item: "https://veristiq.io/blog/screen-recordings-prize-draw-evidence",
    },
  ],
};

// FAQ JSON-LD for rich results
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are screen recordings acceptable evidence for prize draws?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Screen recordings can be useful as a visual record of what appeared on screen during a draw. However, they only capture the interface, not the underlying data. They cannot independently prove that the entry pool was complete, that the selection was truly random, or that the database matched what was displayed. For low-stakes draws with established trust, they may be sufficient. For high-value prizes or regulatory scrutiny, additional forms of evidence may be needed.",
      },
    },
    {
      "@type": "Question",
      name: "What evidence do regulators expect for prize draw fairness?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The DCMS Voluntary Code refers to using a 'verifiably random and auditable computer process' for winner selection. This implies that evidence should be available for review and examination, not just visual demonstration. Regulators may expect operators to demonstrate how entries were collected, how the draw was executed, and how the winner was selected — with records that can be independently verified.",
      },
    },
    {
      "@type": "Question",
      name: "What does 'verifiable randomness' mean in prize draws?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Verifiable randomness means that the random selection process can be examined and confirmed after the fact. This goes beyond simply using a random number generator — it requires evidence that the randomness was applied correctly to the complete entry pool, and that the result was not altered. True verifiability typically requires independent, tamper-evident records of the draw process.",
      },
    },
  ],
};

export default function ScreenRecordingsArticle() {
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
            <span className="text-gray-300">Industry</span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
            Why Screen Recordings Became the Default Evidence for Prize Draws
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
            <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-medium">
              Industry
            </span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Lead Paragraph */}
          <p className="text-xl text-[var(--veristiq-slate)] leading-relaxed mb-8">
            If you have ever watched a prize draw on social media, you have
            probably seen a screen recording. The operator hits record, runs the
            draw, and shares the video. It has become so common that many
            players now expect it. As regulatory expectations and public
            scrutiny increase, operators are being asked not just to show how a
            draw looked, but to provide evidence that can independently verify
            how it was conducted. As prize draws grow in scale and scrutiny increases,
            the limitations of this approach are becoming more visible.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            But how did screen recordings become the default? And as
            expectations evolve, are they still sufficient?
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            This article explores why screen recordings became the standard
            evidence for prize draws, what they do well, and where their
            limitations lie. This article is intended to explore the topic in
            context, not to provide legal advice or compliance guidance.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: How they became default */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            Why Screen Recordings Became the Default Evidence for Prize Draws
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            Screen recordings became popular for practical reasons. They require
            no specialist tools, no third-party involvement, and no technical
            expertise. Any operator with a computer and screen capture software
            can produce one.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            They also feel intuitive to players. A video of the draw happening
            on screen provides something visible and tangible — a narrative that
            players can follow. &quot;I watched the draw. I saw the winner
            selected. It looked fair.&quot;
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-8">
            This accessibility and familiarity made screen recordings the
            natural choice for an industry that grew quickly, often without
            formal guidance on what constitutes adequate evidence.
          </p>

          <div className="bg-[var(--veristiq-snow)] rounded-xl border border-gray-200 p-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Video className="w-5 h-5 text-[var(--veristiq-primary-blue)]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-2">
                  Why screen recordings caught on
                </h3>
                <ul className="space-y-2 text-[var(--veristiq-slate-light)]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    Accessible — any operator can produce one
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    Visual — players can see the draw happen
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    Low cost — no third parties or infrastructure needed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    Familiar — the format is recognisable from other contexts
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: What they do well */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            What Screen Recordings Show in Prize Draw Evidence
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            It would be unfair to dismiss screen recordings entirely. They serve
            a purpose and, in many contexts, they work.
          </p>

          <ul className="space-y-4 mb-12">
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-[var(--veristiq-slate)]">
                  Show the interface at the moment of the draw
                </strong>{" "}
                — Players can see what appeared on screen when the winner was
                selected.
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-[var(--veristiq-slate)]">
                  Provide a timestamped visual record
                </strong>{" "}
                — The recording exists as an artifact that can be referenced
                later.
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-[var(--veristiq-slate)]">
                  Offer something tangible to share
                </strong>{" "}
                — Operators can post the video publicly, demonstrating openness.
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-[var(--veristiq-slate)]">
                  Better than nothing
                </strong>{" "}
                — For small operators or low-stakes draws, a screen recording is
                a reasonable starting point.
              </span>
            </li>
          </ul>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            For many operators, these benefits explain why screen recordings
            became the default form of draw evidence — they are visible,
            familiar, and easy to share.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: What they cannot show */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            What Screen Recordings Cannot Prove About Fairness
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            The limitations of screen recordings become apparent when you
            consider what they actually capture. A screen recording shows what
            the operator saw on their screen. It does not show what happened at
            the data level.
          </p>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-[var(--veristiq-slate)]">
                  Whether the correct entry pool was used
                </strong>{" "}
                — Including whether all eligible paid and free entries were
                present at draw time. The recording cannot confirm this.
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-[var(--veristiq-slate)]">
                  Whether the selection was truly random
                </strong>{" "}
                — The interface may show a spinner or animation, but this is a
                visual effect, not proof of randomness.
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-[var(--veristiq-slate)]">
                  Whether the database matches the screen
                </strong>{" "}
                — What appeared on screen may not reflect what was stored in the
                system.
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-[var(--veristiq-slate)]">
                  Whether the recording was edited
                </strong>{" "}
                — Videos can be cut, spliced, or re-recorded. There is no
                inherent proof of authenticity.
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-[var(--veristiq-slate)]">
                  What happened before the recording started
                </strong>{" "}
                — The recording typically begins moments before the draw. What
                occurred during setup is not captured.
              </span>
            </li>
          </ul>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            In short, a screen recording captures the interface, not the
            underlying process. These are not always the same thing.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            As expectations evolve, the limitation is not that screen recordings
            are misleading — it&apos;s that they stop at the interface. When
            questions arise after a draw, operators may be asked to demonstrate
            what happened at the data level, not just what was visible on
            screen.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: Interface vs data */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            The Gap Between Interface Evidence and Draw Data
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            Most competition platforms display a user interface — buttons,
            spinners, winner announcements — that represents what is happening
            in the database. But the interface is a presentation layer, not the
            source of truth.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            A screen recording captures the presentation layer. It shows what
            the operator saw, not what the system did. If there were a
            discrepancy between the two — intentional or otherwise — the
            recording would not reveal it.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            This is not to suggest that operators routinely manipulate draws. It
            is simply to observe that screen recordings, by their nature, cannot
            provide independent proof of what occurred at the data level.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: When sufficient */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            When Screen Recordings May Be Sufficient Evidence
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            Screen recordings are not inherently inadequate. Context matters.
          </p>

          <ul className="space-y-3 mb-12">
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <HelpCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span>
                Low-stakes draws where the prize value does not warrant
                extensive verification
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <HelpCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span>
                Small operators with established player trust and low dispute
                rates
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <HelpCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span>
                Draws where no regulatory scrutiny is expected or required
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <HelpCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span>
                Situations where the screen recording is supplemented by other
                evidence
              </span>
            </li>
          </ul>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: When not enough */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            When Screen Recordings Are Not Enough for Prize Draw Compliance
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            As the prize draw industry matures and regulatory expectations
            evolve, screen recordings alone may not satisfy scrutiny in certain
            contexts:
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <Scale className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-[var(--veristiq-slate)]">
                  High-value prizes
                </strong>{" "}
                — Where the financial stakes justify more rigorous evidence
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <Scale className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-[var(--veristiq-slate)]">
                  Regulatory inquiries
                </strong>{" "}
                — Where authorities may ask for evidence beyond visual
                recordings
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <Scale className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-[var(--veristiq-slate)]">
                  Media attention
                </strong>{" "}
                — Where a journalist investigates a draw outcome
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <Scale className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-[var(--veristiq-slate)]">
                  Dispute resolution
                </strong>{" "}
                — Where a player formally challenges a draw outcome
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <Scale className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-[var(--veristiq-slate)]">
                  DCMS Code signatories
                </strong>{" "}
                — Where transparency expectations are explicitly stated
              </span>
            </li>
          </ul>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            The{" "}
            <Link
              href="/blog/dcms-voluntary-code-explained"
              className="text-[var(--veristiq-primary-blue)] hover:underline"
            >
              DCMS Voluntary Code
            </Link>{" "}
            refers to using a &quot;verifiably random and auditable computer
            process&quot; for winner selection. The word &quot;auditable&quot;
            implies that evidence should be available for review — not just
            watched, but examined.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: The question */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            The Question Prize Draw Operators Should Ask About Evidence
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            If a draw were challenged — by a player, a journalist, or a
            regulator — would a screen recording be sufficient evidence?
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            Could you demonstrate, with independent proof, that every valid
            entry was included? That the selection was genuinely random? That
            the outcome recorded in your database matched what appeared on
            screen?
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            For many operators, the honest answer is no. This is not a criticism
            — it reflects how the industry developed. But as expectations rise,
            operators may need to consider what{" "}
            <Link
              href="/blog/evidence-of-fairness-prize-draws"
              className="text-[var(--veristiq-primary-blue)] hover:underline"
            >
              evidence of fairness
            </Link>{" "}
            exists beyond the screen.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: Conclusion */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            Screen recordings are a starting point, not an endpoint
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            Screen recordings became the default for good reasons. They are
            accessible, visual, and familiar. For many draws, they remain a
            reasonable approach.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            But they are not complete evidence. They capture the interface, not
            the data. They show what was seen, not what occurred. And they
            cannot, by themselves, prove that a draw was conducted fairly.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            As the sector matures, operators may want to consider whether screen
            recordings alone will continue to meet expectations — or whether
            additional forms of evidence are worth exploring.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
              As expectations evolve, the question is no longer whether a draw can be shown — but whether it can be independently verified when it matters.
          </p>

          {/* Responsibility Statement */}
          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            Ultimately, responsibility for demonstrating fairness, meeting
            regulatory expectations, and maintaining player trust rests with the
            operator. This article is intended to explore the role of screen
            recordings as evidence, not to provide legal or compliance advice.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* FAQ Section */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-8">
            Common Questions About Prize Draw Evidence
          </h2>

          <div className="space-y-6 mb-12">
            <div className="bg-[var(--veristiq-snow)] rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-3">
                Are screen recordings acceptable evidence for prize draws?
              </h3>
              <p className="text-[var(--veristiq-slate-light)]">
                Screen recordings can be useful as a visual record of what
                appeared on screen during a draw. However, they only capture the
                interface, not the underlying data. For low-stakes draws with
                established trust, they may be sufficient. For high-value prizes
                or regulatory scrutiny, additional forms of evidence may be
                needed.
              </p>
            </div>

            <div className="bg-[var(--veristiq-snow)] rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-3">
                What evidence do regulators expect for prize draw fairness?
              </h3>
              <p className="text-[var(--veristiq-slate-light)]">
                The DCMS Voluntary Code refers to using a &quot;verifiably
                random and auditable computer process&quot; for winner
                selection. This implies that evidence should be available for
                review and examination, not just visual demonstration.
              </p>
            </div>

            <div className="bg-[var(--veristiq-snow)] rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-3">
                What does &quot;verifiable randomness&quot; mean in prize draws?
              </h3>
              <p className="text-[var(--veristiq-slate-light)]">
                Verifiable randomness means that the random selection process
                can be examined and confirmed after the fact. This goes beyond
                simply using a random number generator — it requires evidence
                that the randomness was applied correctly to the complete entry
                pool, and that the result was not altered.
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
                  href="/blog/evidence-of-fairness-prize-draws"
                  className="text-[var(--veristiq-primary-blue)] hover:underline"
                >
                  What &quot;Evidence of Fairness&quot; Means in Practice for
                  Prize Draws →
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="p-6 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> This article is intended to explore the use
              of screen recordings as prize draw evidence. It does not
              constitute legal advice. Operators should consult appropriate
              advisors when assessing their own evidence and compliance
              obligations.
            </p>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--veristiq-slate)] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-10"></div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Explore different approaches to evidence
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Read more about what evidence of fairness means in practice and how
            verification infrastructure works.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/blog/evidence-of-fairness-prize-draws">
              <Button className="bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white px-8 py-6 text-lg h-auto shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5">
                Read: Evidence of Fairness
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 px-8 py-6 text-lg h-auto transition-all hover:-translate-y-0.5"
              >
                How Verification Works
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

