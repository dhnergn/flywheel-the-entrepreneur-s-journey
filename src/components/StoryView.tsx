import React from 'react';
import { useGame } from '../context/GameContext';
import {
  Sparkles,
  BookOpen,
  User,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
  DollarSign
} from 'lucide-react';

export const StoryView: React.FC = () => {
  const {
    currentScene,
    activeEvent,
    chooseStoryOption,
    chooseEventOption,
    player,
    company,
    characters,
    currentChapterIndex
  } = useGame();

  // If there is an active emergency event, show that first!
  if (activeEvent) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="p-6 bg-gradient-to-b from-rose-950/40 via-slate-900 to-slate-950 border border-rose-800/50 rounded-2xl space-y-4">
          <div className="flex items-center gap-2.5 text-xs text-rose-400 uppercase tracking-wider font-semibold">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Unscheduled Operational Crisis</span>
          </div>

          <h1 className="text-xl font-bold text-white font-serif">
            {activeEvent.title}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            {activeEvent.narrative}
          </p>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Your Course of Action:
            </div>

            {activeEvent.choices.map((choice) => {
              const canAffordCash = (choice.cashCost || 0) <= company.finances.cash;
              const canAffordEnergy = (choice.energyCost || 0) <= player.energy;
              const canChoose = canAffordCash && canAffordEnergy;

              return (
                <div
                  key={choice.id}
                  className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      {choice.philosophyTag && (
                        <div className="text-[11px] text-rose-400/90 font-mono">
                          {choice.philosophyTag}
                        </div>
                      )}
                      <div className="text-sm font-semibold text-white">
                        {choice.text}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                      {choice.energyCost && (
                        <span className="text-sky-400 flex items-center gap-1">
                          <Zap className="w-3 h-3" /> -{choice.energyCost}
                        </span>
                      )}
                      {choice.cashCost && (
                        <span className="text-rose-400 flex items-center gap-1">
                          <DollarSign className="w-3 h-3" /> -${choice.cashCost}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {choice.immediateEffects.description}
                  </p>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => chooseEventOption(choice)}
                      disabled={!canChoose}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Execute Decision
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Normal Chapter Scene
  if (!currentScene) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center space-y-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
        <h2 className="text-lg font-bold text-white font-serif">
          All Foundation Chapters Concluded
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          You have mastered the foundational stages of venture creation. Your enterprise is now in continuous operational compounding. Continue simulating monthly turns to scale your valuation and culture.
        </p>
      </div>
    );
  }

  const activeChar = currentScene.characterId ? characters[currentScene.characterId] : null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Chapter Title & Stage */}
      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>CHAPTER {currentScene.chapterIndex} OF 10</span>
          <span>{currentScene.contextStatus}</span>
        </div>

        <h1 className="text-2xl font-bold text-white font-serif tracking-tight">
          {currentScene.title}
        </h1>

        {/* Character Dialogue Box */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-950 border border-indigo-700/50 flex items-center justify-center shrink-0 text-indigo-300 font-bold text-sm">
            {currentScene.speaker.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white">
                {currentScene.speaker}
              </span>
              <span className="text-[11px] text-slate-500">
                · {currentScene.speakerRole}
              </span>
              {activeChar && (
                <span className="text-[10px] text-indigo-400 font-mono ml-auto">
                  Trust: {activeChar.trust}%
                </span>
              )}
            </div>

            <div className="space-y-2.5 pt-1">
              {currentScene.narrative.map((paragraph, idx) => (
                <p key={idx} className="text-sm text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Decision Dilemmas */}
        <div className="pt-4 space-y-3">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
            Choose Your Strategic Direction:
          </div>

          <div className="space-y-3">
            {currentScene.choices.map((choice) => {
              const canAffordCash = (choice.cashCost || 0) <= company.finances.cash;
              const canAffordEnergy = (choice.energyCost || 0) <= player.energy;
              const canChoose = canAffordCash && canAffordEnergy;

              return (
                <div
                  key={choice.id}
                  className="p-4 bg-slate-950/80 border border-slate-800 hover:border-indigo-600/50 rounded-xl space-y-2.5 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      {choice.philosophyTag && (
                        <div className="text-[11px] text-indigo-400 font-mono">
                          {choice.philosophyTag}
                        </div>
                      )}
                      <h3 className="text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">
                        {choice.text}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 font-mono text-xs">
                      {choice.energyCost && (
                        <span className="text-sky-400 flex items-center gap-1">
                          <Zap className="w-3 h-3" /> -{choice.energyCost}
                        </span>
                      )}
                      {choice.cashCost && (
                        <span className="text-rose-400 flex items-center gap-1">
                          <DollarSign className="w-3 h-3" /> -${choice.cashCost}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {choice.immediateEffects.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-900 text-xs">
                    <div className="text-[11px] text-slate-500 italic">
                      Inspiration: {choice.educationalConcept.sourceInspiration}
                    </div>

                    <button
                      onClick={() => chooseStoryOption(choice)}
                      disabled={!canChoose}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      <span>Take Action</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
