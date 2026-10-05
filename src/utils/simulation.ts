import { Company, PlayerStats, Difficulty, CustomerSegment } from '../types/game';

export interface TurnSimulationResult {
  newCompany: Company;
  newPlayer: PlayerStats;
  turnNotes: string[];
  newCustomersAcquired: number;
  customersLostToChurn: number;
  cashFlowSummary: {
    revenue: number;
    cogs: number;
    grossProfit: number;
    opex: number;
    netCashFlow: number;
  };
  bottleneckDetected: Company['currentBottleneck'];
  isBankrupt: boolean;
  isBurnout: boolean;
}

export function simulateMonthlyTurn(
  company: Company,
  player: PlayerStats,
  difficulty: Difficulty
): TurnSimulationResult {
  const turnNotes: string[] = [];

  // Difficulty multipliers
  const diffMultiplier = difficulty === 'hard' ? 1.25 : difficulty === 'easy' ? 0.8 : 1.0;
  const churnDifficulty = difficulty === 'hard' ? 1.2 : difficulty === 'easy' ? 0.75 : 1.0;

  // 1. Calculate Marketing Leads & Conversion
  let totalNewCustomers = 0;
  let totalMarketingSpend = 0;

  company.marketingChannels.forEach((channel) => {
    totalMarketingSpend += channel.allocatedBudget;
    if (channel.allocatedBudget > 0) {
      // Cost per lead baseline roughly $20-$80 depending on industry
      const baseCostPerLead = Math.max(15, (company.unitPrice * 0.25));
      const leads = Math.floor((channel.allocatedBudget / baseCostPerLead) * channel.efficiencyScore);
      
      // Conversion rate influenced by UX, Reputation, and Sales Skill
      const conversionBase = 0.08 + (company.product.userExperience / 500) + (company.brandReputation / 400);
      const converted = Math.max(0, Math.floor(leads * conversionBase));
      totalNewCustomers += converted;
    }
  });

  // Word of Mouth / Organic Flywheel
  if (company.totalCustomers > 0 && company.overallSatisfaction > 50) {
    const advocacyFactor = (company.overallSatisfaction - 50) / 100;
    const organicReferrals = Math.floor(company.totalCustomers * 0.06 * advocacyFactor * (company.product.productMarketFit / 100));
    if (organicReferrals > 0) {
      totalNewCustomers += organicReferrals;
      turnNotes.push(`Word of Mouth: Delighted clients referred ${organicReferrals} new customers!`);
    }
  }

  // Minimum baseline for early garage phase
  if (company.stage === 'garage' && totalNewCustomers === 0 && Math.random() < 0.3) {
    totalNewCustomers += 1;
  }

  // 2. Calculate Customer Churn
  // Base churn ranges by industry: e.g. 3% for SaaS, 8% for agency/hospitality
  const baseMonthlyChurnRate = company.industry === 'saas' ? 0.035 : 
                               company.industry === 'edtech' ? 0.06 :
                               company.industry === 'consulting' ? 0.08 : 0.05;

  // Modifiers: Satisfaction reduces churn, Tech Debt & low Reliability increase churn
  let effectiveChurnRate = baseMonthlyChurnRate * churnDifficulty;
  if (company.overallSatisfaction > 80) {
    effectiveChurnRate *= 0.6; // High retention
  } else if (company.overallSatisfaction < 50) {
    effectiveChurnRate *= 1.6; // Customers fleeing
  }

  if (company.product.techDebt > 60) {
    effectiveChurnRate += 0.04;
    turnNotes.push('Technical Debt warning: Unresolved bugs led to frustrated customer cancellations.');
  }

  if (company.product.reliability < 50) {
    effectiveChurnRate += 0.03;
  }

  effectiveChurnRate = Math.min(0.35, Math.max(0.01, effectiveChurnRate));
  const customersLost = Math.floor(company.totalCustomers * effectiveChurnRate);

  const updatedTotalCustomers = Math.max(0, company.totalCustomers + totalNewCustomers - customersLost);

  // 3. Revenue & COGS
  const monthlyRevenue = updatedTotalCustomers * company.unitPrice;
  // COGS might decrease with Systems Efficiency
  const efficiencyDiscount = 1 - (company.systemsEfficiency / 400); // Up to 25% cost reduction
  const effectiveUnitCost = company.unitCost * Math.max(0.7, efficiencyDiscount);
  const monthlyCOGS = updatedTotalCustomers * effectiveUnitCost;
  const grossProfit = monthlyRevenue - monthlyCOGS;
  const grossMarginPercent = monthlyRevenue > 0 ? (grossProfit / monthlyRevenue) * 100 : 0;

  // 4. Operating Expenses (OPEX)
  let totalSalaries = 0;
  company.team.forEach((emp) => {
    totalSalaries += emp.salary;
  });

  // Base office & rent grows with team size
  const rent = company.team.length > 5 ? 2400 : company.team.length > 2 ? 1100 : 400;
  
  // Software tools scale slightly with customer count
  const softwareAndTools = 250 + Math.floor(updatedTotalCustomers * (company.industry === 'saas' ? 1.5 : 0.4));
  
  // Loan interest
  const loanInterest = company.finances.debt > 0 ? Math.floor(company.finances.debt * (company.finances.monthlyInterestRate / 100)) : 0;
  
  // Culture discipline reduces wasteful misc expenses
  const disciplineSavings = company.culture.discipline > 70 ? 0.75 : 1.0;
  const miscellaneous = Math.floor(300 * disciplineSavings * diffMultiplier);

  const totalOpex = totalSalaries + totalMarketingSpend + rent + softwareAndTools + loanInterest + miscellaneous;
  const operatingProfit = grossProfit - totalOpex;
  const netCashFlow = operatingProfit;
  const newCash = company.finances.cash + netCashFlow;

  const burnRate = netCashFlow < 0 ? Math.abs(netCashFlow) : 0;
  const runwayMonths = burnRate > 0 ? Math.max(0, Number((newCash / burnRate).toFixed(1))) : 999;

  // 5. Valuation calculation
  const annualizedRevenue = monthlyRevenue * 12;
  const annualizedProfit = operatingProfit * 12;
  const multiple = company.industry === 'saas' ? 6 : company.industry === 'consulting' ? 2.5 : 3.8;
  const pmfBonus = 1 + (company.product.productMarketFit / 100);
  const valuation = Math.max(
    25000,
    annualizedProfit > 0 
      ? Math.floor((annualizedProfit * 8 + annualizedRevenue * 2) * pmfBonus)
      : Math.floor(annualizedRevenue * multiple * pmfBonus)
  );

  // 6. Detect Current Bottleneck (Theory of Constraints)
  let bottleneck: Company['currentBottleneck'] = 'none';
  if (runwayMonths < 2 && netCashFlow < 0) {
    bottleneck = 'cash_flow';
    turnNotes.push('Critical Bottleneck: Cash flow runway is critically compressed.');
  } else if (company.product.techDebt > 65) {
    bottleneck = 'tech_debt';
    turnNotes.push('Bottleneck: Technical debt is crippling feature delivery and reliability.');
  } else if (updatedTotalCustomers > 40 && company.team.filter(e => e.role === 'Operations').length === 0) {
    bottleneck = 'customer_support';
    turnNotes.push('Bottleneck: Customer onboarding & support tickets are overloading the founder.');
  } else if (company.totalCustomers > 0 && totalNewCustomers < 2 && totalMarketingSpend > 1000) {
    bottleneck = 'sales_capacity';
  }

  // 7. Team Morale & Employee Health
  const updatedTeam = company.team.map((emp) => {
    let moraleDelta = 0;
    // Good-to-great: culture fit mismatch decays morale
    if (emp.cultureFit < 50) {
      moraleDelta -= 4;
    }
    // High stress or cash crisis dampens morale
    if (runwayMonths < 2) {
      moraleDelta -= 5;
    }
    // High company satisfaction lifts morale
    if (company.overallSatisfaction > 75) {
      moraleDelta += 3;
    }
    const newMorale = Math.max(10, Math.min(100, emp.morale + moraleDelta));
    return { ...emp, morale: newMorale };
  });

  // 8. Player Energy & Stress Recovery
  const updatedEnergy = Math.min(player.maxEnergy, Math.max(15, player.energy + 35));
  let updatedStress = player.stress;
  if (runwayMonths < 2) updatedStress = Math.min(100, updatedStress + 15);
  else if (operatingProfit > 0) updatedStress = Math.max(0, updatedStress - 10);

  // Check failure conditions
  const isBankrupt = newCash < -1000 && company.finances.debt > 25000;
  const isBurnout = updatedStress >= 100 && updatedEnergy <= 15;

  // Compile new company object
  const newCompany: Company = {
    ...company,
    totalCustomers: updatedTotalCustomers,
    finances: {
      ...company.finances,
      cash: newCash,
      monthlyRevenue,
      monthlyCOGS,
      grossProfit,
      grossMarginPercent,
      operatingExpenses: {
        salaries: totalSalaries,
        marketing: totalMarketingSpend,
        rentOffice: rent,
        softwareAndTools,
        loanInterest,
        miscellaneous
      },
      totalOperatingExpenses: totalOpex,
      operatingProfit,
      netCashFlow,
      burnRate,
      runwayMonths,
      valuation,
      totalRevenueLifetime: company.finances.totalRevenueLifetime + Math.max(0, monthlyRevenue),
      historicalProfit: [...company.finances.historicalProfit.slice(-11), operatingProfit],
      historicalRevenue: [...company.finances.historicalRevenue.slice(-11), monthlyRevenue],
      historicalCash: [...company.finances.historicalCash.slice(-11), newCash]
    },
    team: updatedTeam,
    currentBottleneck: bottleneck,
    systemsEfficiency: Math.min(100, company.systemsEfficiency + (company.culture.discipline > 60 ? 1 : 0))
  };

  const newPlayer: PlayerStats = {
    ...player,
    energy: updatedEnergy,
    stress: updatedStress
  };

  return {
    newCompany,
    newPlayer,
    turnNotes,
    newCustomersAcquired: totalNewCustomers,
    customersLostToChurn: customersLost,
    cashFlowSummary: {
      revenue: monthlyRevenue,
      cogs: monthlyCOGS,
      grossProfit,
      opex: totalOpex,
      netCashFlow
    },
    bottleneckDetected: bottleneck,
    isBankrupt,
    isBurnout
  };
}

