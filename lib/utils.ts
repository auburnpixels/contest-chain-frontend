import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Masks an email address by showing the first few characters and the domain
 * Example: nancyfaz@yahoo.co.uk becomes nancyfaz****@yahoo.co.uk
 */
export function maskEmail(email: string | null | undefined): string {
  if (!email) return '—';
  
  const atIndex = email.indexOf('@');
  if (atIndex === -1) {
    // Not a valid email format, return as is
    return email;
  }
  
  const username = email.substring(0, atIndex);
  const domain = email.substring(atIndex);
  
  // Show the full username, mask with 4 asterisks before the @
  return `${username}****${domain}`;
}

/**
 * Determines if an entry is eligible for the draw based on business logic:
 * - Deleted entries = not eligible
 * - Paid entries = eligible
 * - Free + correct answer = eligible
 * - Free + incorrect answer = not eligible
 * - Incorrect answer (any type) = not eligible
 */
export function isEntryEligible(eligible: boolean, deletedAt: string | null = null): boolean {
  // Deleted entries are never eligible
  if (deletedAt) return false;

  return eligible;
}




