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
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                </div>

                <div className="aspect-[16/9] bg-white rounded border border-gray-100 flex relative overflow-hidden shadow-inner">
                    <img src="/dashboard.png" alt="Screenshot showing an example dashboard" />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
