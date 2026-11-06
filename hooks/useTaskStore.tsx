import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import uuid from 'react-native-uuid';

import type { PresetTask, Task } from '../types/task';

const SEED_DATE = '2026-01-01T00:00:00.000Z';

// Mirrors the Dashboard's demo quest list so Log reads as the same world,
// even though the two aren't wired together yet. Replace with
// StorageAdapter-loaded data once persistence lands.
const SEED_TASKS: Task[] = [
  { id: 'seed-1', name: 'Morning Training Block', stat: 'strength', xpValue: 80, taskType: 'daily', isCustom: false, recurring: true, createdDate: SEED_DATE },
  { id: 'seed-2', name: 'No Distractions — 2hr Focus', stat: 'discipline', xpValue: 120, taskType: 'class', isCustom: false, recurring: true, createdDate: SEED_DATE },
  { id: 'seed-3', name: 'Read 30 Pages', stat: 'mind', xpValue: 60, taskType: 'daily', isCustom: false, recurring: true, createdDate: SEED_DATE },
  { id: 'seed-4', name: 'Cold Exposure Protocol', stat: 'vitals', xpValue: 100, taskType: 'trial', isCustom: false, recurring: false, createdDate: SEED_DATE },
  { id: 'seed-5', name: 'Evening Reflection Log', stat: 'mind', xpValue: 40, taskType: 'daily', isCustom: false, recurring: true, createdDate: SEED_DATE },
];

const SEED_COMPLETED_IDS = ['seed-1', 'seed-2'];

interface TaskStoreValue {
  tasks: Task[];
  completedIds: Set<string>;
  addTask: (task: PresetTask) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
}

const TaskStoreContext = createContext<TaskStoreValue | null>(null);

export function TaskStoreProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(SEED_TASKS);
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    () => new Set(SEED_COMPLETED_IDS),
  );

  const addTask = useCallback((preset: PresetTask) => {
    const task: Task = {
      ...preset,
      id: uuid.v4() as string,
      createdDate: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, task]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setCompletedIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ tasks, completedIds, addTask, toggleTask, removeTask }),
    [tasks, completedIds, addTask, toggleTask, removeTask],
  );

  return <TaskStoreContext.Provider value={value}>{children}</TaskStoreContext.Provider>;
}

export function useTaskStore(): TaskStoreValue {
  const ctx = useContext(TaskStoreContext);
  if (!ctx) {
    throw new Error('useTaskStore must be used within a TaskStoreProvider');
  }
  return ctx;
}
