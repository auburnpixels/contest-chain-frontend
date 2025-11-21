import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <SiteHeader />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto space-y-12">
           {/* Hero Skeleton */}
           <div className="space-y-6 text-center">
             <div className="h-8 w-64 bg-slate-900 rounded-full mx-auto animate-pulse" />
             <div className="h-20 w-3/4 bg-slate-900 rounded-xl mx-auto animate-pulse" />
             <div className="h-6 w-1/2 bg-slate-900 rounded-full mx-auto animate-pulse" />
           </div>

           {/* Grid Skeleton */}
           <div className="grid md:grid-cols-3 gap-8 pt-12">
             {[1, 2, 3].map((i) => (
               <div key={i} className="h-64 bg-slate-900/50 border border-slate-900 rounded-xl animate-pulse" />
             ))}
           </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full">
          <div className="h-24 bg-slate-950 border-t border-slate-900" />
      </div>
    </div>
  );
}



