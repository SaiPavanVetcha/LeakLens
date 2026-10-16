'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadAllDatasets } from '@/lib/csvParser';
import { processAnalyticsData, ProcessedData } from '@/lib/analytics';
import { RecommendedAction } from '@/types';

interface DataContextType {
  data: ProcessedData | null;
  loading: boolean;
  error: string | null;
  actions: RecommendedAction[];
  toggleActionStatus: (id: string) => void;
  executedSavings: number;
}

const DataContext = createContext<DataContextType>({
  data: null,
  loading: true,
  error: null,
  actions: [],
  toggleActionStatus: () => {},
  executedSavings: 0,
});

const STORAGE_KEY = 'leaklens_actions_v1';

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ProcessedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actions, setActions] = useState<RecommendedAction[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function initData() {
      try {
        setLoading(true);
        const raw = await loadAllDatasets();
        if (!isMounted) return;

        const processed = processAnalyticsData(
          raw.products,
          raw.customers,
          raw.transactions,
          raw.inventory,
          raw.campaigns
        );

        // Load saved action states from localStorage if available
        let savedActionStatus: Record<string, 'Pending' | 'Executed'> = {};
        if (typeof window !== 'undefined') {
          try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
              savedActionStatus = JSON.parse(stored);
            }
          } catch (e) {
            console.error('Failed to parse saved action status', e);
          }
        }

        const initialActions = processed.recommendedActions.map((act) => ({
          ...act,
          status: savedActionStatus[act.id] || act.status,
        }));

        setData(processed);
        setActions(initialActions);
        setLoading(false);
      } catch (err: any) {
        console.error('Failed to load LeakLens data:', err);
        if (isMounted) {
          setError(err.message || 'Failed to parse datasets');
          setLoading(false);
        }
      }
    }

    initData();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleActionStatus = (id: string) => {
    setActions((prev) => {
      const next = prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'Pending' ? 'Executed' : 'Pending';
          return { ...item, status: nextStatus as 'Pending' | 'Executed' };
        }
        return item;
      });

      if (typeof window !== 'undefined') {
        const statusMap = next.reduce((acc, a) => {
          acc[a.id] = a.status;
          return acc;
        }, {} as Record<string, string>);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(statusMap));
      }

      return next;
    });
  };

  const executedSavings = actions
    .filter((a) => a.status === 'Executed')
    .reduce((sum, a) => sum + a.estimatedWeeklySaving, 0);

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        error,
        actions,
        toggleActionStatus,
        executedSavings,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useLeakLens() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useLeakLens must be used within a DataProvider');
  }
  return context;
}
