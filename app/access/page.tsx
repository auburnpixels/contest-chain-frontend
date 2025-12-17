import type { Metadata } from "next";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: "Request Access — Veristiq",
  description: "Request access to Veristiq's prize draw verification platform. We're working with select operators to validate fit.",
  openGraph: {
    title: "Request Access — Veristiq",
    description: "Request access to independent prize draw verification.",
  },
};

export default function AccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--veristiq-slate)] relative overflow-hidden p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="w-full max-w-lg relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-1 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 text-[var(--veristiq-primary-blue)]">
              <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-[var(--veristiq-primary-blue)]">VERISTIQ</span>
          </Link>
        </div>

        <Card className="border-gray-800 bg-white/95 backdrop-blur-sm shadow-2xl overflow-hidden px-5 py-10">
          <CardHeader className="space-y-1 pb-2 text-center border-b border-gray-100 bg-gray-50/50 gap-2">
            <CardTitle className="text-xl font-bold text-[var(--veristiq-slate)] mb-0">
              Access currently by invitation
            </CardTitle>
            <CardDescription className="text-base">
              Early operator evaluation in progress
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <p className="text-[var(--veristiq-slate-light)] text-center leading-relaxed">
              Veristiq is in early operator evaluation with a small number of DCMS signatories and platform partners.
            </p>
            
            <p className="text-[var(--veristiq-slate-light)] text-center leading-relaxed">
              If you&apos;ve been invited to explore the system or would like to request a conversation, please get in touch.
            </p>

            <div className="flex flex-col items-center gap-4 pt-4">
              <a 
                href="mailto:liam@veristiq.com" 
                className="flex items-center gap-2 text-[var(--veristiq-primary-blue)] font-medium hover:underline transition-all"
              >
                <Mail className="h-4 w-4" />
                liam@veristiq.com
              </a>
              
              <div className="flex gap-3 w-full pt-4">
                <Link href="/" className="flex-1">
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-200 text-[var(--veristiq-slate)] hover:bg-gray-50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <Button 
                    className="w-full bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

