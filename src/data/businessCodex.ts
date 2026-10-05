import { BusinessConcept } from '../types/game';

export const BUSINESS_CODEX: BusinessConcept[] = [
  {
    id: 'flywheel_effect',
    title: 'The Flywheel Effect',
    subtitle: 'Compound momentum vs. the Doom Loop of reactive pivot',
    category: 'Strategy & Leadership',
    framework: 'Good to Great — Jim Collins',
    practicalAdvice: [
      'Great business transformations do not happen in one miraculous breakthrough or shiny launch.',
      'Each disciplined decision—improving the product, satisfying a customer, refining systems—turns a giant heavy flywheel.',
      'The first push takes enormous effort for little visible movement; after thousands of rotations, compound momentum sustains the company.',
      'Avoid the "Doom Loop": reacting to temporary hardship by firing off unaligned initiatives that stop the wheel.'
    ],
    inGameRelevance: 'Consistently reinvesting in product quality and customer retention compounds word-of-mouth growth without skyrocketing paid ad bills.',
    unlockedAtChapter: 1,
    isUnlocked: true
  },
  {
    id: 'confront_brutal_facts',
    title: 'Confront the Brutal Facts (The Stockdale Paradox)',
    subtitle: 'Unflinching realism coupled with unwavering faith in ultimate victory',
    category: 'Strategy & Leadership',
    framework: 'Good to Great — Jim Collins',
    practicalAdvice: [
      'Never confuse faith that you will prevail in the end with the discipline to confront the most brutal facts of your current reality.',
      'Do not hide declining metrics, churn signals, or buggy releases from yourself or your team.',
      'Create a climate where the truth is heard: conduct autopsies without blame and extract institutional wisdom from every misstep.'
    ],
    inGameRelevance: 'When cash runway drops or customers leave, acknowledging the bottleneck immediately saves the business from sudden bankruptcy.',
    unlockedAtChapter: 2,
    isUnlocked: false
  },
  {
    id: 'hedgehog_concept',
    title: 'The Hedgehog Concept',
    subtitle: 'The intersection of passion, competence, and your economic engine',
    category: 'Strategy & Leadership',
    framework: 'Good to Great — Jim Collins',
    practicalAdvice: [
      'The fox knows many things, but the hedgehog knows one big thing.',
      'Find the intersection of three circles: 1) What can you be best in the world at? 2) What drives your economic engine (your single key denominator)? 3) What are you deeply passionate about?',
      'If you cannot be best in your chosen niche, discard the vanity and focus on where you have genuine structural advantage.'
    ],
    inGameRelevance: 'Helps you pick the right customer segment and resist taking on distracting, low-margin custom work.',
    unlockedAtChapter: 3,
    isUnlocked: false
  },
  {
    id: 'first_who_then_what',
    title: 'First Who, Then What',
    subtitle: 'Get the right people on the bus and in the right seats',
    category: 'Strategy & Leadership',
    framework: 'Good to Great — Jim Collins',
    practicalAdvice: [
      'If you begin with "who" rather than "what", you can more easily adapt to a rapidly changing world.',
      'The right people are self-motivated by the inner drive to produce results; they do not require tight surveillance.',
      'When in doubt, don\'t hire—keep looking. When you know you need to make a people change, act promptly without cruelty.'
    ],
    inGameRelevance: 'A high-skill employee who poisons team culture or resists company systems drags down total team productivity.',
    unlockedAtChapter: 4,
    isUnlocked: false
  },
  {
    id: 'cash_flow_vs_profit',
    title: 'Cash Flow vs. Accounting Profit',
    subtitle: 'Revenue is vanity, profit is sanity, but cash is reality',
    category: 'Finance & Runway',
    framework: 'The Personal MBA — Josh Kaufman',
    practicalAdvice: [
      'You can show a accounting paper profit on invoices while physically having zero cash in the bank account to make Friday payroll.',
      'Cash flow measures the physical arrival and departure of liquidity.',
      'Receivables, deferred payments, and inventory lock up liquid cash. Protect your runway at all costs.'
    ],
    inGameRelevance: 'Monitor your monthly net burn and runway. An unexpected expense with zero cash buffer triggers instant insolvency.',
    unlockedAtChapter: 5,
    isUnlocked: false
  },
  {
    id: 'unit_economics',
    title: 'Unit Economics: LTV vs. CAC',
    subtitle: 'The fundamental viability equation of any business',
    category: 'Finance & Runway',
    framework: 'The Personal MBA — Josh Kaufman',
    practicalAdvice: [
      'Customer Acquisition Cost (CAC) is total marketing & sales spend divided by new customers acquired.',
      'Lifetime Value (LTV) is Gross Margin per customer multiplied by average customer lifespan.',
      'Aim for an LTV:CAC ratio of at least 3:1 with a payback period under 12 months. If CAC exceeds LTV, scaling just accelerates insolvency.'
    ],
    inGameRelevance: 'Tuning paid ad campaigns without fixing customer churn creates a leaky bucket where marketing money is vaporized.',
    unlockedAtChapter: 3,
    isUnlocked: false
  },
  {
    id: 'theory_of_constraints',
    title: 'The Theory of Constraints & Bottlenecks',
    subtitle: 'A chain is only as strong as its single weakest link',
    category: 'Operations & Systems',
    framework: 'Systems Thinking & Operations Science',
    practicalAdvice: [
      'In any operational system, throughput is governed by the single primary bottleneck.',
      'Improving efficiency anywhere other than the bottleneck is an illusion of progress.',
      'Find the constraint (e.g. customer onboarding delay, lead generation, or server stability), subordinate everything else to it, and elevate it.'
    ],
    inGameRelevance: 'Check your company bottleneck indicator on the dashboard before pouring money into secondary initiatives.',
    unlockedAtChapter: 6,
    isUnlocked: false
  },
  {
    id: 'definiteness_of_purpose',
    title: 'Definiteness of Purpose & Persistence',
    subtitle: 'Transmuting setbacks into strategic leverage',
    category: 'Mindset & Network',
    framework: 'Think and Grow Rich — Napoleon Hill (Philosophical context)',
    practicalAdvice: [
      'A clear, unwavering target acts as an organizing filter for daily micro-decisions.',
      'Temporary defeat is not permanent failure; it is merely nature\'s test to discard unworkable plans.',
      'Form Mastermind alliances: surrounding yourself with people possessing complementary knowledge amplifies strategic execution.'
    ],
    inGameRelevance: 'Maintains founder confidence and unlocks creative options during critical downturns and investor negotiations.',
    unlockedAtChapter: 1,
    isUnlocked: true
  },
  {
    id: 'value_creation_and_delivery',
    title: 'The 5 Parts of Every Business',
    subtitle: 'Value Creation, Marketing, Sales, Value Delivery, and Finance',
    category: 'Product & Market',
    framework: 'The Personal MBA — Josh Kaufman',
    practicalAdvice: [
      '1. Value Creation: Discovering what people need or want, then creating it.',
      '2. Marketing: Attracting attention and building demand for what you\'ve created.',
      '3. Sales: Turning interested prospects into paying customers.',
      '4. Value Delivery: Giving your customers what you promised and ensuring satisfaction.',
      '5. Finance: Bringing in enough money to continue operating and make your effort worthwhile.',
      'If you eliminate any one of these five, you do not have a business.'
    ],
    inGameRelevance: 'Helps diagnose why growth has stalled by checking which of the 5 pillars is neglected.',
    unlockedAtChapter: 2,
    isUnlocked: false
  },
  {
    id: 'culture_of_discipline',
    title: 'Culture of Discipline',
    subtitle: 'Freedom and responsibility within a clear framework',
    category: 'Operations & Systems',
    framework: 'Good to Great — Jim Collins',
    practicalAdvice: [
      'Bureaucracy arises to compensate for incompetence and lack of discipline.',
      'Most companies build bureaucratic rules to manage the small percentage of wrong people on the bus.',
      'Build a culture full of people who take disciplined action within the guidelines of the system, without requiring heavy hierarchical supervision.'
    ],
    inGameRelevance: 'High discipline prevents operational drift, reduces waste, and allows your company to scale without hiring layers of middle managers.',
    unlockedAtChapter: 7,
    isUnlocked: false
  }
];
