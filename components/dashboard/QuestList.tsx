import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTaskStore } from '../../hooks/useTaskStore';
import type { Task, TaskType } from '../../types/task';
import { SectionHeader } from '../ui/SectionHeader';
import { TaskCard } from '../ui/TaskCard';

const SCREEN_PADDING = 20;
const MAX_VISIBLE = 5;

// Rarer/higher-value types surface first within each completion group.
const TYPE_PRIORITY: Record<TaskType, number> = {
  trial: 0,
  class: 1,
  daily: 2,
};

export function QuestList() {
  const router = useRouter();
  const { tasks, completedIds, toggleTask } = useTaskStore();

  const visible = useMemo(() => {
    const byTypePriority = (a: Task, b: Task) => TYPE_PRIORITY[a.taskType] - TYPE_PRIORITY[b.taskType];
    const incomplete = tasks.filter((t) => !completedIds.has(t.id)).sort(byTypePriority);
    const complete = tasks.filter((t) => completedIds.has(t.id)).sort(byTypePriority);
    // Show up to MAX_VISIBLE, prioritizing not-yet-completed tasks — only
    // fill remaining slots with completed ones once every incomplete task
    // is already shown.
    return [...incomplete, ...complete].slice(0, MAX_VISIBLE);
  }, [tasks, completedIds]);

  return (
    <View style={styles.container}>
      <SectionHeader
        label={`QUESTS ${completedIds.size}/${tasks.length}`}
        onPress={() => router.push('/log')}
      />

      <View style={styles.list}>
        {visible.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            done={completedIds.has(task.id)}
            onPress={() => toggleTask(task.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 16,
  },
  list: {
    gap: 6,
  },
});
