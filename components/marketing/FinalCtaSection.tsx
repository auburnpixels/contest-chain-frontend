import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto text-center">
        
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Start running <span className="text-brand-cobalt">transparent competitions</span> today.
          </h2>
          
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Protect your reputation. Build player trust. Demonstrate fairness.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-brand-cobalt text-white hover:bg-brand-cobalt/90 h-14 px-10 text-lg w-full sm:w-auto" 
              asChild
            >
              <Link href="/operator/register">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-10 text-lg w-full sm:w-auto border-zinc-300 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800" 
              asChild
            >
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" /> Contact Us
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}

