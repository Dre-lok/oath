import { Colors } from './colors';
import type { TaskType } from '../types/task';

export const TASK_TYPE_META: Record<TaskType, { label: string; color: string }> = {
  trial: { label: '⚔ TRIAL', color: Colors.trial },
  daily: { label: '◈ DAILY', color: Colors.text.heading },
  class: { label: '✦ CLASS', color: Colors.gold },
};

// Trial first (rarer/higher value), then Daily, then Class.
export const TASK_TYPE_ORDER: TaskType[] = ['trial', 'daily', 'class'];
