import type { StatCategory } from '../types/stats';

export const STAT_ORDER: StatCategory[] = ['strength', 'discipline', 'mind', 'vitals'];

export const STAT_ABBREV: Record<StatCategory, string> = {
  strength: 'STR',
  discipline: 'DIS',
  mind: 'MND',
  vitals: 'VIT',
};

export const STAT_LABEL: Record<StatCategory, string> = {
  strength: 'Strength',
  discipline: 'Discipline',
  mind: 'Mind',
  vitals: 'Vitals',
};
