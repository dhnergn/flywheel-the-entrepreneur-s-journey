import React from 'react';
import { useGame } from '../context/GameContext';
import { Megaphone, Users, Sparkles, Sliders, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const MarketingView: React.FC = () => {
  const { company, updateMarketingBudget } = useGame();

  const totalMarketingBudget = company.marketingChannels.reduce((sum, ch) => sum + ch.allocatedBudget, 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-white font-serif tracking-tight">
          Demand Generation & Marketing Channels
        </h1>
        <p className="text-xs text-slate-400">
          The best marketing strategy is an extraordinary product. Allocate your acquisition budget across proven channels.
        </p>
      </div>

      {/* Top Banner: Total Marketing Budget */}
      <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-950 border border-indigo-800/50 rounded-lg text-indigo-400">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              Total Monthly Demand Spend
            </div>
            <div className="text-xs text-slate-400 font-mono">
              ${totalMarketingBudget.toLocaleString()}/month allocated across {company.marketingChannels.length} channels
            </div>
          </div>
        </div>

        <div className="text-right font-mono">
          <div className="text-xs text-slate-500 uppercase">Brand Reputation</div>
          <div className="text-sm font-bold text-indigo-300">{company.brandReputation}/100</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Allocation Sliders */}
        <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-semibold text-white">Acquisition Channel Tuning</h2>
            <Sliders className="w-4 h-4 text-indigo-400" />
          </div>

          <div className="space-y-4">
            {company.marketingChannels.map((channel) => (
              <div key={channel.id} className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-white">{channel.name}</span>
                    <p className="text-[11px] text-slate-400">{channel.description}</p>
                  </div>
                  <div className="text-right font-mono shrink-0 pl-3">
                    <span className="text-sm font-bold text-indigo-300">
                      ${channel.allocatedBudget}
                    </span>
                    <span className="text-[10px] text-slate-500 block">/month</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="50"
                    value={channel.allocatedBudget}
                    onChange={(e) => updateMarketingBudget(channel.id, Number(e.target.value))}
                    className="flex-1 accent-indigo-500 cursor-pointer"
                  />
                  <div className="flex gap-1">
                    {[0, 250, 500, 1000].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => updateMarketingBudget(channel.id, preset)}
                        className={`text-[10px] px-2 py-0.5 rounded font-mono border transition-colors cursor-pointer ${
                          channel.allocatedBudget === preset
                            ? 'bg-indigo-600 text-white border-indigo-500'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        ${preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments Analysis */}
        <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-semibold text-white">Target Customer Segments</h2>
            <Users className="w-4 h-4 text-sky-400" />
          </div>

          <div className="space-y-3">
            {company.segments.map((seg) => (
              <div key={seg.id} className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{seg.name}</span>
                  <span className="font-mono text-slate-400 text-[11px]">
                    Price Sensitivity: <strong className="capitalize text-slate-200">{seg.priceSensitivity}</strong>
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Key Value Driver: {seg.featureNeeds}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-900">
                  <span>Satisfaction: {seg.satisfaction}%</span>
                  <span>Monthly Churn: {(seg.churnRate * 100).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
