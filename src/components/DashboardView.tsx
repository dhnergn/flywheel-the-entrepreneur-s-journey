import React from 'react';
import { useGame } from '../context/GameContext';
import {
  Sparkles,
  ArrowRight,
  AlertTriangle,
  MessageSquare,
  Wrench,
  Coffee,
  MapPin,
  TrendingUp,
  ShieldAlert,
  Users,
  Building2,
  DollarSign
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    company,
    player,
    month,
    currentChapterIndex,
    currentScene,
    activeEvent,
    setActiveTab,
    talkToCustomersAction,
    refactorCodeAction,
    restAndRecoverAction,
    gameLogs
  } = useGame();

  const isProfitable = company.finances.operatingProfit > 0;
  const isEmergencyRunway = company.finances.runwayMonths < 2 && company.finances.netCashFlow < 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner: Active Event Alert if one is pending */}
      {activeEvent && (
        <div className="p-4 bg-rose-950/40 border border-rose-900/60 rounded-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-rose-200">
                Critical Event: {activeEvent.title}
              </div>
              <div className="text-xs text-rose-300/80">
                {activeEvent.narrative.slice(0, 110)}...
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('story')}
            className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors cursor-pointer"
          >
            Resolve Situation
          </button>
        </div>
      )}

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Cash & Runway */}
        <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Treasury & Runway</span>
            <DollarSign className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-xl font-bold font-mono text-white tabular-nums">
            ${Math.floor(company.finances.cash).toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1 font-mono flex items-center gap-1.5">
            {isEmergencyRunway ? (
              <span className="text-rose-400 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> {company.finances.runwayMonths} mos runway
              </span>
            ) : isProfitable ? (
              <span className="text-emerald-400">Self-Sustaining</span>
            ) : (
              <span>{company.finances.runwayMonths} mos runway</span>
            )}
          </div>
        </div>

        {/* Metric 2: Monthly Revenue */}
        <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Monthly Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
            ${Math.floor(company.finances.monthlyRevenue).toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1 font-mono">
            Gross Margin: {company.finances.grossMarginPercent.toFixed(0)}%
          </div>
        </div>

        {/* Metric 3: Active Customers */}
        <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Customer Base</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white tabular-nums">
            {company.totalCustomers}
          </div>
          <div className="text-xs text-slate-400 mt-1 font-mono">
            Satisfaction: {company.overallSatisfaction}/100
          </div>
        </div>

        {/* Metric 4: Valuation */}
        <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Enterprise Valuation</span>
            <Building2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-xl font-bold font-mono text-indigo-300 tabular-nums">
            ${Math.floor(company.finances.valuation).toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1 font-mono">
            {company.team.length} Team Members
          </div>
        </div>
      </div>

      {/* Main Two-Column Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Narrative Focus & Active Bottleneck */}
        <div className="lg:col-span-2 space-y-5">
          {/* Chapter Narrative Spotlight */}
          <div className="p-5 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">
                Story Progression · Chapter {Math.min(10, currentChapterIndex)}
              </span>
              <span className="text-xs text-slate-500 font-mono">Month {month}</span>
            </div>

            <h2 className="text-lg font-bold text-white mb-2 font-serif">
              {currentScene?.title || 'The Next Milestone'}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-2">
              {currentScene?.narrative[0] || 'Your enterprise continues to compound value. Consult key mentors and steer your company.'}
            </p>

            <button
              onClick={() => setActiveTab('story')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <span>Enter Story Dialogue & Make Decisions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Theory of Constraints: System Bottleneck */}
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-white">System Bottleneck (Theory of Constraints)</h3>
                <p className="text-xs text-slate-400">Throughput is governed by the single primary constraint.</p>
              </div>
            </div>

            {company.currentBottleneck === 'none' ? (
              <div className="text-xs text-emerald-400/90 font-mono flex items-center gap-2 p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-lg">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Operational systems flowing smoothly. Growth is well-balanced across sales and delivery.</span>
              </div>
            ) : company.currentBottleneck === 'cash_flow' ? (
              <div className="text-xs text-rose-300 font-mono flex items-center justify-between p-3 bg-rose-950/30 border border-rose-900/40 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Runway is critically tight. Delay unessential expenses or collect cash upfront.</span>
                </div>
                <button
                  onClick={() => setActiveTab('finance')}
                  className="text-xs text-rose-300 underline font-sans ml-2 cursor-pointer"
                >
                  Manage Cash
                </button>
              </div>
            ) : company.currentBottleneck === 'tech_debt' ? (
              <div className="text-xs text-amber-300 font-mono flex items-center justify-between p-3 bg-amber-950/30 border border-amber-900/40 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Technical debt is accumulating. Bug reports are increasing churn risk.</span>
                </div>
                <button
                  onClick={refactorCodeAction}
                  className="px-2.5 py-1 bg-amber-700 hover:bg-amber-600 text-white rounded text-xs font-sans cursor-pointer"
                >
                  Refactor Now (-25 Energy)
                </button>
              </div>
            ) : (
              <div className="text-xs text-sky-300 font-mono flex items-center gap-2 p-3 bg-sky-950/30 border border-sky-900/40 rounded-lg">
                <Users className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Customer demand is outpacing team bandwidth. Consider hiring operations support.</span>
              </div>
            )}
          </div>

          {/* Quick Founder Actions */}
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Founder Direct Interventions</h3>
              <span className="text-xs text-slate-400 font-mono">Energy: {player.energy}%</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={talkToCustomersAction}
                disabled={player.energy < 20}
                className="p-3 bg-slate-950 hover:bg-slate-900/90 border border-slate-800 rounded-lg text-left transition-colors disabled:opacity-50 cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 mb-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Interview Users</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  -20 Energy · +Satisfaction & PMF
                </div>
              </button>

              <button
                onClick={refactorCodeAction}
                disabled={player.energy < 25}
                className="p-3 bg-slate-950 hover:bg-slate-900/90 border border-slate-800 rounded-lg text-left transition-colors disabled:opacity-50 cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-1">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Pay Down Debt</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  -25 Energy · -Tech Debt & +Reliability
                </div>
              </button>

              <button
                onClick={restAndRecoverAction}
                className="p-3 bg-slate-950 hover:bg-slate-900/90 border border-slate-800 rounded-lg text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-1">
                  <Coffee className="w-3.5 h-3.5" />
                  <span>Recharge & Rest</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  +40 Energy · -25 Stress
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Founder Persona & Operational Logs */}
        <div className="space-y-5">
          {/* Founder Identity Card */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="text-sm font-semibold text-white">{player.name}</div>
                <div className="text-xs text-slate-400 capitalize">
                  {player.background.replace('_', ' ')} Founder
                </div>
              </div>
              <div className="text-right font-mono text-xs text-slate-400">
                <div>Reputation: {player.reputation}</div>
                <div>Network: {player.network}</div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-500">Knowledge & Acumen</span>
                <span>{player.knowledge}/100</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                <div className="bg-indigo-500 h-1.5" style={{ width: `${player.knowledge}%` }} />
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-1.5">
              {player.traits.map((trait, idx) => (
                <span key={idx} className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Activity / Chronicle Feed */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">
              Company Chronicle & Logs
            </div>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {gameLogs.slice(0, 8).map((log) => (
                <div key={log.id} className="text-xs border-l-2 border-slate-800 pl-2.5 py-0.5 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-300">{log.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{log.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
