'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface UseRegulatorAuthOptions {
  redirectIfUnauthenticated?: boolean;
}

interface UseRegulatorAuthReturn {
  user: any;
  loading: boolean;
  authLoading: boolean;
  isInitialized: boolean;
  logout: () => Promise<void>;
  handleLogout: () => Promise<void>;
  isReady: boolean;
}

/**
 * Custom hook for regulator authentication
 * Handles auth state, auto-redirect, and logout functionality
 */
export function useRegulatorAuth(
  options: UseRegulatorAuthOptions = { redirectIfUnauthenticated: true }
): UseRegulatorAuthReturn {
  const router = useRouter();
  const { user, loading: authLoading, isInitialized, logout: authLogout } = useAuth();
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
      console.log('[useRegulatorAuth] No user found, redirecting to login...');
      
      // Try Next.js router first (preferred method)
      router.push('/regulator/login');
      
      // Fallback: If router.push doesn't work (SSR/hydration issues), use window.location
      // This ensures redirect always happens even if Next.js routing fails
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.location.pathname !== '/regulator/login') {
          console.log('[useRegulatorAuth] Router redirect failed, using window.location fallback');
          window.location.href = '/regulator/login';
        }
      }, 100);
    }
  }, [isInitialized, user, router, options.redirectIfUnauthenticated]);

  const handleLogout = async () => {
    await authLogout();
    router.push('/regulator/login');
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
  };
}

