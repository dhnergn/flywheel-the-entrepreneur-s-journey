import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { TopBar } from './components/TopBar';
import { Navigation } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { StoryView } from './components/StoryView';
import { MapView } from './components/MapView';
import { FinancialView } from './components/FinancialView';
import { ProductView } from './components/ProductView';
import { MarketingView } from './components/MarketingView';
import { TeamView } from './components/TeamView';
import { RelationshipsView } from './components/RelationshipsView';
import { CodexView } from './components/CodexView';
import { ConceptModal } from './components/ConceptModal';
import { NewGameModal } from './components/NewGameModal';
import { GameOverModal } from './components/GameOverModal';

const MainLayout: React.FC = () => {
  const { activeTab } = useGame();
  const [isNewGameOpen, setIsNewGameOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* 3-Zone Top Bar */}
      <TopBar onOpenNewGame={() => setIsNewGameOpen(true)} />

      {/* Main Workspace: Sidebar + Content Frame */}
      <div className="flex-1 flex overflow-hidden">
        <Navigation />

        <main className="flex-1 overflow-y-auto p-6 bg-slate-950">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'story' && <StoryView />}
          {activeTab === 'map' && <MapView />}
          {activeTab === 'finance' && <FinancialView />}
          {activeTab === 'product' && <ProductView />}
          {activeTab === 'marketing' && <MarketingView />}
          {activeTab === 'team' && <TeamView />}
          {activeTab === 'relationships' && <RelationshipsView />}
          {activeTab === 'codex' && <CodexView />}
        </main>
      </div>

      {/* Global Modals */}
      <ConceptModal />
      <NewGameModal isOpen={isNewGameOpen} onClose={() => setIsNewGameOpen(false)} />
      <GameOverModal />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <MainLayout />
    </GameProvider>
  );
}
