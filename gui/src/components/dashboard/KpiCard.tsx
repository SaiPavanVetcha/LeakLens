'use client';

import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string;
  subValue?: string;
  delta?: string;
  isPositive?: boolean;
  neutralDelta?: boolean;
  icon: LucideIcon;
  variant?: 'cyan' | 'rose' | 'amber' | 'emerald';
  badge?: string;
}

export function KpiCard({
  title,
  value,
  subValue,
  delta,
  isPositive = true,
  neutralDelta = false,
  icon: Icon,
  variant = 'cyan',
  badge,
}: KpiCardProps) {
  const variantStyles = {
    cyan: {
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      glow: 'hover:shadow-cyan-glow',
      textAccent: 'text-cyan-400',
    },
    rose: {
      border: 'border-rose-500/25 hover:border-rose-500/45',
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      glow: 'hover:shadow-rose-glow',
      textAccent: 'text-rose-400',
    },
    amber: {
      border: 'border-amber-500/25 hover:border-amber-500/45',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      glow: 'hover:shadow-amber-glow',
      textAccent: 'text-amber-400',
    },
    emerald: {
      border: 'border-emerald-500/25 hover:border-emerald-500/45',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      glow: 'hover:shadow-emerald-glow',
      textAccent: 'text-emerald-400',
    },
  }[variant];

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-surface/70 p-5 backdrop-blur-xl border transition-all duration-300',
        variantStyles.border,
        variantStyles.glow
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 tracking-wide">
          {title}
        </span>
        <div
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-xl border p-2 transition-transform group-hover:scale-105',
            variantStyles.iconBg
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {value}
        </div>
        {badge && (
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between text-xs">
        {subValue && <span className="text-slate-400">{subValue}</span>}
        {delta && (
          <div
            className={cn(
              'flex items-center gap-1 font-mono font-medium',
              neutralDelta
                ? 'text-slate-400'
                : isPositive
                ? 'text-emerald-400'
                : 'text-rose-400'
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{delta}</span>
          </div>
        )}
      </div>
    </div>
  );
}
