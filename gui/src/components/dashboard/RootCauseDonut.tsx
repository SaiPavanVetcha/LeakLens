'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useLeakLens } from '@/context/DataContext';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { HelpCircle } from 'lucide-react';

export function RootCauseDonut() {
  const { data } = useLeakLens();

  if (!data) return null;

  const chartData = [
    {
      name: 'Cost > List Price Inversion',
      value: data.metrics.pricingLeakDollar,
      color: '#f43f5e',
      share: data.metrics.pricingLeakDollar / (data.metrics.totalLeaksDollar || 1),
      description: '76 products priced below supplier unit cost',
    },
    {
      name: 'High Discount Stacking',
      value: data.metrics.discountLeakDollar,
      color: '#f59e0b',
      share: data.metrics.discountLeakDollar / (data.metrics.totalLeaksDollar || 1),
      description: 'Discounts >= 15% eroding product margins',
    },
  ];

  return (
    <div className="rounded-2xl border border-cyan-500/15 bg-surface/70 p-5 backdrop-blur-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-base font-bold text-white">
            Root Cause Allocation
          </h3>
          <span className="rounded-full bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 font-mono text-[10px] text-rose-400">
            93% Pricing Deficit
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Breakdown of the $1,214,116 margin loss across structural vs promotional factors.
        </p>
      </div>

      <div className="my-2 h-48 w-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }: any) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-cyan-500/30 bg-surface-raised p-2.5 text-xs font-mono shadow-cyan-glow">
                      <div className="font-bold text-white">{d.name}</div>
                      <div className="text-rose-400 mt-1">{formatCurrency(d.value)}</div>
                      <div className="text-slate-400">{formatPercent(d.share)} of total bleed</div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-mono text-xl font-bold text-white">93.0%</span>
          <span className="text-[10px] uppercase tracking-wider text-slate-400">Catalog Flaw</span>
        </div>
      </div>

      <div className="space-y-2 border-t border-cyan-500/10 pt-3 text-xs">
        {chartData.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-slate-300 text-[11px]">{item.name}</span>
            </div>
            <span className="font-mono font-medium text-white text-[11px]">
              {formatCurrency(item.value, true)} ({formatPercent(item.share, 0)})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
