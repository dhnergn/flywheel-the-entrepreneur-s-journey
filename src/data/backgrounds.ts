import { BackgroundType } from '../types/game';

export interface BackgroundDefinition {
  type: BackgroundType;
  title: string;
  tagline: string;
  description: string;
  startingCash: number;
  initialEnergy: number;
  skills: {
    leadership: number;
    sales: number;
    product: number;
    operations: number;
    negotiation: number;
    finance: number;
  };
  traits: string[];
  startingAdvantage: string;
  startingVulnerability: string;
}

export const BACKGROUNDS: Record<BackgroundType, BackgroundDefinition> = {
  engineer: {
    type: 'engineer',
    title: 'Software Engineer',
    tagline: 'Technical craft and systems builder',
    description: 'You understand architecture, latency, and how to build reliable things. However, you often assume that "if you build it, they will come."',
    startingCash: 8500,
    initialEnergy: 90,
    skills: {
      leadership: 40,
      sales: 20,
      product: 85,
      operations: 65,
      negotiation: 35,
      finance: 40
    },
    traits: ['Systems Thinker', 'First-Principles Pragmatist', 'Reluctant Seller'],
    startingAdvantage: '+30% Product Quality development velocity & low technical debt.',
    startingVulnerability: 'Higher initial customer acquisition friction; awkward cold-outreach.'
  },
  designer: {
    type: 'designer',
    title: 'Product & UX Designer',
    tagline: 'Empathy for user pain points and visual polish',
    description: 'You craft delightful user experiences and intuitive interfaces. You spot friction instantly, but sometimes agonize over pixel details while burning runway.',
    startingCash: 6200,
    initialEnergy: 85,
    skills: {
      leadership: 45,
      sales: 40,
      product: 80,
      operations: 45,
      negotiation: 40,
      finance: 35
    },
    traits: ['Customer Empath', 'Visual Storyteller', 'Perfectionist Bias'],
    startingAdvantage: '+25% Initial Customer Satisfaction and conversion rate.',
    startingVulnerability: 'Prone to delaying launches to polish non-critical aesthetic details.'
  },
  salesperson: {
    type: 'salesperson',
    title: 'B2B Sales Representative',
    tagline: 'Master of persuasion, objection-handling, and closing',
    description: 'You never fear picking up the phone or pitching a room. You can sell anything, but you risk promising features your product cannot yet deliver.',
    startingCash: 7000,
    initialEnergy: 95,
    skills: {
      leadership: 60,
      sales: 90,
      product: 30,
      operations: 40,
      negotiation: 80,
      finance: 50
    },
    traits: ['Fearless Prospector', 'Relationship Catalyst', 'Overpromise Risk'],
    startingAdvantage: 'High close rate on early deals; early revenue comes in rapidly.',
    startingVulnerability: 'Product delivery bottlenecks if customers demand custom tweaks.'
  },
  teacher: {
    type: 'teacher',
    title: 'Educator & Academic',
    tagline: 'Clear communicator with relentless patience',
    description: 'You excel at breaking complex problems down and inspiring people. Your personal ethics are rock-solid, though commercial negotiation feels uncomfortably foreign.',
    startingCash: 4500,
    initialEnergy: 80,
    skills: {
      leadership: 70,
      sales: 35,
      product: 60,
      operations: 55,
      negotiation: 30,
      finance: 40
    },
    traits: ['Culture Architect', 'Patient Mentor', 'Gentle Negotiator'],
    startingAdvantage: '+20% Team Morale retention and rapid employee skill development.',
    startingVulnerability: 'Tends to underprice services and give excessive discounts.'
  },
  corporate_employee: {
    type: 'corporate_employee',
    title: 'Corporate Middle Manager',
    tagline: 'Process-oriented operator escaping the bureaucracy',
    description: 'You understand organizational politics, budgets, and compliance. You saved up decent capital, but are accustomed to large teams doing the ground work.',
    startingCash: 16000,
    initialEnergy: 75,
    skills: {
      leadership: 65,
      sales: 50,
      product: 45,
      operations: 75,
      negotiation: 60,
      finance: 70
    },
    traits: ['Organizational Architect', 'Financial Discipline', 'Process Heavy'],
    startingAdvantage: 'High starting bankroll ($16,000) and sharp cost-control discipline.',
    startingVulnerability: 'Slower decision-making during early zero-to-one ambiguity.'
  },
  freelancer: {
    type: 'freelancer',
    title: 'Independent Consultant / Freelancer',
    tagline: 'Self-directed generalist used to wearing every hat',
    description: 'You have solved problems alone for years. You know hustle, but struggle with delegating and trusting others with critical company tasks.',
    startingCash: 5800,
    initialEnergy: 90,
    skills: {
      leadership: 40,
      sales: 60,
      product: 65,
      operations: 60,
      negotiation: 55,
      finance: 50
    },
    traits: ['Extreme Hustle', 'Swiss Army Knife', 'Delegation Bottleneck'],
    startingAdvantage: 'Low personal living burn; highly versatile across all early tasks.',
    startingVulnerability: 'Reluctance to hire; risk of founder burnout from doing everything.'
  },
  student: {
    type: 'student',
    title: 'Recent Graduate',
    tagline: 'Hungry, unburdened, and fast at learning new tools',
    description: 'You have minimal savings, but your calendar is 100% open and your living expenses are tiny. You absorb modern techniques without legacy corporate habits.',
    startingCash: 2400,
    initialEnergy: 100,
    skills: {
      leadership: 35,
      sales: 40,
      product: 55,
      operations: 35,
      negotiation: 30,
      finance: 30
    },
    traits: ['Boundless Energy', 'Rapid Learner', 'Capital Starved'],
    startingAdvantage: 'Max starting energy (100) and +30% faster knowledge accumulation.',
    startingVulnerability: 'Very fragile cash runway; zero safety net if early sales stall.'
  },
  family_business: {
    type: 'family_business',
    title: 'Family Business Operator',
    tagline: 'Grounded in real-world margins and customer handshakes',
    description: 'You grew up seeing inventory arrive and payroll get made. You respect cash in hand over vanity hype, but have had limited exposure to high-growth tech scaling.',
    startingCash: 9500,
    initialEnergy: 85,
    skills: {
      leadership: 60,
      sales: 65,
      product: 45,
      operations: 80,
      negotiation: 70,
      finance: 65
    },
    traits: ['Margin Hawk', 'Grounded Realist', 'Skeptical of Scale'],
    startingAdvantage: 'Intuitive grasp of supplier negotiation and gross margin protection.',
    startingVulnerability: 'Overly conservative on marketing investments and calculated risks.'
  },
  unemployed_dreamer: {
    type: 'unemployed_dreamer',
    title: 'Resolute Visionary',
    tagline: 'Backed into a corner with nothing left to lose',
    description: 'You have hit rock bottom after a layoff. All you have left is your grit, a notebook filled with ideas, and a burning desire to prove your worth.',
    startingCash: 1800,
    initialEnergy: 95,
    skills: {
      leadership: 50,
      sales: 45,
      product: 50,
      operations: 45,
      negotiation: 45,
      finance: 35
    },
    traits: ['Burning Desire', 'Napoleon Hill Persistence', 'Zero Safety Net'],
    startingAdvantage: 'High grit: gains +25% confidence whenever overcoming setbacks.',
    startingVulnerability: 'Critical cash pressure; cannot afford a single month of wasted burn.'
  }
};
