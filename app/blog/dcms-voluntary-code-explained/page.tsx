import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ChevronRight,
  Users,
  PoundSterling,
  Building2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getArticleBySlug } from "@/lib/blog/articles";

const article = getArticleBySlug("dcms-voluntary-code-explained")!;

export const metadata: Metadata = {
  title:
    "Understanding the DCMS Voluntary Code of Good Practice for Prize Draw Operators — Veristiq",
  description:
    "A plain-language guide to the DCMS Voluntary Code for Prize Draw Operators. Covers scope, transparency requirements, player protections, and the May 2026 compliance deadline.",
  keywords: [
    "DCMS voluntary code",
    "prize draw compliance UK",
    "free entry prize draw regulations",
    "prize competition transparency",
    "UK prize draw operators",
    "prize draw transparency",
    "competition compliance 2026",
  ],
  authors: [{ name: "Veristiq Team" }],
  openGraph: {
    title: "Understanding the DCMS Voluntary Code of Good Practice for Prize Draw Operators",
    description:
      "A plain-language guide to the DCMS Voluntary Code for Prize Draw Operators, covering scope, transparency requirements, and the May 2026 deadline.",
    type: "article",
    url: "https://veristiq.io/blog/dcms-voluntary-code-explained",
    siteName: "Veristiq",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt || article.publishedAt,
    authors: [article.author],
    tags: ["DCMS", "Compliance", "Prize Draws", "UK Regulation", "Transparency"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Understanding the DCMS Voluntary Code of Good Practice for Prize Draw Operators",
    description:
      "A plain-language guide covering scope, transparency requirements, and the May 2026 compliance deadline.",
  },
  alternates: {
    canonical: "https://veristiq.io/blog/dcms-voluntary-code-explained",
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

// JSON-LD Structured Data - Article schema for rich results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Understanding the DCMS Voluntary Code of Good Practice for Prize Draw Operators",
  description:
    "A plain-language guide to the DCMS Voluntary Code of Good Practice for Prize Draw Operators, covering scope, transparency requirements, and the May 2026 deadline.",
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
    "@id": "https://veristiq.io/blog/dcms-voluntary-code-explained",
  },
  articleSection: "Compliance",
  wordCount: 2200,
  keywords: [
    "DCMS voluntary code",
    "prize draw compliance",
    "UK prize draw regulations",
    "free entry draws",
    "competition transparency",
  ],
  about: {
    "@type": "Thing",
    name: "DCMS Voluntary Code of Good Practice for Prize Draw Operators",
  },
  mentions: [
    {
      "@type": "Organization",
      name: "Department for Culture, Media and Sport",
      alternateName: "DCMS",
    },
    {
      "@type": "Thing",
      name: "Gambling Act 2005",
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
      name: "What is the DCMS Voluntary Code for Prize Draw Operators?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The DCMS Voluntary Code of Good Practice for Prize Draw Operators is a set of guidelines introduced by the Department for Culture, Media and Sport to strengthen player protections, increase transparency, and improve accountability in the UK prize draw sector. It applies to prize draws that offer both paid and free entry routes.",
      },
    },
    {
      "@type": "Question",
      name: "When does the DCMS Voluntary Code come into effect?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Signatories agreed to fully implement the Code within six months of publication, and no later than 20 May 2026. Operators joining after that date are expected to comply immediately.",
      },
    },
    {
      "@type": "Question",
      name: "Is the DCMS Voluntary Code legally binding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, the Code is voluntary and does not introduce new law or licensing requirements. However, it signals clear expectations from government and may influence how operators are perceived by regulators, media, and players. Non-compliance does not automatically breach law, but the Code does not replace existing legal obligations under consumer protection, advertising standards, or data protection law.",
      },
    },
  ],
};

// Breadcrumb JSON-LD for navigation
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
      name: "Understanding the DCMS Voluntary Code",
      item: "https://veristiq.io/blog/dcms-voluntary-code-explained",
    },
  ],
};

