import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FaqCategory {
    title: string;
    items: { question: string; answer: string }[];
}

export default function FaqPage() {
    const categories: FaqCategory[] = [
        {
            title: "General",
            items: [
                {
                    question: "What is Veristiq?",
                    answer: "Veristiq is an independent fairness verification platform. We act as a digital auditor for online competitions, creating a tamper-evident record of every entry and draw result."
                },
                {
                    question: "Why do I need independent verification?",
                    answer: "Trust is the currency of the competition industry. Players and regulators are increasingly skeptical of 'black box' draws. Veristiq provides mathematical proof that your draws are fair, protecting your reputation and helping you meet compliance standards."
                },
                {
                    question: "Is Veristiq a regulator?",
                    answer: "No. We are a technology provider. We don’t issue licenses. Instead, we provide the technical infrastructure that allows you to demonstrate compliance with fairness regulations and voluntary codes (like the DCMS Code)."
                }
            ]
        },
        {
            title: "Technology & Security",
            items: [
                {
                    question: "How is the random number generation (RNG) secured?",
                    answer: "We use a cryptographically secure RNG that is seeded with external entropy (like atmospheric noise or blockchain block hashes) just before the draw. This seed is logged in the audit chain, making the result verifiable by anyone, but impossible to predict."
                },
                {
                    question: "Can Veristiq or the operator 'fix' a draw?",
                    answer: "No. The system uses a 'Commit-Reveal' scheme. All entries are hashed and committed to the ledger *before* the draw takes place. The random seed is also committed before use. This means the outcome is mathematically determined by inputs that cannot be changed once the draw begins."
                },
                {
                    question: "What happens if my site goes down?",
                    answer: "Veristiq operates independently of your website. Once entry data is synced to our system, the draw can proceed securely on our infrastructure, ensuring no data is lost and the draw completes successfully."
                }
            ]
        },
        {
            title: "Integration & Operations",
            items: [
                {
                    question: "Does integrating Veristiq slow down my website?",
                    answer: "No. The integration is asynchronous. You send entry data to our API in the background (e.g., via a queue). The actual draw processing happens on our servers, so your customer experience remains fast and responsive."
                },
                {
                    question: "Do I need a developer to integrate?",
                    answer: "Yes, for a seamless automated experience, a developer will need to connect your platform to our API. It typically takes 1-3 days. We provide comprehensive documentation and SDKs to make this easy."
                },
                {
                    question: "What data do you store?",
                    answer: "We practice data minimization. We only require a unique Ticket ID and an anonymized User Reference to verify a draw. We do *not* need (and prefer not to receive) PII like names, emails, or addresses."
                }
            ]
        },
        {
            title: "Compliance & Legal",
            items: [
                {
                    question: "Does Veristiq ensure I meet the DCMS Voluntary Code?",
                    answer: "Veristiq provides the *technical evidence* required by the Code—specifically independent verification, auditable logs, and transparency. While our tools provide the proof, you are responsible for your overall operational compliance (e.g., terms and conditions, age verification)."
                },
                {
                    question: "Can I use Veristiq for free draws?",
                    answer: "Yes. The system supports paid, free (postal), and promotional entries equally. They are all logged in the same tamper-evident ledger, ensuring free entries are treated exactly the same as paid ones."
                },
                {
                    question: "What happens if a regulator asks for an audit?",
                    answer: "You can generate a comprehensive compliance report from your dashboard instantly. This report includes the full audit trail, cryptographic proofs, and entry statistics for any given competition."
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--veristiq-snow)] font-sans text-[var(--veristiq-slate)] flex flex-col">
            <SiteHeader />
            
            {/* Hero Section */}
            <div className="relative bg-[var(--veristiq-slate)] pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                         <HelpCircle className="w-8 h-8 text-[var(--veristiq-teal)]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Frequently Asked Questions</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Answers to common questions about how Veristiq works, integrates, and ensures fairness.
                    </p>
                </div>
            </div>

            <main className="flex-1 container mx-auto px-6 py-20 max-w-3xl -mt-12 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12 space-y-16">
                    {categories.map((category, idx) => (
                        <div key={idx}>
                            <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6 pb-4 border-b border-gray-100 flex items-center gap-3">
                                <div className="h-8 w-1 bg-[var(--veristiq-primary-blue)] rounded-full"></div>
                                {category.title}
                            </h2>
                            <Accordion type="single" collapsible className="w-full">
                                {category.items.map((item, i) => (
                                    <AccordionItem key={i} value={`cat-${idx}-item-${i}`} className="border-b border-gray-100 last:border-0">
                                        <AccordionTrigger className="text-left text-lg font-medium text-[var(--veristiq-slate)] py-5 hover:text-[var(--veristiq-primary-blue)] hover:no-underline transition-colors data-[state=open]:text-[var(--veristiq-primary-blue)]">
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-[var(--veristiq-slate-light)] pb-6 text-base leading-relaxed">
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
