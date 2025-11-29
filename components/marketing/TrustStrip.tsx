export function TrustStrip() {
  return (
    <section className="py-10 border-y border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto text-center">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-8 uppercase tracking-widest">
          Trusted by modern competition platforms and digital prize operators
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Logo Placeholders - In a real scenario these would be SVGs or Images */}
          <div className="flex items-center gap-2">
             {/* Raffaly Mock Logo */}
             <div className="h-8 w-8 bg-zinc-900 dark:bg-zinc-100 rounded-sm"></div>
             <span className="text-xl font-bold text-zinc-900 dark:text-white">Raffaly</span>
          </div>

          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>

           {/* Generic Placeholders */}
           <span className="text-lg font-semibold text-zinc-400 dark:text-zinc-600">Platform Two</span>
           <span className="text-lg font-semibold text-zinc-400 dark:text-zinc-600">Operator Three</span>
           <span className="text-lg font-semibold text-zinc-400 dark:text-zinc-600">Charity Draw</span>
        </div>
      </div>
    </section>
  );
}

