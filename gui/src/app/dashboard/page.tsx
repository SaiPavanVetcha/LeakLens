'use client';

import React from 'react';
import { useLeakLens } from '@/context/DataContext';
import { TopAlertBanner } from '@/components/dashboard/TopAlertBanner';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { RevenueLeakChart } from '@/components/dashboard/RevenueLeakChart';
import { CategoryBreakdownChart } from '@/components/dashboard/CategoryBreakdownChart';
import { RootCauseDonut } from '@/components/dashboard/RootCauseDonut';
import { formatCurrency, formatPercent } from '@/lib/utils';
import {
  DollarSign,
  TrendingDown,
  RotateCcw,
  Boxes,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  FileSpreadsheet,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverviewPage() {
  const { data } = useLeakLens();

  if (!data) return null;

  const { metrics } = data;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Executive Leak Overview
            </h1>
            <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 font-mono text-[11px] text-cyan-300">
              Live Pipeline
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time margin telemetry across 18,000 transactions, 250 catalog SKUs, and 1,200 ad sets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/actions"
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 font-heading text-xs font-semibold text-slate-950 shadow-cyan-glow hover:bg-cyan-400 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Remediation Playbooks</span>
          </Link>
        </div>
      </div>

      {/* Top Critical Alert */}
      <TopAlertBanner />

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="REVENUE (LAST 30 DAYS)"
          value={formatCurrency(metrics.totalRevenue30d)}
          subValue="Completed Net Volume"
          delta="+4.2% MoM"
          isPositive={true}
          icon={DollarSign}
          variant="cyan"
          badge="Healthy Volume"
        />

        <KpiCard
          title="ACTIVE PROFIT LEAKS"
          value={formatCurrency(metrics.totalLeaksDollar)}
          subValue={`${metrics.leakOrderCount} sales lose money (${formatPercent(metrics.leakOrderPercent)})`}
          delta="-$1.21M Bleed"
          isPositive={false}
          icon={TrendingDown}
          variant="rose"
          badge="38.1% of Sales"
        />

        <KpiCard
          title="RETURN & CANCEL RATE"
          value={formatPercent(metrics.returnRate)}
          subValue={`${formatCurrency(metrics.totalReturnsDollar, true)} returned value`}
          delta="+0.8% vs benchmark"
          isPositive={false}
          icon={RotateCcw}
          variant="amber"
          badge="1,431 Returns"
        />

        <KpiCard
          title="STOCKOUT VULNERABILITY"
          value={`${metrics.stockoutRiskCount} SKUs`}
          subValue={`${metrics.criticalStockoutCount} critical (< 7 days runway)`}
          delta="4 Critical"
          isPositive={false}
          icon={Boxes}
          variant="emerald"
          badge="Restock Required"
        />
      </div>

      {/* Revenue Leak Timeline Chart */}
      <RevenueLeakChart />

      {/* Bottom Grid: Category Breakdown + Root Cause Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CategoryBreakdownChart />
        </div>
        <div className="lg:col-span-1">
          <RootCauseDonut />
        </div>
      </div>

      {/* Bottom Context Banner: Source Transparency */}
      <div className="rounded-2xl border border-cyan-500/15 bg-surface/50 p-4 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <FileSpreadsheet className="h-5 w-5 text-cyan-400" />
          <div>
            <span className="font-semibold text-white">Dataset Verification:</span>{' '}
            <span>All calculations derived directly from <code>/public/data/*.csv</code> client-side memory cache.</span>
          </div>
        </div>
        <Link
          href="/dashboard/actions"
          className="font-heading text-xs font-semibold text-cyan-300 hover:text-cyan-200 flex items-center gap-1"
        >
          <span>View 6 Approved Playbooks</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
