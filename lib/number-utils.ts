/**
 * Number formatting utilities
 * Centralized number formatting functions for consistent display across the application
 */

/**
 * Format a number with thousand separators (commas)
 * @param value - Number or string to format
 * @returns Formatted number string with commas (e.g., "51,378")
 */
export function formatNumber(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === '') {
    return '0';
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) {
    return '0';
  }

  return num.toLocaleString('en-US');
}

/**
 * Format a number as currency (GBP)
 * @param value - Number or string to format
 * @param includePence - Whether to include pence (default: true)
 * @returns Formatted currency string (e.g., "£51,378.00")
 */
export function formatCurrency(
  value: number | string | null | undefined,
  includePence: boolean = true
): string {
  if (value === null || value === undefined || value === '') {
    return includePence ? '£0.00' : '£0';
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) {
    return includePence ? '£0.00' : '£0';
  }

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: includePence ? 2 : 0,
    maximumFractionDigits: includePence ? 2 : 0,
  }).format(num);
}

/**
 * Format a number as a percentage
 * @param value - Number or string to format (0-100 or 0-1)
 * @param decimals - Number of decimal places (default: 1)
 * @param isDecimal - Whether the input is in decimal format (0-1) vs percentage (0-100)
 * @returns Formatted percentage string (e.g., "85.5%")
 */
export function formatPercentage(
  value: number | string | null | undefined,
  decimals: number = 1,
  isDecimal: boolean = false
): string {
  if (value === null || value === undefined || value === '') {
    return '0%';
  }

  let num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) {
    return '0%';
  }

  // Convert decimal to percentage if needed
  if (isDecimal) {
    num = num * 100;
  }

  return `${num.toFixed(decimals)}%`;
}

/**
 * Format a large number with K/M/B suffixes
 * @param value - Number or string to format
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted string (e.g., "1.5K", "2.3M", "1.2B")
 */
export function formatCompactNumber(
  value: number | string | null | undefined,
  decimals: number = 1
): string {
  if (value === null || value === undefined || value === '') {
    return '0';
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) {
    return '0';
  }

  const absNum = Math.abs(num);

  if (absNum >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(decimals)}B`;
  }

  if (absNum >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(decimals)}M`;
  }

  if (absNum >= 1_000) {
    return `${(num / 1_000).toFixed(decimals)}K`;
  }

  return num.toString();
}

/**
 * Parse a formatted number string back to a number
 * @param value - Formatted string to parse
 * @returns Parsed number or null if invalid
 */
export function parseFormattedNumber(value: string | null | undefined): number | null {
  if (!value) {
    return null;
  }

  // Remove commas, currency symbols, and whitespace
  const cleaned = value.replace(/[£$,\s]/g, '');
  const num = parseFloat(cleaned);

  return isNaN(num) ? null : num;
}

/**
 * Number formatting utilities object
 * Use these for consistent number formatting throughout the app
 */
export const numberFormatters = {
  number: formatNumber,
  currency: formatCurrency,
  percentage: formatPercentage,
  compact: formatCompactNumber,
  parse: parseFormattedNumber,
};



