'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { apiClient, authApi } from '@/lib/api/client';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  operator_id?: number;
  operator?: {
    id: string;
    name: string;
    slug: string;
    url?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  operatorName: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// JWT TTL in minutes (should match backend config)
const JWT_TTL_MINUTES = 480; // 8 hours
const REFRESH_INTERVAL_MS = JWT_TTL_MINUTES * 60 * 1000 * 0.8; // Refresh at 80% of TTL

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Compute operator name from user data
  const operatorName = user?.operator?.name || user?.name || null;

  const refresh = useCallback(async () => {
    try {
      console.log('[AuthContext] Refreshing token...');
      const response = await authApi.refresh();
      
      // Response is already the data object from the API
      if (!response.access_token) {
        console.error('Invalid refresh response structure:', response);
        throw new Error('Invalid response from refresh API');
      }
      
      apiClient.setToken(response.access_token);
      console.log('[AuthContext] Token refreshed successfully');
      
      // Get user data after refreshing token
      const meResponse = await authApi.me();
      
      if (meResponse.user) {
        setUser(meResponse.user);
        console.log('[AuthContext] User data loaded:', meResponse.user.email);
      }
      
      setLoading(false);
    } catch (error: any) {
      // Expected errors - token is too old or invalid, user needs to log in again
      // These are normal scenarios, so we silently clear the token
      const expectedErrorCodes = [
        'TOKEN_EXPIRED_NOT_REFRESHABLE',
        'TOKEN_INVALID',
        'TOKEN_BLACKLISTED',
        'TOKEN_ABSENT',
      ];
      
      if (error?.code && expectedErrorCodes.includes(error.code)) {
        console.log('[AuthContext] Token cannot be refreshed (expected):', error.code);
        apiClient.clearToken();
        setUser(null);
        setLoading(false);
        // Don't throw for expected errors
        return;
      }
      
      // Unexpected errors - log them for debugging
      console.error('[AuthContext] Token refresh failed (unexpected):', error);
      apiClient.clearToken();
      setUser(null);
      setLoading(false);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    // Clear refresh timer
    if (refreshTimerRef.current) {
      clearInterval(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
    
    apiClient.clearToken();
    setUser(null);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<User> => {
    const response = await authApi.login(email, password);
    
    // Response is already the data object from the API
    if (!response.access_token || !response.user) {
      console.error('Invalid response structure:', response);
      throw new Error('Invalid response from login API');
    }
    
    apiClient.setToken(response.access_token);
    setUser(response.user);
    setLoading(false);
    
    // Set up automatic token refresh
    if (refreshTimerRef.current) {
      clearInterval(refreshTimerRef.current);
    }
    refreshTimerRef.current = setInterval(() => {
      refresh().catch((error) => {
        console.error('Auto-refresh failed:', error);
        logout();
      });
    }, REFRESH_INTERVAL_MS);
    
    return response.user;
  }, [refresh, logout]);

  useEffect(() => {
    // Check for existing token on mount
    const initializeAuth = async () => {
      const token = apiClient.getToken();
      console.log('[AuthContext] Initializing auth, token present:', !!token);
      
      if (token) {
        // Verify token and get user
        try {
          await refresh();
          
          // Set up automatic token refresh after successful initial refresh
          if (refreshTimerRef.current) {
            clearInterval(refreshTimerRef.current);
          }
          refreshTimerRef.current = setInterval(() => {
            refresh().catch((error) => {
              // Only logout on unexpected errors during auto-refresh
              // Expected errors are already handled silently in refresh()
              if (error) {
                console.error('Auto-refresh failed with unexpected error:', error);
                logout();
              }
            });
          }, REFRESH_INTERVAL_MS);
          
          console.log('[AuthContext] Auth initialized successfully');
        } catch (error) {
          // refresh() already handles expected errors silently
          // Only log if there's an unexpected error that was thrown
          if (error) {
            console.error('[AuthContext] Auth initialization failed with unexpected error:', error);
          }
          // Token already cleared by refresh() function
          setLoading(false);
        } finally {
          setIsInitialized(true);
        }
      } else {
        console.log('[AuthContext] No token found, auth initialization complete');
        setLoading(false);
        setIsInitialized(true);
      }
    };

    // CRITICAL: Only run once on app mount, not on every component mount
    if (!isInitialized) {
      initializeAuth();
    }

    // Cleanup interval on unmount
    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, []); // Empty deps - run once only

  return (
    <AuthContext.Provider value={{ user, loading, isInitialized, login, logout, refresh, operatorName }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

