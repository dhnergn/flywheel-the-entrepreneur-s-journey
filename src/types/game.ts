export type IndustryType = 
  | 'saas'
  | 'edtech'
  | 'cafe_hospitality'
  | 'fitness_wellness'
  | 'consulting'
  | 'ecommerce'
  | 'digital_agency'
  | 'smart_hardware';

export type BackgroundType = 
  | 'engineer'
  | 'designer'
  | 'salesperson'
  | 'teacher'
  | 'corporate_employee'
  | 'freelancer'
  | 'student'
  | 'family_business'
  | 'unemployed_dreamer';

export type Difficulty = 'easy' | 'normal' | 'hard';

export type TabType = 
  | 'dashboard'
  | 'story'
  | 'map'
  | 'product'
  | 'marketing'
  | 'team'
  | 'finance'
  | 'relationships'
  | 'codex';

export interface PlayerStats {
  name: string;
  avatarSeed: string;
  background: BackgroundType;
  difficulty: Difficulty;
  personalCash: number;
  energy: number; // 0 - 100
  maxEnergy: number;
  knowledge: number; // 0 - 100
  confidence: number; // 0 - 100
  reputation: number; // 0 - 100
  network: number; // 0 - 100
  stress: number; // 0 - 100
  skills: {
    leadership: number;
    sales: number;
    product: number;
    operations: number;
    negotiation: number;
    finance: number;
  };
  traits: string[];
}

export interface CustomerSegment {
  id: 'budget' | 'mainstream' | 'premium' | 'early_adopter';
  name: string;
  count: number;
  satisfaction: number; // 0 - 100
  churnRate: number; // monthly % e.g. 0.05
  priceSensitivity: 'low' | 'medium' | 'high';
  featureNeeds: string;
}

export interface Employee {
  id: string;
  name: string;
  role: 'Engineering' | 'Sales' | 'Operations' | 'Marketing' | 'Finance';
  skill: number; // 1 - 100
  morale: number; // 0 - 100
  loyalty: number; // 0 - 100
  cultureFit: number; // 0 - 100
  salary: number; // $/month
  avatar: string;
  bio: string;
  quirk: string;
}

export interface MarketingChannel {
  id: string;
  name: string;
  allocatedBudget: number; // $/month
  efficiencyScore: number; // multiplier based on market fit
  description: string;
  type: 'organic' | 'paid' | 'outbound' | 'viral';
}

export interface ProductConfig {
  quality: number; // 0 - 100
  reliability: number; // 0 - 100 (affects bugs/churn)
  userExperience: number; // 0 - 100 (affects conversion)
  featureBreadth: number; // 0 - 100
  techDebt: number; // 0 - 100 (high debt causes sudden crises)
  productMarketFit: number; // 0 - 100
  monthlyRndBudget: number;
  focusArea: 'quality' | 'features' | 'stability' | 'ux';
}

export interface CultureDimensions {
  discipline: number; // Collins: culture of discipline
  innovation: number;
  customerObsession: number;
  autonomy: number;
  efficiency: number;
  growthOrientation: number;
}

export interface CompanyFinances {
  cash: number;
  monthlyRevenue: number;
  monthlyCOGS: number; // Cost of goods sold
  grossProfit: number;
  grossMarginPercent: number;
  operatingExpenses: {
    salaries: number;
    marketing: number;
    rentOffice: number;
    softwareAndTools: number;
    loanInterest: number;
    miscellaneous: number;
  };
  totalOperatingExpenses: number;
  operatingProfit: number; // EBITDA
  netCashFlow: number;
  burnRate: number; // positive number if net negative cash flow
  runwayMonths: number;
  debt: number;
  monthlyInterestRate: number;
  valuation: number;
  totalRevenueLifetime: number;
  historicalProfit: number[];
  historicalRevenue: number[];
  historicalCash: number[];
}

