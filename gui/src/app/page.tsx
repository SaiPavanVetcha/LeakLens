'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/shared/Navbar';
import { useLeakLens } from '@/context/DataContext';
import { formatCurrency } from '@/lib/utils';
import {
  ArrowRight,
  ShieldAlert,
  TrendingDown,
  Sparkles,
  Boxes,
  Megaphone,
  CheckCircle2,
  Activity,
  Layers,
  Database,
  Search,
  Zap,
} from 'lucide-react';

export default function LandingPage() {
  const { data, loading } = useLeakLens();

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
        {/* Glow backdrop shapes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 w-[350px] h-[250px] bg-rose-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono font-medium text-cyan-300 mb-8 shadow-cyan-glow">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>AI Decision-Support for Retail &amp; E-Commerce Managers</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]">
            Find where your money is leaking — <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-200 to-cyan-500 text-cyan-glow">
              and fix it.
            </span>
          </h1>

          {/* Value Proposition */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            LeakLens continuously scans transaction logs, product margins, marketing feeds, and inventory velocity to pinpoint root-cause profit leaks and prescribe high-confidence remediation playbooks.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-8 py-3.5 font-heading text-sm font-bold text-slate-950 shadow-cyan-glow hover:bg-cyan-400 hover:shadow-cyan-glow-lg transition-all w-full sm:w-auto"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="#how-it-works"
              className="flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-surface/80 px-8 py-3.5 font-heading text-sm font-medium text-slate-200 hover:bg-surface-raised hover:text-white hover:border-cyan-400 transition-all w-full sm:w-auto backdrop-blur-md"
            >
              <span>How It Works</span>
            </a>
          </div>

          {/* Live Data Ticker */}
          <div className="mt-16 sm:mt-20 rounded-2xl border border-cyan-500/20 bg-surface/70 p-6 backdrop-blur-xl shadow-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Real-Time Audit Metrics (Calculated from 18,000 Transactions)</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-cyan-500/10">
              <div className="p-3">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-rose-400">
                  {data ? formatCurrency(data.metrics.totalLeaksDollar, true) : '$1.21M'}
                </div>
                <div className="text-xs text-slate-400 mt-1">Total Margin Bleed</div>
              </div>

              <div className="p-3">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-amber-400">
                  76 SKUs
                </div>
                <div className="text-xs text-slate-400 mt-1">Cost &gt; List Price Flaws</div>
              </div>

              <div className="p-3">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-cyan-400">
                  {data ? `${data.metrics.ghostCampaignCount} Sets` : '88 Sets'}
                </div>
                <div className="text-xs text-slate-400 mt-1">Ghost Marketing Rows</div>
              </div>

              <div className="p-3">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400">
                  {data ? formatCurrency(data.metrics.totalRevenue30d, true) : '$578K'}
                </div>
                <div className="text-xs text-slate-400 mt-1">30-Day Completed Sales</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 border-t border-cyan-500/10 bg-surface/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
              Diagnostic Architecture
            </span>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-white">
              Three Steps from Anomaly to Profit Recovery
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Unlike generic BI dashboards that just display vanity graphs, LeakLens isolates the causal drivers of lost EBITDA and generates automated remediation orders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="rounded-2xl border border-cyan-500/20 bg-surface/60 p-6 backdrop-blur-xl relative group hover:border-cyan-500/40 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                <Database className="h-6 w-6" />
              </div>
              <div className="font-mono text-xs font-semibold text-cyan-400 mb-1">
                STEP 01
              </div>
              <h3 className="font-heading text-lg font-bold text-white">
                Multi-Modal Ingestion
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Aggregates POS transactions, SKU unit cost catalogs, inventory ledger balance, and multi-channel campaign feeds into a normalized real-time schema.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-cyan-500/20 bg-surface/60 p-6 backdrop-blur-xl relative group hover:border-cyan-500/40 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mb-5 group-hover:scale-110 transition-transform">
                <Search className="h-6 w-6" />
              </div>
              <div className="font-mono text-xs font-semibold text-rose-400 mb-1">
                STEP 02
              </div>
              <h3 className="font-heading text-lg font-bold text-white">
                Root-Cause AI Diagnostics
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Applies Decision Trees (AUC 0.965) and Isolation Forests to classify loss-risk orders, detect attribution glitches, and model SKU stockout runway velocity.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-cyan-500/20 bg-surface/60 p-6 backdrop-blur-xl relative group hover:border-cyan-500/40 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6" />
              </div>
              <div className="font-mono text-xs font-semibold text-emerald-400 mb-1">
                STEP 03
              </div>
              <h3 className="font-heading text-lg font-bold text-white">
                Prescriptive Playbooks
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Delivers vetted, one-click actions: enforce margin price floors, expedite air freight for 4 critical SKUs, and kill ghost campaigns with quantified weekly ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section className="py-20 border-t border-cyan-500/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                Core Module
              </span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-white">
                Stop Bleeding Margin on Negative-Unit-Price Products
              </h2>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                In many retail operations, vendor cost increases are quietly absorbed without list price updates. In this dataset, <strong className="text-white">76 products</strong> sell at a loss on every transaction, causing <strong className="text-rose-400">$1,128,877 in direct cash deficit</strong>.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xs mt-0.5">
                    ✓
                  </div>
                  <div className="text-xs text-slate-300">
                    <strong className="text-white">Explainable Decision Tree:</strong> Isolates list_price, unit_price, discount_pct, and lead days without data snooping.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xs mt-0.5">
                    ✓
                  </div>
                  <div className="text-xs text-slate-300">
                    <strong className="text-white">100% Top-10% Hit Rate:</strong> The highest-risk flagged transactions have a 100% empirical loss probability.
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/dashboard/actions"
                  className="inline-flex items-center gap-2 rounded-xl bg-surface border border-cyan-500/40 px-5 py-2.5 font-heading text-xs font-semibold text-cyan-300 hover:bg-cyan-500/10 transition-all"
                >
                  <span>Review Margin Floor Action</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Preview Card */}
            <div className="rounded-2xl border border-cyan-500/25 bg-surface/80 p-6 backdrop-blur-xl shadow-cyan-glow">
              <div className="flex items-center justify-between border-b border-cyan-500/15 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-rose-400" />
                  <span className="font-heading text-sm font-bold text-white">
                    Catalog Loss Traps
                  </span>
                </div>
                <span className="font-mono text-xs text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  76 Deficit SKUs
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-raised border border-rose-500/20">
                  <div>
                    <span className="font-bold text-white">PR0003</span>
                    <span className="text-slate-400 ml-2">Sports Vertical</span>
                  </div>
                  <div className="text-right">
                    <div className="text-rose-400 font-bold">Cost $223.15 &gt; List $186.62</div>
                    <div className="text-[10px] text-slate-400">-$36.53/unit base loss</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-raised border border-rose-500/20">
                  <div>
                    <span className="font-bold text-white">PR0004</span>
                    <span className="text-slate-400 ml-2">Sports Vertical</span>
                  </div>
                  <div className="text-right">
                    <div className="text-rose-400 font-bold">Cost $88.98 &gt; List $43.10</div>
                    <div className="text-[10px] text-slate-400">-$45.88/unit base loss</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-raised border border-rose-500/20">
                  <div>
                    <span className="font-bold text-white">PR0012</span>
                    <span className="text-slate-400 ml-2">Beauty Vertical</span>
                  </div>
                  <div className="text-right">
                    <div className="text-rose-400 font-bold">Cost $117.83 &gt; List $12.60</div>
                    <div className="text-[10px] text-slate-400">-$105.23/unit base loss</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-cyan-500/10 bg-surface/80 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-white">LeakLens</span>
            <span>&copy; 2026 Sai Pavan Vetcha. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">
              Dashboard
            </Link>
            <Link href="/dashboard/returns" className="hover:text-cyan-400 transition-colors">
              Returns &amp; Cancellations
            </Link>
            <Link href="/dashboard/inventory" className="hover:text-cyan-400 transition-colors">
              Inventory Velocity
            </Link>
            <Link href="/dashboard/actions" className="hover:text-cyan-400 transition-colors">
              Recommended Playbooks
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
