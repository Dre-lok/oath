import type { StatCategory } from './stats';

export type TaskType = 'daily' | 'trial' | 'class';

// Same values as StatCategory — aliased so the Task domain has its own
// name (matching StorageAdapter-era schema) without duplicating the union.
export type StatKey = StatCategory;

export interface Task {
  id: string;
  name: string;
  stat: StatKey;
  xpValue: number;
  taskType: TaskType;
  isCustom: boolean;
  recurring: boolean;
  createdDate: string;
}

// Catalog entries don't have an id/createdDate until a player adds them
// to their active task set — those are minted at that point.
export type PresetTask = Omit<Task, 'id' | 'createdDate'>;

export const CUSTOM_TASK_XP = 5;
