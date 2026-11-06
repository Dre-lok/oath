import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { CustomTaskForm } from '../components/taskEditor/CustomTaskForm';
import { PresetTaskList } from '../components/taskEditor/PresetTaskList';
import { ScreenHeader } from '../components/ui/ScreenHeader';
import { Colors } from '../constants/colors';
import { useTaskStore } from '../hooks/useTaskStore';
import type { PresetTask } from '../types/task';

const SCREEN_PADDING = 20;

export default function TaskEditorScreen() {
  const router = useRouter();
  const { addTask } = useTaskStore();
  const [showCustom, setShowCustom] = useState(false);

  const handleAdd = (task: PresetTask) => {
    addTask(task);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title="TASK EDITOR"
        onBack={showCustom ? () => setShowCustom(false) : undefined}
        action={
          showCustom ? undefined : (
            <Pressable
              onPress={() => setShowCustom(true)}
              accessibilityRole="button"
              accessibilityLabel="Create a custom task"
              hitSlop={10}
              style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
            >
              <Text style={styles.addButtonText}>+</Text>
            </Pressable>
          )
        }
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {showCustom ? (
          <CustomTaskForm onSubmit={handleAdd} />
        ) : (
          <PresetTaskList onSelect={handleAdd} />
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
    paddingBottom: 32,
  },
  // Same gold-glow + affordance as the Quest Log "new task" control.
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
});
