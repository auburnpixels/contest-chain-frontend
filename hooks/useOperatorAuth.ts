'use client';

import { useEffect } from 'react';
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
}

/**
 * Custom hook for operator authentication
 * Handles auth state, auto-redirect, and logout functionality
 */
export function useOperatorAuth(
  options: UseOperatorAuthOptions = { redirectIfUnauthenticated: true }
): UseOperatorAuthReturn {
  const router = useRouter();
  const { user, loading: authLoading, isInitialized, logout: authLogout } = useAuth();

  useEffect(() => {
    if (!options.redirectIfUnauthenticated) return;

    // Wait for auth to be initialized
    if (!isInitialized) {
      return;
    }

    // If initialized but no user, redirect to login
    if (!user) {
      console.log('[useOperatorAuth] No user found, redirecting to login...');
      router.push('/operator/login');
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
  };
}

