import { Badge } from "@/components/ui/badge";

interface PageHeroProps {
  title: string;
  headline: string;
  subheadline?: string;
  badge?: string;
}

export function PageHero({ title, headline, subheadline, badge }: PageHeroProps) {
  return (
    <div className="bg-white dark:bg-black pt-32 pb-16 md:pb-24 border-b border-zinc-100 dark:border-zinc-900 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto text-center max-w-4xl">
        {badge ? (
          <div className="flex justify-center mb-6">
            <Badge variant="outline" className="border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-normal px-3 py-1">
              {badge}
            </Badge>
          </div>
        ) : (
           <p className="text-sm font-semibold text-brand-cobalt uppercase tracking-widest mb-6">
             {title}
           </p>
        )}
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
          {headline}
        </h1>
        
        {subheadline && (
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {subheadline}
          </p>
        )}
      </div>
    </div>
  );
}



















