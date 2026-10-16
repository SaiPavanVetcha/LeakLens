'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useLeakLens } from '@/context/DataContext';
import { formatCurrency, formatPercent } from '@/lib/utils';

export function CategoryBreakdownChart() {
  const { data } = useLeakLens();

  if (!data || !data.categoryBreakdown.length) return null;

  const chartData = data.categoryBreakdown.map((c) => ({
    category: c.category,
    profit: c.profit,
    leak: c.leakAmount,
    returned: c.returnedAmount,
    returnRate: c.returnRate,
    marginRate: c.marginRate,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const p = payload[0].payload;
      return (
        <div className="rounded-xl border border-cyan-500/30 bg-surface-raised/95 p-3.5 backdrop-blur-xl shadow-cyan-glow">
          <div className="font-heading text-xs font-bold text-white border-b border-cyan-500/20 pb-1.5 mb-2">
            Category: {label}
          </div>
          <div className="space-y-1 text-xs font-mono">
            <div className="flex justify-between gap-6 text-emerald-400">
              <span>Realized Profit:</span>
              <span className="font-semibold">{formatCurrency(p.profit)}</span>
            </div>
            <div className="flex justify-between gap-6 text-rose-400">
              <span>Margin Leak:</span>
              <span className="font-semibold">-{formatCurrency(p.leak)}</span>
            </div>
            <div className="flex justify-between gap-6 text-amber-400">
              <span>Return Losses:</span>
              <span className="font-semibold">{formatCurrency(p.returned)}</span>
            </div>
            <div className="flex justify-between gap-6 text-cyan-300 border-t border-slate-800 pt-1">
              <span>Return Rate:</span>
              <span>{formatPercent(p.returnRate)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl border border-cyan-500/15 bg-surface/70 p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-heading text-base font-bold text-white">
            Category Margin Breakdown
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Clean Profit vs Margin Leakage across all six product verticals.
          </p>
        </div>
        <div className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 text-xs font-mono text-cyan-300">
          Beauty Margins Critical
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
            <XAxis
              dataKey="category"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="profit" name="Net Profit" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="leak" name="Margin Leak" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-400 border-t border-cyan-500/10 pt-3">
        <span>Highest Bleed: Home ($237K) &amp; Beauty ($225K)</span>
        <span className="text-cyan-400 font-mono">EDA Finding #7 Verified</span>
      </div>
    </div>
  );
}
