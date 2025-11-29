import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqBlockProps {
  faqs: FaqItem[];
  title?: string;
}

export function FaqBlock({ faqs, title }: FaqBlockProps) {
  return (
    <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto max-w-3xl">
        {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-center text-zinc-900 dark:text-white mb-12">
            {title}
            </h2>
        )}

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






