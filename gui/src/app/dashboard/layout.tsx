'use client';

import React from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { useLeakLens } from '@/context/DataContext';
import { Loader2, AlertCircle } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, error } = useLeakLens();

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {loading ? (
            <div className="flex h-96 flex-col items-center justify-center gap-4 text-center">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-cyan-400/20 blur-sm" />
                </div>
              </div>
              <div>
                <p className="font-heading text-base font-bold text-white">
                  Ingesting &amp; Sanitizing 18,000 Transactions...
                </p>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Parsing products, inventory velocity, and attribution models
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-rose-500/40 bg-rose-950/30 p-6 text-center">
              <AlertCircle className="h-8 w-8 text-rose-400 mx-auto mb-2" />
              <h3 className="font-heading text-lg font-bold text-white">
                Failed to Load Retail Datasets
              </h3>
              <p className="mt-1 text-xs text-slate-300 font-mono">{error}</p>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
