import { DynamicEvent } from '../types/game';

export const DYNAMIC_EVENTS: DynamicEvent[] = [
  {
    id: 'evt_low_runway_alert',
    title: 'Financial Warning: Cash Runway Critical',
    category: 'crisis',
    narrative: 'Your bank account balance has dipped below 1.5 months of operating expenses. Creditors and software providers will not wait if next month\'s payroll fails. You must make an emergency liquidity decision.',
    conditionDescription: 'Runway is below 1.5 months.',
    choices: [
      {
        id: 'evt_runway_cut_costs',
        text: 'Slash non-essential software, renegotiate subscriptions, and freeze all paid marketing.',
        philosophyTag: 'Ruthless Burn Control',
        energyCost: 15,
        immediateEffects: {
          description: 'You cut monthly operating burn by 35%. The immediate danger recedes and runway expands by 2 months.',
          stressDelta: 10,
          cultureDeltas: { discipline: 15, efficiency: 20 }
        },
        educationalConcept: {
          title: 'Zero-Based Expense Auditing',
          summary: 'When cash gets tight, immediately classify every dollar into "Directly keeps lights on" vs "Discretionary". Slashing the latter preserves runway without killing the core engine.',
          principle: 'Protecting liquidity is founder duty number one.',
          sourceInspiration: 'The Personal MBA — Cash Flow'
        }
      },
      {
        id: 'evt_runway_emergency_loan',
        text: 'Take out an emergency short-term line of credit ($6,000) at 12% interest.',
        philosophyTag: 'Emergency Leverage',
        energyCost: 10,
        immediateEffects: {
          description: '$6,000 lands in the company bank account, stabilizing immediate operations at the cost of higher future monthly interest.',
          companyCashDelta: 6000,
          stressDelta: -10
        },
        educationalConcept: {
          title: 'The Price of Emergency Capital',
          summary: 'Borrowing when you are desperate carries higher interest rates and personal guarantees. Always borrow before you are desperate.',
          principle: 'Repair the roof while the sun is shining.',
          sourceInspiration: 'Good to Great — Confront the Brutal Facts'
        }
      }
    ]
  },
  {
    id: 'evt_viral_customer_tweet',
    title: 'Organic Advocacy: Viral Recommendation',
    category: 'opportunity',
    narrative: 'A well-known industry influencer posted an unprompted, glowing breakdown of how your product solved their team\'s nightmare. Web traffic is spiking 400% today!',
    conditionDescription: 'High customer satisfaction (> 70).',
    choices: [
      {
        id: 'evt_viral_convert_leads',
        text: 'Rally the team to personally welcome every new visitor with tailored live demos.',
        philosophyTag: 'Strike While the Iron is Hot',
        energyCost: 25,
        immediateEffects: {
          description: 'You convert 24 new high-intent paying customers in 72 hours! Word-of-mouth compounding accelerates.',
          companyCashDelta: 2800,
          reputationDelta: 15,
          satisfactionDelta: 10,
          cultureDeltas: { customerObsession: 20 }
        },
        educationalConcept: {
          title: 'Capitalizing on Organic Moments',
          summary: 'Viral traffic is transient; without proactive high-touch capture, 99% of visitors bounce and forget your name in 48 hours.',
          principle: 'Convert fleeting attention into concrete relationships.',
          sourceInspiration: 'The Personal MBA — Marketing & Sales'
        }
      },
      {
        id: 'evt_viral_passive',
        text: 'Let standard self-serve signups handle the traffic without disturbing team schedules.',
        philosophyTag: 'Process Stability',
        energyCost: 5,
        immediateEffects: {
          description: 'Self-serve converts 8 users steadily without exhausting the team.',
          companyCashDelta: 950,
          stressDelta: -5
        },
        educationalConcept: {
          title: 'Operational Baseline Stability',
          summary: 'Sometimes protecting your team from frantic context switching is worth more than squeezing every last drop from a temporary traffic spike.',
          principle: 'Disciplined operations prevent burnout.',
          sourceInspiration: 'Good to Great — Culture of Discipline'
        }
      }
    ]
  },
  {
    id: 'evt_talent_poaching_attempt',
    title: 'Competitive Raid: Deniz Eyes Your Team',
    category: 'team',
    narrative: 'Deniz from Vanguard Dynamics has reached out to your key team members offering a 35% salary raise to jump ship to Vanguard.',
    conditionDescription: 'Reputation > 50 and Deniz is an active rival.',
    choices: [
      {
        id: 'evt_poach_match_and_mission',
        text: 'Hold a candid one-on-one, adjust compensation fairly, and remind them of the shared vision and autonomy.',
        philosophyTag: 'Authentic Leadership & First Who',
        energyCost: 20,
        immediateEffects: {
          description: 'Your team stays loyal! They tell Deniz to take a hike. They respect your transparency and honesty more than ever.',
          reputationDelta: 10,
          relationshipDeltas: { deniz: -10 },
          cultureDeltas: { discipline: 20, autonomy: 15 }
        },
        educationalConcept: {
          title: 'Why Great People Stay',
          summary: 'Collins showed that the right people don\'t work primarily for marginal cash perks; they crave purpose, autonomy, and being part of a winning, ethical team.',
          principle: 'A mercenary works for coin; a missionary works for legacy.',
          sourceInspiration: 'Good to Great — First Who, Then What'
        }
      },
      {
        id: 'evt_poach_threaten_lawsuit',
        text: 'Send Vanguard a stern non-solicitation warning letter.',
        philosophyTag: 'Legal Posturing',
        energyCost: 15,
        cashCost: 400,
        immediateEffects: {
          description: 'Deniz backs off temporarily, but the legal fee costs you $400 and creates tension in the room.',
          companyCashDelta: -400,
          stressDelta: 10
        },
        educationalConcept: {
          title: 'The Inefficacy of Coercive Retention',
          summary: 'You cannot retain top talent through legal threats or non-competes alone. If the work environment is poor, they will leave eventually.',
          principle: 'Build a company people never want to leave.',
          sourceInspiration: 'The Personal MBA — Working with Others'
        }
      }
    ]
  },
  {
    id: 'evt_unexpected_tax_audit',
    title: 'Compliance: Municipal Business Audit',
    category: 'crisis',
    narrative: 'The regional tax office requests a formal compliance review of your company accounting and invoice filings.',
    conditionDescription: 'Turn >= 5 and revenue > $3,000/mo.',
    choices: [
      {
        id: 'evt_audit_professional_accountant',
        text: 'Hire a licensed forensic accountant ($800) to audit books and produce an airtight filing.',
        philosophyTag: 'Disciplined Compliance',
        energyCost: 10,
        cashCost: 800,
        immediateEffects: {
          description: 'The audit passes with flying colors! The accountant also discovers $1,200 in eligible business tax credits you had missed.',
          companyCashDelta: 400,
          knowledgeDelta: 12,
          reputationDelta: 10,
          cultureDeltas: { discipline: 15 }
        },
        educationalConcept: {
          title: 'The Value of Specialized Expertise',
          summary: 'Skilled professionals pay for themselves by avoiding catastrophic fines and uncovering structural advantages.',
          principle: 'Never cut corners on institutional integrity.',
          sourceInspiration: 'The Personal MBA — Finance'
        }
      },
      {
        id: 'evt_audit_do_it_yourself',
        text: 'Spend 4 late nights doing the paperwork yourself to save the fee.',
        philosophyTag: 'Founder Heroics',
        energyCost: 35,
        immediateEffects: {
          description: 'You pass, but a minor deduction mistake results in a $300 penalty. You are physically exhausted and fell behind on product work.',
          companyCashDelta: -300,
          stressDelta: 20
        },
        educationalConcept: {
          title: 'The Opportunity Cost of Founder Time',
          summary: 'If your founder time is worth $150/hour, spending 30 hours doing clerical accounting work is an expensive way to "save money".',
          principle: 'Delegate low-leverage tasks to protect high-leverage focus.',
          sourceInspiration: 'The Personal MBA — Productivity'
        }
      }
    ]
  }
];
