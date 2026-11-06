export type StatCategory = 'strength' | 'discipline' | 'mind' | 'vitals';

export type StatRank = 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS';

export interface StatData {
  playerId: string;
  stat: StatCategory;
  xp: number;
  rank: StatRank;
  updatedAt: string;
}
