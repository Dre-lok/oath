import type { StatCategory } from './stats';

export interface QuestEntry {
  id: string;
  playerId: string;
  questId: string;
  completedAt: string;
  xpEarned: number;
  stat: StatCategory;
}
