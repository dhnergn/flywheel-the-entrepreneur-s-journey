import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { BACKGROUNDS } from '../data/backgrounds';
import { INDUSTRIES } from '../data/industries';
import { BackgroundType, IndustryType, Difficulty } from '../types/game';
import { Rocket, Sparkles, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface NewGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewGameModal: React.FC<NewGameModalProps> = ({ isOpen, onClose }) => {
  const { startNewGame } = useGame();

  const [step, setStep] = useState<1 | 2>(1);
  const [playerName, setPlayerName] = useState<string>('Alex Mercer');
  const [companyName, setCompanyName] = useState<string>('Foundry Systems');
  const [selectedBackground, setSelectedBackground] = useState<BackgroundType>('engineer');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>('saas');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');

  if (!isOpen) return null;

  const bgList = Object.values(BACKGROUNDS);
  const indList = Object.values(INDUSTRIES);
  const currentBg = BACKGROUNDS[selectedBackground];
  const currentInd = INDUSTRIES[selectedIndustry];

  const handleLaunch = () => {
    startNewGame({
      playerName: playerName.trim() || 'Alex Mercer',
      companyName: companyName.trim() || 'Foundry Systems',
      background: selectedBackground,
      industry: selectedIndustry,
      difficulty,
      avatarSeed: selectedBackground
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-lg font-bold text-white font-serif">
              {step === 1 ? 'Step 1: Choose Your Founder Profile' : 'Step 2: Choose Your Industry & Company'}
            </h2>
            <p className="text-xs text-slate-400">
              {step === 1
                ? 'Your background determines starting capital, craft advantages, and behavioral blind spots.'
                : 'Different industries have unique unit economics, margins, and operational dynamics.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            {/* Name Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Founder Name</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-hidden focus:border-indigo-500 font-sans"
                placeholder="e.g. Alex Mercer"
              />
            </div>

            {/* Background Grid */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Starting Background (9 Paths)</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {bgList.map((bg) => {
                  const isSelected = selectedBackground === bg.type;
                  return (
                    <button
                      key={bg.type}
                      onClick={() => setSelectedBackground(bg.type)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-800 border-indigo-500 ring-1 ring-indigo-500/40'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{bg.title}</div>
                      <div className="text-[11px] text-indigo-400 font-mono mt-0.5">${bg.startingCash.toLocaleString()} Capital</div>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{bg.tagline}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Background Deep Dive */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between items-center text-indigo-400 font-mono font-semibold">
                <span>{currentBg.title} Breakdown</span>
                <span>Starting Capital: ${currentBg.startingCash.toLocaleString()}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{currentBg.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-900 text-[11px]">
                <div className="text-emerald-400">
                  <strong>Advantage:</strong> {currentBg.startingAdvantage}
                </div>
                <div className="text-amber-400">
                  <strong>Vulnerability:</strong> {currentBg.startingVulnerability}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Proceed to Venture Selection →
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Company Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-hidden focus:border-indigo-500 font-sans"
                placeholder="e.g. Foundry Systems"
              />
            </div>

            {/* Industry Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Industry / Business Model (8 Industries)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
                {indList.map((ind) => {
                  const isSelected = selectedIndustry === ind.type;
                  return (
                    <button
                      key={ind.type}
                      onClick={() => setSelectedIndustry(ind.type)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-800 border-indigo-500 ring-1 ring-indigo-500/40'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{ind.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{ind.tagline}</div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-indigo-400 mt-1">
                        <span>Price: ${ind.baseUnitPrice}</span>
                        <span>·</span>
                        <span>Margin: {ind.marginTier}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Setting */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-slate-300">Simulation Rigor & Market Uncertainty</label>
              <div className="grid grid-cols-3 gap-2">
                {(['easy', 'normal', 'hard'] as Difficulty[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`py-2 rounded-lg text-xs font-medium border capitalize transition-colors cursor-pointer ${
                      difficulty === d
                        ? 'bg-indigo-600 text-white border-indigo-500 font-bold'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ← Back to Profile
              </button>

              <button
                onClick={handleLaunch}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Incorporate & Begin Journey
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
