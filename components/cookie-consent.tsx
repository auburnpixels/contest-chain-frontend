"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";
import Link from "next/link";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-[var(--veristiq-slate)] text-white rounded-xl shadow-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5 text-[var(--veristiq-teal)]" />
            </div>
            <div>
              <p className="text-sm text-gray-200 leading-relaxed">
                We use cookies to improve your experience and analyze site usage.{" "}
                <Link href="/privacy" className="underline hover:text-white transition-colors">
                  Learn more
                </Link>
              </p>
            </div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="flex-1 sm:flex-initial border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="flex-1 sm:flex-initial bg-white text-[var(--veristiq-slate)] hover:bg-gray-100"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}








