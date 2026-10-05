import { StoryScene } from '../types/game';

export const STORY_CHAPTERS: StoryScene[] = [
  {
    id: 'ch1_the_idea',
    chapterIndex: 1,
    title: 'Chapter 1: The Spark & The Cold Reality',
    speaker: 'Internal Monologue',
    speakerRole: 'Day Zero',
    contextStatus: 'You have quit your old stability or gathered your remaining courage to step into the arena.',
    narrative: [
      'The quiet hum of your desk lamp is the only sound in the room. In front of you sits a notebook scribbled with problem statements, crude diagrams, and market observations.',
      'For months you watched friends and colleagues grumble about the exact same operational mess. Everyone complained, but nobody built a fix.',
      'Now you have taken the plunge. But an idea inside your head is not a company. Without action, execution, and economic validation, it is simply an expensive daydream.',
      'How do you take the very first step to transform this hypothesis into reality?'
    ],
    choices: [
      {
        id: 'ch1_talk_to_customers',
        text: 'Conduct 20 unbiased discovery interviews without pitching the solution.',
        philosophyTag: 'Customer Discovery (The Mom Test)',
        energyCost: 20,
        immediateEffects: {
          description: 'You spent 2 weeks asking open-ended questions about their current workflows and actual budget expenditures. You discover the real pain point is completely different from your initial assumption!',
          knowledgeDelta: 18,
          pmfDelta: 15,
          stressDelta: -5,
          cultureDeltas: { customerObsession: 20, discipline: 10 }
        },
        educationalConcept: {
          title: 'The Fallacy of the Vanity Pitch',
          summary: 'If you ask people "Would you buy this?", polite friends say "Yes!" to be encouraging. True customer discovery asks how they currently solve the problem and how much money or time they spent on it last month.',
          principle: 'Unearth past behavior and actual spending, not hypothetical promises.',
          sourceInspiration: 'The Personal MBA — Value Creation'
        },
        advanceChapter: true
      },
      {
        id: 'ch1_seek_cofounder',
        text: 'Visit the Tech Incubator and propose a partnership with Maya Chen.',
        philosophyTag: 'Mastermind Alliance & "First Who"',
        energyCost: 15,
        immediateEffects: {
          description: 'Maya listens with sharp, skeptical eyes. She pulls apart three of your assumptions, but is impressed by your clarity of intent. She agrees to collaborate on a lightweight proof of concept.',
          knowledgeDelta: 12,
          reputationDelta: 10,
          relationshipDeltas: { maya: 25 },
          cultureDeltas: { discipline: 15, innovation: 10 }
        },
        educationalConcept: {
          title: 'First Who, Then What & Masterminds',
          summary: 'Surrounding yourself with partners who complement your blind spots multiplies capability. Starting with the right person ensures you can pivot gracefully when early product assumptions fail.',
          principle: 'A great co-pilot with high integrity is worth tenfold a solo genius with blind spots.',
          sourceInspiration: 'Good to Great & Think and Grow Rich'
        },
        advanceChapter: true
      },
      {
        id: 'ch1_build_in_isolation',
        text: 'Lock yourself in a room for a month and build a full prototype immediately.',
        philosophyTag: 'Speed over Research',
        energyCost: 35,
        cashCost: 400,
        immediateEffects: {
          description: 'You built a working version rapidly. It looks sleek, but when shown to three prospective users, two say: "This is neat, but it doesn\'t solve our urgent workflow problem."',
          knowledgeDelta: 10,
          companyCashDelta: -400,
          stressDelta: 15,
          cultureDeltas: { innovation: 15, discipline: -5 }
        },
        educationalConcept: {
          title: 'The Build Trap (Premature Execution)',
          summary: 'Writing code or buying inventory before validating customer willingness to pay often results in building elaborate solutions to problems that nobody cares enough to pay for.',
          principle: 'Speed in the wrong direction is merely faster failure.',
          sourceInspiration: 'The Personal MBA — Value Delivery'
        },
        advanceChapter: true
      }
    ]
  },
  {
    id: 'ch2_first_customer',
    chapterIndex: 2,
    title: 'Chapter 2: The First Real Customer',
    speaker: 'Professor Arda Teoman',
    speakerRole: 'Academic Mentor',
    characterId: 'arda',
    contextStatus: 'You have a working alpha model, but zero registered paying users.',
    narrative: [
      'Professor Arda welcomes you into his paper-stacked office at the university. He sets down a warm cup of tea and leans back.',
      '"So, my friend," he says gently. "You have an offering. But until someone gives you their hard-earned money and feels they received greater value in return, you have an academic exercise, not an economic engine."',
      '"Remember the Hedgehog Concept: what can you genuinely deliver with excellence that someone will sustainably pay for? Who is your genuine pilot candidate?"',
      'You have three distinct leads on your desk today.'
    ],
    choices: [
      {
        id: 'ch2_pilot_demanding_client',
        text: 'Offer a heavily focused pilot to an operations manager who is desperate for a fix.',
        philosophyTag: 'Deep Niche Focus',
        energyCost: 25,
        immediateEffects: {
          description: 'The client tests your solution daily, providing brutal, unvarnished feedback. You spend late evenings tweaking the core flow. By week three, they say: "We cannot run our team without this now."',
          satisfactionDelta: 20,
          pmfDelta: 25,
          companyCashDelta: 750,
          knowledgeDelta: 15,
          relationshipDeltas: { arda: 15 },
          cultureDeltas: { customerObsession: 25, discipline: 15 }
        },
        educationalConcept: {
          title: 'The Hedgehog Core: Being Best at One Crucial Thing',
          summary: 'Delighting one customer until they consider your solution indispensable teaches you 10x more than signing 10 indifferent lukewarm trial users.',
          principle: 'It is better to make 10 users love you passionately than 1,000 users mildly interested.',
          sourceInspiration: 'Good to Great — The Hedgehog Concept'
        },
        advanceChapter: true
      },
      {
        id: 'ch2_free_for_all_launch',
        text: 'Launch a wide free tier online to get maximum user signups quickly.',
        philosophyTag: 'Vanity Metrics over Unit Economics',
        energyCost: 15,
        cashCost: 350,
        immediateEffects: {
          description: 'You get 120 signups! But after three days, 85% never log in again. You spend entire days fielding support tickets for free users who complain about edge cases.',
          reputationDelta: 5,
          companyCashDelta: -350,
          stressDelta: 15,
          cultureDeltas: { growthOrientation: 15, discipline: -10 }
        },
        educationalConcept: {
          title: 'The Trap of Vanity Users',
          summary: 'Free users test your server and drain your emotional bandwidth, but rarely convert to paying customers unless the value proposition is rock-solid.',
          principle: 'Never mistake user activity for commercial demand.',
          sourceInspiration: 'The Personal MBA — Sales & Marketing'
        },
        advanceChapter: true
      },
      {
        id: 'ch2_custom_enterprise_deal',
        text: 'Accept a local corporate firm that offers $2,500 if you build 5 custom features for them.',
        philosophyTag: 'Custom Agency vs Scalable Product',
        energyCost: 30,
        immediateEffects: {
          description: 'The cash is intoxicating ($2,500 injected), but you suddenly find yourself acting as their outsourced contractor. Maya warns you that none of these custom features apply to anyone else in the market.',
          companyCashDelta: 2500,
          knowledgeDelta: 8,
          pmfDelta: -5,
          stressDelta: 20,
          relationshipDeltas: { maya: -15 },
          cultureDeltas: { efficiency: -15, discipline: -10 }
        },
        educationalConcept: {
          title: 'The Service Trap & Opportunity Cost',
          summary: 'Custom consulting money is comfortable early on, but every hour spent writing single-tenant features is an hour stolen from building a repeatable, scalable asset.',
          principle: 'Revenue that pulls you off your core Hedgehog engine is an expensive distraction.',
          sourceInspiration: 'Good to Great — Disciplined Focus'
        },
        advanceChapter: true
      }
    ]
  },
  {
    id: 'ch3_the_first_sale',
    chapterIndex: 3,
    title: 'Chapter 3: The Psychology of Price & Value',
    speaker: 'Emre Demir',
    speakerRole: 'Growth Strategist',
    characterId: 'emre',
    contextStatus: 'Early users are engaged. Now comes the moment of commercial truth: setting your price.',
    narrative: [
      'Emre joins you at a cafe across from the financial center. He taps his pen on a napkin filled with pricing models.',
      '"Listen," Emre grins. "Most first-time founders are terrified of charging real money. They price at cost-plus-10% like a flea market stall because they lack confidence."',
      '"Price is not just a math formula; it is a psychological signal of value. If you save a company $20,000 in lost productivity and ask for $10 a month, they assume your product is a fragile toy."',
      'How will you structure your pricing and commercial sales approach?'
    ],
    choices: [
      {
        id: 'ch3_value_based_pricing',
        text: 'Anchor price to the economic value delivered (charge premium with a satisfaction guarantee).',
        philosophyTag: 'Value-Based Pricing',
        energyCost: 20,
        immediateEffects: {
          description: 'You set pricing at a healthy premium. Two hesitant buyers drop out, but three serious companies sign up immediately because your pricing commands institutional credibility.',
          companyCashDelta: 1600,
          knowledgeDelta: 15,
          reputationDelta: 12,
          relationshipDeltas: { emre: 20 },
          cultureDeltas: { discipline: 15, efficiency: 10 }
        },
        educationalConcept: {
          title: 'Value-Based Pricing vs Cost-Plus',
          summary: 'Customers do not buy your labor or server costs; they buy the difference between their current painful reality and a prosperous desired state. Price in proportion to the value created.',
          principle: 'Price reflects perceived value and confidence, not merely your costs.',
          sourceInspiration: 'The Personal MBA — Pricing & Negotiation'
        },
        advanceChapter: true
      },
      {
        id: 'ch3_undercut_market',
        text: 'Set the lowest price in the market to win market share by volume.',
        philosophyTag: 'Price War / Commodity Trap',
        energyCost: 15,
        immediateEffects: {
          description: 'You acquire 15 fast customers, but your gross margins are paper-thin. When support demands surge, you barely have enough cash left over to pay for your basic software subscriptions.',
          companyCashDelta: 450,
          stressDelta: 15,
          satisfactionDelta: -5,
          cultureDeltas: { efficiency: -10, growthOrientation: 10 }
        },
        educationalConcept: {
          title: 'The Commodity Trap',
          summary: 'Competing solely on price is a race to the bottom that only the lowest-cost producer in the world can survive. It attracts high-churn, price-sensitive customers with zero brand loyalty.',
          principle: 'Never fight a price war without a structural cost advantage.',
          sourceInspiration: 'Good to Great & Personal MBA'
        },
        advanceChapter: true
      }
    ]
  },
  {
    id: 'ch4_the_team',
    chapterIndex: 4,
    title: 'Chapter 4: First Who, Then What',
    speaker: 'Maya Chen',
    speakerRole: 'Engineering Partner',
    characterId: 'maya',
    contextStatus: 'Orders and customer requests are piling up. You cannot do everything alone anymore.',
    narrative: [
      'It is 11:30 PM. You are answering customer tickets while checking bug logs and updating financial statements. Your eyes are bloodshot and your energy is depleted.',
      'Maya drops a stack of resumes on your desk. "You are becoming the bottleneck of your own company," she says frankly.',
      '"Jim Collins taught that great companies do not start with a grand strategy and then find people to execute it. They get the right people on the bus, the wrong people off the bus, and the right people into the right seats."',
      'Who do you bring into the core team first?'
    ],
    choices: [
      {
        id: 'ch4_hire_selin_ops',
        text: 'Hire Selin Kaya to systemize operations, quality assurance, and customer onboarding.',
        philosophyTag: 'Operational Infrastructure & Systems',
        energyCost: 20,
        cashCost: 1200,
        immediateEffects: {
          description: 'Selin enters and immediately creates standard operating procedures (SOPs). Within two weeks, customer response times drop from 18 hours to 20 minutes, and onboarding friction vanishes.',
          companyCashDelta: -1200,
          stressDelta: -20,
          satisfactionDelta: 20,
          relationshipDeltas: { selin: 30, maya: 15 },
          cultureDeltas: { discipline: 25, efficiency: 25 }
        },
        educationalConcept: {
          title: 'Systems Over Heroics',
          summary: 'A business reliant on the founder\'s heroic 80-hour weeks is not a sustainable enterprise; it is a precarious high-wire act. Standard operating systems turn chaos into repeatable excellence.',
          principle: 'Work ON your business, not merely IN your business.',
          sourceInspiration: 'Good to Great — Culture of Discipline'
        },
        advanceChapter: true
      },
      {
        id: 'ch4_bring_emre_sales',
        text: 'Bring Emre Demir on board full-time to lead outbound growth and business development.',
        philosophyTag: 'Revenue Acceleration',
        energyCost: 20,
        cashCost: 1400,
        immediateEffects: {
          description: 'Emre is a force of nature. He secures 8 new client demos in his first week. Revenue jumps, though Maya warns that the development pipeline is creaking under the weight of feature promises.',
          companyCashDelta: 1800,
          knowledgeDelta: 10,
          relationshipDeltas: { emre: 30, maya: -10 },
          cultureDeltas: { growthOrientation: 25, discipline: 5 }
        },
        educationalConcept: {
          title: 'The Sales Flywheel vs Delivery Capacity',
          summary: 'Sales engine acceleration must be synchronized with delivery capacity. If sales velocity outstrips your ability to deliver quality, customer churn will quietly undo all revenue gains.',
          principle: 'Balancing the front-end promise with the back-end reality is the core art of management.',
          sourceInspiration: 'The Personal MBA — Value Delivery'
        },
        advanceChapter: true
      },
      {
        id: 'ch4_hire_rockstar_mercenary',
        text: 'Hire a high-pedigree "rockstar" from a tech giant with big demands and high ego.',
        philosophyTag: 'Prestige Hiring Mistake',
        energyCost: 25,
        cashCost: 2500,
        immediateEffects: {
          description: 'The hire has impressive credentials on paper, but constantly questions your foundational direction, belittles simple tasks, and demands expensive corporate perks. Team morale dips.',
          companyCashDelta: -2500,
          stressDelta: 15,
          cultureDeltas: { discipline: -15, autonomy: -10 }
        },
        educationalConcept: {
          title: 'Culture Fit Over Résumé Glamour',
          summary: 'Collins proved that the wrong person on the bus—regardless of how brilliant their technical skill—creates toxic drag and consumes disproportionate managerial energy.',
          principle: 'When in doubt about character and culture alignment, do not hire.',
          sourceInspiration: 'Good to Great — First Who, Then What'
        },
        advanceChapter: true
      }
    ]
  },
  {
    id: 'ch5_the_first_crisis',
    chapterIndex: 5,
    title: 'Chapter 5: The Crucible (Confronting Brutal Reality)',
    speaker: 'Selin Kaya',
    speakerRole: 'Operations Lead',
    characterId: 'selin',
    contextStatus: 'A major operational breakdown hits the company on a Tuesday morning.',
    narrative: [
      'Your phone buzzes relentlessly at 6:42 AM. A critical infrastructure failure / supplier default has taken down service for your top 10 clients.',
      'Angry emails are flooding in. One of your most lucrative accounts threatens to terminate their contract and post a scathing public review.',
      'Selin looks at you across the emergency huddle: "The Stockdale Paradox: we cannot sugarcoat this. It is bad. How do you want to handle the truth?"'
    ],
    choices: [
      {
        id: 'ch5_radical_transparency',
        text: 'Publish an unflinchingly honest post-mortem, refund the month\'s fee, and call the furious client personally.',
        philosophyTag: 'Radical Truth & Extreme Ownership',
        energyCost: 30,
        cashCost: 900,
        immediateEffects: {
          description: 'The furious client is stunned by your direct phone call and accountability. Instead of churning, they say: "Most vendors lie to us. The fact that you owned this makes us trust you more." Your reputation grows.',
          companyCashDelta: -900,
          reputationDelta: 20,
          satisfactionDelta: 15,
          relationshipDeltas: { selin: 25, arda: 20 },
          cultureDeltas: { discipline: 20, customerObsession: 25 }
        },
        educationalConcept: {
          title: 'The Stockdale Paradox: Integrity Under Pressure',
          summary: 'Confronting brutal facts publicly without making excuses builds enduring trust. A crisis handled with complete accountability often turns skeptical customers into loyal evangelists.',
          principle: 'Reputation is forged not when things go smoothly, but in how you handle catastrophic mistakes.',
          sourceInspiration: 'Good to Great — Confront the Brutal Facts'
        },
        advanceChapter: true
      },
      {
        id: 'ch5_blame_third_party',
        text: 'Issue a vague statement blaming an upstream cloud provider / supplier and offer a 10% coupon.',
        philosophyTag: 'Deflection & Blame Shifting',
        energyCost: 10,
        immediateEffects: {
          description: 'Two clients discover your technical team overlooked a basic configuration warning. The angry client churns immediately, taking 25% of your monthly revenue with them.',
          reputationDelta: -15,
          satisfactionDelta: -20,
          stressDelta: 20,
          relationshipDeltas: { selin: -20, maya: -15 },
          cultureDeltas: { discipline: -20, customerObsession: -15 }
        },
        educationalConcept: {
          title: 'The High Cost of Defensiveness',
          summary: 'Blaming third parties erodes managerial authority and signals to your team that making excuses is acceptable. Customers see right through bureaucratic deflections.',
          principle: 'Leadership begins when excuses stop.',
          sourceInspiration: 'The Personal MBA — Working with Others'
        },
        advanceChapter: true
      }
    ]
  },
  {
    id: 'ch6_cash_flow',
    chapterIndex: 6,
    title: 'Chapter 6: The Mirage of Paper Profit',
    speaker: 'Kerem Alkan',
    speakerRole: 'Venture Investor',
    characterId: 'kerem',
    contextStatus: 'Accounting shows $8,000 in monthly invoiced bookings, but the bank account is nearly empty.',
    narrative: [
      'Kerem Alkan invites you to an upscale rooftop lounge overlooking the city harbor. He looks at your quarterly financial snapshot.',
      '"You think you are profitable because your spreadsheet counts signed contracts as revenue," Kerem chuckles, taking a sip of sparkling water.',
      '"But your clients pay on Net-60 terms, while your server bills, office lease, and payroll must be paid every single 30 days. You have a massive working capital gap."',
      '"More businesses die from indigestion than starvation. Cash is oxygen. How will you fix your cash flow bridge?"'
    ],
    choices: [
      {
        id: 'ch6_annual_discount_upfront',
        text: 'Incentivize customers with a 20% discount if they pay annually upfront.',
        philosophyTag: 'Customer-Funded Growth',
        energyCost: 20,
        immediateEffects: {
          description: 'Four loyal customers jump on the annual deal! You immediately collect $7,200 in upfront cash. Your runway expands from 1.5 months to 6 months without taking on debt or diluting equity.',
          companyCashDelta: 7200,
          knowledgeDelta: 15,
          stressDelta: -25,
          relationshipDeltas: { kerem: 15, selin: 20 },
          cultureDeltas: { efficiency: 20, discipline: 15 }
        },
        educationalConcept: {
          title: 'Customer-Funded Working Capital',
          summary: 'The cheapest, cleanest capital is customer cash paid upfront. Offering a discount for annual upfront payment transforms negative working capital into positive cash runway.',
          principle: 'A dollar collected in advance is worth two dollars chased 60 days late.',
          sourceInspiration: 'The Personal MBA — Cash Flow Management'
        },
        advanceChapter: true
      },
      {
        id: 'ch6_take_bank_loan',
        text: 'Secure a $15,000 commercial bank loan at 9% interest to cushion operations.',
        philosophyTag: 'Leverage & Debt Financing',
        energyCost: 15,
        immediateEffects: {
          description: 'Cash lands in the company bank account, giving immediate breathing room. However, you now have a mandatory monthly principal and interest debt payment that increases your fixed burn.',
          companyCashDelta: 15000,
          knowledgeDelta: 10,
          stressDelta: -10,
          relationshipDeltas: { kerem: 5 },
          cultureDeltas: { discipline: 5 }
        },
        educationalConcept: {
          title: 'Debt as Leverage vs. Fixed Obligation',
          summary: 'Debt provides non-dilutive liquidity, but unlike equity, bank debt does not care whether your sales were good this month. Fixed debt service increases your minimum breakeven threshold.',
          principle: 'Debt is rocket fuel when the engine works; it is a weight around your neck if revenue stalls.',
          sourceInspiration: 'The Personal MBA — Financial Ratios & Leverage'
        },
        advanceChapter: true
      },
      {
        id: 'ch6_sell_equity_to_kerem',
        text: 'Accept Kerem\'s term sheet: $40,000 investment for 20% equity and aggressive growth targets.',
        philosophyTag: 'Venture Capital Acceleration',
        energyCost: 25,
        immediateEffects: {
          description: 'A massive cash injection of $40,000 arrives! But Kerem makes it clear: you are expected to 3x your growth rate this year, hire rapidly, and push for market dominance.',
          companyCashDelta: 40000,
          reputationDelta: 15,
          knowledgeDelta: 12,
          relationshipDeltas: { kerem: 35, maya: -10 },
          cultureDeltas: { growthOrientation: 30, discipline: -10 }
        },
        educationalConcept: {
          title: 'The Venture Capital Bargain',
          summary: 'Institutional capital buys velocity, but converts your business into a high-stakes rocket ship. You trade autonomy and margin discipline for speed and scale.',
          principle: 'Capital is an accelerant; it magnifies whatever systems you already have—good or broken.',
          sourceInspiration: 'Good to Great — Technology Accelerators'
        },
        advanceChapter: true
      }
    ]
  },
  {
    id: 'ch7_growth',
    chapterIndex: 7,
    title: 'Chapter 7: The Flywheel of Momentum',
    speaker: 'Internal Monologue & Team',
    speakerRole: 'Scaling Crossroads',
    contextStatus: 'The company has proven unit economics. Now you must decide your primary growth engine.',
    narrative: [
      'The morning dashboard displays consistent customer retention. The basic unit economics are working: Customer Lifetime Value (LTV) is roughly 4x Customer Acquisition Cost (CAC).',
      'The company is at a classic strategic inflection point. How will you direct the next phase of growth?',
      'Emre wants to double ad spend and hire two junior SDRs. Maya argues you should invest in self-serve product loops and viral customer referrals. Selin advises deepening operational automation.'
    ],
    choices: [
      {
        id: 'ch7_product_led_flywheel',
        text: 'Reinvest heavily into product excellence, self-serve onboarding, and referral compounding.',
        philosophyTag: 'The Compounding Flywheel',
        energyCost: 25,
        cashCost: 2000,
        immediateEffects: {
          description: 'Your existing customers become your sales force. Word-of-mouth referrals account for 45% of all new leads. Your blended CAC drops by 30%, creating sustainable compounding momentum.',
          companyCashDelta: -2000,
          pmfDelta: 20,
          satisfactionDelta: 20,
          relationshipDeltas: { maya: 25, selin: 15 },
          cultureDeltas: { customerObsession: 25, efficiency: 20, discipline: 15 }
        },
        educationalConcept: {
          title: 'The Flywheel of Organic Compounding',
          summary: 'When product quality is so high that customers rave to colleagues, marketing transitions from an ongoing expense into a self-perpetuating flywheel.',
          principle: 'The best marketing strategy is an extraordinary product that generates spontaneous customer advocacy.',
          sourceInspiration: 'Good to Great — The Flywheel Effect'
        },
        advanceChapter: true
      },
      {
        id: 'ch7_paid_acquisition_sprint',
        text: 'Pour $5,000 into paid digital advertising channels to pump customer volume rapidly.',
        philosophyTag: 'Paid Engine Scaling',
        energyCost: 20,
        cashCost: 5000,
        immediateEffects: {
          description: 'A flood of 35 new accounts registers this month! Gross revenue surges, but customer support tickets triple and churn creeps up as less qualified leads churn after 30 days.',
          companyCashDelta: 4200,
          stressDelta: 15,
          cultureDeltas: { growthOrientation: 25, efficiency: -10 }
        },
        educationalConcept: {
          title: 'The Paid Acquisition Treadmill',
          summary: 'Paid ads provide immediate dopamine and fast volume, but the moment you pause ad spend, customer flow stops. Without strong retention, paid acquisition is pouring water into a leaky bucket.',
          principle: 'Never accelerate customer acquisition until your customer retention bucket has no leaks.',
          sourceInspiration: 'The Personal MBA — Marketing & Sales'
        },
        advanceChapter: true
      }
    ]
  },
  {
    id: 'ch8_the_organization',
    chapterIndex: 8,
    title: 'Chapter 8: Culture of Discipline',
    speaker: 'Professor Arda Teoman',
    speakerRole: 'Academic Mentor',
    characterId: 'arda',
    contextStatus: 'Your team is growing. Communication gaps, informal habits, and minor misunderstandings are appearing.',
    narrative: [
      'Professor Arda observes your weekly team standup from the corner of the room. Afterwards, he walks with you to the university quad.',
      '"You now have an organization, not just a workshop," Arda notes thoughtfully.',
      '"Most mediocre companies react to growth by adding thick layers of bureaucracy to police incompetent people. But great companies do the opposite: they build a culture of discipline populated by self-motivated people who require no policing."',
      'How will you structure accountability and leadership within your company?'
    ],
    choices: [
      {
        id: 'ch8_freedom_and_responsibility',
        text: 'Establish clear transparent metrics (KPIs) and give team members full autonomy over execution.',
        philosophyTag: 'Freedom Within a Framework',
        energyCost: 25,
        immediateEffects: {
          description: 'The team flourishes. Employees take initiative to solve customer problems without asking for permission. Morale reaches an all-time high and operational velocity doubles.',
          knowledgeDelta: 20,
          reputationDelta: 15,
          relationshipDeltas: { selin: 25, maya: 20, arda: 25 },
          cultureDeltas: { discipline: 25, autonomy: 30, efficiency: 20 }
        },
        educationalConcept: {
          title: 'A Culture of Discipline: Freedom Within a Framework',
          summary: 'When you hire disciplined people who care about the mission, you do not need tyrannical rules. You need a transparent system with shared goals, clear metrics, and high freedom.',
          principle: 'Avoid bureaucracy by hiring responsible people who self-manage against rigorous standards.',
          sourceInspiration: 'Good to Great — Culture of Discipline'
        },
        advanceChapter: true
      },
      {
        id: 'ch8_strict_top_down_control',
        text: 'Implement rigorous approval hierarchies, daily micromanagement check-ins, and surveillance.',
        philosophyTag: 'Bureaucracy & Command-and-Control',
        energyCost: 35,
        immediateEffects: {
          description: 'Mistakes temporarily drop, but creativity completely stalls. Your best creative employees feel suffocated and two start interviewing elsewhere.',
          stressDelta: 25,
          cultureDeltas: { autonomy: -30, innovation: -20, discipline: 10 }
        },
        educationalConcept: {
          title: 'The Stifling Effect of Command-and-Control',
          summary: 'Micromanagement signals distrust. Top performers refuse to work in environments where every creative decision requires committee sign-off.',
          principle: 'If you treat talented adults like children, you will soon only have children working for you.',
          sourceInspiration: 'Good to Great — Level 5 Leadership'
        },
        advanceChapter: true
      }
    ]
  },
  {
    id: 'ch9_the_competitor',
    chapterIndex: 9,
    title: 'Chapter 9: The Competitor\'s Blitz',
    speaker: 'Deniz Vural',
    speakerRole: 'CEO of Vanguard Dynamics',
    characterId: 'deniz',
    contextStatus: 'Vanguard Dynamics launches an aggressive marketing offensive directly targeting your customer base.',
    narrative: [
      'An industry tech blog publishes a splashy feature: "Vanguard Dynamics Raises $8M Series A to Dominate the Category." Underneath is a statement from CEO Deniz Vural, directly mocking your pricing and promising a 50% discount to any customer switching from your platform.',
      'That afternoon, you run into Deniz at a fintech conference. He smirks, adjusting his designer blazer.',
      '"Nothing personal," Deniz says smoothly. "Capital is a weapon. We are going to burn cash to acquire everyone in this city, and there won\'t be room for boutique players. What are you going to do?"'
    ],
    choices: [
      {
        id: 'ch9_double_down_on_hedgehog',
        text: 'Ignore the hype; double down on your core differentiator, customer intimacy, and reliability.',
        philosophyTag: 'Disciplined Focus over Reactionary Fear',
        energyCost: 20,
        immediateEffects: {
          description: 'A few discount hunters defect to Vanguard, but within two months, Vanguard\'s servers falter under the surge and their support is overwhelmed. Your core customers stay, praising your stability. Vanguard burns through half their treasury while your profits rise.',
          reputationDelta: 25,
          satisfactionDelta: 20,
          relationshipDeltas: { deniz: -20, arda: 30, maya: 20 },
          cultureDeltas: { discipline: 25, customerObsession: 25 }
        },
        educationalConcept: {
          title: 'The Hedgehog Shield Against Copycats',
          summary: 'Competitors can clone features and discount prices, but they cannot easily copy organizational discipline, culture, and deep customer trust. Reactive panic ruins companies faster than competitors do.',
          principle: 'Look in the mirror, not out the window. Out-execute, do not panic.',
          sourceInspiration: 'Good to Great — Disciplined Action'
        },
        advanceChapter: true
      },
      {
        id: 'ch9_match_vanguard_discount',
        text: 'Match Vanguard\'s 50% price cut and launch a smear ad campaign.',
        philosophyTag: 'Reactive Price War (The Doom Loop)',
        energyCost: 30,
        cashCost: 3500,
        immediateEffects: {
          description: 'You enter a brutal margin-destroying price war. Gross margins drop by 45%. You preserve customer count, but your cash reserves hemorrhage rapidly.',
          companyCashDelta: -3500,
          stressDelta: 30,
          relationshipDeltas: { selin: -20, maya: -20 },
          cultureDeltas: { efficiency: -25, discipline: -20 }
        },
        educationalConcept: {
          title: 'The Doom Loop of Reactive Competition',
          summary: 'Collins documented that companies in decline frequently react to competitors with frenzied tactical maneuvers rather than calm, principled discipline.',
          principle: 'Never abandon your economic engine to fight on someone else\'s terms.',
          sourceInspiration: 'Good to Great — The Doom Loop'
        },
        advanceChapter: true
      }
    ]
  },
  {
    id: 'ch10_the_decision',
    chapterIndex: 10,
    title: 'Chapter 10: The Summit & The Legacy',
    speaker: 'Your Board & Advisors',
    speakerRole: 'Final Destination',
    contextStatus: 'The company has navigated through crises, competitors, and scaling pains into a formidable enterprise.',
    narrative: [
      'Two years have passed since you sat in your quiet room with a notebook and a prayer. Today, the conference room is full.',
      'Maya Chen, Selin Kaya, Emre Demir, Kerem Alkan, and Professor Arda are all seated around the mahogany table. On the projection screen are your company statistics: steady cash flow, high customer loyalty, and an enduring culture.',
      'An acquisition offer sits on the table from an international conglomerate: a multi-million dollar buyout. Alongside it is a proposal to remain independent, and another to expand into a global employee-owned enterprise.',
      'What kind of company was this journey always destined to create?'
    ],
    choices: [
      {
        id: 'ch10_sustainable_cash_cow',
        text: 'The Sustainable Fortress: Remain independent, highly profitable, and distribute dividends to the team.',
        philosophyTag: 'Enduring Independence & Stewardship',
        energyCost: 10,
        immediateEffects: {
          description: 'You choose independence. The company operates as a resilient, highly profitable engine of value. Your employees share in profits, turnover is near zero, and you have complete freedom over your life.',
          companyCashDelta: 20000,
          reputationDelta: 30,
          relationshipDeltas: { maya: 30, selin: 30, arda: 35 },
          cultureDeltas: { discipline: 30, autonomy: 30, efficiency: 30 }
        },
        educationalConcept: {
          title: 'Built to Last: The Enduring Enterprise',
          summary: 'The highest form of business success is not selling out at the peak of hype, but constructing an enduring institution that generates value for customers, employees, and society for decades.',
          principle: 'True wealth is autonomy, purpose, and sustainable excellence.',
          sourceInspiration: 'Good to Great — Built to Last'
        },
        advanceChapter: true
      },
      {
        id: 'ch10_founder_exit',
        text: 'The Strategic Exit: Accept the lucrative acquisition, reward early team members, and prepare your next venture.',
        philosophyTag: 'Capital Harvest & Reinvestment',
        energyCost: 10,
        immediateEffects: {
          description: 'You sign the acquisition agreement. You and your early team achieve generational financial freedom. You step down as CEO, armed with wisdom and capital to mentor future generations.',
          companyCashDelta: 150000,
          reputationDelta: 25,
          relationshipDeltas: { kerem: 35, emre: 30 },
          cultureDeltas: { growthOrientation: 30 }
        },
        educationalConcept: {
          title: 'The Liquidity Event and Capital Cycle',
          summary: 'Selling a thriving company is a legitimate harvest of enterprise value, converting years of concentrated risk into liquid capital to fund new endeavors.',
          principle: 'A successful founder exit creates capital that fertilizes the entire entrepreneurship ecosystem.',
          sourceInspiration: 'The Personal MBA — Valuation & Harvest'
        },
        advanceChapter: true
      },
      {
        id: 'ch10_global_conquest',
        text: 'The Global Vanguard: Reject the buyout and raise $20M to launch international category expansion.',
        philosophyTag: 'Maximum Scale & Market Leadership',
        energyCost: 10,
        immediateEffects: {
          description: 'You decline the comfortable exit and double down. You open offices across 3 continents. The pressure is immense, but you have built an unbreakable operational culture capable of handling global scale.',
          companyCashDelta: 80000,
          reputationDelta: 35,
          relationshipDeltas: { kerem: 40, emre: 35 },
          cultureDeltas: { growthOrientation: 35, discipline: 25 }
        },
        educationalConcept: {
          title: 'Level 5 Leadership at Global Scale',
          summary: 'Level 5 leaders blend extreme personal humility with an intense, indomitable professional will. They channel ambition away from self-aggrandizement into building greatness.',
          principle: 'Greatness is not a function of circumstance; it is a matter of conscious choice and discipline.',
          sourceInspiration: 'Good to Great — Level 5 Leadership'
        },
        advanceChapter: true
      }
    ]
  }
];
