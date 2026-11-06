import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TaskRow } from '../components/log/TaskRow';
import { ScreenHeader } from '../components/ui/ScreenHeader';
import { Colors } from '../constants/colors';
import { TASK_TYPE_META, TASK_TYPE_ORDER } from '../constants/taskTypeMeta';
import { useTaskStore } from '../hooks/useTaskStore';
import type { Task, TaskType } from '../types/task';

const SCREEN_PADDING = 20;

export default function LogScreen() {
  const router = useRouter();
  const { tasks, completedIds, toggleTask, removeTask } = useTaskStore();

  const grouped = useMemo(() => {
    const groups = new Map<TaskType, Task[]>();
    for (const type of TASK_TYPE_ORDER) groups.set(type, []);
    for (const task of tasks) {
      groups.get(task.taskType)?.push(task);
    }
    return groups;
  }, [tasks]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title="QUEST LOG"
        action={
          <Pressable
            onPress={() => router.push('/task-editor')}
            accessibilityRole="button"
            accessibilityLabel="Add a new task"
            hitSlop={10}
            style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
          >
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        }
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>
            {completedIds.size}/{tasks.length} COMPLETE
          </Text>
        </View>

        {TASK_TYPE_ORDER.map((type) => {
          const group = grouped.get(type) ?? [];
          if (group.length === 0) return null;
          const meta = TASK_TYPE_META[type];

          return (
            <View key={type} style={styles.group}>
              <View style={styles.groupLabelRow}>
                <View style={[styles.groupMarker, { backgroundColor: meta.color }]} />
                <Text style={[styles.groupLabel, { color: meta.color }]}>
                  {type.toUpperCase()}
                </Text>
              </View>

              <View style={styles.rows}>
                {group.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    done={completedIds.has(task.id)}
                    onToggle={() => toggleTask(task.id)}
                    onDelete={() => removeTask(task.id)}
                  />
                ))}
              </View>
            </View>
          );
        })}

        {tasks.length === 0 && (
          <Text style={styles.emptyText}>
            No tasks yet — tap + to add one from the catalog or create your own.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  content: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 24,
    gap: 20,
  },
  summaryRow: {
    alignItems: 'center',
    marginBottom: -4,
  },
  summaryText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.text.heading,
  },
  // Same persistent gold-glow tap-affordance language as the Dashboard's
  // rank-title subtitle — visible at idle, stronger on press — so both
  // non-obvious tappable elements share one visual vocabulary.
  addButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(200,152,10,0.4)',
    shadowColor: Colors.gold,
    shadowOpacity: 0.55,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  addButtonPressed: {
    opacity: 0.7,
    shadowOpacity: 0.85,
    shadowRadius: 12,
  },
  addButtonText: {
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 18,
    lineHeight: 18,
    color: Colors.gold,
    marginTop: -2,
  },
  group: {
    gap: 8,
  },
  groupLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  groupMarker: {
    width: 3,
    height: 11,
  },
  groupLabel: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 2.5,
  },
  rows: {
    gap: 6,
  },
  emptyText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
