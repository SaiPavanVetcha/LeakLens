'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { useLeakLens } from '@/context/DataContext';
import { formatCurrency } from '@/lib/utils';

export function TopAlertBanner() {
  const { data } = useLeakLens();

  if (!data) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-surface to-surface p-4 sm:p-5 shadow-rose-glow">
      <div className="absolute top-0 right-0 h-full w-1/3 bg-radial-gradient from-rose-500/10 to-transparent pointer-events-none" />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-500/40 bg-rose-500/15 text-rose-400">
            <AlertCircle className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-rose-500/20 border border-rose-500/40 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-rose-300">
                P0 Critical Alert
              </span>
              <span className="font-heading text-sm sm:text-base font-bold text-white">
                Inverted Pricing Trap: 76 SKUs Priced Below Unit Cost
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-300 max-w-3xl leading-relaxed">
              LeakLens detected that <strong className="text-white">76 of 250 products</strong> have{' '}
              <code className="text-cyan-300 bg-surface-raised px-1 py-0.5 rounded font-mono text-[11px]">unit_cost &gt; list_price</code>.
              This structural error generated <span className="font-mono font-semibold text-rose-400">{formatCurrency(data.metrics.pricingLeakDollar)}</span> in
              direct cash losses—accounting for <strong className="text-rose-300">93% of all store margin bleed</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <Link
            href="/dashboard/actions"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 px-4 py-2.5 font-heading text-xs font-semibold text-white shadow-rose-glow hover:brightness-110 transition-all w-full sm:w-auto"
          >
            <span>Execute Price Floor Safeguard</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
