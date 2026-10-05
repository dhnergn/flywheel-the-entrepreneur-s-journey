import { IndustryType } from '../types/game';

export interface IndustryDefinition {
  type: IndustryType;
  name: string;
  tagline: string;
  description: string;
  baseUnitPrice: number;
  baseUnitCost: number; // COGS
  baseOperatingExpense: number;
  initialCustomerCount: number;
  marginTier: 'High (80%+)' | 'Medium (40-60%)' | 'Low (15-30%)';
  capitalRequired: 'Low' | 'Medium' | 'High';
  complexity: 'Low' | 'Medium' | 'High';
  growthPotential: 'Massive / Global' | 'High / Regional' | 'Steady / Local';
  idealCustomerSegment: string;
  defaultMarketingChannels: string[];
}

export const INDUSTRIES: Record<IndustryType, IndustryDefinition> = {
  saas: {
    type: 'saas',
    name: 'B2B Workflow SaaS',
    tagline: 'Recurring cloud software for mid-sized operations teams',
    description: 'High upfront development cost and customer acquisition difficulty, but near-zero marginal distribution cost and 85%+ gross margins.',
    baseUnitPrice: 149, // Monthly subscription per account
    baseUnitCost: 18, // Cloud compute & third party APIs
    baseOperatingExpense: 1200,
    initialCustomerCount: 0,
    marginTier: 'High (80%+)',
    capitalRequired: 'Medium',
    complexity: 'High',
    growthPotential: 'Massive / Global',
    idealCustomerSegment: 'Operations managers with messy spreadsheet workflows',
    defaultMarketingChannels: ['content_seo', 'outbound_sales', 'referrals']
  },
  edtech: {
    type: 'edtech',
    name: 'Applied Business Academy',
    tagline: 'Cohort-based live vocational training & credentialing',
    description: 'Combines digital courses with mentor feedback. Great organic appeal and social proof, but requires high engagement to avoid completion churn.',
    baseUnitPrice: 299,
    baseUnitCost: 65, // Mentor grading & community tooling
    baseOperatingExpense: 950,
    initialCustomerCount: 0,
    marginTier: 'High (80%+)',
    capitalRequired: 'Low',
    complexity: 'Medium',
    growthPotential: 'High / Regional',
    idealCustomerSegment: 'Professionals looking to break into product management & strategy',
    defaultMarketingChannels: ['organic_social', 'webinars', 'referrals']
  },
  cafe_hospitality: {
    type: 'cafe_hospitality',
    name: 'Artisan Coffee Roastery & Cafe',
    tagline: 'Specialty single-origin coffee and workspace sanctuary',
    description: 'Tangible, community-rooted retail business. Immediate cash flow from day one, high customer foot traffic, but vulnerable to rent, wastage, and staffing friction.',
    baseUnitPrice: 6.5,
    baseUnitCost: 1.8, // Coffee beans, milk, cups, bakery supplies
    baseOperatingExpense: 2800, // Prime retail lease and utilities
    initialCustomerCount: 20,
    marginTier: 'Medium (40-60%)',
    capitalRequired: 'High',
    complexity: 'Medium',
    growthPotential: 'Steady / Local',
    idealCustomerSegment: 'Neighborhood remote workers, coffee purists, and university fellows',
    defaultMarketingChannels: ['local_foot_traffic', 'instagram_visuals', 'loyalty_club']
  },
  fitness_wellness: {
    type: 'fitness_wellness',
    name: 'Functional Strength & Wellness Studio',
    tagline: 'Semi-private strength coaching with metabolic recovery',
    description: 'Membership subscription business with physical location constraints. Thrives on tight community and retention; devastating if customer churn spikes.',
    baseUnitPrice: 160,
    baseUnitCost: 35,
    baseOperatingExpense: 2200,
    initialCustomerCount: 10,
    marginTier: 'Medium (40-60%)',
    capitalRequired: 'Medium',
    complexity: 'Medium',
    growthPotential: 'Steady / Local',
    idealCustomerSegment: 'Busy urban professionals seeking structured coaching without gym chaos',
    defaultMarketingChannels: ['local_partnerships', 'referral_bounties', 'free_taster_sessions']
  },
  consulting: {
    type: 'consulting',
    name: 'Strategy & Systems Advisory',
    tagline: 'Operational overhaul and unit-economics transformation',
    description: 'Zero startup cost, high fee-per-client ($3,500/mo retainer), but strictly trading hours for dollars until methodologies can be packaged into scalable assets.',
    baseUnitPrice: 3500,
    baseUnitCost: 400, // Research materials, specialized tools
    baseOperatingExpense: 600,
    initialCustomerCount: 0,
    marginTier: 'High (80%+)',
    capitalRequired: 'Low',
    complexity: 'Low',
    growthPotential: 'High / Regional',
    idealCustomerSegment: 'Founders caught in operational bottlenecks scaling from $50k to $500k ARR',
    defaultMarketingChannels: ['outbound_sales', 'thought_leadership', 'personal_network']
  },
  ecommerce: {
    type: 'ecommerce',
    name: 'Ergonomic Desk & Workspace Goods',
    tagline: 'Direct-to-consumer sustainable workstation products',
    description: 'Strong visual appeal and global market size, but heavily vulnerable to supply chain delays, inventory cash lockup, and volatile digital ad costs.',
    baseUnitPrice: 85,
    baseUnitCost: 38, // Manufacturing & freight
    baseOperatingExpense: 1400,
    initialCustomerCount: 5,
    marginTier: 'Medium (40-60%)',
    capitalRequired: 'Medium',
    complexity: 'High',
    growthPotential: 'Massive / Global',
    idealCustomerSegment: 'Ergonomics-conscious home office builders and designers',
    defaultMarketingChannels: ['paid_social_ads', 'influencer_reviews', 'email_retargeting']
  },
  digital_agency: {
    type: 'digital_agency',
    name: 'High-Impact Brand & Growth Agency',
    tagline: 'Performance design and web engineering for category leaders',
    description: 'Fast path to early revenue. High client relationship maintenance, prone to scope creep, but excellent cash compounding if pricing on value rather than hours.',
    baseUnitPrice: 2400,
    baseUnitCost: 500,
    baseOperatingExpense: 800,
    initialCustomerCount: 0,
    marginTier: 'High (80%+)',
    capitalRequired: 'Low',
    complexity: 'Medium',
    growthPotential: 'High / Regional',
    idealCustomerSegment: 'Mid-sized businesses redesigning their customer-facing digital touchpoints',
    defaultMarketingChannels: ['portfolio_showcase', 'outbound_prospecting', 'client_referrals']
  },
  smart_hardware: {
    type: 'smart_hardware',
    name: 'Precision IoT Environmental Sensor',
    tagline: 'Industrial indoor air quality and acoustic monitor for workplaces',
    description: 'The hardest path: physical tooling, firmware, compliance certifications, but creates unmatched moat and recurring analytics telemetry once deployed.',
    baseUnitPrice: 320,
    baseUnitCost: 140,
    baseOperatingExpense: 2100,
    initialCustomerCount: 0,
    marginTier: 'Medium (40-60%)',
    capitalRequired: 'High',
    complexity: 'High',
    growthPotential: 'Massive / Global',
    idealCustomerSegment: 'Facility directors and sustainable green-building compliance teams',
    defaultMarketingChannels: ['industry_trade_shows', 'pilot_programs', 'distributors']
  }
};
