'use client';

import React, { useState } from 'react';
import { useLeakLens } from '@/context/DataContext';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/utils';
import {
  Megaphone,
  AlertOctagon,
  TrendingDown,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  BarChart2,
} from 'lucide-react';
import Link from 'next/link';

export default function CampaignEfficiencyPage() {
  const { data } = useLeakLens();
  const [filterType, setFilterType] = useState<'all' | 'impossible' | 'valid'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!data) return null;

  const { processedCampaigns, campaignSummary, metrics } = data;

  const filteredCampaigns = processedCampaigns.filter((c) => {
    const matchesSearch =
      c.campaign_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.channel.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterType === 'all') return matchesSearch;
    if (filterType === 'impossible') return matchesSearch && c.is_impossible;
    if (filterType === 'valid') return matchesSearch && !c.is_impossible;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Campaign Efficiency &amp; Attribution
            </h1>
            <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 font-mono text-[11px] text-cyan-300">
              1,200 Ad Sets Analyzed
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Detecting ghost attribution anomalies and calculating True Return-Adjusted ROAS.
          </p>
        </div>

        <Link
          href="/dashboard/actions"
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 font-heading text-xs font-semibold text-slate-950 shadow-cyan-glow hover:bg-cyan-400 transition-all self-start sm:self-auto"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Deactivate Ghost Campaigns</span>
        </Link>
      </div>

      {/* Top Warning Banner for Impossible Campaigns */}
      <div className="rounded-2xl border border-rose-500/30 bg-rose-950/25 p-5 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400">
              <AlertOctagon className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-rose-300 uppercase tracking-wider bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
                  Data Anomaly Isolation
                </span>
                <span className="font-heading text-sm font-bold text-white">
                  88 Ghost Campaigns Flagged with Impossible Attribution
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed max-w-3xl">
                The ML anomaly detector identified <strong className="text-white">88 ad sets ($345,616 in spend)</strong> where reported conversions exceed clicks (e.g., 1,000 conversions on 500 clicks). These corrupt bidding algorithms and deceive budget planners into doubling down on zero-yield ads.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/actions"
            className="flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2 font-heading text-xs font-semibold text-white shadow-rose-glow hover:bg-rose-400 transition-all shrink-0 w-full sm:w-auto justify-center"
          >
            <span>Pause 88 Glitched Campaigns</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards: Reported vs Adjusted ROAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-cyan-500/20 bg-surface/70 p-5 backdrop-blur-xl">
          <div className="text-xs text-slate-400">Total Valid Ad Spend</div>
          <div className="mt-2 font-mono text-2xl font-bold text-white">
            {formatCurrency(campaignSummary.totalSpend - campaignSummary.impossibleSpend)}
          </div>
          <div className="mt-1 text-xs text-slate-400 font-mono">
            {formatCurrency(campaignSummary.totalSpend)} gross spend
          </div>
        </div>

        <div className="rounded-2xl border border-rose-500/25 bg-surface/70 p-5 backdrop-blur-xl">
          <div className="text-xs text-slate-400">Wasted Ghost Spend</div>
          <div className="mt-2 font-mono text-2xl font-bold text-rose-400">
            {formatCurrency(campaignSummary.impossibleSpend)}
          </div>
          <div className="mt-1 text-xs text-rose-400 font-mono">
            88 impossible campaigns
          </div>
        </div>

        <div className="rounded-2xl border border-amber-500/25 bg-surface/70 p-5 backdrop-blur-xl">
          <div className="text-xs text-slate-400">Reported Gross ROAS</div>
          <div className="mt-2 font-mono text-2xl font-bold text-amber-300">
            {campaignSummary.avgReportedRoas.toFixed(2)}x
          </div>
          <div className="mt-1 text-xs text-amber-400 font-mono">
            Unadjusted for product returns
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/25 bg-surface/70 p-5 backdrop-blur-xl">
          <div className="text-xs text-slate-400">True Return-Adjusted ROAS</div>
          <div className="mt-2 font-mono text-2xl font-bold text-emerald-400">
            {campaignSummary.avgAdjustedRoas.toFixed(2)}x
          </div>
          <div className="mt-1 text-xs text-emerald-400 font-mono">
            -23% true margin discount
          </div>
        </div>
      </div>

      {/* Category ROAS Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-cyan-500/15 bg-surface/70 p-5 backdrop-blur-xl">
          <h3 className="font-heading text-base font-bold text-white mb-2">
            Category ROAS vs Return Erosion
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Notice how Beauty delivers the lowest ad return (1.48x) while suffering severe margin dilution.
          </p>

          <div className="space-y-3 font-mono text-xs">
            {campaignSummary.categoryEfficiency.map((c) => (
              <div
                key={c.category}
                className="p-3 rounded-xl bg-surface-raised border border-cyan-500/10 flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-white">{c.category}</span>
                  <div className="text-[11px] text-slate-400">
                    Spend: {formatCurrency(c.spend, true)}
                  </div>
                </div>

                <div className="flex items-center gap-6 text-right">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Reported:</span>
                    <span className="font-bold text-slate-200">{c.reportedRoas}x</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Adjusted:</span>
                    <span
                      className={`font-bold ${
                        c.adjustedRoas < 1.7 ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {c.adjustedRoas}x
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Advertising Efficiency */}
        <div className="rounded-2xl border border-cyan-500/15 bg-surface/70 p-5 backdrop-blur-xl">
          <h3 className="font-heading text-base font-bold text-white mb-2">
            Marketing Channel Performance
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Comparing ad spend, aggregate conversions, and return-adjusted efficiency by media channel.
          </p>

          <div className="space-y-3 font-mono text-xs">
            {campaignSummary.channelEfficiency.map((ch) => (
              <div
                key={ch.channel}
                className="p-3 rounded-xl bg-surface-raised border border-cyan-500/10 flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-white">{ch.channel}</span>
                  <div className="text-[11px] text-slate-400">
                    Conversions: {formatNumber(ch.conversions)}
                  </div>
                </div>

                <div className="flex items-center gap-6 text-right">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Spend:</span>
                    <span className="font-bold text-white">{formatCurrency(ch.spend, true)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Net ROAS:</span>
                    <span className="font-bold text-cyan-300">{ch.adjustedRoas}x</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Filterable Campaign Table */}
      <div className="rounded-2xl border border-cyan-500/15 bg-surface/70 p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-white">
              Campaign Attribution Ledger
            </h2>
            <p className="text-xs text-slate-400">
              Granular review of all 1,200 campaign records with impossible row flags.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search campaign ID, channel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-cyan-500/20 bg-surface-raised pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="flex rounded-xl border border-cyan-500/20 bg-surface-raised p-1 w-full sm:w-auto">
              <button
                onClick={() => setFilterType('all')}
                className={`flex-1 sm:flex-none rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                  filterType === 'all'
                    ? 'bg-cyan-500/20 text-cyan-300'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('impossible')}
                className={`flex-1 sm:flex-none rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                  filterType === 'impossible'
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Ghost Only (88)
              </button>
              <button
                onClick={() => setFilterType('valid')}
                className={`flex-1 sm:flex-none rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                  filterType === 'valid'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Clean
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-cyan-500/15 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Campaign ID</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Spend</th>
                <th className="py-3 px-4">Impressions</th>
                <th className="py-3 px-4">Clicks</th>
                <th className="py-3 px-4">Conversions</th>
                <th className="py-3 px-4">Reported ROAS</th>
                <th className="py-3 px-4">Adjusted ROAS</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10 font-mono text-xs">
              {filteredCampaigns.slice(0, 20).map((camp) => (
                <tr key={camp.campaign_id} className="hover:bg-surface-raised/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    {camp.campaign_id}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {camp.channel}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {camp.category}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {formatCurrency(camp.spend)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {formatNumber(camp.impressions)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {formatNumber(camp.clicks)}
                  </td>
                  <td className="py-3.5 px-4 text-white">
                    {formatNumber(camp.conversions)}
                  </td>
                  <td className="py-3.5 px-4 text-amber-400">
                    {camp.reported_roas}x
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">
                    {camp.is_impossible ? '0.00x' : `${camp.adjusted_roas}x`}
                  </td>
                  <td className="py-3.5 px-4">
                    {camp.is_impossible ? (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        Ghost Attribution
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        Verified
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t border-cyan-500/10 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {Math.min(20, filteredCampaigns.length)} of {filteredCampaigns.length} campaigns</span>
          <span className="font-mono text-cyan-300">Source: campaigns.csv &amp; anomaly_model.joblib</span>
        </div>
      </div>
    </div>
  );
}
