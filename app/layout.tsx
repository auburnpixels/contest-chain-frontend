import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CookieConsent } from "@/components/cookie-consent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Veristiq - Independent Fairness Verification",
  description: "A tamper-evident audit trail for prize draws. Prove every draw is fair. Build trust. Stay compliant.",
  openGraph: {
    title: "Veristiq - Independent Fairness Verification",
    description: "A tamper-evident audit trail for prize draws. Prove every draw is fair. Build trust. Stay compliant.",
    type: "website",
    locale: "en_GB",
    siteName: "Veristiq",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veristiq - Independent Fairness Verification",
    description: "A tamper-evident audit trail for prize draws.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <TooltipProvider>
          <AuthProvider>
            {children}
            <CookieConsent />
          </AuthProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
