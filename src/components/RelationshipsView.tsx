import React from 'react';
import { useGame } from '../context/GameContext';
import { HeartHandshake, Shield, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';

export const RelationshipsView: React.FC = () => {
  const { characters } = useGame();

  const characterList = Object.values(characters);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-white font-serif tracking-tight">
          Key Stakeholders & Mastermind Alliances
        </h1>
        <p className="text-xs text-slate-400">
          Surround yourself with people who challenge your lazy assumptions. Every interaction influences alignment, trust, and future opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {characterList.map((char) => {
          const isRival = char.status === 'rival';

          return (
            <div
              key={char.id}
              className={`p-5 rounded-2xl border transition-all ${
                isRival
                  ? 'bg-slate-950/80 border-rose-900/40'
                  : 'bg-slate-900/70 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white ${
                    isRival ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                  }`}>
                    {char.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{char.name}</h3>
                    <p className="text-[11px] text-slate-400">{char.role}</p>
                    <span className="text-[10px] text-slate-500 font-mono">{char.organization}</span>
                  </div>
                </div>

                <div className="text-right font-mono text-xs">
                  <span className={`text-[10px] uppercase block ${isRival ? 'text-rose-400' : 'text-indigo-400'}`}>
                    {char.status}
                  </span>
                  <span className="text-slate-300 font-bold">Trust: {char.trust}%</span>
                </div>
              </div>

              <div className="py-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {char.bio}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/60 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">
                  Recent Interactions & Direct Notes
                </span>
                <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                  {char.recentNotes.map((note, idx) => (
                    <div key={idx} className="text-[11px] text-slate-400 flex items-start gap-1.5 font-mono">
                      <span className="text-slate-600">›</span>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