export default function DCMSVoluntaryCodeArticle() {
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
            Understanding the DCMS Voluntary Code of Good Practice for Prize Draw Operators
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
          {/* Key Stats Callout */}
          <div className="bg-gradient-to-br from-[var(--veristiq-snow)] to-white border border-gray-200 rounded-2xl p-8 mb-16">
            <h2 className="text-lg font-bold text-[var(--veristiq-slate)] mb-6">
              UK Prize Draw Market at a Glance
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PoundSterling className="w-5 h-5 text-[var(--veristiq-primary-blue)]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--veristiq-slate)]">
                    £1.3B
                  </div>
                  <div className="text-sm text-gray-500">Annual market value</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[var(--veristiq-primary-blue)]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--veristiq-slate)]">
                    7M+
                  </div>
                  <div className="text-sm text-gray-500">Adult participants</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-[var(--veristiq-primary-blue)]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--veristiq-slate)]">
                    400+
                  </div>
                  <div className="text-sm text-gray-500">Active operators</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-6">
              Source: DCMS-commissioned research, 2023
            </p>
          </div>

          {/* Lead Paragraph */}
          <p className="text-xl text-[var(--veristiq-slate)] leading-relaxed mb-8">
            The DCMS Voluntary Code of Good Practice for Prize Draw Operators was
            introduced to address a rapidly growing part of the UK consumer
            landscape: online prize draws and competitions that operate outside
            the Gambling Act 2005 by offering a free entry route alongside paid
            entry.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            While these prize draws do not require a gambling licence, they sit
            adjacent to the gambling industry in both scale and player behaviour.
            Independent research commissioned by DCMS in 2023 estimated the UK
            prize draw market to be worth £1.3 billion annually, with over 7
            million adult participants and more than 400 operators. The same
            research also highlighted overlap with gambling participation and
            evidence of gambling-related harm among some prize draw participants.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            The Voluntary Code is the Government&apos;s response to that context.
            It is intended to strengthen player protections, increase
            transparency, and improve accountability across the sector — without
            replacing existing regulation or creating a new licensing regime.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            This article provides a plain-language overview of what the Code
            covers, what it does not do, and what it signals for prize draw
            operators. This article is intended to explain the scope and intent of the Code in plain language, not to provide legal advice or compliance guidance.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: Scope */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            What the Code applies to — and what it doesn&apos;t
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            The Code applies to prize draws and competitions determined by chance
            where players can choose between a paid entry route and a free entry
            route. These are often referred to as &quot;free draws&quot;.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            It does not apply to operators who solely run skill-based competitions
            (where success depends on skill, judgement, or knowledge), provided
            those competitions meet the relevant legal tests under the Gambling
            Act.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            Where an operator offers both skill-based competitions and free draws,
            the Code applies only to the free draw aspect of their business.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            Importantly, the Code does not replace existing obligations under
            consumer protection law, advertising standards (CAP and BCAP), data
            protection, or other applicable regulation. Compliance with the Code
            does not automatically mean compliance with those regimes, and
            non-compliance with the Code is not, by itself, a breach of law.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: Why */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            Why the Code exists
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            Although prize draws are lawful without a licence, DCMS research
            highlighted several concerns:
          </p>

          <ul className="space-y-3 mb-12">
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              High levels of participation among individuals who also gamble
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Evidence of gambling-related harm among some prize draw participants
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Inconsistent standards across operators
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Limited transparency around draw mechanics, free entry routes, and
              evidence of fairness
            </li>
          </ul>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            The Code is intended to raise baseline standards across the sector
            while allowing for continued economic growth.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: Structure */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            Structure of the Code
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-8">
            The Code is organised into three sections:
          </p>

          <div className="bg-[var(--veristiq-snow)] rounded-xl border border-gray-200 overflow-hidden mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left font-semibold text-[var(--veristiq-slate)]">
                    Section
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-[var(--veristiq-slate)]">
                    Focus Area
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white">
                  <td className="px-6 py-4 font-medium text-[var(--veristiq-slate)]">
                    1. Player Protections
                  </td>
                  <td className="px-6 py-4 text-[var(--veristiq-slate-light)]">
                    Age verification, spend limits, harm indicators, support
                    signposting
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 font-medium text-[var(--veristiq-slate)]">
                    2. Transparency
                  </td>
                  <td className="px-6 py-4 text-[var(--veristiq-slate-light)]">
                    Draw mechanics, free entry prominence, odds disclosure,
                    independent verification
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 font-medium text-[var(--veristiq-slate)]">
                    3. Accountability
                  </td>
                  <td className="px-6 py-4 text-[var(--veristiq-slate-light)]">
                    Internal monitoring, third-party compliance, public reporting
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            Each section outlines measures that signatory operators are expected
            to implement in good faith.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section 1: Player Protections */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            1. Player protections
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            The player protection measures focus on reducing potential harm and
            improving safeguards. Key expectations include:
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Restricting prize draws to players aged 18 and over, supported by
              reasonable age-verification processes
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Having clear, transparent complaints and dispute-resolution processes
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Limiting credit card usage, including a £250 monthly cap and a
              prohibition on credit cards for instant-win draws
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Setting or enabling monthly spend limits, including the option for
              players to set a limit of £0
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Providing tools for account suspension or permanent closure
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Monitoring player behaviour to identify indicators of harm
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Taking proportionate, tailored action where harm indicators are
              identified
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Signposting players to appropriate support services
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Avoiding irresponsible marketing and ensuring advertising complies
              with CAP and BCAP rules
            </li>
          </ul>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            The emphasis throughout is on proportionality and reasonable effort,
            rather than rigid prescription.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section 2: Transparency */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            2. Transparency
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            The transparency section is particularly relevant to how prize draws
            are run and evidenced. It includes expectations that operators:
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Clearly explain how each prize draw works, including rules and
              mechanisms
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Award prizes fairly and in accordance with published terms
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Ensure all entries — paid and free — have an equal chance of winning
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              <span>
                Use an independent person, supervised process, or a{" "}
                <strong className="text-[var(--veristiq-slate)] font-semibold">
                  verifiably random and auditable computer process
                </strong>{" "}
                for winner selection
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Provide information about odds or likelihood of winning where
              possible
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Clearly and prominently explain free entry routes before purchase
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Award prizes promptly and avoid altering draws due to low ticket
              sales
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Be transparent about charitable contributions where these are part of
              the draw
            </li>
          </ul>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            Notably, the Code does not mandate a specific technical solution.
            Instead, it focuses on outcomes: fairness, clarity, and the ability to
            explain how a draw was conducted.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section 3: Accountability */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            3. Accountability
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            The accountability measures focus on how operators manage and
            demonstrate adherence to the Code. Expectations include:
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Having internal processes to monitor compliance with the Code
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Taking action where gaps or weaknesses are identified
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Ensuring relevant third parties (such as affiliates or technical
              partners) also comply
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Publishing information about the measures in place to meet the
              Code&apos;s requirements
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Engaging with other operators to share best practice
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Working with DCMS to help the Code remain effective over time
            </li>
          </ul>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            The Code also sets out how concerns about non-compliance should be
            raised, starting with the relevant organisation and, where
            appropriate, DCMS.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: Implementation */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            Implementation and oversight
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            Signatories agreed to fully implement the Code within six months of
            publication, and{" "}
            <strong className="text-[var(--veristiq-slate)] font-semibold">
              no later than 20 May 2026
            </strong>
            . Operators joining after that date are expected to comply
            immediately.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            DCMS retains oversight of the Code and may delegate this to an
            industry trade body in future. The Code will be reviewed periodically,
            and DCMS has reserved the right to amend it if necessary.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: Signals */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            What the Code signals — beyond its text
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            The Voluntary Code does not introduce new law, licensing, or mandatory
            third-party requirements. However, it does signal a clear direction of
            travel:
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Greater emphasis on transparency and evidence
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Increased attention to player protection in a sector adjacent to
              gambling
            </li>
            <li className="flex items-start gap-3 text-lg text-[var(--veristiq-slate-light)]">
              <span className="w-2 h-2 bg-[var(--veristiq-primary-blue)] rounded-full mt-2.5 flex-shrink-0" />
              Higher expectations around accountability and explanation
            </li>
          </ul>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            For operators, this means thinking not just about intent, but about
            how processes and outcomes can be explained and evidenced if questioned
            — by players, media, or authorities.
          </p>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* Section: Independent Verification */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">
            Where independent verification fits within the Code
          </h2>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            The DCMS Voluntary Code does not mandate any specific technology or third-party service. However, it places clear emphasis on transparency, accountability, and the ability to explain how prize draws are conducted.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-6">
            One approach some operators are exploring is the use of independent verification infrastructure to separate draw execution from evidence and proof. In this model, operators retain full operational control over competitions, while an external system records entries and draw outcomes in a tamper-evident way and produces verifiable audit records.
          </p>

          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            Veristiq is one example of this type of infrastructure. It is designed to provide independent technical evidence of how a draw was conducted, rather than to replace operator responsibilities or provide compliance advice.
          </p>

          {/* Responsibility Statement */}
          <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed mb-12">
            Ultimately, responsibility for lawful operation, player protection, advertising standards, and compliance with all applicable regulation remains with the operator. The Voluntary Code sets expectations around good practice, but does not replace existing legal obligations.
          </p>

          {/* External Link to Official Document */}
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 mb-8">
            <div className="flex items-start gap-4">
              <ExternalLink className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[var(--veristiq-slate)] mb-1">
                  Read the full DCMS Voluntary Code
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  The official document is published on GOV.UK
                </p>
                <a
                  href="https://www.gov.uk/government/publications/voluntary-code-of-good-practice-for-prize-draw-operators"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--veristiq-primary-blue)] hover:underline inline-flex items-center gap-1"
                >
                  View on GOV.UK
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200 my-12" />

          {/* FAQ Section */}
          <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-8">
            Common Questions About the DCMS Voluntary Code
          </h2>

          <div className="space-y-6 mb-12">
            <div className="bg-[var(--veristiq-snow)] rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-3">
                What is the DCMS Voluntary Code for Prize Draw Operators?
              </h3>
              <p className="text-[var(--veristiq-slate-light)]">
                The DCMS Voluntary Code of Good Practice for Prize Draw Operators
                is a set of guidelines introduced by the Department for Culture,
                Media and Sport to strengthen player protections, increase
                transparency, and improve accountability in the UK prize draw
                sector. It applies to prize draws that offer both paid and free
                entry routes.
              </p>
            </div>

            <div className="bg-[var(--veristiq-snow)] rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-3">
                When does the DCMS Voluntary Code come into effect?
              </h3>
              <p className="text-[var(--veristiq-slate-light)]">
                Signatories agreed to fully implement the Code within six months
                of publication, and no later than 20 May 2026. Operators joining
                after that date are expected to comply immediately.
              </p>
            </div>

            <div className="bg-[var(--veristiq-snow)] rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-[var(--veristiq-slate)] mb-3">
                Is the DCMS Voluntary Code legally binding?
              </h3>
              <p className="text-[var(--veristiq-slate-light)]">
                No, the Code is voluntary and does not introduce new law or
                licensing requirements. However, it signals clear expectations
                from government and may influence how operators are perceived by
                regulators, media, and players.
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
                  href="/blog/evidence-of-fairness-prize-draws"
                  className="text-[var(--veristiq-primary-blue)] hover:underline"
                >
                  What &quot;Evidence of Fairness&quot; Means in Practice for
                  Prize Draws →
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
              <strong>Note:</strong> This article is intended to explain the DCMS
              Voluntary Code in context, not to provide legal advice or compliance
              guidance. Operators should review the Code in full and consider their
              own legal and operational obligations when assessing how it applies
              to their business.
            </p>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--veristiq-slate)] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-10"></div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to meet DCMS transparency requirements?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Veristiq provides independent verification infrastructure that makes
            every draw auditable and publicly verifiable.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/compliance">
              <Button className="bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white px-8 py-6 text-lg h-auto shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5">
                View Compliance Mapping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/access">
              <Button
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 px-8 py-6 text-lg h-auto transition-all hover:-translate-y-0.5"
              >
                Get Access
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
