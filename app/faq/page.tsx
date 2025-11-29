import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/marketing/PageHero";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

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
                    question: "What is CAFAAS in simple terms?",
                    answer: "CAFAAS is an independent fairness and audit platform for online competitions. It records entries and draws, creates tamper-evident audit logs and publishes public verification pages so you can prove your draws are fair."
                },
                {
                    question: "Are you a regulator or licensing authority?",
                    answer: "No. CAFAAS is not a regulator. We don’t issue licenses or legal approvals. We provide technical tools that help you demonstrate fairness and transparency."
                },
                {
                    question: "Who is CAFAAS for?",
                    answer: "Online competition and raffle operators, prize platforms, charities running ticketed draws, and any business that wants to prove its prize draws are fair."
                }
            ]
        },
        {
            title: "Fairness & draws",
            items: [
                {
                    question: "Can CAFAAS influence or “fix” draw results?",
                    answer: "No. CAFAAS uses deterministic randomisation and logs every step of the process, including seed hashes and entry pool hashes. The system is designed to show if tampering occurs, not enable it."
                },
                {
                    question: "Does CAFAAS pick winners automatically?",
                    answer: "CAFAAS runs the randomisation and records the result, but you are the one triggering the draw via the API or dashboard. You stay in control of when draws happen."
                },
                {
                    question: "Can I re-run a draw if I make a mistake?",
                    answer: "You can run draws for different prizes or reconfigure future competitions. However, historic draw events are recorded and audited. If a draw is re-run, that fact should be visible in the event history."
                }
            ]
        },
        {
            title: "Integration",
            items: [
                {
                    question: "Do I need a developer to use CAFAAS?",
                    answer: "For a full integration, yes — a developer or technical implementer is recommended. They’ll wire up the API so that competitions, entries and draws are synchronised. Over time, we may offer more no-code / low-code options."
                },
                {
                    question: "How long does integration usually take?",
                    answer: "It varies by platform, but many operators can implement the core flows (create competition, submit entries, trigger draws, show audit links) in a few days of focused development."
                },
                {
                    question: "Can I test CAFAAS before going live?",
                    answer: "Yes. We provide a test/sandbox environment where you can run fake competitions and draws without affecting live data."
                }
            ]
        },
        {
            title: "Data & privacy",
            items: [
                {
                    question: "What data about players do I need to send?",
                    answer: "At minimum, you send an external entry ID and whether the entry is eligible. You can send an anonymised user reference if you want to cross-check later. We encourage operators to avoid sending full personal details."
                },
                {
                    question: "Do you sell or share data with third parties?",
                    answer: "No, we do not sell your data. Data is used only to provide the CAFAAS service."
                },
                {
                    question: "Can players see other players’ data?",
                    answer: "No. Players see aggregate counts and the winning entry ID/ticket number, not personal information."
                }
            ]
        },
        {
            title: "Legal & compliance",
            items: [
                {
                    question: "Does using CAFAAS make me automatically compliant with gambling or promotion law?",
                    answer: "No. CAFAAS is a technical fairness and audit tool. You remain responsible for ensuring your competitions meet legal requirements in your jurisdiction (e.g. licensing, wording, no-purchase-necessary rules, age limits)."
                },
                {
                    question: "Can regulators use CAFAAS data?",
                    answer: "Yes. One of the goals of CAFAAS is to make it easier for regulators to understand what happened in a draw, if they need to investigate. You can share audit links or export data as needed."
                },
                {
                    question: "Do you provide legal advice?",
                    answer: "No. We are not a law firm and do not provide legal advice. We suggest speaking to a qualified professional about any regulatory questions."
                }
            ]
        },
        {
            title: "Pricing & plans",
            items: [
                {
                    question: "Do I have to pay per competition?",
                    answer: "No. You pay a monthly subscription plus a per-draw fee. You can run as many competitions as you like — you only pay per draw when winners are selected."
                },
                {
                    question: "Is there a free trial?",
                    answer: "Yes, we offer 14 days and 50 free draws to help you test the platform integration."
                },
                {
                    question: "What happens to my audits if I cancel?",
                    answer: "Audit history for past draws remains available for a defined retention period, so you still have proof of what happened."
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-brand-cobalt/20 selection:text-brand-cobalt">
            <SiteHeader />
            <main>
                <PageHero
                    title="FAQ"
                    headline="Frequently Asked Questions"
                    subheadline="Here are answers to the most common questions from operators about how CAFAAS works, how it integrates with your existing platform and what it does (and doesn’t) do."
                />

                <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
                    <div className="container px-4 md:px-6 mx-auto max-w-3xl space-y-20">
                        {categories.map((category, idx) => (
                            <div key={idx}>
                                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-900">
                                    {category.title}
                                </h2>
                                <Accordion type="single" collapsible className="w-full">
                                    {category.items.map((item, i) => (
                                        <AccordionItem key={i} value={`cat-${idx}-item-${i}`} className="border-b border-zinc-200 dark:border-zinc-800">
                                            <AccordionTrigger className="text-left text-lg font-medium text-zinc-900 dark:text-white py-6 hover:text-brand-cobalt transition-colors">
                                                {item.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-zinc-600 dark:text-zinc-400 pb-6 text-base leading-relaxed">
                                                {item.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
