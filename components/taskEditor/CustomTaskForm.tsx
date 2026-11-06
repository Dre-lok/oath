import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '../../constants/colors';
import type { StatCategory } from '../../types/stats';
import { CUSTOM_TASK_XP } from '../../types/task';
import type { PresetTask } from '../../types/task';
import { SegmentedToggle } from '../ui/SegmentedToggle';
import { StatPicker } from '../ui/StatPicker';

type Recurrence = 'daily' | 'oneOff';

interface CustomTaskFormProps {
  onSubmit: (task: PresetTask) => void;
}

export function CustomTaskForm({ onSubmit }: CustomTaskFormProps) {
  const [name, setName] = useState('');
  const [stat, setStat] = useState<StatCategory | null>(null);
  const [recurrence, setRecurrence] = useState<Recurrence>('daily');

  const canSubmit = name.trim().length > 0 && stat !== null;

  const handleSubmit = () => {
    if (!canSubmit || !stat) return;
    // Custom tasks always land in the DAILY group on Log — `recurring`
    // just tracks whether they should repeat once storage/reset lands.
    onSubmit({
      name: name.trim(),
      stat,
      xpValue: CUSTOM_TASK_XP,
      taskType: 'daily',
      isCustom: true,
      recurring: recurrence === 'daily',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>TASK NAME</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="e.g. Stretch before bed"
          placeholderTextColor={Colors.text.muted}
          style={styles.input}
          maxLength={60}
          accessibilityLabel="Task name"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>STAT</Text>
        <StatPicker value={stat} onChange={setStat} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>RECURRENCE</Text>
        <SegmentedToggle
          value={recurrence}
          onChange={setRecurrence}
          options={[
            { value: 'oneOff', label: 'ONE-OFF' },
            { value: 'daily', label: 'DAILY' },
          ]}
        />
      </View>

      <Text style={styles.xpNote}>Custom tasks award a flat +{CUSTOM_TASK_XP} XP</Text>

      <Pressable
        onPress={handleSubmit}
        disabled={!canSubmit}
        accessibilityRole="button"
        accessibilityLabel="Add custom task"
        style={({ pressed }) => [
          styles.submit,
          {
            backgroundColor: canSubmit ? 'rgba(200,152,10,0.12)' : Colors.surface,
            borderColor: canSubmit ? 'rgba(200,152,10,0.5)' : Colors.border,
          },
          !canSubmit && styles.submitDisabled,
          pressed && canSubmit && styles.submitPressed,
        ]}
      >
        <Text
          style={[
            styles.submitText,
            { color: canSubmit ? Colors.gold : Colors.text.muted },
          ]}
        >
          ADD TASK
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  field: {
    gap: 8,
  },
  label: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 2.5,
    color: Colors.text.heading,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: Colors.text.primary,
    fontFamily: 'Cinzel_600SemiBold',
    fontSize: 14,
  },
  xpNote: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 0.4,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  submit: {
    height: 48,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitDisabled: {
    opacity: 0.5,
  },
  submitPressed: {
    opacity: 0.7,
  },
  submitText: {
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 12,
    letterSpacing: 2.5,
  },
});
