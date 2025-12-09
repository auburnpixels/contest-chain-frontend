import Image from "next/image";

export function ProductScreenshotSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 md:p-8 shadow-2xl">
            {/* Placeholder for actual screenshot */}
            <div className="aspect-[16/9] bg-white rounded border border-gray-200 flex items-center justify-center relative overflow-hidden group">
                 <div className="text-center">
                    <p className="text-[var(--veristiq-grey)] font-medium mb-2">Dashboard / Audit Page Screenshot</p>
                    <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4"></div>
                 </div>
                 
                 {/* Mock UI Elements to look like a dashboard */}
                 <div className="absolute top-0 left-0 w-full h-12 border-b border-gray-100 flex items-center px-4 gap-4">
                     <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                     <div className="w-32 h-3 rounded-full bg-gray-100"></div>
                 </div>
                 <div className="absolute top-12 left-0 w-48 h-full border-r border-gray-100 p-4 space-y-4">
                     <div className="w-full h-8 rounded bg-gray-100"></div>
                     <div className="w-full h-8 rounded bg-gray-50"></div>
                     <div className="w-full h-8 rounded bg-gray-50"></div>
                 </div>
                 <div className="absolute top-20 left-56 right-8 h-32 bg-gray-50 rounded border border-gray-100"></div>
                 <div className="absolute top-60 left-56 right-8 h-64 bg-white rounded border border-gray-100 shadow-sm"></div>
            </div>
        </div>
      </div>
    </section>
  );
}

