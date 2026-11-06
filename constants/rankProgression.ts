import { Colors } from './colors';

export type RankStatus = 'achieved' | 'current' | 'locked';

export interface RankTier {
  rank: number;
  title: string;
  metalTier: string;
  metalColor: string;
  xpThreshold: number;
  status: RankStatus;
}

// Warrior class rank ladder — vision v5 §A4 (metal + XP) + §A6b (titles).
// Metal tiers are universal; titles are Warrior-specific.
// `status` is mocked against the demo character (3240 XP → Steel / Veteran,
// between Steel 1,800 and Gold 5,000) until a real progress store exists.
export const WARRIOR_RANKS: RankTier[] = [
  { rank: 1, title: 'Rookie', metalTier: 'Bronze', metalColor: Colors.tier.bronze, xpThreshold: 0, status: 'achieved' },
  { rank: 2, title: 'Fighter', metalTier: 'Iron', metalColor: Colors.tier.iron, xpThreshold: 600, status: 'achieved' },
  { rank: 3, title: 'Veteran', metalTier: 'Steel', metalColor: Colors.tier.steel, xpThreshold: 1800, status: 'current' },
  { rank: 4, title: 'Champion', metalTier: 'Gold', metalColor: Colors.tier.gold, xpThreshold: 5000, status: 'locked' },
  { rank: 5, title: 'Warlord', metalTier: 'Platinum', metalColor: Colors.tier.platinum, xpThreshold: 13000, status: 'locked' },
  { rank: 6, title: 'Conqueror', metalTier: 'Diamond', metalColor: Colors.tier.diamond, xpThreshold: 32000, status: 'locked' },
  { rank: 7, title: 'Titan', metalTier: 'Obsidian', metalColor: Colors.tier.obsidian, xpThreshold: 75000, status: 'locked' },
];

// Sage / Kaizen ladders (vision v5 §A6b) — not wired to UI yet; kept here so
// onboarding / multi-class rank screen can share one source of truth.
export const SAGE_RANKS: Omit<RankTier, 'status'>[] = [
  { rank: 1, title: 'Novice', metalTier: 'Bronze', metalColor: Colors.tier.bronze, xpThreshold: 0 },
  { rank: 2, title: 'Apprentice', metalTier: 'Iron', metalColor: Colors.tier.iron, xpThreshold: 600 },
  { rank: 3, title: 'Scholar', metalTier: 'Steel', metalColor: Colors.tier.steel, xpThreshold: 1800 },
  { rank: 4, title: 'Adept', metalTier: 'Gold', metalColor: Colors.tier.gold, xpThreshold: 5000 },
  { rank: 5, title: 'Archivist', metalTier: 'Platinum', metalColor: Colors.tier.platinum, xpThreshold: 13000 },
  { rank: 6, title: 'Luminary', metalTier: 'Diamond', metalColor: Colors.tier.diamond, xpThreshold: 32000 },
  { rank: 7, title: 'Grand Sage', metalTier: 'Obsidian', metalColor: Colors.tier.obsidian, xpThreshold: 75000 },
];

export const KAIZEN_RANKS: Omit<RankTier, 'status'>[] = [
  { rank: 1, title: 'Initiate', metalTier: 'Bronze', metalColor: Colors.tier.bronze, xpThreshold: 0 },
  { rank: 2, title: 'Disciple', metalTier: 'Iron', metalColor: Colors.tier.iron, xpThreshold: 600 },
  { rank: 3, title: 'Practitioner', metalTier: 'Steel', metalColor: Colors.tier.steel, xpThreshold: 1800 },
  { rank: 4, title: 'Sensei', metalTier: 'Gold', metalColor: Colors.tier.gold, xpThreshold: 5000 },
  { rank: 5, title: 'Shihan', metalTier: 'Platinum', metalColor: Colors.tier.platinum, xpThreshold: 13000 },
  { rank: 6, title: 'Grandmaster', metalTier: 'Diamond', metalColor: Colors.tier.diamond, xpThreshold: 32000 },
  { rank: 7, title: 'Legend', metalTier: 'Obsidian', metalColor: Colors.tier.obsidian, xpThreshold: 75000 },
];
