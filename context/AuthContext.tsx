'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = apiClient.getToken();
    if (token) {
      // Optionally verify token and get user
      refresh().catch(() => {
        apiClient.clearToken();
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const response = await authApi.login(email, password);
    
    // Response is already the data object from the API
    if (!response.access_token || !response.user) {
      console.error('Invalid response structure:', response);
      throw new Error('Invalid response from login API');
    }
    
    apiClient.setToken(response.access_token);
    setUser(response.user);
    setLoading(false);
    return response.user;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    apiClient.clearToken();
    setUser(null);
  };

  const refresh = async () => {
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
  };

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

