import React from 'react';
import { useGame } from '../context/GameContext';
import { Users, UserPlus, UserMinus, ShieldCheck, Heart, Sparkles, AlertCircle } from 'lucide-react';

export const TeamView: React.FC = () => {
  const { company, hiringPool, hireEmployee, fireEmployee } = useGame();

  const totalPayroll = company.team.reduce((sum, emp) => sum + emp.salary, 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-white font-serif tracking-tight">
          People, Culture & Organizational Bus
        </h1>
        <p className="text-xs text-slate-400">
          "First Who, Then What" — Great companies get the right people on the bus, the wrong people off the bus, and the right people in the right seats.
        </p>
      </div>

      {/* Top Banner: Team Summary */}
      <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-950 border border-indigo-800/50 rounded-lg text-indigo-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              Core Team ({company.team.length} Members)
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Total Monthly Payroll: ${totalPayroll.toLocaleString()}/month
            </div>
          </div>
        </div>

        <div className="text-right font-mono text-xs">
          <span className="text-slate-500 uppercase block text-[10px]">Culture of Discipline</span>
          <span className="text-sm font-bold text-emerald-400">{company.culture.discipline}/100</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Team on the Bus - Left 2 cols */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-semibold text-white">Active Seats on the Bus</h2>
              <span className="text-xs text-slate-500 font-mono">{company.team.length} Active</span>
            </div>

            {company.team.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500 space-y-2">
                <Users className="w-8 h-8 text-slate-700 mx-auto" />
                <p>No full-time hires yet. The founder is wearing all hats.</p>
                <p className="text-[11px] text-slate-600">Review candidates below to hire your first operational partner.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {company.team.map((emp) => (
                  <div
                    key={emp.id}
                    className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2.5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{emp.name}</span>
                          <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/70 px-2 py-0.5 rounded border border-indigo-900/60">
                            {emp.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">{emp.bio}</p>
                      </div>

                      <div className="text-right font-mono text-xs">
                        <div className="font-bold text-slate-200">${emp.salary}/mo</div>
                        <button
                          onClick={() => fireEmployee(emp.id)}
                          className="text-[10px] text-rose-400 hover:text-rose-300 underline font-sans mt-1 cursor-pointer"
                        >
                          Remove from Bus
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-900 text-[11px] font-mono">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Skill Level</span>
                        <span className="text-sky-300 font-semibold">{emp.skill}/100</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Morale</span>
                        <span className="text-emerald-300 font-semibold">{emp.morale}/100</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Culture Fit</span>
                        <span className="text-indigo-300 font-semibold">{emp.cultureFit}/100</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hiring Bench / Recruitment Pool */}
          <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-semibold text-white">Recruitment Bench & Candidates</h2>
              <UserPlus className="w-4 h-4 text-emerald-400" />
            </div>

            {hiringPool.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">No candidates in queue. Visit the Tech Incubator or University to recruit more talent.</p>
            ) : (
              <div className="space-y-3">
                {hiringPool.map((cand) => (
                  <div
                    key={cand.id}
                    className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{cand.name}</span>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                            {cand.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{cand.bio}</p>
                        <p className="text-[10px] text-slate-500 italic mt-0.5">Quirk: {cand.quirk}</p>
                      </div>

                      <div className="text-right font-mono text-xs shrink-0 pl-3">
                        <div className="font-semibold text-white">${cand.salary}/mo</div>
                        <div className="text-[10px] text-indigo-400 font-sans">Fit: {cand.cultureFit}%</div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-900">
                      <span className="text-[11px] font-mono text-slate-400">
                        Craft Skill: {cand.skill}/100
                      </span>

                      <button
                        onClick={() => hireEmployee(cand)}
                        disabled={company.finances.cash < cand.salary}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-[11px] font-semibold rounded-md transition-colors cursor-pointer"
                      >
                        Hire onto Bus (${cand.salary}/mo)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Culture Architecture - Right Column */}
        <div className="space-y-4">
          <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-3">
            <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-2">
              Emergent Culture Profile
            </h2>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Culture is not written on posters; it emerges from how decisions are made every single day.
            </p>

            <div className="space-y-2.5 pt-2 text-xs">
              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-slate-400">Discipline</span>
                  <span className="text-emerald-400">{company.culture.discipline}/100</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5" style={{ width: `${company.culture.discipline}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-slate-400">Customer Obsession</span>
                  <span className="text-sky-400">{company.culture.customerObsession}/100</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-sky-500 h-1.5" style={{ width: `${company.culture.customerObsession}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-slate-400">Efficiency</span>
                  <span className="text-indigo-400">{company.culture.efficiency}/100</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-indigo-500 h-1.5" style={{ width: `${company.culture.efficiency}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-slate-400">Employee Autonomy</span>
                  <span className="text-amber-400">{company.culture.autonomy}/100</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-500 h-1.5" style={{ width: `${company.culture.autonomy}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span className="text-slate-400">Growth Orientation</span>
                  <span className="text-purple-400">{company.culture.growthOrientation}/100</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-purple-500 h-1.5" style={{ width: `${company.culture.growthOrientation}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
