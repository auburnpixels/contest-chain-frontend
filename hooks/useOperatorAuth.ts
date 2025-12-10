'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface UseOperatorAuthOptions {
  redirectIfUnauthenticated?: boolean;
}

interface UseOperatorAuthReturn {
  user: any;
  loading: boolean;
  authLoading: boolean;
  isInitialized: boolean;
  logout: () => Promise<void>;
  handleLogout: () => Promise<void>;
  isReady: boolean;
  operatorName: string | null;
  operatorId: string | null;
}

/**
 * Custom hook for operator authentication
 * Handles auth state, auto-redirect, and logout functionality
 */
export function useOperatorAuth(
  options: UseOperatorAuthOptions = { redirectIfUnauthenticated: true }
): UseOperatorAuthReturn {
  const router = useRouter();
  const { user, loading: authLoading, isInitialized, logout: authLogout, operatorName } = useAuth();
  const redirectAttemptedRef = useRef(false);

  useEffect(() => {
    if (!options.redirectIfUnauthenticated) return;

    // Wait for auth to be initialized
    if (!isInitialized) {
      return;
    }

    // If initialized but no user, redirect to login
    if (!user && !redirectAttemptedRef.current) {
      redirectAttemptedRef.current = true;
      console.log('[useOperatorAuth] No user found, redirecting to login...');
      
      // Try Next.js router first (preferred method)
      router.push('/operator/login');
      
      // Fallback: If router.push doesn't work (SSR/hydration issues), use window.location
      // This ensures redirect always happens even if Next.js routing fails
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.location.pathname !== '/operator/login') {
          console.log('[useOperatorAuth] Router redirect failed, using window.location fallback');
          window.location.href = '/operator/login';
        }
      }, 100);
    }
  }, [isInitialized, user, router, options.redirectIfUnauthenticated]);

  const handleLogout = async () => {
    await authLogout();
    router.push('/operator/login');
  };

  // Determine if the auth state is ready for the page to render
  const isReady = isInitialized && !!user;

  return {
    user,
    loading: authLoading || !isInitialized,
    authLoading,
    isInitialized,
    logout: authLogout,
    handleLogout,
    isReady,
    operatorName,
    operatorId: user?.operator?.id || null,
  };
}

