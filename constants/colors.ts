import type { StatCategory } from '../types/stats';

export const Colors = {
  bg: '#07080f',
  surface: '#0f1118',
  surface2: '#161820',
  border: '#1e2030',
  gold: '#c8980a',
  goldDim: '#7a5c06',
  goldGlow: 'rgba(200,152,10,0.15)',
  goldText: '#e8c84a',
  trial: '#a866e0',
  trialGlow: 'rgba(168,102,224,0.35)',
  danger: '#c23b3b',
  dangerDim: 'rgba(194,59,59,0.16)',
  text: {
    primary: '#e8e4d8',
    secondary: '#6e6c64',
    muted: '#3a3a3a',
    // Brighter than `secondary` — for section header labels (ATTRIBUTES,
    // QUESTS, etc.) that need to stay legible against the near-black bg.
    heading: '#a19d90',
  },
  // Metal-tier ladder (vision v5 A4) — universal across classes.
  // Bronze → Iron → Steel → Gold → Platinum → Diamond → Obsidian.
  // No Unranked; player starts at Bronze.
  tier: {
    bronze: '#a0622a',
    iron: '#6e6e73',
    steel: '#8a9aac',
    gold: '#c8980a',
    platinum: '#4fd1c5',
    diamond: '#4fc3f7',
    // Deep violet-obsidian — readable as a metal tag on the near-black UI
    // without colliding with trial purple used for Trial quest accents.
    obsidian: '#6b5b95',
  },
  stats: {
    strength: '#e05030',
    discipline: '#2a70e0',
    mind: '#d08020',
    vitals: '#28a060',
  } satisfies Record<StatCategory, string>,
  statsDim: {
    strength: 'rgba(224,80,48,0.15)',
    discipline: 'rgba(42,112,224,0.15)',
    mind: 'rgba(208,128,32,0.15)',
    vitals: 'rgba(40,160,96,0.15)',
  } satisfies Record<StatCategory, string>,
} as const;

export const statColor = (stat: StatCategory): string => Colors.stats[stat];

export const statColorDim = (stat: StatCategory): string => Colors.statsDim[stat];
