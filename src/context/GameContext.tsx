import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PlayerStats,
  Company,
  CharacterRelationship,
  StoryScene,
  StoryChoice,
  DynamicEvent,
  TabType,
  Difficulty,
  IndustryType,
  BackgroundType,
  Employee,
  GameLog,
  GameEnding,
  ProductConfig
} from '../types/game';
import { INDUSTRIES } from '../data/industries';
import { BACKGROUNDS } from '../data/backgrounds';
import { INITIAL_CHARACTERS } from '../data/characters';
import { STORY_CHAPTERS } from '../data/storyChapters';
import { DYNAMIC_EVENTS } from '../data/dynamicEvents';
import { CITY_LOCATIONS } from '../data/locations';
import { simulateMonthlyTurn, createInitialCompany, TurnSimulationResult } from '../utils/simulation';
import { playSound, toggleAudio, isAudioEnabled } from '../utils/audio';
import confetti from 'canvas-confetti';

interface NewGameConfig {
  playerName: string;
  background: BackgroundType;
  industry: IndustryType;
  companyName: string;
  difficulty: Difficulty;
  avatarSeed: string;
}

interface GameContextType {
  player: PlayerStats;
  company: Company;
  characters: Record<CharacterRelationship['id'], CharacterRelationship>;
  month: number;
  currentChapterIndex: number;
  currentScene: StoryScene | null;
  activeEvent: DynamicEvent | null;
  gameLogs: GameLog[];
  unlockedCodexIds: string[];
  activeTab: TabType;
  difficulty: Difficulty;
  gameOver: boolean;
  gameEnding: GameEnding | null;
  failureReason: string | null;
  recentConceptModal: StoryChoice['educationalConcept'] | null;
  showConceptModal: boolean;
  hiringPool: Employee[];
  soundOn: boolean;
  lastTurnSummary: TurnSimulationResult | null;
  
  // Actions
  setActiveTab: (tab: TabType) => void;
  startNewGame: (config: NewGameConfig) => void;
  nextMonthTurn: () => void;
  chooseStoryOption: (choice: StoryChoice) => void;
  chooseEventOption: (choice: StoryChoice) => void;
  performCityAction: (locationId: string, actionId: string) => void;
  updateMarketingBudget: (channelId: string, budget: number) => void;
  updateProductFocus: (focus: ProductConfig['focusArea']) => void;
  hireEmployee: (candidate: Employee) => void;
  fireEmployee: (employeeId: string) => void;
  takeBankLoan: (amount: number) => void;
  repayBankLoan: (amount: number) => void;
  talkToCustomersAction: () => void;
  refactorCodeAction: () => void;
  restAndRecoverAction: () => void;
  dismissConceptModal: () => void;
  toggleSound: () => void;
  resetGame: () => void;
}

const CANDIDATE_POOL_INITIAL: Employee[] = [
  {
    id: 'cand_1',
    name: 'Tariq Mansour',
    role: 'Engineering',
    skill: 78,
    morale: 85,
    loyalty: 80,
    cultureFit: 85,
    salary: 1400,
    avatar: 'tariq',
    bio: 'Disciplined backend specialist. Loves writing tests and documentation.',
    quirk: 'Refuses to push code on Friday without code review.'
  },
  {
    id: 'cand_2',
    name: 'Elena Rostova',
    role: 'Operations',
    skill: 82,
    morale: 80,
    loyalty: 90,
    cultureFit: 90,
    salary: 1100,
    avatar: 'elena',
    bio: 'Relentless optimizer. Automates spreadsheet workflows with python scripts.',
    quirk: 'Color-codes every invoice and customer ticket.'
  },
  {
    id: 'cand_3',
    name: 'Marcus Vance',
    role: 'Sales',
    skill: 84,
    morale: 90,
    loyalty: 60,
    cultureFit: 55,
    salary: 1500,
    avatar: 'marcus',
    bio: 'Aggressive closer from medical devices. Can sell anything, but hates slow products.',
    quirk: 'Demands commission bonuses when closing deals.'
  },
  {
    id: 'cand_4',
    name: 'Aisha Al-Hassan',
    role: 'Marketing',
    skill: 75,
    morale: 85,
    loyalty: 85,
    cultureFit: 80,
    salary: 1000,
    avatar: 'aisha',
    bio: 'Storyteller who turns dry customer case studies into viral LinkedIn breakdowns.',
    quirk: 'Hosts an industry podcast with 5k listeners.'
  },
  {
    id: 'cand_5',
    name: 'Liam O\'Connor',
    role: 'Engineering',
    skill: 68,
    morale: 90,
    loyalty: 95,
    cultureFit: 92,
    salary: 900,
    avatar: 'liam',
    bio: 'Recent university graduate with incredible hunger and zero corporate ego.',
    quirk: 'Learns new web frameworks over the weekend for fun.'
  }
];