export function createInitialCompany(
  name: string,
  industryType: Company['industry'],
  unitPrice: number,
  unitCost: number,
  baseOpEx: number,
  initialCash: number
): Company {
  const initialSegments: CustomerSegment[] = [
    {
      id: 'early_adopter',
      name: 'Early Tech Evangelists',
      count: 0,
      satisfaction: 70,
      churnRate: 0.04,
      priceSensitivity: 'low',
      featureNeeds: 'Cutting-edge agility & direct founder support'
    },
    {
      id: 'mainstream',
      name: 'Mainstream Operators',
      count: 0,
      satisfaction: 65,
      churnRate: 0.05,
      priceSensitivity: 'medium',
      featureNeeds: 'Rock-solid reliability & clear standard workflows'
    },
    {
      id: 'premium',
      name: 'High-End Enterprise',
      count: 0,
      satisfaction: 60,
      churnRate: 0.02,
      priceSensitivity: 'low',
      featureNeeds: 'Security audits, dedicated SLA, custom compliance'
    },
    {
      id: 'budget',
      name: 'Price-Conscious Buyers',
      count: 0,
      satisfaction: 55,
      churnRate: 0.12,
      priceSensitivity: 'high',
      featureNeeds: 'Lowest possible cost & self-serve simplicity'
    }
  ];

  return {
    name,
    industry: industryType,
    foundedMonth: 1,
    stage: 'garage',
    unitPrice,
    unitCost,
    totalCustomers: 0,
    segments: initialSegments,
    overallSatisfaction: 70,
    brandReputation: 35,
    marketSharePercent: 0.5,
    finances: {
      cash: initialCash,
      monthlyRevenue: 0,
      monthlyCOGS: 0,
      grossProfit: 0,
      grossMarginPercent: ((unitPrice - unitCost) / unitPrice) * 100,
      operatingExpenses: {
        salaries: 0,
        marketing: 0,
        rentOffice: 250,
        softwareAndTools: 150,
        loanInterest: 0,
        miscellaneous: 100
      },
      totalOperatingExpenses: 500,
      operatingProfit: -500,
      netCashFlow: -500,
      burnRate: 500,
      runwayMonths: Number((initialCash / 500).toFixed(1)),
      debt: 0,
      monthlyInterestRate: 0.8, // ~9.6% APR
      valuation: 35000,
      totalRevenueLifetime: 0,
      historicalProfit: [0],
      historicalRevenue: [0],
      historicalCash: [initialCash]
    },
    product: {
      quality: 60,
      reliability: 75,
      userExperience: 65,
      featureBreadth: 40,
      techDebt: 15,
      productMarketFit: 35,
      monthlyRndBudget: 200,
      focusArea: 'quality'
    },
    team: [],
    marketingChannels: [
      {
        id: 'organic_content',
        name: 'Organic Content & SEO',
        allocatedBudget: 0,
        efficiencyScore: 1.2,
        description: 'Case studies, educational breakdowns, and technical articles.',
        type: 'organic'
      },
      {
        id: 'paid_digital_ads',
        name: 'Paid Performance Ads',
        allocatedBudget: 0,
        efficiencyScore: 0.95,
        description: 'Search & social targeted ad campaigns.',
        type: 'paid'
      },
      {
        id: 'outbound_sales',
        name: 'B2B Outbound Direct',
        allocatedBudget: 0,
        efficiencyScore: 1.4,
        description: 'Direct email prospecting and phone outreach to operators.',
        type: 'outbound'
      },
      {
        id: 'strategic_partnerships',
        name: 'Ecosystem Partnerships',
        allocatedBudget: 0,
        efficiencyScore: 1.3,
        description: 'Co-marketing with non-competing service providers.',
        type: 'viral'
      }
    ],
    culture: {
      discipline: 50,
      innovation: 60,
      customerObsession: 65,
      autonomy: 55,
      efficiency: 50,
      growthOrientation: 50
    },
    systemsEfficiency: 50,
    currentBottleneck: 'none'
  };
}