export interface Company {
  name: string;
  industry: IndustryType;
  foundedMonth: number;
  stage: 'garage' | 'early_traction' | 'product_market_fit' | 'scaling' | 'established';
  unitPrice: number;
  unitCost: number;
  totalCustomers: number;
  segments: CustomerSegment[];
  overallSatisfaction: number; // 0 - 100
  brandReputation: number; // 0 - 100
  marketSharePercent: number;
  finances: CompanyFinances;
  product: ProductConfig;
  team: Employee[];
  marketingChannels: MarketingChannel[];
  culture: CultureDimensions;
  systemsEfficiency: number; // 0 - 100
  currentBottleneck: 'none' | 'customer_support' | 'sales_capacity' | 'tech_debt' | 'cash_flow' | 'fulfillment';
}

export interface CharacterRelationship {
  id: 'maya' | 'emre' | 'selin' | 'kerem' | 'deniz' | 'arda';
  name: string;
  role: string;
  organization: string;
  trust: number; // 0 - 100
  alignment: number; // 0 - 100
  status: 'contact' | 'mentor' | 'colleague' | 'investor' | 'rival' | 'estranged';
  bio: string;
  avatarSeed: string;
  recentNotes: string[];
}

export interface StoryChoice {
  id: string;
  text: string;
  philosophyTag?: string; // e.g. "Confront Brutal Facts", "Disciplined Focus", "Definiteness of Purpose"
  energyCost?: number;
  cashCost?: number;
  requirements?: {
    minKnowledge?: number;
    minReputation?: number;
    minCash?: number;
    minCultureDiscipline?: number;
  };
  immediateEffects: {
    description: string;
    playerCashDelta?: number;
    companyCashDelta?: number;
    energyDelta?: number;
    knowledgeDelta?: number;
    reputationDelta?: number;
    stressDelta?: number;
    satisfactionDelta?: number;
    pmfDelta?: number;
    cultureDeltas?: Partial<CultureDimensions>;
    relationshipDeltas?: Partial<Record<CharacterRelationship['id'], number>>;
    delayedEventTrigger?: string;
  };
  educationalConcept: {
    title: string;
    summary: string;
    principle: string;
    sourceInspiration: string;
  };
  nextSceneId?: string;
  advanceChapter?: boolean;
}

export interface StoryScene {
  id: string;
  chapterIndex: number;
  title: string;
  speaker: string;
  speakerRole: string;
  speakerAvatar?: string;
  characterId?: CharacterRelationship['id'];
  narrative: string[];
  contextStatus: string;
  choices: StoryChoice[];
}

export interface DynamicEvent {
  id: string;
  title: string;
  category: 'crisis' | 'opportunity' | 'team' | 'market' | 'culture';
  narrative: string;
  conditionDescription: string;
  choices: StoryChoice[];
}

export interface BusinessConcept {
  id: string;
  title: string;
  subtitle: string;
  category: 'Strategy & Leadership' | 'Finance & Runway' | 'Product & Market' | 'Operations & Systems' | 'Mindset & Network';
  framework: string;
  practicalAdvice: string[];
  inGameRelevance: string;
  unlockedAtChapter: number;
  isUnlocked: boolean;
}

export interface CityLocation {
  id: string;
  name: string;
  subtitle: string;
  district: string;
  description: string;
  iconName: string;
  color: string;
  availableActions: {
    id: string;
    name: string;
    cost: { energy: number; cash: number };
    description: string;
    rewards: {
      knowledge?: number;
      network?: number;
      reputation?: number;
      leads?: number;
      specialEffect?: string;
    };
  }[];
}

export interface GameLog {
  id: string;
  month: number;
  type: 'story' | 'finance' | 'market' | 'team' | 'crisis' | 'achievement';
  title: string;
  message: string;
  timestamp: string;
}

export interface GameEnding {
  id: string;
  title: string;
  badge: string;
  description: string;
  strengths: string[];
  legacyAnalysis: string;
  keyStats: {
    finalCash: number;
    valuation: number;
    monthsInBusiness: number;
    finalReputation: number;
    teamSize: number;
    cultureType: string;
  };
}
