'use client';

import { useState, useCallback, useEffect } from 'react';
import { operatorApi } from '@/lib/api/client';

export interface CompetitionOption {
  value: string;
  label: string;
}

// Singleton cache for competitions - shared across all hook instances
let competitionsCache: {
  data: CompetitionOption[];
  timestamp: number;
} | null = null;

const CACHE_TTL = 60000; // 60 seconds

/**
 * Shared hook for managing competitions data across widgets
 * 
 * Features:
 * - Singleton cache shared across all hook instances
 * - Automatic initial load with caching
 * - Search functionality for filtering
 * - Prevents duplicate API calls
 * 
 * @example
 * ```typescript
 * const { competitions, loading, loadCompetitions } = useCompetitions();
 * 
 * // Use in SearchableSelect
 * <SearchableSelect
 *   options={competitions}
 *   onSearch={loadCompetitions}
 *   loading={loading}
 * />
 * ```
 */
export function useCompetitions(options: {
  /** Automatically load competitions on mount (default: true) */
  autoLoad?: boolean;
  /** Callback for error handling */
  onError?: (error: unknown) => void;
} = {}) {
  const { autoLoad = true, onError } = options;
  
  const [competitions, setCompetitions] = useState<CompetitionOption[]>(() => {
    // Initialize from cache if available and fresh
    if (competitionsCache && Date.now() - competitionsCache.timestamp < CACHE_TTL) {
      return competitionsCache.data;
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  /**
   * Load competitions from API
   * @param search - Optional search term to filter competitions by name
   */
  const loadCompetitions = useCallback(async (search: string = '') => {
    try {
      // For initial load (no search), use cache if available and fresh
      if (!search && competitionsCache && Date.now() - competitionsCache.timestamp < CACHE_TTL) {
        setCompetitions(competitionsCache.data);
        return;
      }

      setLoading(true);
      const competitionsData = await operatorApi.getCompetitions({
        per_page: 50,
        name: search || undefined,
      });

      const options: CompetitionOption[] = (competitionsData.data || []).map((c: { id: string; uuid?: string; name: string }) => ({
        value: c.uuid || c.id,
        label: c.name,
      }));

      setCompetitions(options);

      // Only cache if this was not a search query
      if (!search) {
        competitionsCache = {
          data: options,
          timestamp: Date.now(),
        };
      }
    } catch (error) {
      if (onError) {
        onError(error);
      } else {
        console.error('[useCompetitions] Failed to load competitions:', error);
      }
    } finally {
      setLoading(false);
    }
  }, [onError]);

  // Auto-load competitions on mount if enabled
  useEffect(() => {
    if (autoLoad && !initialized) {
      setInitialized(true);
      // Only fetch if cache is stale or empty
      if (!competitionsCache || Date.now() - competitionsCache.timestamp >= CACHE_TTL) {
        loadCompetitions();
      }
    }
  }, [autoLoad, initialized, loadCompetitions]);

  /**
   * Clear the competitions cache
   * Useful when competitions are added/updated and fresh data is needed
   */
  const clearCache = useCallback(() => {
    competitionsCache = null;
    setCompetitions([]);
  }, []);

  /**
   * Force refresh competitions (bypasses cache)
   */
  const refresh = useCallback(async () => {
    competitionsCache = null;
    await loadCompetitions();
  }, [loadCompetitions]);

  return {
    /** Current list of competition options */
    competitions,
    /** Whether competitions are currently loading */
    loading,
    /** Load/search competitions - pass search term to filter */
    loadCompetitions,
    /** Clear the competitions cache */
    clearCache,
    /** Force refresh competitions (bypasses cache) */
    refresh,
  };
}

/**
 * Utility to invalidate the competitions cache from outside the hook
 * Call this when competitions are created/updated/deleted
 */
export function invalidateCompetitionsCache() {
  competitionsCache = null;
}


