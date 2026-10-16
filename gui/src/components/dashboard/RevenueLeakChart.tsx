'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useLeakLens } from '@/context/DataContext';
import { formatCurrency } from '@/lib/utils';
import { TrendingDown, ShieldAlert, Sparkles } from 'lucide-react';

export function RevenueLeakChart() {
  const { data } = useLeakLens();
  const [activeMetric, setActiveMetric] = useState<'all' | 'leak' | 'profit'>('all');

  if (!data || !data.monthlyTrend.length) {
    return (
      <div className="flex h-80 items-center justify-center rounded-2xl border border-cyan-500/15 bg-surface/50 text-slate-500">
        Loading Revenue Timeline...
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const pData = payload[0].payload;
      return (
        <div className="rounded-xl border border-cyan-500/30 bg-surface-raised/95 p-3.5 backdrop-blur-xl shadow-cyan-glow">
          <div className="font-heading text-xs font-bold text-white border-b border-cyan-500/20 pb-1.5 mb-2">
            2025 • {label} Performance
          </div>
          <div className="space-y-1.5 text-xs font-mono">
            <div className="flex items-center justify-between gap-6 text-cyan-300">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Net Sales:
              </span>
              <span className="font-semibold">{formatCurrency(pData.netSales)}</span>
            </div>
            <div className="flex items-center justify-between gap-6 text-emerald-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Realized Profit:
              </span>
              <span className="font-semibold">{formatCurrency(pData.profit)}</span>
            </div>
            <div className="flex items-center justify-between gap-6 text-rose-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                Margin Bleed (Leak):
              </span>
              <span className="font-semibold">-{formatCurrency(pData.leakAmount)}</span>
            </div>
            <div className="flex items-center justify-between gap-6 text-amber-400 border-t border-slate-800 pt-1">
              <span className="flex items-center gap-1.5 text-slate-400">
                Returns:
              </span>
              <span>{formatCurrency(pData.returnedAmount)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl border border-cyan-500/15 bg-surface/70 p-5 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-heading text-base font-bold text-white">
              Revenue Realization vs Margin Bleed
            </h3>
            <span className="rounded-full bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 font-mono text-[10px] text-rose-400">
              $1.21M Annual Leak
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Monthly net revenue trajectory mapped against negative-margin sales & return losses.
          </p>
        </div>

        {/* Chart View Filters */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-cyan-500/20 bg-surface-raised p-1">
          <button
            onClick={() => setActiveMetric('all')}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
              activeMetric === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Curves
          </button>
          <button
            onClick={() => setActiveMetric('leak')}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
              activeMetric === 'leak'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Leaks Only
          </button>
          <button
            onClick={() => setActiveMetric('profit')}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
              activeMetric === 'profit'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Profit Only
          </button>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data.monthlyTrend}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="cyanSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00f2ff" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="emeraldProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="roseLeak" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
            <XAxis
              dataKey="month"
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

            {(activeMetric === 'all' || activeMetric === 'profit') && (
              <Area
                type="monotone"
                dataKey="profit"
                name="Net Profit"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#emeraldProfit)"
              />
            )}

            {(activeMetric === 'all') && (
              <Area
                type="monotone"
                dataKey="netSales"
                name="Net Sales"
                stroke="#00f2ff"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#cyanSales)"
              />
            )}

            {(activeMetric === 'all' || activeMetric === 'leak') && (
              <Area
                type="monotone"
                dataKey="leakAmount"
                name="Margin Leak"
                stroke="#f43f5e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#roseLeak)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-cyan-500/10 pt-3 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            <span>Net Sales</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Clean Profit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-400" />
            <span>Margin Bleed ($1.21M)</span>
          </div>
        </div>

        <div className="font-mono text-[11px] text-cyan-300">
          Source: transactions.csv (18,000 logs)
        </div>
      </div>
    </div>
  );
}
