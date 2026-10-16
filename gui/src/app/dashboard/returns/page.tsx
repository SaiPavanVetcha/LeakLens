'use client';

import React, { useState } from 'react';
import { useLeakLens } from '@/context/DataContext';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/utils';
import {
  RotateCcw,
  XCircle,
  TrendingDown,
  Smartphone,
  Globe,
  Store,
  CreditCard,
  Banknote,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import Link from 'next/link';

export default function ReturnsAndCancellationsPage() {
  const { data } = useLeakLens();
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!data) return null;

  const { channelReturns, categoryBreakdown, paymentReturns, metrics } = data;

  // Channel icons
  const getChannelIcon = (ch: string) => {
    switch (ch) {
      case 'App':
        return <Smartphone className="h-4 w-4 text-cyan-400" />;
      case 'Web':
        return <Globe className="h-4 w-4 text-emerald-400" />;
      case 'Store':
        return <Store className="h-4 w-4 text-amber-400" />;
      default:
        return <Store className="h-4 w-4 text-slate-400" />;
    }
  };

  // Ranked problems by financial impact
  const rankedProblems = [
    {
      rank: 1,
      title: 'App Channel Returns & Cancellations',
      channel: 'App',
      lossValue: 304925 + 340000,
      returnCount: 579,
      cancelCount: 695,
      returnRate: 0.081,
      cancelRate: 0.098,
      rootCause: 'Impulsive mobile one-click checkout without address validation & friction-free return abuse.',
      actionTitle: 'Deploy pre-dispatch SMS verification & return policy guardrails',
      actionLink: '/dashboard/actions',
    },
    {
      rank: 2,
      title: 'Web Channel Sizing & Specification Mismatch',
      channel: 'Web',
      lossValue: 332387 + 380000,
      returnCount: 621,
      cancelCount: 749,
      returnRate: 0.077,
      cancelRate: 0.093,
      rootCause: 'Inaccurate PDP dimensions in Home & Fashion leading to post-delivery buyer remorse.',
      actionTitle: 'Enrich product detail specifications & sizing charts',
      actionLink: '/dashboard/actions',
    },
    {
      rank: 3,
      title: 'High-Ticket Returns in Home & Sports',
      channel: 'Omnichannel',
      lossValue: 148901 + 138333,
      returnCount: 483,
      cancelCount: 594,
      returnRate: 0.078,
      cancelRate: 0.096,
      rootCause: 'Bulky freight delivery delays and carrier damage resulting in order rejection at doorstep.',
      actionTitle: 'Audit white-glove carrier SLAs for bulky freight items',
      actionLink: '/dashboard/actions',
    },
    {
      rank: 4,
      title: 'COD & Cash Payment Failure Cancellations',
      channel: 'Store & App',
      lossValue: 137607,
      returnCount: 284,
      cancelCount: 324,
      returnRate: 0.079,
      cancelRate: 0.091,
      rootCause: 'Customer unavailability upon cash-on-delivery delivery attempts.',
      actionTitle: 'Incentivize UPI / Card prepayments with 3% instant checkout discount',
      actionLink: '/dashboard/actions',
    },
  ];

  // Filter category breakdown
  const filteredCategories = categoryBreakdown.filter((cat) => {
    return cat.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Cancellations &amp; Returns Intelligence
            </h1>
            <span className="rounded-full bg-rose-500/10 border border-rose-500/30 px-2.5 py-0.5 font-mono text-[11px] text-rose-300">
              $1.62M Impact
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Root-cause diagnostics across 1,431 returned orders ($760K) and 1,689 cancelled orders ($862K).
          </p>
        </div>

        <Link
          href="/dashboard/actions"
          className="flex items-center gap-2 rounded-xl bg-surface border border-cyan-500/40 px-4 py-2 font-heading text-xs font-semibold text-cyan-300 hover:bg-cyan-500/10 transition-all self-start sm:self-auto"
        >
          <span>Remediation Playbooks</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Top 3 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-rose-500/25 bg-surface/70 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Returned Value</span>
            <RotateCcw className="h-4 w-4 text-rose-400" />
          </div>
          <div className="mt-2 font-mono text-2xl sm:text-3xl font-bold text-white">
            {formatCurrency(metrics.totalReturnsDollar)}
          </div>
          <div className="mt-1 text-xs text-rose-400 font-mono">
            {formatPercent(metrics.returnRate)} of all orders (1,431 items)
          </div>
        </div>

        <div className="rounded-2xl border border-amber-500/25 bg-surface/70 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Cancelled Value</span>
            <XCircle className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-2 font-mono text-2xl sm:text-3xl font-bold text-white">
            {formatCurrency(metrics.totalCancelledDollar)}
          </div>
          <div className="mt-1 text-xs text-amber-400 font-mono">
            {formatPercent(metrics.cancellationRate)} of all orders (1,689 items)
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-surface/70 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Uncaptured Pipeline</span>
            <TrendingDown className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="mt-2 font-mono text-2xl sm:text-3xl font-bold text-cyan-300">
            {formatCurrency(metrics.totalReturnsDollar + metrics.totalCancelledDollar)}
          </div>
          <div className="mt-1 text-xs text-slate-400 font-mono">
            22.2% of total initiated volume
          </div>
        </div>
      </div>

      {/* Ranked Problems by Financial Impact */}
      <div className="rounded-2xl border border-cyan-500/15 bg-surface/70 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-white">
              Ranked Financial Leaks by Business Impact
            </h2>
            <p className="text-xs text-slate-400">
              Sorted by direct cash erosion to prioritize immediate operational fixes.
            </p>
          </div>
          <span className="font-mono text-xs text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
            Priority Matrix
          </span>
        </div>

        <div className="space-y-4">
          {rankedProblems.map((prob) => (
            <div
              key={prob.rank}
              className="rounded-xl border border-cyan-500/15 bg-surface-raised/70 p-4 hover:border-cyan-500/35 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 border border-rose-500/30 font-mono text-xs font-bold text-rose-400">
                    #{prob.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-sm font-bold text-white">
                        {prob.title}
                      </h3>
                      <span className="rounded bg-surface px-2 py-0.5 font-mono text-[10px] text-slate-300 border border-slate-700">
                        {prob.channel}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed max-w-3xl">
                      <strong className="text-slate-100">Root Cause:</strong> {prob.rootCause}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-slate-800 pt-2 md:pt-0 shrink-0">
                  <div className="text-left md:text-right">
                    <div className="font-mono text-sm font-bold text-rose-400">
                      {formatCurrency(prob.lossValue, true)}
                    </div>
                    <div className="font-mono text-[10px] text-slate-400">
                      {prob.returnCount} returns ({formatPercent(prob.returnRate)})
                    </div>
                  </div>

                  <Link
                    href={prob.actionLink}
                    className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 font-heading text-[11px] font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-all"
                  >
                    <span>Fix</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Channel Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {channelReturns.map((ch) => (
          <div
            key={ch.channel}
            className="rounded-2xl border border-cyan-500/15 bg-surface/70 p-5 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-raised border border-cyan-500/20">
                  {getChannelIcon(ch.channel)}
                </div>
                <span className="font-heading text-sm font-bold text-white">
                  {ch.channel} Channel
                </span>
              </div>
              <span className="font-mono text-xs text-slate-400">
                {formatNumber(ch.totalOrders)} Orders
              </span>
            </div>

            <div className="mt-4 space-y-2 font-mono text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-surface-raised">
                <span className="text-slate-400">Return Rate:</span>
                <span className="font-bold text-rose-400">{formatPercent(ch.returnRate)}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-surface-raised">
                <span className="text-slate-400">Returned Value:</span>
                <span className="font-bold text-white">{formatCurrency(ch.returnedValue)}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-surface-raised">
                <span className="text-slate-400">Cancel Rate:</span>
                <span className="font-bold text-amber-400">{formatPercent(ch.cancelRate)}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-surface-raised">
                <span className="text-slate-400">Cancelled Value:</span>
                <span className="font-bold text-white">{formatCurrency(ch.cancelledValue)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Returns Table */}
      <div className="rounded-2xl border border-cyan-500/15 bg-surface/70 p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-white">
              Category Return Vulnerability Table
            </h2>
            <p className="text-xs text-slate-400">
              Aggregated return dollar losses and clean net revenue margins by merchandise vertical.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-cyan-500/20 bg-surface-raised pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-cyan-500/15 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4">Return Rate</th>
                <th className="py-3 px-4">Returned Value</th>
                <th className="py-3 px-4">Margin Bleed</th>
                <th className="py-3 px-4">Net Realized Margin</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10 font-mono text-xs">
              {filteredCategories.map((cat) => (
                <tr key={cat.category} className="hover:bg-surface-raised/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold font-heading text-white">
                    {cat.category}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {formatNumber(cat.orderCount)}
                  </td>
                  <td className="py-3.5 px-4 text-rose-400 font-semibold">
                    {formatPercent(cat.returnRate)}
                  </td>
                  <td className="py-3.5 px-4 text-white">
                    {formatCurrency(cat.returnedAmount)}
                  </td>
                  <td className="py-3.5 px-4 text-rose-400">
                    -{formatCurrency(cat.leakAmount)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                        cat.marginRate > 0.2
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {formatPercent(cat.marginRate)}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href="/dashboard/actions"
                      className="font-heading text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                      Mitigate &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
