'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  RotateCcw,
  Boxes,
  Megaphone,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import { useLeakLens } from '@/context/DataContext';
import { formatCurrency } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  const { data, actions, executedSavings } = useLeakLens();

  const pendingActions = actions.filter((a) => a.status === 'Pending').length;

  const navItems = [
    {
      title: 'Overview',
      href: '/dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      title: 'Cancellations & Returns',
      href: '/dashboard/returns',
      icon: RotateCcw,
      badge: data ? `${(data.metrics.returnRate * 100).toFixed(1)}%` : null,
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    },
    {
      title: 'Inventory Risk',
      href: '/dashboard/inventory',
      icon: Boxes,
      badge: data ? `${data.metrics.stockoutRiskCount} SKUs` : null,
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      title: 'Campaign Efficiency',
      href: '/dashboard/campaigns',
      icon: Megaphone,
      badge: data ? `${data.metrics.ghostCampaignCount} Flagged` : null,
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    },
    {
      title: 'Recommended Actions',
      href: '/dashboard/actions',
      icon: CheckCircle2,
      badge: pendingActions > 0 ? `${pendingActions} New` : 'Done',
      badgeColor:
        pendingActions > 0
          ? 'text-cyan-300 bg-cyan-500/20 border-cyan-500/40 shadow-cyan-glow'
          : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col border-r border-cyan-500/15 bg-surface/50 backdrop-blur-xl p-4 min-h-[calc(100vh-4rem)]">
      {/* Platform Status Indicator */}
      <div className="mb-6 rounded-2xl border border-cyan-500/20 bg-surface-raised/80 p-3.5 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
            Engine Status
          </span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="font-mono text-xs font-semibold text-cyan-300">
            Active Analytics
          </span>
          <span className="font-mono text-[10px] text-slate-400">
            5/5 CSVs Synced
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="space-y-1">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Core Modules
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/35 shadow-cyan-glow'
                  : 'text-slate-400 hover:bg-surface-raised hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`h-4 w-4 transition-colors ${
                    isActive
                      ? 'text-cyan-400'
                      : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                />
                <span>{item.title}</span>
              </div>
              {item.badge && (
                <span
                  className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Quick Leak Summary Card */}
      <div className="mt-auto pt-6">
        <div className="rounded-2xl border border-rose-500/25 bg-rose-950/20 p-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-rose-400">
            <TrendingDown className="h-4 w-4" />
            <span className="font-heading text-xs font-semibold">Total Margin Bleed</span>
          </div>
          <div className="mt-2">
            <div className="font-mono text-lg font-bold text-white">
              {data ? formatCurrency(data.metrics.totalLeaksDollar, true) : '...'}
            </div>
            <div className="text-[11px] text-slate-400">
              38.1% of completed orders
            </div>
          </div>

          {executedSavings > 0 ? (
            <div className="mt-3 pt-2.5 border-t border-rose-500/20 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Recovered:
              </span>
              <span className="font-mono font-semibold text-emerald-300">
                {formatCurrency(executedSavings)}/wk
              </span>
            </div>
          ) : (
            <Link
              href="/dashboard/actions"
              className="mt-3 block text-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 py-1.5 font-heading text-[11px] font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-all"
            >
              Review Fix Playbooks &rarr;
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