const GameContext = createContext<GameContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'flywheel_business_sim_v1';

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load saved game
  const [hasLoaded, setHasLoaded] = useState(false);
  const [month, setMonth] = useState<number>(1);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(1);
  const [activeTab, setActiveTabState] = useState<TabType>('dashboard');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameEnding, setGameEnding] = useState<GameEnding | null>(null);
  const [failureReason, setFailureReason] = useState<string | null>(null);
  const [showConceptModal, setShowConceptModal] = useState<boolean>(false);
  const [recentConceptModal, setRecentConceptModal] = useState<StoryChoice['educationalConcept'] | null>(null);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [lastTurnSummary, setLastTurnSummary] = useState<TurnSimulationResult | null>(null);

  // Core entities
  const [player, setPlayer] = useState<PlayerStats>(() => {
    const bg = BACKGROUNDS.engineer;
    return {
      name: 'Alex Mercer',
      avatarSeed: 'alex_mercer',
      background: 'engineer',
      difficulty: 'normal',
      personalCash: bg.startingCash,
      energy: bg.initialEnergy,
      maxEnergy: 100,
      knowledge: 40,
      confidence: 60,
      reputation: 35,
      network: 30,
      stress: 20,
      skills: bg.skills,
      traits: bg.traits
    };
  });

  const [company, setCompany] = useState<Company>(() => {
    return createInitialCompany(
      'AeroFlow Systems',
      'saas',
      149,
      18,
      1200,
      6000
    );
  });

  const [characters, setCharacters] = useState<Record<CharacterRelationship['id'], CharacterRelationship>>(INITIAL_CHARACTERS);
  const [currentScene, setCurrentScene] = useState<StoryScene | null>(STORY_CHAPTERS[0]);
  const [activeEvent, setActiveEvent] = useState<DynamicEvent | null>(null);
  const [gameLogs, setGameLogs] = useState<GameLog[]>([
    {
      id: 'log_0',
      month: 1,
      type: 'story',
      title: 'Company Incorporated',
      message: 'You have founded your venture with disciplined determination.',
      timestamp: 'Day 1'
    }
  ]);
  const [unlockedCodexIds, setUnlockedCodexIds] = useState<string[]>([
    'flywheel_effect',
    'definiteness_of_purpose'
  ]);
  const [hiringPool, setHiringPool] = useState<Employee[]>(CANDIDATE_POOL_INITIAL);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.company && parsed.player) {
          setPlayer(parsed.player);
          setCompany(parsed.company);
          setCharacters(parsed.characters || INITIAL_CHARACTERS);
          setMonth(parsed.month || 1);
          setCurrentChapterIndex(parsed.currentChapterIndex || 1);
          setUnlockedCodexIds(parsed.unlockedCodexIds || ['flywheel_effect', 'definiteness_of_purpose']);
          setGameLogs(parsed.gameLogs || []);
          setDifficulty(parsed.difficulty || 'normal');
          
          // Restore active scene
          const chapterScene = STORY_CHAPTERS.find(c => c.chapterIndex === (parsed.currentChapterIndex || 1));
          setCurrentScene(chapterScene || null);
        }
      }
    } catch (e) {
      console.error('Error loading game state:', e);
    }
    setHasLoaded(true);
  }, []);

  // Auto-save whenever key metrics update
  useEffect(() => {
    if (!hasLoaded) return;
    try {
      const stateToSave = {
        player,
        company,
        characters,
        month,
        currentChapterIndex,
        unlockedCodexIds,
        gameLogs: gameLogs.slice(-30),
        difficulty
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Error saving game:', e);
    }
  }, [player, company, characters, month, currentChapterIndex, unlockedCodexIds, gameLogs, difficulty, hasLoaded]);

  const addLog = (type: GameLog['type'], title: string, message: string) => {
    const newLog: GameLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      month,
      type,
      title,
      message,
      timestamp: `Month ${month}`
    };
    setGameLogs(prev => [newLog, ...prev]);
  };

  const setActiveTab = (tab: TabType) => {
    playSound('click');
    setActiveTabState(tab);
  };

  const toggleSound = () => {
    const next = toggleAudio();
    setSoundOn(next);
  };

  const startNewGame = (config: NewGameConfig) => {
    playSound('chapter');
    const bgDef = BACKGROUNDS[config.background];
    const indDef = INDUSTRIES[config.industry];

    const newPlayer: PlayerStats = {
      name: config.playerName.trim() || 'Alex Mercer',
      avatarSeed: config.avatarSeed || 'founder',
      background: config.background,
      difficulty: config.difficulty,
      personalCash: Math.floor(bgDef.startingCash * (config.difficulty === 'easy' ? 1.5 : config.difficulty === 'hard' ? 0.7 : 1)),
      energy: bgDef.initialEnergy,
      maxEnergy: 100,
      knowledge: 40,
      confidence: 65,
      reputation: 40,
      network: 35,
      stress: 15,
      skills: bgDef.skills,
      traits: bgDef.traits
    };

    const initialCompanyCash = Math.floor(bgDef.startingCash * 0.8 * (config.difficulty === 'easy' ? 1.5 : config.difficulty === 'hard' ? 0.7 : 1));
    const newCompany = createInitialCompany(
      config.companyName.trim() || 'Foundry Systems',
      config.industry,
      indDef.baseUnitPrice,
      indDef.baseUnitCost,
      indDef.baseOperatingExpense,
      initialCompanyCash
    );

    setPlayer(newPlayer);
    setCompany(newCompany);
    setCharacters(INITIAL_CHARACTERS);
    setMonth(1);
    setCurrentChapterIndex(1);
    setCurrentScene(STORY_CHAPTERS[0]);
    setActiveEvent(null);
    setGameOver(false);
    setGameEnding(null);
    setFailureReason(null);
    setUnlockedCodexIds(['flywheel_effect', 'definiteness_of_purpose']);
    setLastTurnSummary(null);
    setHiringPool(CANDIDATE_POOL_INITIAL);
    setDifficulty(config.difficulty);

    setGameLogs([
      {
        id: 'log_start',
        month: 1,
        type: 'story',
        title: `${newCompany.name} Founded`,
        message: `Started venture in ${indDef.name} with ${newPlayer.name} as founder. Starting capital: $${initialCompanyCash.toLocaleString()}.`,
        timestamp: 'Day 1'
      }
    ]);

    setActiveTabState('story');
  };

  const resetGame = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    startNewGame({
      playerName: 'Alex Mercer',
      background: 'engineer',
      industry: 'saas',
      companyName: 'AeroFlow Systems',
      difficulty: 'normal',
      avatarSeed: 'alex'
    });
  };

  const nextMonthTurn = () => {
    playSound('cash');
    const nextMonthNum = month + 1;
    const simResult = simulateMonthlyTurn(company, player, difficulty);

    setCompany(simResult.newCompany);
    setPlayer(simResult.newPlayer);
    setLastTurnSummary(simResult);
    setMonth(nextMonthNum);

    // Add financial log
    addLog(
      'finance',
      `Month ${nextMonthNum} Close`,
      `Revenue: $${simResult.cashFlowSummary.revenue.toLocaleString()} | Gross Profit: $${simResult.cashFlowSummary.grossProfit.toLocaleString()} | Net Cash Flow: $${simResult.cashFlowSummary.netCashFlow.toLocaleString()} | Cash on Hand: $${simResult.newCompany.finances.cash.toLocaleString()}`
    );

    // Turn notes
    simResult.turnNotes.forEach(note => {
      addLog('market', 'Turn Update', note);
    });

    // Check game over
    if (simResult.isBankrupt) {
      playSound('alert');
      setGameOver(true);
      setFailureReason('The company exhausted all cash reserves and debt facilities. Operating liabilities surpassed the ability to pay payroll.');
      return;
    }
    if (simResult.isBurnout) {
      playSound('alert');
      setGameOver(true);
      setFailureReason('Severe founder burnout: Chronic 100% stress and depleted physical energy forced an emergency medical step-down.');
      return;
    }

    // Check if we should trigger a dynamic event
    if (simResult.newCompany.finances.runwayMonths < 1.5 && simResult.newCompany.finances.cash < 1500) {
      const runwayEvent = DYNAMIC_EVENTS.find(e => e.id === 'evt_low_runway_alert');
      if (runwayEvent) {
        playSound('alert');
        setActiveEvent(runwayEvent);
        setActiveTabState('story');
        return;
      }
    } else if (simResult.newCompany.overallSatisfaction > 75 && Math.random() < 0.35) {
      const viralEvent = DYNAMIC_EVENTS.find(e => e.id === 'evt_viral_customer_tweet');
      if (viralEvent) {
        playSound('success');
        setActiveEvent(viralEvent);
        setActiveTabState('story');
        return;
      }
    } else if (nextMonthNum >= 5 && simResult.newCompany.finances.monthlyRevenue > 3000 && Math.random() < 0.25) {
      const auditEvent = DYNAMIC_EVENTS.find(e => e.id === 'evt_unexpected_tax_audit');
      if (auditEvent) {
        setActiveEvent(auditEvent);
        setActiveTabState('story');
        return;
      }
    }

    // Check victory condition at Chapter 10 completed or Month >= 24 with high valuation
    if (currentChapterIndex > 10 || (nextMonthNum >= 24 && simResult.newCompany.finances.valuation > 500000)) {
      triggerEnding();
    }
  };

  const triggerEnding = () => {
    playSound('chapter');
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    setGameOver(true);

    let endingTitle = 'The Sustainable Flywheel';
    let badge = 'Built to Last';
    let legacyText = 'You guided your company from a lonely desk to a disciplined, durable enterprise with unwavering focus on customer value.';

    if (company.finances.valuation > 1000000) {
      endingTitle = 'The Category Conqueror';
      badge = 'Unicorn Velocity';
      legacyText = 'Through relentless momentum and strategic foresight, your company emerged as a dominant market leader.';
    } else if (company.culture.discipline > 75 && company.finances.debt === 0) {
      endingTitle = 'The Bootstrapped Titan';
      badge = 'Financial Freedom';
      legacyText = 'Never taking outside dilution or toxic debt, you built an impregnable cash-generative fortress that answers to nobody.';
    } else if (company.culture.customerObsession > 80) {
      endingTitle = 'The Customer Sanctuary';
      badge = 'Category Benchmark';
      legacyText = 'Every decision was anchored in genuine service to the end user. Your brand is treated with reverence across the industry.';
    }

    setGameEnding({
      id: 'victory_ending',
      title: endingTitle,
      badge,
      description: legacyText,
      strengths: [
        `Final Company Valuation: $${company.finances.valuation.toLocaleString()}`,
        `Total Lifetime Revenue: $${company.finances.totalRevenueLifetime.toLocaleString()}`,
        `Total Active Customers: ${company.totalCustomers}`,
        `Disciplined Culture Index: ${company.culture.discipline}/100`
      ],
      legacyAnalysis: `Operating across ${month} months, your leadership cultivated a ${company.stage.replace('_', ' ')} enterprise that proves disciplined execution beats hype.`,
      keyStats: {
        finalCash: company.finances.cash,
        valuation: company.finances.valuation,
        monthsInBusiness: month,
        finalReputation: company.brandReputation,
        teamSize: company.team.length,
        cultureType: company.culture.discipline > 65 ? 'Culture of Discipline' : 'High-Growth Agility'
      }
    });
  };

  const chooseStoryOption = (choice: StoryChoice) => {
    playSound('success');
    const eff = choice.immediateEffects;

    // Apply effects
    setPlayer(prev => ({
      ...prev,
      personalCash: prev.personalCash + (eff.playerCashDelta || 0),
      energy: Math.max(0, Math.min(prev.maxEnergy, prev.energy + (eff.energyDelta || 0) - (choice.energyCost || 0))),
      knowledge: Math.min(100, prev.knowledge + (eff.knowledgeDelta || 0)),
      reputation: Math.min(100, Math.max(0, prev.reputation + (eff.reputationDelta || 0))),
      stress: Math.max(0, Math.min(100, prev.stress + (eff.stressDelta || 0)))
    }));

    setCompany(prev => {
      const newCash = prev.finances.cash + (eff.companyCashDelta || 0) - (choice.cashCost || 0);
      return {
        ...prev,
        overallSatisfaction: Math.min(100, Math.max(10, prev.overallSatisfaction + (eff.satisfactionDelta || 0))),
        product: {
          ...prev.product,
          productMarketFit: Math.min(100, prev.product.productMarketFit + (eff.pmfDelta || 0))
        },
        finances: {
          ...prev.finances,
          cash: newCash
        },
        culture: {
          discipline: Math.min(100, Math.max(0, prev.culture.discipline + (eff.cultureDeltas?.discipline || 0))),
          innovation: Math.min(100, Math.max(0, prev.culture.innovation + (eff.cultureDeltas?.innovation || 0))),
          customerObsession: Math.min(100, Math.max(0, prev.culture.customerObsession + (eff.cultureDeltas?.customerObsession || 0))),
          autonomy: Math.min(100, Math.max(0, prev.culture.autonomy + (eff.cultureDeltas?.autonomy || 0))),
          efficiency: Math.min(100, Math.max(0, prev.culture.efficiency + (eff.cultureDeltas?.efficiency || 0))),
          growthOrientation: Math.min(100, Math.max(0, prev.culture.growthOrientation + (eff.cultureDeltas?.growthOrientation || 0)))
        }
      };
    });

    // Relationship updates
    if (eff.relationshipDeltas) {
      setCharacters(prev => {
        const next = { ...prev };
        Object.entries(eff.relationshipDeltas!).forEach(([charId, delta]) => {
          const cid = charId as CharacterRelationship['id'];
          if (next[cid]) {
            next[cid] = {
              ...next[cid],
              trust: Math.min(100, Math.max(0, next[cid].trust + (delta || 0))),
              recentNotes: [eff.description.slice(0, 70) + '...', ...next[cid].recentNotes].slice(0, 4)
            };
          }
        });
        return next;
      });
    }

    // Log the choice
    addLog('story', choice.text.slice(0, 30) + '...', eff.description);

    // Show educational concept card modal
    setRecentConceptModal(choice.educationalConcept);
    setShowConceptModal(true);

    // Advance chapter if set
    if (choice.advanceChapter) {
      const nextIdx = currentChapterIndex + 1;
      setCurrentChapterIndex(nextIdx);
      const nextScene = STORY_CHAPTERS.find(s => s.chapterIndex === nextIdx);
      setCurrentScene(nextScene || null);
    }
  };

  const chooseEventOption = (choice: StoryChoice) => {
    playSound('success');
    const eff = choice.immediateEffects;

    setPlayer(prev => ({
      ...prev,
      energy: Math.max(0, prev.energy - (choice.energyCost || 0) + (eff.energyDelta || 0)),
      stress: Math.max(0, Math.min(100, prev.stress + (eff.stressDelta || 0))),
      reputation: Math.min(100, prev.reputation + (eff.reputationDelta || 0)),
      knowledge: Math.min(100, prev.knowledge + (eff.knowledgeDelta || 0))
    }));

    setCompany(prev => ({
      ...prev,
      finances: {
        ...prev.finances,
        cash: prev.finances.cash + (eff.companyCashDelta || 0) - (choice.cashCost || 0)
      },
      overallSatisfaction: Math.min(100, prev.overallSatisfaction + (eff.satisfactionDelta || 0))
    }));

    addLog('crisis', choice.text.slice(0, 30), eff.description);
    setActiveEvent(null);

    setRecentConceptModal(choice.educationalConcept);
    setShowConceptModal(true);
  };

  const performCityAction = (locationId: string, actionId: string) => {
    const loc = CITY_LOCATIONS.find(l => l.id === locationId);
    if (!loc) return;
    const act = loc.availableActions.find(a => a.id === actionId);
    if (!act) return;

    if (player.energy < act.cost.energy) {
      playSound('alert');
      alert(`Not enough energy! You need ${act.cost.energy} energy (current: ${player.energy}). Take a rest or wait for the next turn.`);
      return;
    }
    if (company.finances.cash < act.cost.cash) {
      playSound('alert');
      alert(`Not enough company cash! You need $${act.cost.cash} (available: $${company.finances.cash}).`);
      return;
    }

    playSound('success');
    setPlayer(prev => ({
      ...prev,
      energy: prev.energy - act.cost.energy,
      knowledge: Math.min(100, prev.knowledge + (act.rewards.knowledge || 0)),
      network: Math.min(100, prev.network + (act.rewards.network || 0)),
      reputation: Math.min(100, prev.reputation + (act.rewards.reputation || 0))
    }));

    setCompany(prev => ({
      ...prev,
      finances: {
        ...prev.finances,
        cash: prev.finances.cash - act.cost.cash
      },
      totalCustomers: prev.totalCustomers + (act.rewards.leads || 0)
    }));

    addLog('market', `${loc.name}: ${act.name}`, act.rewards.specialEffect || act.description);
  };

  const updateMarketingBudget = (channelId: string, budget: number) => {
    setCompany(prev => {
      const updatedChannels = prev.marketingChannels.map(c => {
        if (c.id === channelId) {
          return { ...c, allocatedBudget: Math.max(0, budget) };
        }
        return c;
      });
      return { ...prev, marketingChannels: updatedChannels };
    });
  };

  const updateProductFocus = (focus: ProductConfig['focusArea']) => {
    playSound('click');
    setCompany(prev => ({
      ...prev,
      product: {
        ...prev.product,
        focusArea: focus
      }
    }));
  };

  const hireEmployee = (candidate: Employee) => {
    if (company.finances.cash < candidate.salary) {
      playSound('alert');
      alert(`Cannot afford hiring deposit! You need at least $${candidate.salary} cash reserves.`);
      return;
    }
    playSound('cash');
    setCompany(prev => ({
      ...prev,
      team: [...prev.team, candidate]
    }));
    setHiringPool(prev => prev.filter(c => c.id !== candidate.id));
    addLog('team', 'New Hire', `Welcomed ${candidate.name} as ${candidate.role}. Salary: $${candidate.salary}/mo.`);
  };

  const fireEmployee = (employeeId: string) => {
    playSound('alert');
    const emp = company.team.find(e => e.id === employeeId);
    if (!emp) return;
    setCompany(prev => ({
      ...prev,
      team: prev.team.filter(e => e.id !== employeeId)
    }));
    addLog('team', 'Departed', `${emp.name} left the company. Monthly burn decreased by $${emp.salary}.`);
  };

  const takeBankLoan = (amount: number) => {
    playSound('cash');
    setCompany(prev => ({
      ...prev,
      finances: {
        ...prev.finances,
        cash: prev.finances.cash + amount,
        debt: prev.finances.debt + amount
      }
    }));
    addLog('finance', 'Bank Loan Drawn', `Secured $${amount.toLocaleString()} working capital loan at 0.8% monthly interest.`);
  };

  const repayBankLoan = (amount: number) => {
    if (company.finances.cash < amount) {
      playSound('alert');
      alert('Insufficient cash to repay loan.');
      return;
    }
    playSound('cash');
    const actualRepay = Math.min(amount, company.finances.debt);
    setCompany(prev => ({
      ...prev,
      finances: {
        ...prev.finances,
        cash: prev.finances.cash - actualRepay,
        debt: Math.max(0, prev.finances.debt - actualRepay)
      }
    }));
    addLog('finance', 'Loan Repayment', `Paid down $${actualRepay.toLocaleString()} of company bank debt.`);
  };

  const talkToCustomersAction = () => {
    if (player.energy < 20) {
      alert('Need at least 20 energy.');
      return;
    }
    playSound('success');
    setPlayer(prev => ({ ...prev, energy: prev.energy - 20, knowledge: Math.min(100, prev.knowledge + 6) }));
    setCompany(prev => ({
      ...prev,
      overallSatisfaction: Math.min(100, prev.overallSatisfaction + 5),
      product: { ...prev.product, productMarketFit: Math.min(100, prev.product.productMarketFit + 4) }
    }));
    addLog('market', 'Customer Interviews', 'Gathered direct feedback on user onboarding bottlenecks.');
  };

  const refactorCodeAction = () => {
    if (player.energy < 25) {
      alert('Need at least 25 energy.');
      return;
    }
    playSound('success');
    setPlayer(prev => ({ ...prev, energy: prev.energy - 25 }));
    setCompany(prev => ({
      ...prev,
      product: {
        ...prev.product,
        techDebt: Math.max(5, prev.product.techDebt - 18),
        reliability: Math.min(100, prev.product.reliability + 8)
      }
    }));
    addLog('market', 'Refactoring & Stability', 'Disciplined engineering session paid down technical debt and boosted stability.');
  };

  const restAndRecoverAction = () => {
    playSound('click');
    setPlayer(prev => ({
      ...prev,
      energy: Math.min(prev.maxEnergy, prev.energy + 40),
      stress: Math.max(0, prev.stress - 25)
    }));
    addLog('story', 'Rest & Recalibration', 'Took time away from the screens to recharge mental clarity.');
  };

  const dismissConceptModal = () => {
    setShowConceptModal(false);
    setRecentConceptModal(null);
  };

  return (
    <GameContext.Provider
      value={{
        player,
        company,
        characters,
        month,
        currentChapterIndex,
        currentScene,
        activeEvent,
        gameLogs,
        unlockedCodexIds,
        activeTab,
        difficulty,
        gameOver,
        gameEnding,
        failureReason,
        recentConceptModal,
        showConceptModal,
        hiringPool,
        soundOn,
        lastTurnSummary,
        setActiveTab,
        startNewGame,
        nextMonthTurn,
        chooseStoryOption,
        chooseEventOption,
        performCityAction,
        updateMarketingBudget,
        updateProductFocus,
        hireEmployee,
        fireEmployee,
        takeBankLoan,
        repayBankLoan,
        talkToCustomersAction,
        refactorCodeAction,
        restAndRecoverAction,
        dismissConceptModal,
        toggleSound,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
