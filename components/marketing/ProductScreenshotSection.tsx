import Image from "next/image";

export function ProductScreenshotSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="relative group perspective-1000">
            {/* Glow effect behind */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-3xl blur-3xl opacity-50 -z-10 transform scale-95 group-hover:scale-100 transition-transform duration-700"></div>

            <div className="rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm p-4 md:p-6 shadow-2xl transform transition-all duration-700 hover:rotate-x-2 hover:scale-[1.01] origin-center preserve-3d">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 mb-4 px-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="ml-4 flex-1 h-8 bg-gray-100/50 rounded-md flex items-center px-4 text-xs text-gray-400 font-mono">
                        veristiq.io/audit/8f4b2e1a
                    </div>
                </div>

                {/* Dashboard Mockup */}
                <div className="aspect-[16/9] bg-white rounded border border-gray-100 flex relative overflow-hidden shadow-inner">
                     {/* Sidebar */}
                     <div className="w-64 border-r border-gray-100 bg-gray-50/50 p-6 hidden md:block">
                         <div className="space-y-4">
                             <div className="h-8 bg-gray-200/50 rounded w-3/4"></div>
                             <div className="h-4 bg-gray-200/50 rounded w-1/2"></div>
                             <div className="mt-8 space-y-3">
                                 <div className="h-8 bg-blue-50 rounded w-full border-l-4 border-[var(--veristiq-primary-blue)]"></div>
                                 <div className="h-8 bg-transparent rounded w-full"></div>
                                 <div className="h-8 bg-transparent rounded w-full"></div>
                             </div>
                         </div>
                     </div>

                     {/* Main Content */}
                     <div className="flex-1 p-8 bg-white">
                         <div className="flex justify-between items-center mb-8">
                             <div className="space-y-2">
                                 <div className="h-8 w-64 bg-gray-100 rounded"></div>
                                 <div className="h-4 w-32 bg-gray-50 rounded"></div>
                             </div>
                             <div className="h-10 w-32 bg-green-100 rounded-full"></div>
                         </div>

                         <div className="grid grid-cols-3 gap-6 mb-8">
                             <div className="h-32 bg-gray-50 rounded-xl border border-gray-100 p-4">
                                 <div className="w-8 h-8 bg-blue-100 rounded-full mb-4"></div>
                                 <div className="h-6 w-16 bg-gray-200 rounded mb-2"></div>
                                 <div className="h-4 w-24 bg-gray-100 rounded"></div>
                             </div>
                             <div className="h-32 bg-gray-50 rounded-xl border border-gray-100 p-4">
                                 <div className="w-8 h-8 bg-purple-100 rounded-full mb-4"></div>
                                 <div className="h-6 w-16 bg-gray-200 rounded mb-2"></div>
                                 <div className="h-4 w-24 bg-gray-100 rounded"></div>
                             </div>
                             <div className="h-32 bg-gray-50 rounded-xl border border-gray-100 p-4">
                                 <div className="w-8 h-8 bg-green-100 rounded-full mb-4"></div>
                                 <div className="h-6 w-16 bg-gray-200 rounded mb-2"></div>
                                 <div className="h-4 w-24 bg-gray-100 rounded"></div>
                             </div>
                         </div>

                         <div className="h-64 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center relative overflow-hidden">
                             <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,107,158,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite]"></div>
                             <div className="text-center opacity-30">
                                 <p className="font-mono text-xs">Chain Visualization</p>
                             </div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
