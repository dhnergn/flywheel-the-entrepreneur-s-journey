import React from 'react';
import { useGame } from '../context/GameContext';
import { TabType } from '../types/game';
import {
  LayoutDashboard,
  BookOpen,
  MapPin,
  TrendingUp,
  Boxes,
  Megaphone,
  Users2,
  HeartHandshake,
  GraduationCap,
  AlertCircle
} from 'lucide-react';

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string | boolean;
}

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, currentScene, activeEvent, currentChapterIndex } = useGame();

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'story',
      label: 'Story & Events',
      icon: BookOpen,
      badge: activeEvent ? 'Alert' : `Ch. ${Math.min(10, currentChapterIndex)}`
    },
    {
      id: 'map',
      label: 'City Ecosystem',
      icon: MapPin
    },
    {
      id: 'finance',
      label: 'Financial Model',
      icon: TrendingUp
    },
    {
      id: 'product',
      label: 'Product & Systems',
      icon: Boxes
    },
    {
      id: 'marketing',
      label: 'Growth Engine',
      icon: Megaphone
    },
    {
      id: 'team',
      label: 'Team & Culture',
      icon: Users2
    },
    {
      id: 'relationships',
      label: 'Stakeholders',
      icon: HeartHandshake
    },
    {
      id: 'codex',
      label: 'Business Codex',
      icon: GraduationCap
    }
  ];

  return (
    <aside className="w-56 border-r border-slate-800 bg-slate-950 flex flex-col shrink-0 select-none">
      <div className="p-4 border-b border-slate-900">
        <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
          Simulation Console
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Stage: Early Validation
        </div>
      </div>

      <nav className="flex-1 p-2.5 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isAlert = item.id === 'story' && !!activeEvent;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isAlert
                      ? 'bg-rose-950 text-rose-300 font-bold animate-pulse'
                      : isActive
                      ? 'bg-slate-800 text-slate-300'
                      : 'text-slate-500'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Founder Status Footer */}
      <div className="p-3 border-t border-slate-900 bg-slate-950/60 text-xs text-slate-500">
        <div className="flex items-center justify-between font-mono mb-1">
          <span className="text-[10px] uppercase">Founder Stress</span>
          <span className="text-slate-300 text-[10px]">Normal</span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden">
          <div className="bg-sky-500 h-1 transition-all" style={{ width: '25%' }} />
        </div>
      </div>
    </aside>
  );
};
