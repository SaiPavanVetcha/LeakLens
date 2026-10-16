'use client';

import React, { useState } from 'react';
import { useLeakLens } from '@/context/DataContext';
import { formatCurrency, formatNumber } from '@/lib/utils';
import {
  Boxes,
  AlertTriangle,
  Clock,
  TrendingUp,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function InventoryRiskPage() {
  const { data } = useLeakLens();
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!data) return null;

  const { inventoryRisks, metrics } = data;

  const filteredRisks = inventoryRisks.filter((sku) => {
    const matchesQuery =
      sku.product_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sku.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterRisk === 'all') return matchesQuery;
    return matchesQuery && sku.risk_level.toLowerCase() === filterRisk.toLowerCase();
  });

  const criticalSkus = inventoryRisks.filter((r) => r.risk_level === 'Critical');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Inventory &amp; Stockout Risk
            </h1>
            <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 font-mono text-[11px] text-amber-300">
              {metrics.stockoutRiskCount} Vulnerable SKUs
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time demand velocity vs supplier lead times to prevent stockouts and protect revenue.
          </p>
        </div>

        <Link
          href="/dashboard/actions"
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 font-heading text-xs font-semibold text-slate-950 shadow-cyan-glow hover:bg-cyan-400 transition-all self-start sm:self-auto"
        >
          <Zap className="h-3.5 w-3.5" />
          <span>Expedite Orders</span>
        </Link>
      </div>

      {/* Top 7-Day Stockout Alert Banner */}
      <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-5 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400">
              <Clock className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-rose-300 uppercase tracking-wider bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
                  Critical Stockout Window
                </span>
                <span className="font-heading text-sm font-bold text-white">
                  4 High-Velocity SKUs Facing Depletion Within 7 Days
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed max-w-3xl">
                Current warehouse stock on hand for <strong className="text-white">PR0039, PR0113, PR0201, and PR0242</strong> will expire before standard supplier lead days (avg 14d) conclude. Estimated weekly missed revenue: <span className="font-mono font-semibold text-rose-400">$14,200</span>.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/actions"
            className="flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2 font-heading text-xs font-semibold text-white shadow-rose-glow hover:bg-rose-400 transition-all shrink-0 w-full sm:w-auto justify-center"
          >
            <span>Expedite Purchase Orders</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* 4 Critical SKUs Showcase Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {criticalSkus.map((sku) => (
          <div
            key={sku.product_id}
            className="rounded-2xl border border-rose-500/30 bg-surface/70 p-4 backdrop-blur-xl hover:border-rose-500/60 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white">
                {sku.product_id}
              </span>
              <span className="rounded-full bg-rose-500/20 border border-rose-500/40 px-2 py-0.5 font-mono text-[10px] font-bold text-rose-300 animate-pulse">
                {sku.days_remaining} Days Left
              </span>
            </div>

            <div className="mt-3 space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Category:</span>
                <span className="text-slate-200">{sku.category}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Stock on Hand:</span>
                <span className="font-bold text-white">{sku.stock_on_hand} units</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Demand Velocity:</span>
                <span className="text-cyan-400 font-semibold">{sku.daily_velocity} /day</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Supplier Lead:</span>
                <span className="text-amber-400 font-semibold">{sku.supplier_lead_days} days</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-rose-500/20 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Weekly Exposure:</span>
              <span className="font-mono text-xs font-bold text-rose-400">
                {formatCurrency(sku.estimated_weekly_loss)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Filterable Inventory Table */}
      <div className="rounded-2xl border border-cyan-500/15 bg-surface/70 p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-white">
              SKU Stockout Runway Ledger
            </h2>
            <p className="text-xs text-slate-400">
              Live run rates based on empirical 2025 sales volume and warehouse replenishment thresholds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search SKU or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-cyan-500/20 bg-surface-raised pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="w-full sm:w-auto rounded-xl border border-cyan-500/20 bg-surface-raised px-3 py-1.5 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none font-mono"
            >
              <option value="all">All Risk Levels</option>
              <option value="critical">Critical (&le; 7 Days)</option>
              <option value="high">High (&le; 14 Days)</option>
              <option value="moderate">Moderate (&le; 30 Days)</option>
              <option value="safe">Safe (&gt; 30 Days)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-cyan-500/15 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">SKU ID</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Stock on Hand</th>
                <th className="py-3 px-4">Reorder Level</th>
                <th className="py-3 px-4">Daily Velocity</th>
                <th className="py-3 px-4">Runway (Days)</th>
                <th className="py-3 px-4">Lead Time</th>
                <th className="py-3 px-4">Risk Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10 font-mono text-xs">
              {filteredRisks.slice(0, 20).map((sku) => {
                const badgeColor = {
                  Critical: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
                  High: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                  Moderate: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
                  Safe: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
                }[sku.risk_level];

                return (
                  <tr key={sku.product_id} className="hover:bg-surface-raised/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">
                      {sku.product_id}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {sku.category}
                    </td>
                    <td className="py-3.5 px-4 text-white font-semibold">
                      {sku.stock_on_hand}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {sku.reorder_threshold}
                    </td>
                    <td className="py-3.5 px-4 text-cyan-400">
                      {sku.daily_velocity} /day
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      {sku.days_remaining} d
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {sku.supplier_lead_days}d (+{sku.supplier_delay_days}d delay)
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeColor}`}>
                        {sku.risk_level}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href="/dashboard/actions"
                        className="font-heading text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold"
                      >
                        Reorder &rarr;
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t border-cyan-500/10 flex items-center justify-between text-xs text-slate-400">
          <span>Showing top {Math.min(20, filteredRisks.length)} of {filteredRisks.length} analyzed inventory items</span>
          <span className="font-mono text-cyan-300">Source: inventory.csv &amp; products.csv</span>
        </div>
      </div>
    </div>
  );
}
