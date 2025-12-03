'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { operatorApi } from '@/lib/api/client';

interface OperatorData {
  operatorName: string;
  operator: any;
  user: any;
  loading: boolean;
}

interface OperatorDataContextValue {
  operatorData: OperatorData | null;
  refreshOperatorData: () => Promise<void>;
}

const OperatorDataContext = createContext<OperatorDataContextValue | null>(null);

export function OperatorDataProvider({ children }: { children: ReactNode }) {
  const [operatorData, setOperatorData] = useState<OperatorData | null>(null);

  const refreshOperatorData = async () => {
    try {
      const dashboardData = await operatorApi.getDashboard();
      setOperatorData({
        operatorName: dashboardData?.operator?.name || dashboardData?.user?.name || '',
        operator: dashboardData?.operator,
        user: dashboardData?.user,
        loading: false,
      });
    } catch (error) {
      console.error('[OperatorDataContext] Failed to load operator data:', error);
      setOperatorData({
        operatorName: '',
        operator: null,
        user: null,
        loading: false,
      });
    }
  };

  useEffect(() => {
    // Load operator data on mount
    refreshOperatorData();
  }, []);

  return (
    <OperatorDataContext.Provider 
      value={{ 
        operatorData, 
        refreshOperatorData, 
      }}
    >
      {children}
    </OperatorDataContext.Provider>
  );
}

export const useOperatorData = () => {
  const context = useContext(OperatorDataContext);
  if (!context) {
    throw new Error('useOperatorData must be used within OperatorDataProvider');
  }
  return context;
};

