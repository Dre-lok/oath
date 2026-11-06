import type { StatCategory } from '../types/stats';

export interface GradeChange {
  from: string;
  to: string;
  date: string;
}

// Mocked locally until grade-change events are persisted — most recent
// entry first, each ending at (or leading toward) the stat's current grade.
export const STAT_GRADE_HISTORY: Record<StatCategory, GradeChange[]> = {
  strength: [
    { from: 'B', to: 'B+', date: 'Jul 18 2026' },
    { from: 'C+', to: 'B', date: 'Jun 2 2026' },
    { from: 'C', to: 'C+', date: 'Apr 14 2026' },
  ],
  discipline: [
    { from: 'B+', to: 'A−', date: 'Jul 20 2026' },
    { from: 'B', to: 'B+', date: 'May 30 2026' },
    { from: 'B−', to: 'B', date: 'Apr 9 2026' },
  ],
  mind: [
    { from: 'C', to: 'C+', date: 'Jul 15 2026' },
    { from: 'C−', to: 'C', date: 'Jun 10 2026' },
    { from: 'D+', to: 'C−', date: 'Apr 25 2026' },
  ],
  vitals: [
    { from: 'B−', to: 'B', date: 'Jul 22 2026' },
    { from: 'C+', to: 'B−', date: 'Jun 5 2026' },
    { from: 'C', to: 'C+', date: 'Apr 18 2026' },
  ],
};
