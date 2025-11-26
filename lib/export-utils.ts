/**
 * Utilities for exporting data to various formats
 */

/**
 * Configuration for CSV column
 */
export interface CSVColumn<T> {
  key: keyof T | string;
  label: string;
  transform?: (value: any, row: T) => string | number;
}

/**
 * Export data to CSV file
 * 
 * @param data - Array of objects to export
 * @param filename - Name of the file (without extension)
 * @param columns - Column configuration
 * 
 * @example
 * ```typescript
 * exportToCSV(competitions, 'competitions-export', [
 *   { key: 'id', label: 'ID' },
 *   { key: 'name', label: 'Competition Name' },
 *   { key: 'created_at', label: 'Created', transform: (val) => new Date(val).toLocaleDateString() },
 * ]);
 * ```
 */
export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string,
  columns: CSVColumn<T>[]
): void {
  if (!data || data.length === 0) {
    throw new Error('No data to export');
  }

  // Create CSV header
  const csvHeaders = columns.map(col => escapeCSVValue(col.label)).join(',');

  // Create CSV rows
  const csvRows = data.map(row => {
    return columns
      .map(col => {
        const key = col.key as keyof T;
        let value = row[key];

        // Apply transform if provided
        if (col.transform) {
          value = col.transform(value, row);
        }

        // Handle null/undefined
        if (value === null || value === undefined) {
          return '';
        }

        return escapeCSVValue(String(value));
      })
      .join(',');
  });

  // Combine headers and rows
  const csv = [csvHeaders, ...csvRows].join('\n');

  // Download file
  downloadFile(csv, `${filename}.csv`, 'text/csv');
}

/**
 * Export data to JSON file
 * 
 * @param data - Data to export (any JSON-serializable object)
 * @param filename - Name of the file (without extension)
 * @param pretty - Whether to format JSON with indentation
 */
export function exportToJSON(
  data: any,
  filename: string,
  pretty = true
): void {
  if (!data) {
    throw new Error('No data to export');
  }

  const json = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
  downloadFile(json, `${filename}.json`, 'application/json');
}

/**
 * Escape CSV value to handle commas, quotes, and newlines
 */
function escapeCSVValue(value: string): string {
  // If value contains comma, quote, or newline, wrap in quotes and escape existing quotes
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * Download a file to the user's computer
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Copy text to clipboard
 * 
 * @param text - Text to copy
 * @returns Promise that resolves when copied successfully
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

/**
 * Hook for managing copy-to-clipboard with feedback
 * 
 * @example
 * ```typescript
 * const { copiedId, copyToClipboard } = useCopyToClipboard();
 * 
 * <Button onClick={() => copyToClipboard(item.id)}>
 *   {copiedId === item.id ? 'Copied!' : 'Copy'}
 * </Button>
 * ```
 */
export function useCopyToClipboard(resetDelay = 2000) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const copy = async (id: string, text: string) => {
    try {
      await copyToClipboard(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), resetDelay);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return { copiedId, copyToClipboard: copy };
}

// Add React import for the hook
import React from 'react';
