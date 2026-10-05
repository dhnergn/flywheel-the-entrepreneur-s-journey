import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { BUSINESS_CODEX } from '../data/businessCodex';
import { BusinessConcept } from '../types/game';
import { GraduationCap, BookOpen, CheckCircle2, Lock, Sparkles, Filter } from 'lucide-react';

export const CodexView: React.FC = () => {
  const { currentChapterIndex } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeConcept, setActiveConcept] = useState<BusinessConcept>(BUSINESS_CODEX[0]);

  const categories = ['All', 'Strategy & Leadership', 'Finance & Runway', 'Product & Market', 'Operations & Systems', 'Mindset & Network'];

  const filteredConcepts = BUSINESS_CODEX.filter((concept) => {
    if (selectedCategory === 'All') return true;
    return concept.category === selectedCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-white font-serif tracking-tight">
          The Business Playbook & Strategic Codex
        </h1>
        <p className="text-xs text-slate-400">
          First-principles frameworks distilled from classic business literature and empirical management science.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900/60 border border-slate-800 rounded-xl">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: List of Concepts */}
        <div className="space-y-2.5">
          {filteredConcepts.map((item) => {
            const isUnlocked = currentChapterIndex >= item.unlockedAtChapter;
            const isSelected = activeConcept.id === item.id;

            return (
              <button
                key={item.id}
                onClick={() => isUnlocked && setActiveConcept(item)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 border-indigo-500 ring-1 ring-indigo-500/40'
                    : isUnlocked
                    ? 'bg-slate-900/70 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                    : 'bg-slate-950/40 border-slate-900 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-white">{item.title}</span>
                      {isUnlocked ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-600" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{item.subtitle}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">
                    {isUnlocked ? `Ch. ${item.unlockedAtChapter}` : 'Locked'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep Concept Breakdown */}
        <div className="lg:col-span-2 p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
              {activeConcept.framework}
            </span>
            <h2 className="text-xl font-bold text-white font-serif mt-1">
              {activeConcept.title}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {activeConcept.subtitle}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Core Principles & Empirical Rules
            </div>

            <div className="space-y-2">
              {activeConcept.practicalAdvice.map((advice, idx) => (
                <div key={idx} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
                  <span className="font-mono text-indigo-400 font-bold shrink-0">{idx + 1}.</span>
                  <span>{advice}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-indigo-950/30 border border-indigo-800/40 rounded-xl mt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-1">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Direct Simulation Application</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeConcept.inGameRelevance}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
