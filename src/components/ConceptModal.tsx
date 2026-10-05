import React from 'react';
import { useGame } from '../context/GameContext';
import { GraduationCap, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

export const ConceptModal: React.FC = () => {
  const { showConceptModal, recentConceptModal, dismissConceptModal } = useGame();

  if (!showConceptModal || !recentConceptModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono uppercase tracking-wider">
          <GraduationCap className="w-4 h-4 text-indigo-400" />
          <span>Strategic Takeaway · {recentConceptModal.sourceInspiration}</span>
        </div>

        <h3 className="text-xl font-bold text-white font-serif">
          {recentConceptModal.title}
        </h3>

        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
          <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
            Underlying Business Principle:
          </div>
          <p className="text-xs text-indigo-300 font-serif italic leading-relaxed">
            "{recentConceptModal.principle}"
          </p>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {recentConceptModal.summary}
        </p>

        <div className="pt-2 flex justify-end">
          <button
            onClick={dismissConceptModal}
            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <span>Internalize & Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
