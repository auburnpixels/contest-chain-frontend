import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShieldCheck } from 'lucide-react'
 
export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[var(--veristiq-snow)] text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
            <ShieldCheck className="w-12 h-12 text-[var(--veristiq-primary-blue)]" />
        </div>
        
        <h1 className="text-6xl font-bold text-[var(--veristiq-slate)] mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-[var(--veristiq-slate)] mb-4">Page Not Found</h2>
        <p className="text-[var(--veristiq-slate-light)] mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link href="/">
            <Button className="bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white px-8 py-6 h-auto text-lg shadow-lg hover:-translate-y-0.5 transition-all">
            Return Home
            </Button>
        </Link>
      </div>
    </div>
  )
}
