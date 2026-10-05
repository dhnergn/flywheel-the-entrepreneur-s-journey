import React from 'react';
import { useGame } from '../context/GameContext';
import { Volume2, VolumeX, Play, RotateCcw, AlertTriangle } from 'lucide-react';

interface TopBarProps {
  onOpenNewGame: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenNewGame }) => {
  const {
    company,
    player,
    month,
    nextMonthTurn,
    soundOn,
    toggleSound,
    currentChapterIndex
  } = useGame();

  const netBurn = company.finances.netCashFlow < 0 ? Math.abs(company.finances.netCashFlow) : 0;
  const isRunwayLow = company.finances.runwayMonths < 2 && netBurn > 0;

  return (
    <header className="h-16 px-6 border-b border-slate-800 bg-slate-950 flex items-center justify-between shrink-0 select-none">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold tracking-tight text-white font-serif">
          {company.name || 'Flywheel'}
        </span>
        <span className="hidden sm:inline-block text-xs text-slate-500 font-mono">
          Month {month} · Chapter {Math.min(10, currentChapterIndex)}
        </span>
      </div>

      {/* Zone 2: Clean metrics display (unboxed, tabular numerals) */}
      <div className="hidden lg:flex items-center gap-6 text-xs text-slate-400 font-mono tabular-nums">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 uppercase tracking-wider text-[10px]">Cash</span>
          <span className={`font-semibold ${company.finances.cash < 1000 ? 'text-rose-400' : 'text-slate-100'}`}>
            ${Math.floor(company.finances.cash).toLocaleString()}
          </span>
        </div>

        <span className="text-slate-700" aria-hidden="true">·</span>

        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 uppercase tracking-wider text-[10px]">Revenue</span>
          <span className="font-semibold text-emerald-400">
            ${Math.floor(company.finances.monthlyRevenue).toLocaleString()}/mo
          </span>
        </div>

        <span className="text-slate-700" aria-hidden="true">·</span>

        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 uppercase tracking-wider text-[10px]">Net Flow</span>
          <span className={`font-semibold ${company.finances.netCashFlow >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {company.finances.netCashFlow >= 0 ? '+' : ''}${Math.floor(company.finances.netCashFlow).toLocaleString()}
          </span>
        </div>

        <span className="text-slate-700" aria-hidden="true">·</span>

        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 uppercase tracking-wider text-[10px]">Runway</span>
          <span className={`font-semibold flex items-center gap-1 ${isRunwayLow ? 'text-rose-400' : 'text-slate-200'}`}>
            {isRunwayLow && <AlertTriangle className="w-3 h-3 text-rose-400 animate-pulse" />}
            {company.finances.runwayMonths > 50 ? 'Profitable' : `${company.finances.runwayMonths} mos`}
          </span>
        </div>

        <span className="text-slate-700" aria-hidden="true">·</span>

        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 uppercase tracking-wider text-[10px]">Energy</span>
          <span className="font-semibold text-sky-400">
            {player.energy}%
          </span>
        </div>
      </div>

      {/* Zone 3: Primary actions */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={toggleSound}
          title={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
          aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-lg transition-colors"
        >
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-600" />}
        </button>

        <button
          onClick={onOpenNewGame}
          title="Start fresh journey"
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={nextMonthTurn}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all whitespace-nowrap active:scale-95 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Advance Month</span>
        </button>
      </div>
    </header>
  );
};
