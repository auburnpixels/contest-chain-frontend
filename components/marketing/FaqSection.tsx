import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const faqs = [
    {
      question: "How does CAFAAS guarantee fairness?",
      answer: "By cryptographically linking every event to the previous one using a tamper-evident hash chain.",
    },
    {
      question: "Can CAFAAS influence draw results?",
      answer: "Absolutely not. Randomisation is deterministic and logged publicly.",
    },
    {
      question: "What happens if someone tries to manipulate the data?",
      answer: "Any change breaks the hash chain — and is immediately visible.",
    },
    {
      question: "Do players need an account to verify draws?",
      answer: "No. Audit pages are 100% public.",
    },
    {
      question: "Does CAFAAS replace regulators?",
      answer: "No. CAFAAS provides technical transparency tools; regulation remains external.",
    },
    {
      question: "Can CAFAAS be used outside the UK?",
      answer: "Yes — the platform is completely international.",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center text-zinc-900 dark:text-white mb-16">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-zinc-200 dark:border-zinc-800">
              <AccordionTrigger className="text-left text-lg font-medium text-zinc-900 dark:text-white py-6 hover:text-brand-cobalt transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-600 dark:text-zinc-400 pb-6 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

