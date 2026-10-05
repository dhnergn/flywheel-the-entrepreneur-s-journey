import React from 'react';
import { useGame } from '../context/GameContext';
import { ProductConfig } from '../types/game';
import { Boxes, Wrench, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ProductView: React.FC = () => {
  const { company, updateProductFocus, refactorCodeAction, talkToCustomersAction, player } = useGame();
  const prod = company.product;

  const focusOptions: { id: ProductConfig['focusArea']; label: string; desc: string }[] = [
    {
      id: 'quality',
      label: 'Core Craftsmanship & Value',
      desc: 'Focus all engineering cycles on perfecting the primary value proposition.'
    },
    {
      id: 'stability',
      label: 'Stability & Bug Refactoring',
      desc: 'Eliminate technical debt, increase uptime, and halt customer churn.'
    },
    {
      id: 'ux',
      label: 'User Experience & Frictionless Onboarding',
      desc: 'Streamline customer activation, boosting marketing conversion rate.'
    },
    {
      id: 'features',
      label: 'Feature Breadth & Capabilities',
      desc: 'Broaden utility to address enterprise requirements and expand addressable market.'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-white font-serif tracking-tight">
          Product Architecture & Systems Health
        </h1>
        <p className="text-xs text-slate-400">
          A great business starts with building something customers genuinely love. Balance feature velocity with technical stability.
        </p>
      </div>

      {/* Product Vital Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Product-Market Fit</span>
            <span className="font-mono text-white font-bold">{prod.productMarketFit}/100</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
            <div className="bg-indigo-500 h-1.5" style={{ width: `${prod.productMarketFit}%` }} />
          </div>
          <p className="text-[10px] text-slate-500">Degree to which product satisfies strong market demand.</p>
        </div>

        <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Reliability & Uptime</span>
            <span className="font-mono text-emerald-400 font-bold">{prod.reliability}/100</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-1.5" style={{ width: `${prod.reliability}%` }} />
          </div>
          <p className="text-[10px] text-slate-500">Prevents embarrassing outages and customer support fires.</p>
        </div>

        <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>User Experience (UX)</span>
            <span className="font-mono text-sky-400 font-bold">{prod.userExperience}/100</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
            <div className="bg-sky-500 h-1.5" style={{ width: `${prod.userExperience}%` }} />
          </div>
          <p className="text-[10px] text-slate-500">Drives signup conversion rate and onboarding activation.</p>
        </div>

        <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Technical Debt</span>
            <span className={`font-mono font-bold ${prod.techDebt > 50 ? 'text-rose-400' : 'text-slate-300'}`}>
              {prod.techDebt}/100
            </span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-1.5 ${prod.techDebt > 50 ? 'bg-rose-500' : 'bg-amber-500'}`}
              style={{ width: `${prod.techDebt}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500">High debt causes sudden outages and increases churn.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* R&D Allocation Priority */}
        <div className="lg:col-span-2 p-5 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-semibold text-white">Active Product Iteration Priority</h2>
            <Boxes className="w-4 h-4 text-indigo-400" />
          </div>

          <div className="space-y-3">
            {focusOptions.map((opt) => {
              const isActive = prod.focusArea === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => updateProductFocus(opt.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-800/90 border-indigo-500 ring-1 ring-indigo-500/40'
                      : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white flex items-center gap-2">
                        <span>{opt.label}</span>
                        {isActive && (
                          <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-800">
                            Active Focus
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Founder Engineering Intervention */}
        <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
          <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-2">
            Founder Engineering Sprint
          </h2>

          <div className="space-y-3">
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
              <span className="text-xs font-semibold text-white block">Refactor Legacy Architecture</span>
              <p className="text-[11px] text-slate-400">
                Dedicate focused engineering cycles to clean up spaghetti code and automate regression test coverage.
              </p>
              <button
                onClick={refactorCodeAction}
                disabled={player.energy < 25}
                className="w-full py-1.5 bg-amber-700 hover:bg-amber-600 disabled:opacity-40 text-white rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Sprint: Refactor Code (-25 Energy)
              </button>
            </div>

            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
              <span className="text-xs font-semibold text-white block">Conduct User Flow Audit</span>
              <p className="text-[11px] text-slate-400">
                Observe live customer sessions to eliminate cognitive friction and confusing button placements.
              </p>
              <button
                onClick={talkToCustomersAction}
                disabled={player.energy < 20}
                className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Sprint: User Audit (-20 Energy)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
