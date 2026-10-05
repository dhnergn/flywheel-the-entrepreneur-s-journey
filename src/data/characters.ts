import { CharacterRelationship } from '../types/game';

export const INITIAL_CHARACTERS: Record<CharacterRelationship['id'], CharacterRelationship> = {
  maya: {
    id: 'maya',
    name: 'Maya Chen',
    role: 'Full-Stack Systems Engineer & Product Specialist',
    organization: 'Open Infrastructure Collective',
    trust: 55,
    alignment: 60,
    status: 'contact',
    bio: 'Brilliant, pragmatic, and allergic to corporate buzzwords. Believes that sustainable architecture and solving real customer agony beats premature hyper-growth every single time.',
    avatarSeed: 'maya_chen',
    recentNotes: [
      'Met at the Local Tech Hub meetup.',
      'Skeptical of raising vanity capital before unit economics work.'
    ]
  },
  emre: {
    id: 'emre',
    name: 'Emre Demir',
    role: 'Growth Strategist & Rainmaker',
    organization: 'Apex Inbound Partners',
    trust: 50,
    alignment: 50,
    status: 'contact',
    bio: 'Charismatic, unstoppable closer who can book 15 prospect calls in an afternoon. Thrilled by big numbers, but occasionally commits engineering to custom features that don\'t exist yet.',
    avatarSeed: 'emre_demir',
    recentNotes: [
      'Believes cash flow solves all early sins.',
      'Eager to partner or lead business development if given freedom to sprint.'
    ]
  },
  selin: {
    id: 'selin',
    name: 'Selin Kaya',
    role: 'Operations & Process Architect',
    organization: 'Kaya Supply & Logistics',
    trust: 60,
    alignment: 55,
    status: 'contact',
    bio: 'Obsessed with the Theory of Constraints and standard operating procedures. Sees business as an interconnected pipe system where hidden leaks silently destroy margins.',
    avatarSeed: 'selin_kaya',
    recentNotes: [
      'Former industrial logistics manager.',
      'Insists on measuring gross margins before accelerating acquisition.'
    ]
  },
  kerem: {
    id: 'kerem',
    name: 'Kerem Alkan',
    role: 'Managing Partner',
    organization: 'Foundry Capital Ventures',
    trust: 40,
    alignment: 45,
    status: 'investor',
    bio: 'High-energy venture investor. Looks for defensible moats, 10x market velocity, and founders willing to sacrifice comfort for category domination.',
    avatarSeed: 'kerem_alkan',
    recentNotes: [
      'Tracks market trends aggressively.',
      'Willing to write checks, but expects strict milestones and aggressive blitzscaling.'
    ]
  },
  deniz: {
    id: 'deniz',
    name: 'Deniz Vural',
    role: 'Founder & CEO',
    organization: 'Vanguard Dynamics',
    trust: 30,
    alignment: 20,
    status: 'rival',
    bio: 'Runs a heavily funded competitor in the same general market. Fast mover, ruthlessly copies product iterations, and frequently tries to undercut pricing or recruit away top talent.',
    avatarSeed: 'deniz_vural',
    recentNotes: [
      'Raised $1.5M in seed funding recently.',
      'Watching your early product moves with keen competitive interest.'
    ]
  },
  arda: {
    id: 'arda',
    name: 'Professor Arda Teoman',
    role: 'Emeritus Professor of Economics & Management',
    organization: 'Metro Polytechnic University',
    trust: 75,
    alignment: 70,
    status: 'mentor',
    bio: 'Has advised Fortune 500 CEOs and bootstrapped founders over 40 years. Challenges lazy thinking with Socratic rigor, quoting classic business truths from Collins, Hill, and Drucker.',
    avatarSeed: 'arda_teoman',
    recentNotes: [
      'Offers deep philosophical perspective.',
      'Urges you to find your "Hedgehog Concept" and confront brutal realities honestly.'
    ]
  }
};
