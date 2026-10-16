'use client';

import React, { useState } from 'react';
import { useLeakLens } from '@/context/DataContext';
import { formatCurrency, formatPercent } from '@/lib/utils';
import {
  CheckCircle2,
  Circle,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Tag,
  Boxes,
  Megaphone,
  Truck,
  RotateCcw,
  Check,
  Flame,
} from 'lucide-react';

export default function RecommendedActionsPage() {
  const { actions, toggleActionStatus, executedSavings } = useLeakLens();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [justExecutedId, setJustExecutedId] = useState<string | null>(null);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Pricing':
        return <Tag className="h-4 w-4 text-rose-400" />;
      case 'Inventory':
        return <Boxes className="h-4 w-4 text-amber-400" />;
      case 'Marketing':
        return <Megaphone className="h-4 w-4 text-cyan-400" />;
      case 'Operations':
        return <Truck className="h-4 w-4 text-emerald-400" />;
      default:
        return <Zap className="h-4 w-4 text-slate-400" />;
    }
  };

  const filteredActions = actions.filter((act) => {
    const matchesCat =
      selectedCategory === 'all' || act.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesStatus =
      selectedStatus === 'all' || act.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesCat && matchesStatus;
  });

  const totalPossibleSavings = actions.reduce((sum, a) => sum + a.estimatedWeeklySaving, 0);
  const pendingCount = actions.filter((a) => a.status === 'Pending').length;
  const executedCount = actions.filter((a) => a.status === 'Executed').length;

  const handleToggle = (id: string) => {
    toggleActionStatus(id);
    setJustExecutedId(id);
    setTimeout(() => setJustExecutedId(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Recommended Remediation Playbooks
            </h1>
            <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 font-mono text-[11px] text-cyan-300">
              {pendingCount} Pending Playbooks
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Data-backed operational interventions prioritized by estimated weekly recovery impact.
          </p>
        </div>

        {/* Dynamic Recovery Tracker */}
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 px-4 py-2.5 backdrop-blur-md shadow-emerald-glow">
          <Sparkles className="h-5 w-5 text-emerald-400 animate-pulse" />
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Pipeline Recovered
            </div>
            <div className="font-mono text-base font-bold text-emerald-300">
              {formatCurrency(executedSavings)} / week
            </div>
          </div>
        </div>
      </div>

      {/* Hero Savings Progress Meter */}
      <div className="rounded-2xl border border-cyan-500/20 bg-surface/70 p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Overall Remediation Progress
            </span>
            <div className="font-heading text-lg font-bold text-white mt-0.5">
              {executedCount} of {actions.length} Interventions Executed
            </div>
          </div>
          <div className="text-right font-mono text-xs">
            <span className="text-emerald-400 font-bold">{formatCurrency(executedSavings)}</span>
            <span className="text-slate-400"> of {formatCurrency(totalPossibleSavings)} weekly potential</span>
          </div>
        </div>

        <div className="h-2.5 w-full rounded-full bg-surface-raised overflow-hidden border border-cyan-500/20">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-emerald-500 transition-all duration-500 rounded-full shadow-emerald-glow"
            style={{
              width: `${(executedSavings / (totalPossibleSavings || 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-cyan-500/20 bg-surface-raised p-1">
          {['all', 'pricing', 'inventory', 'marketing', 'operations'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 rounded-xl border border-cyan-500/20 bg-surface-raised p-1">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedStatus === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Status
          </button>
          <button
            onClick={() => setSelectedStatus('pending')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedStatus === 'pending'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setSelectedStatus('executed')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedStatus === 'executed'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Executed ({executedCount})
          </button>
        </div>
      </div>

      {/* Action Cards List */}
      <div className="space-y-4">
        {filteredActions.map((action) => {
          const isDone = action.status === 'Executed';
          const isJustExecuted = justExecutedId === action.id;

          return (
            <div
              key={action.id}
              className={`rounded-2xl border transition-all duration-300 p-5 sm:p-6 backdrop-blur-xl ${
                isDone
                  ? 'border-emerald-500/30 bg-surface/50 opacity-80'
                  : 'border-cyan-500/20 bg-surface/80 hover:border-cyan-500/40 hover:shadow-cyan-glow'
              } ${isJustExecuted ? 'ring-2 ring-emerald-400 scale-[1.01]' : ''}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                <div className="space-y-3 flex-1">
                  {/* Badge row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-surface-raised px-2.5 py-0.5 font-mono text-[11px] font-semibold text-slate-200">
                      {getCategoryIcon(action.category)}
                      <span>{action.category}</span>
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold border ${
                        action.urgency === 'Immediate'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : action.urgency === 'High'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                      }`}
                    >
                      {action.urgency} Urgency
                    </span>

                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 font-mono text-[11px] text-emerald-300">
                      {action.confidence}% ML Confidence
                    </span>

                    <span className="font-mono text-xs text-slate-500 ml-auto hidden sm:inline">
                      {action.id}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {action.description}
                    </p>
                  </div>

                  {/* Evidence Box: "Why this is flagged" */}
                  <div className="rounded-xl border border-cyan-500/15 bg-surface-raised/70 p-3.5 text-xs">
                    <div className="flex items-center gap-2 font-heading font-semibold text-cyan-300 mb-1">
                      <ShieldCheck className="h-4 w-4 text-cyan-400" />
                      <span>Supporting Evidence (Why This Is Flagged):</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {action.whyFlagged}
                    </p>
                  </div>

                  {/* Metrics Impact */}
                  <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Projected Outcome: {action.metricsImpact}</span>
                  </div>
                </div>

                {/* Right CTA & Financial Impact */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 border-cyan-500/10 pt-4 lg:pt-0 shrink-0 gap-4">
                  <div className="text-left lg:text-right">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Est. Weekly Saving
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-400 mt-0.5">
                      +{formatCurrency(action.estimatedWeeklySaving)}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      ~{formatCurrency(action.estimatedWeeklySaving * 52, true)} / year
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggle(action.id)}
                    className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-heading text-xs font-semibold transition-all shadow-md w-full sm:w-auto ${
                      isDone
                        ? 'border border-emerald-500/40 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                        : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-glow'
                    }`}
                  >
                    {isDone ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span>Marked Executed</span>
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        <span>Execute Playbook</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
