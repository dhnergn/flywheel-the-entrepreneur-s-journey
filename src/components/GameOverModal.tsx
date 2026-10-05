import React from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, AlertTriangle, RotateCcw, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export const GameOverModal: React.FC = () => {
  const { gameOver, gameEnding, failureReason, resetGame } = useGame();

  if (!gameOver) return null;

  const isVictory = !!gameEnding;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="text-center space-y-2">
          {isVictory ? (
            <div className="w-12 h-12 rounded-full bg-indigo-950 border border-indigo-700/50 flex items-center justify-center mx-auto text-indigo-400">
              <Trophy className="w-6 h-6" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-rose-950 border border-rose-700/50 flex items-center justify-center mx-auto text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
          )}

          <h2 className="text-2xl font-bold text-white font-serif tracking-tight">
            {isVictory ? gameEnding.title : 'Journey Concluded: Company Insolvency'}
          </h2>

          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
            {isVictory ? gameEnding.badge : 'Confronting Reality'}
          </div>
        </div>

        {isVictory ? (
          <div className="space-y-4 text-xs text-slate-300">
            <p className="leading-relaxed text-center text-sm text-slate-200">
              {gameEnding.description}
            </p>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2 font-mono">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                Enterprise Performance Summary:
              </div>
              {gameEnding.strengths.map((str, idx) => (
                <div key={idx} className="flex items-center gap-2 text-indigo-300">
                  <span className="text-indigo-500">✔</span>
                  <span>{str}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-indigo-950/20 border border-indigo-900/30 rounded-lg text-indigo-300 italic text-[11px] leading-relaxed">
              {gameEnding.legacyAnalysis}
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 bg-rose-950/30 border border-rose-900/40 rounded-xl space-y-2">
              <div className="font-semibold text-rose-300 text-sm">
                What Happened?
              </div>
              <p className="text-rose-200 leading-relaxed">
                {failureReason || 'Operating cash burn outstripped customer cash collection, causing involuntary liquidation.'}
              </p>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
              <div className="font-semibold text-slate-300">
                The Core Business Lesson:
              </div>
              <p className="text-slate-400 leading-relaxed">
                As Jim Collins taught, confronting the brutal facts of your current reality is not optional. Every business failure contains the seeds of future mastery if you internalize where cash flow disconnected from unit economics.
              </p>
            </div>
          </div>
        )}

        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start Fresh Venture</span>
          </button>
        </div>
      </div>
    </div>
  );
};
