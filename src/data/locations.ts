import { CityLocation } from '../types/game';

export const CITY_LOCATIONS: CityLocation[] = [
  {
    id: 'startup_hub',
    name: 'Nexus Innovation Loft',
    subtitle: 'Incubator & Founder Community',
    district: 'Silicon Quarter',
    description: 'A buzzing open-plan loft filled with early-stage founders, coffee machines, whiteboards, and pitch decks. Maya Chen frequently works from here.',
    iconName: 'Rocket',
    color: 'from-blue-600 to-indigo-700',
    availableActions: [
      {
        id: 'hub_pitch_event',
        name: 'Attend Demo Night & Network',
        cost: { energy: 20, cash: 50 },
        description: 'Pitch your progress to peers and early angel investors. Gain reputation and potential customer leads.',
        rewards: {
          network: 15,
          reputation: 8,
          knowledge: 10,
          leads: 4,
          specialEffect: 'Met 4 potential beta users and sharpened pitch clarity.'
        }
      },
      {
        id: 'hub_scout_talent',
        name: 'Scout Early Builders',
        cost: { energy: 15, cash: 100 },
        description: 'Interview hungry engineers and growth marketers seeking early-stage startup adventure.',
        rewards: {
          network: 10,
          specialEffect: 'Added 2 qualified candidate profiles to your recruitment bench.'
        }
      }
    ]
  },
  {
    id: 'downtown_bank',
    name: 'Metropolitan Commercial Bank',
    subtitle: 'Credit Lines & Working Capital',
    district: 'Financial District',
    description: 'A towering marble-and-glass tower housing commercial loan officers, risk analysts, and treasury services.',
    iconName: 'Landmark',
    color: 'from-emerald-600 to-teal-800',
    availableActions: [
      {
        id: 'bank_apply_credit_line',
        name: 'Apply for Working Capital Line',
        cost: { energy: 15, cash: 150 },
        description: 'Submit financial statements to unlock low-interest debt financing to bridge cash flow gaps.',
        rewards: {
          knowledge: 8,
          specialEffect: 'Unlocked an optional $10,000 credit facility at 7.5% APR.'
        }
      },
      {
        id: 'bank_financial_consult',
        name: 'Meet Senior Commercial Banker',
        cost: { energy: 10, cash: 0 },
        description: 'Review cash conversion cycles and receivables management strategies.',
        rewards: {
          knowledge: 15,
          specialEffect: 'Reduced accounts receivable delay by 15 days.'
        }
      }
    ]
  },
  {
    id: 'university_campus',
    name: 'Polytechnic University & Labs',
    subtitle: 'Research, Talent & Wisdom',
    district: 'Academic Heights',
    description: 'Ancient stone archways and cutting-edge labs. Professor Arda Teoman holds office hours here, challenging conventional business dogmas.',
    iconName: 'GraduationCap',
    color: 'from-amber-600 to-orange-800',
    availableActions: [
      {
        id: 'uni_meet_arda',
        name: 'Socratic Session with Prof. Arda',
        cost: { energy: 20, cash: 0 },
        description: 'Discuss current strategic bottlenecks, Collins\' flywheel mechanics, and long-term focus.',
        rewards: {
          knowledge: 25,
          reputation: 5,
          specialEffect: 'Clarified Hedgehog concept; reduced founder stress by 15.'
        }
      },
      {
        id: 'uni_hire_interns',
        name: 'Recruit Top Graduate Fellows',
        cost: { energy: 15, cash: 200 },
        description: 'Post hiring openings on the university graduate bulletin for high-aptitude, low-cost talent.',
        rewards: {
          network: 12,
          specialEffect: 'Unlocked high-potential junior recruits in your hiring pool.'
        }
      }
    ]
  },
  {
    id: 'investors_alley',
    name: 'Foundry Capital & Angel Row',
    subtitle: 'Venture Capital & Term Sheets',
    district: 'Financial District',
    description: 'Modern glass penthouse suites where Kerem Alkan and syndicates evaluate companies for multi-million dollar growth rounds.',
    iconName: 'TrendingUp',
    color: 'from-purple-600 to-indigo-900',
    availableActions: [
      {
        id: 'investors_pitch_kerem',
        name: 'Informal Coffee with Kerem Alkan',
        cost: { energy: 20, cash: 50 },
        description: 'Share unit-economics progress, metrics, and discuss category expansion dynamics.',
        rewards: {
          network: 20,
          reputation: 10,
          knowledge: 12,
          specialEffect: 'Kerem increases investment interest; unlocks strategic introductions.'
        }
      },
      {
        id: 'investors_market_intel',
        name: 'Review Category M&A Reports',
        cost: { energy: 15, cash: 150 },
        description: 'Study recent competitor valuations, multiple benchmarks, and market shifts.',
        rewards: {
          knowledge: 18,
          specialEffect: 'Accurate valuation benchmarking added to financial models.'
        }
      }
    ]
  },
  {
    id: 'makers_port',
    name: 'Old Port Logistics & Suppliers',
    subtitle: 'Fabrication, Cloud Racks & Suppliers',
    district: 'Industrial Waterfront',
    description: 'Warehouses, fabrication shops, and fiber-optic data hubs. Selin Kaya knows every dockmaster and cloud broker in this district.',
    iconName: 'Boxes',
    color: 'from-slate-600 to-zinc-800',
    availableActions: [
      {
        id: 'suppliers_renegotiate_cogs',
        name: 'Renegotiate Supplier & Cloud Rates',
        cost: { energy: 25, cash: 100 },
        description: 'Audit supply chain and server hosting agreements to push down Cost of Goods Sold (COGS).',
        rewards: {
          knowledge: 12,
          specialEffect: 'Permanently shaved 8% off your monthly unit Cost of Goods Sold!'
        }
      },
      {
        id: 'suppliers_quality_audit',
        name: 'Inspect Fulfillment Pipelines',
        cost: { energy: 20, cash: 200 },
        description: 'Verify reliability and remove delivery bottlenecks with Selin.',
        rewards: {
          knowledge: 10,
          specialEffect: 'Reduced fulfillment defect rate and improved delivery speed.'
        }
      }
    ]
  },
  {
    id: 'commercial_promenade',
    name: 'Grand Commercial Promenade',
    subtitle: 'Customers, Foot Traffic & B2B Suites',
    district: 'City Center',
    description: 'The pulsing commercial heart of the metropolis. Flagship retail, B2B enterprise headquarters, and bustling corporate cafeterias.',
    iconName: 'Users',
    color: 'from-rose-600 to-pink-800',
    availableActions: [
      {
        id: 'promenade_intercept_interviews',
        name: 'Street Customer Intercepts',
        cost: { energy: 20, cash: 50 },
        description: 'Test value propositions and marketing headlines on real decision makers in public.',
        rewards: {
          knowledge: 15,
          leads: 6,
          specialEffect: 'Gained fresh customer objection insights; +5% conversion rate.'
        }
      },
      {
        id: 'promenade_b2b_cold_walkin',
        name: 'B2B Outbound Blitz with Emre',
        cost: { energy: 25, cash: 100 },
        description: 'Walk into corporate suites with Emre Demir to pitch department heads directly.',
        rewards: {
          reputation: 8,
          leads: 10,
          specialEffect: 'Emre scheduled 3 high-value client demonstrations for next week.'
        }
      }
    ]
  },
  {
    id: 'vanguard_hq',
    name: 'Vanguard Dynamics HQ',
    subtitle: 'Deniz Vural\'s Glass Citadel',
    district: 'Silicon Quarter',
    description: 'The gleaming, venture-funded skyscraper of your primary competitor, Deniz Vural. They have neon logos and unlimited free catering.',
    iconName: 'ShieldAlert',
    color: 'from-red-600 to-rose-900',
    availableActions: [
      {
        id: 'vanguard_secret_shopper',
        name: 'Competitive Teardown & Mystery Shopping',
        cost: { energy: 15, cash: 80 },
        description: 'Sign up for Vanguard\'s product as a secret user to inspect their onboarding flaws and weak spots.',
        rewards: {
          knowledge: 20,
          specialEffect: 'Discovered Vanguard\'s support response time is 3 days! Major differentiator.'
        }
      }
    ]
  },
  {
    id: 'civic_center',
    name: 'Metropolitan Chamber of Commerce',
    subtitle: 'Regulations, Grants & Civic Trust',
    district: 'Civic District',
    description: 'Historic neoclassical municipal building where trade licenses, small business development grants, and regional standards are decided.',
    iconName: 'Building2',
    color: 'from-teal-600 to-cyan-800',
    availableActions: [
      {
        id: 'civic_apply_innovation_grant',
        name: 'Apply for Regional Innovation Grant',
        cost: { energy: 25, cash: 100 },
        description: 'Submit an economic impact proposal for non-dilutive government innovation funding.',
        rewards: {
          knowledge: 10,
          reputation: 15,
          specialEffect: 'Application submitted! 70% chance of receiving $3,500 non-dilutive grant.'
        }
      }
    ]
  }
];
