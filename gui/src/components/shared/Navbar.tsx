'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Eye, ShieldAlert, Sparkles, ArrowRight, Github } from 'lucide-react';
import { useLeakLens } from '@/context/DataContext';
import { formatCurrency } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const { executedSavings } = useLeakLens();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/15 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 via-cyan-500/10 to-transparent p-px shadow-cyan-glow">
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-surface border border-cyan-500/40 group-hover:border-cyan-400 transition-colors">
              <Eye className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                Leak<span className="text-cyan-400">Lens</span>
              </span>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-cyan-300">
                PROD v1.0
              </span>
            </div>
            <p className="hidden text-[10px] text-slate-400 sm:block">
              Revenue Leak Intelligence
            </p>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-cyan-500/20 bg-surface/60 p-1 backdrop-blur-md">
          <Link
            href="/"
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              pathname === '/'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </Link>
          <Link
            href="/dashboard"
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              pathname === '/dashboard'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/returns"
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              pathname === '/dashboard/returns'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Returns & Cancels
          </Link>
          <Link
            href="/dashboard/inventory"
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              pathname === '/dashboard/inventory'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Inventory Risk
          </Link>
          <Link
            href="/dashboard/campaigns"
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              pathname === '/dashboard/campaigns'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Campaigns
          </Link>
          <Link
            href="/dashboard/actions"
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              pathname === '/dashboard/actions'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Actions
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {executedSavings > 0 && (
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 shadow-emerald-glow">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>Recovered: {formatCurrency(executedSavings)}/wk</span>
            </div>
          )}

          <a
            href="https://github.com/SaiPavanVetcha/LeakLens"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/20 bg-surface text-slate-300 hover:border-cyan-400 hover:text-white transition-colors"
            title="View on GitHub"
          >
            <Github className="h-4 w-4" />
          </a>

          {!isDashboard ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 font-heading text-xs font-semibold text-slate-950 shadow-cyan-glow hover:bg-cyan-400 hover:shadow-cyan-glow-lg transition-all"
            >
              <span>Open App</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <Link
              href="/dashboard/actions"
              className="flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 font-heading text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition-all"
            >
              <ShieldAlert className="h-4 w-4 text-cyan-400" />
              <span className="hidden sm:inline">Playbooks</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
