import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CITY_LOCATIONS } from '../data/locations';
import { CityLocation } from '../types/game';
import {
  Rocket,
  Landmark,
  GraduationCap,
  TrendingUp,
  Boxes,
  Users,
  ShieldAlert,
  Building2,
  MapPin,
  Zap,
  DollarSign,
  CheckCircle2,
  Info
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  Landmark,
  GraduationCap,
  TrendingUp,
  Boxes,
  Users,
  ShieldAlert,
  Building2
};

export const MapView: React.FC = () => {
  const { performCityAction, player, company } = useGame();
  const [selectedLocation, setSelectedLocation] = useState<CityLocation>(CITY_LOCATIONS[0]);

  const IconComp = ICON_MAP[selectedLocation.iconName] || MapPin;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-white font-serif tracking-tight">
          Metropolitan Business Ecosystem
        </h1>
        <p className="text-xs text-slate-400">
          Navigate key hubs to consult mentors, secure working capital, negotiate supplier terms, or uncover competitor moves.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Map Overview (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-400 font-mono">
              <span className="uppercase tracking-wider">City Districts & Ecosystem Hubs</span>
              <span>Select location to interact</span>
            </div>

            {/* Grid of City Locations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CITY_LOCATIONS.map((loc) => {
                const ItemIcon = ICON_MAP[loc.iconName] || MapPin;
                const isSelected = selectedLocation.id === loc.id;

                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800/90 border-indigo-500 shadow-sm ring-1 ring-indigo-500/40'
                        : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${loc.color} text-white shrink-0`}>
                        <ItemIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">
                          {loc.name}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {loc.district}
                        </div>
                        <div className="text-[10px] text-indigo-400/90 mt-1 font-mono">
                          {loc.availableActions.length} Actions Available
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Location Action Panel (Right 1 col) */}
        <div className="space-y-4">
          <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${selectedLocation.color} text-white`}>
                <IconComp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white font-serif">
                  {selectedLocation.name}
                </h2>
                <span className="text-[11px] text-slate-400">
                  {selectedLocation.district} · {selectedLocation.subtitle}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedLocation.description}
            </p>

            {/* Actions for this location */}
            <div className="space-y-3 pt-2">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Available Interventions
              </div>

              {selectedLocation.availableActions.map((act) => {
                const canAffordCash = act.cost.cash <= company.finances.cash;
                const canAffordEnergy = act.cost.energy <= player.energy;
                const canAct = canAffordCash && canAffordEnergy;

                return (
                  <div
                    key={act.id}
                    className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{act.name}</span>
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        {act.cost.energy > 0 && (
                          <span className="text-sky-400 flex items-center gap-0.5">
                            <Zap className="w-3 h-3" /> -{act.cost.energy}
                          </span>
                        )}
                        {act.cost.cash > 0 && (
                          <span className="text-rose-400 flex items-center gap-0.5">
                            <DollarSign className="w-3 h-3" /> -${act.cost.cash}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {act.description}
                    </p>

                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[10px] text-indigo-400 font-mono">
                        {act.rewards.specialEffect?.slice(0, 32)}...
                      </span>

                      <button
                        onClick={() => performCityAction(selectedLocation.id, act.id)}
                        disabled={!canAct}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-[11px] font-semibold rounded-md transition-colors cursor-pointer"
                      >
                        Visit & Execute
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
