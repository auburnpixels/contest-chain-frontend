import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
    HelpCircle, 
    Shield, 
    Plug, 
    FileCheck, 
    MessageCircle,
    Database,
    Rocket,
    Dices,
    Eye,
    LayoutDashboard
} from "lucide-react";
import Link from "next/link";

interface FaqCategory {
    title: string;
    icon: React.ReactNode;
    items: { question: string; answer: string }[];
}

export default function FaqPage() {
    const categories: FaqCategory[] = [
        {
            title: "About Veristiq",
            icon: <HelpCircle className="w-5 h-5" />,
            items: [
                {
                    question: "What is Veristiq?",
                    answer: "Veristiq is an independent verification infrastructure for online prize competitions. We operate as a neutral third-party, recording entries and draw events immutably and producing public, verifiable evidence of how a draw was conducted. Veristiq does not run competitions or select winners manually — it exists solely to provide proof.\n"
                },
                {
                    question: "Why do I need independent verification?",
                    answer: "As prize competitions grow, expectations around transparency are increasing. Most operators currently rely on internal systems, screen recordings, or private logs to evidence fairness. While common, these methods are difficult for third parties to independently verify. Veristiq provides a neutral, mathematical record of what happened during a draw, helping operators demonstrate transparency, reduce disputes, and respond confidently to scrutiny."
                },
                {
                    question: "Is Veristiq a regulator?",
                    answer: "No. We are a technology provider. We don't issue licenses, enforce rules, or have any regulatory authority. Instead, we provide the technical infrastructure that allows you to demonstrate compliance with fairness regulations. We provide the technical evidence. You retain responsibility for operating your competitions lawfully."
                },
                {
                    question: "Who is Veristiq for?",
                    answer: "Veristiq is designed for operators and platforms running online prize competitions who want independent, third-party evidence of draw integrity. It’s intended for established operators, agencies managing multiple brands, and platform providers integrating verification at an infrastructure level."
                },
                {
                    question: "What Veristiq does not do?",
                    answer: "Veristiq does not: sell tickets, manage competitions, set rules or pricing, fulfill prizes, provide legal or compliance advice. Our role is limited to independent verification and evidence."
                }
            ]
        },
        {
            title: "Getting Started",
            icon: <Rocket className="w-5 h-5" />,
            items: [
                {
                    question: "How do I get access to Veristiq?",
                    answer: "Veristiq is currently available by invitation while we work with a small number of operators and platform partners. If you’d like to explore suitability or discuss integration, contact us to arrange access.\n"
                },
                {
                    question: "Do I need a developer to use Veristiq?",
                    answer: "Yes, for full integration. Veristiq is an API-first platform—your existing competition platform needs to send entry data to our system and trigger draws via API calls. This typically requires developer involvement. However, the dashboard itself is user-friendly for non-technical users to monitor competitions and access reports."
                },
                {
                    question: "How long does integration take?",
                    answer: "Once access is granted, full integration with your platform typically takes 1–3 days of developer time, depending on your system’s complexity."
                }
            ]
        },
        {
            title: "API Integration",
            icon: <Plug className="w-5 h-5" />,
            items: [
                {
                    question: "How does the API integration work?",
                    answer: "You generate an API key from your dashboard, then configure your platform to send requests to our REST API. The core workflow is: (1) create a competition, (2) sync entries as they're purchased, (3) trigger the draw when the competition closes. We return the winner(s) and create a full audit trail automatically."
                },
                {
                    question: "How do I authenticate API requests?",
                    answer: "All API requests require an API key passed in the X-API-KEY header. You can create and manage API keys from your dashboard. Keys can be revoked at any time if compromised, and we recommend rotating keys periodically for security."
                },
                {
                    question: "Does integrating Veristiq slow down my website?",
                    answer: "No. The integration is asynchronous—you send entry data to our API in the background (e.g., via a queue after checkout completes), and draws happen on our servers. Your customer checkout and entry experience remains fast and responsive."
                },
                {
                    question: "Do you support webhooks?",
                    answer: "Yes. You can configure webhook endpoints from your dashboard to receive real-time notifications when draws complete, entries are recorded, or other events occur. This allows your system to react to events without polling the API."
                },
                {
                    question: "Where can I find API documentation?",
                    answer: "Full API documentation is available on our docs page, including endpoint references, request/response examples, and integration guides. We also provide code snippets showing common integration patterns."
                },
                {
                    question: "What happens if Veristiq is unavailable at draw time?",
                    answer: "Veristiq is designed to be highly available, but operators retain full control over when a draw is executed. If our service is temporarily unavailable, the draw simply does not execute until connectivity is restored. No partial or silent draws can occur."
                }
            ]
        },
        {
            title: "Competitions & Entries",
            icon: <Dices className="w-5 h-5" />,
            items: [
                {
                    question: "How do I create a competition?",
                    answer: "Competitions are created via the API. You send a request with competition details—name, external ID (your reference), draw date, prize information, and other metadata. The competition is immediately available to receive entries."
                },
                {
                    question: "How do entries get into Veristiq?",
                    answer: "Your platform sends entry data to our API as purchases complete. Each entry includes a unique ticket ID (from your system), a user reference (anonymized identifier), and the entry type (paid or free). We recommend sending entries via a background queue so it doesn't block your checkout flow."
                },
                {
                    question: "How do you handle free postal entries?",
                    answer: "Free entries are sent via a dedicated API endpoint. They're logged in the same tamper-evident ledger as paid entries and receive identical treatment in the draw—a key requirement for UK competition compliance. The audit trail proves free entries were included fairly."
                },
                {
                    question: "What if I need to void or cancel an entry?",
                    answer: "You can delete entries via API before the competition closes. This removes them from the draw pool. The deletion is logged in the audit trail for transparency, showing the entry existed but was voided (e.g., due to refund)."
                },
                {
                    question: "Can I run multiple competitions at the same time?",
                    answer: "Yes, there's no limit to concurrent competitions. Each competition has its own entry pool, audit trail, and draw execution. You manage them all from a single dashboard and API integration."
                },
                {
                    question: "What is the competition lifecycle?",
                    answer: "Competitions go through several statuses: 'Active' (open for entries), 'Closed' (entries complete, awaiting draw), 'Awaiting Draw' (ready for draw execution), and 'Completed' (draw executed, winners selected). You control the transitions via API calls."
                }
            ]
        },
        {
            title: "Draws & Winners",
            icon: <Dices className="w-5 h-5" />,
            items: [
                {
                    question: "How do I trigger a draw?",
                    answer: "Draws are triggered via API. When your competition is closed and you're ready to select winners, your system calls our draw endpoint. The draw executes immediately and returns the winner(s), with a full audit trail recorded automatically."
                },
                {
                    question: "How does the random selection work?",
                    answer: "We use a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) seeded with external entropy at draw time. The seed is logged in the audit chain, making the selection verifiable by anyone but impossible to predict before the draw."
                },
                {
                    question: "What information do I get back after a draw?",
                    answer: "The API response includes the winning ticket ID(s), user reference(s), prize details, the random seed used, and a unique audit ID. You use this information to notify winners and fulfill prizes on your end."
                },
                {
                    question: "Can a draw be reversed or redone?",
                    answer: "No. Once a draw is executed and recorded on the audit chain, it cannot be altered or reversed—this is fundamental to audit integrity. If exceptional circumstances require a new selection, you would need to run a new, properly documented draw and explain the situation transparently."
                },
                {
                    question: "How quickly does a draw execute?",
                    answer: "Draws execute in milliseconds. The API call returns the result immediately along with the full audit record. There's no waiting or processing delay."
                }
            ]
        },
        {
            title: "Security & Verification",
            icon: <Shield className="w-5 h-5" />,
            items: [
                {
                    question: "Can Veristiq or operators manipulate draw results?",
                    answer: "No. The system is designed so that even we cannot influence outcomes. Entries are cryptographically committed before the draw, and the random seed is derived from external sources at draw time. Once entries are synced, neither party can modify the entry pool or control the selection."
                },
                {
                    question: "Who controls when a draw is executed?",
                    answer: "Operators retain full control over when a draw is triggered. Veristiq does not initiate draws automatically or on its own. This ensures operational control remains with the operator while verification remains independent."
                },
                {
                    question: "What is the commit-reveal scheme?",
                    answer: "Before the draw, all entries are hashed and 'committed' to the ledger—like sealing an envelope. The random seed is also committed before it's used. When the draw executes, the 'reveal' shows how the committed entries and seed mathematically determined the winner. This proves no one could have known or influenced the outcome."
                },
                {
                    question: "What is chain integrity?",
                    answer: "Every draw event is cryptographically linked to the previous one, forming an immutable chain (similar to blockchain technology). If anyone attempted to tamper with a past record, the chain would break and it would be immediately detectable. Your dashboard shows the real-time integrity status of your audit chain."
                },
                {
                    question: "How can I prove a draw was fair?",
                    answer: "Every draw generates a public audit page with a unique URL. This page shows the cryptographic proofs, entry count, random seed, and selection process. You can share this URL with players, regulators, or anyone who wants to verify the draw's fairness."
                }
            ]
        },
        {
            title: "Public Audit Pages",
            icon: <Eye className="w-5 h-5" />,
            items: [
                {
                    question: "What are public audit pages?",
                    answer: "Every completed draw has a public audit page—a permanent URL that displays the draw's cryptographic proofs, entry statistics, winner selection, and verification data. Anyone with the URL can view this page without logging in."
                },
                {
                    question: "Can players verify their entry was included?",
                    answer: "Yes. We provide a public ticket verification page where players can enter their ticket number to confirm their entry was recorded in the draw pool and see the draw result. You can link to this from your website."
                },
                {
                    question: "What if a player disputes a draw result?",
                    answer: "Point them to the public audit page. It shows how the winner was selected from the recorded entry pool and provides a clear, verifiable record of how the draw was conducted. This typically resolves disputes quickly"
                },
                {
                    question: "Should I link to audit pages from my website?",
                    answer: "Yes, we strongly recommend it. Linking to public audit pages demonstrates transparency and builds trust with your players. Many operators include audit page links on their competition pages and winner announcements."
                }
            ]
        },
        {
            title: "Data & Privacy",
            icon: <Database className="w-5 h-5" />,
            items: [
                {
                    question: "What data does Veristiq store?",
                    answer: "We practice strict data minimization. We store: competition metadata, entry records (ticket ID, anonymized user reference, entry type), draw results, and cryptographic proofs. We do not require—and prefer not to receive—personal data like names, emails, phone numbers, or addresses."
                },
                {
                    question: "Why do you recommend anonymized user references?",
                    answer: "For privacy. Instead of sending us a customer's email, send a hashed version or an internal user ID. This allows us to detect duplicate entries and link entries to users without holding personal data. It simplifies your GDPR obligations and reduces data exposure risk."
                },
                {
                    question: "Is Veristiq GDPR compliant?",
                    answer: "Yes. We process only the minimum data necessary for draw verification. Our servers are in secure data centers. Since we recommend anonymized identifiers rather than PII, your GDPR obligations are simplified. We're happy to sign a Data Processing Agreement (DPA) if required."
                },
                {
                    question: "Can I export my data?",
                    answer: "Yes. You can export competition data, entry records, and audit trails from your dashboard at any time. This is your data and we make it fully accessible."
                }
            ]
        },
        {
            title: "Compliance",
            icon: <FileCheck className="w-5 h-5" />,
            items: [
                {
                    question: "Does Veristiq make me compliant with the DCMS Code?",
                    answer: "Veristiq provides the technical evidence the Code requires—specifically independent verification, auditable logs, and transparency about draw mechanics. While our tools provide the proof, you remain responsible for operational compliance: clear terms and conditions, age verification, prize fulfillment, customer service, and fair advertising."
                },
                {
                    question: "How does Veristiq help with free postal entry requirements?",
                    answer: "UK competition law requires free entry routes (typically postal) to be treated equally to paid entries. Veristiq logs all entries—paid and free—in the same tamper-evident ledger. The audit trail proves free entries were included in the draw pool and had equal odds of winning."
                },
                {
                    question: "What if a regulator requests an audit?",
                    answer: "Veristiq provides detailed audit data and verification records for each competition. These records can be shared directly with regulators or exported for reporting purposes. Formal, formatted compliance reports are planned but not currently automated."
                },
                {
                    question: "How do I handle player complaints?",
                    answer: "Veristiq supports linking draw verification data to complaints or disputes raised on your platform, creating an auditable record of how issues were resolved."
                }
            ]
        },
        {
            title: "Dashboard & Support",
            icon: <LayoutDashboard className="w-5 h-5" />,
            items: [
                {
                    question: "What can I see in the dashboard?",
                    answer: "The dashboard provides a complete overview: active competitions, entry counts, linked disputes, chain integrity status, recent draw results, and attention alerts for issues needing action. Each section has detailed views with filtering and export options."
                },
                {
                    question: "How do I manage API keys?",
                    answer: "The API Keys section of your dashboard lets you create new keys, view existing keys (masked after creation), see last-used timestamps, and revoke compromised keys. We recommend creating separate keys for different environments (production, staging) and rotating them periodically."
                },
                {
                    question: "What are 'attention' alerts?",
                    answer: "Attention alerts highlight competitions needing action—overdue draws, unresolved complaints, or missing audit data. This helps you stay on top of operational issues and maintain compliance."
                },
                {
                    question: "How do I get help with integration?",
                    answer: "Our documentation covers most integration scenarios with code examples. For specific questions, contact our support team through the contact page. We're happy to review your integration approach and provide guidance."
                }
            ]
        }
    ];

    const totalQuestions = categories.reduce((sum, cat) => sum + cat.items.length, 0);

    return (
        <div className="min-h-screen bg-[var(--veristiq-snow)] font-sans text-[var(--veristiq-slate)] flex flex-col">
            <SiteHeader />
            
            {/* Hero Section */}
            <div className="relative bg-[var(--veristiq-slate)] pt-32 pb-28 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-2xl mb-8 backdrop-blur-sm shadow-lg ring-1 ring-white/20 animate-in fade-in zoom-in-95 duration-500">
                        <HelpCircle className="w-10 h-10 text-[var(--veristiq-primary-blue)]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                        Everything you need to know about Veristiq—from getting started to running compliant competitions.
                    </p>
                </div>
            </div>

            {/* Quick Jump Navigation */}
            <div className="container mx-auto px-6 -mt-8 relative z-20 max-w-5xl">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 text-center">Jump to section</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category, idx) => (
                            <a 
                                key={idx}
                                href={`#${category.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--veristiq-slate)] hover:bg-[var(--veristiq-snow)] hover:text-[var(--veristiq-primary-blue)] transition-colors"
                            >
                                {category.icon}
                                <span className="hidden sm:inline">{category.title}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <main className="flex-1 container mx-auto px-6 py-16 max-w-3xl">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 space-y-10">
                    {categories.map((category, idx) => (
                        <div 
                            key={idx} 
                            id={category.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')} 
                            className="scroll-mt-32"
                        >
                            <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--veristiq-primary-blue)] to-blue-600 text-white shadow-md">
                                    {category.icon}
                                </div>
                                <h2 className="text-xl font-bold text-[var(--veristiq-slate)]">
                                    {category.title}
                                </h2>
                                <span className="ml-auto text-xs text-gray-400 tabular-nums">{category.items.length} questions</span>
                            </div>
                            <Accordion type="single" collapsible className="w-full">
                                {category.items.map((item, i) => (
                                    <AccordionItem key={i} value={`cat-${idx}-item-${i}`} className="border-b border-gray-100 last:border-0">
                                        <AccordionTrigger className="text-left text-base font-medium text-[var(--veristiq-slate)] py-4 hover:text-[var(--veristiq-primary-blue)] hover:no-underline transition-colors data-[state=open]:text-[var(--veristiq-primary-blue)]">
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-[var(--veristiq-slate-light)] pb-5 text-[15px] leading-relaxed">
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>

                {/* Still Have Questions CTA */}
                <div className="mt-16 bg-gradient-to-br from-[var(--veristiq-slate)] to-slate-800 rounded-2xl p-8 md:p-12 text-center shadow-xl relative">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6 backdrop-blur-sm">
                        <MessageCircle className="w-8 h-8 text-[var(--veristiq-primary-blue)]" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Still have questions?</h3>
                    <p className="text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">
                        Can&apos;t find what you&apos;re looking for? Our team is happy to help you understand how Veristiq fits your needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <Button size="lg" className="bg-white text-[var(--veristiq-slate)] hover:bg-gray-100 font-semibold px-8 shadow-lg">
                                Contact Us
                            </Button>
                        </Link>
                        <Link href="/docs">
                            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8">
                                View Documentation
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
            
            <SiteFooter />
        </div>
    );
}
