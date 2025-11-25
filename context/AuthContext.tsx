'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { apiClient, authApi } from '@/lib/api/client';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  operator_id?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// JWT TTL in minutes (should match backend config)
const JWT_TTL_MINUTES = 480; // 8 hours
const REFRESH_INTERVAL_MS = JWT_TTL_MINUTES * 60 * 1000 * 0.8; // Refresh at 80% of TTL

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

  const refresh = useCallback(async () => {
    try {
      const response = await authApi.refresh();
      
      // Response is already the data object from the API
      if (!response.access_token) {
        console.error('Invalid refresh response structure:', response);
        throw new Error('Invalid response from refresh API');
      }
      
      apiClient.setToken(response.access_token);
      
      // Get user data after refreshing token
      const meResponse = await authApi.me();
      
      if (meResponse.user) {
        setUser(meResponse.user);
      }
      
      setLoading(false);
    } catch (error) {
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
    const token = apiClient.getToken();
    if (token) {
      // Verify token and get user
      refresh()
        .then(() => {
          // Set up automatic token refresh after successful initial refresh
          if (refreshTimerRef.current) {
            clearInterval(refreshTimerRef.current);
          }
          refreshTimerRef.current = setInterval(() => {
            refresh().catch((error) => {
              console.error('Auto-refresh failed:', error);
              logout();
            });
          }, REFRESH_INTERVAL_MS);
        })
        .catch(() => {
          apiClient.clearToken();
          setLoading(false);
        });
    } else {
      setLoading(false);
    }

    // Cleanup interval on unmount
    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, [refresh, logout]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refresh }}>
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

