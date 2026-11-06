import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors, statColor } from '../../constants/colors';
import { STAT_ABBREV } from '../../constants/statMeta';
import { TASK_TYPE_META } from '../../constants/taskTypeMeta';
import type { Task } from '../../types/task';
import { AccentCard } from './AccentCard';

interface TaskCardProps {
  task: Task;
  done: boolean;
  onPress: () => void;
}

// Shared task row visual — used directly on Dashboard, and wrapped in
// SwipeToDelete on the Quest Log screen.
export function TaskCard({ task, done, onPress }: TaskCardProps) {
  const isTrial = task.taskType === 'trial' && !done;
  const typeMeta = TASK_TYPE_META[task.taskType];
  const color = statColor(task.stat);
  const abbrev = STAT_ABBREV[task.stat];

  return (
    <AccentCard
      onPress={onPress}
      accessibilityState={{ selected: done }}
      accessibilityLabel={`${task.name} — ${done ? 'completed' : 'incomplete'}`}
      accentColor={done ? Colors.border : typeMeta.color}
      fill={done ? 'rgba(200,152,10,0.03)' : Colors.surface}
      borderColor={done ? 'rgba(200,152,10,0.08)' : '#1a1c28'}
      style={isTrial ? styles.rowTrial : undefined}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.checkbox,
            done ? styles.checkboxDone : styles.checkboxPending,
            isTrial && styles.checkboxTrial,
          ]}
        >
          {done ? (
            <Svg width={10} height={8} viewBox="0 0 10 8" fill="none">
              <Path
                d="M1 4L3.8 7L9 1"
                stroke={Colors.gold}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          ) : (
            <View style={[styles.checkboxDot, isTrial && styles.checkboxDotTrial]} />
          )}
        </View>

        <View style={styles.info}>
          <Text style={[styles.typeLabel, { color: done ? Colors.text.muted : typeMeta.color }]}>
            {typeMeta.label}
          </Text>
          <Text style={[styles.name, done && styles.nameDone]} numberOfLines={2}>
            {task.name}
          </Text>
        </View>

        <View style={styles.meta}>
          <View
            style={[styles.statTag, { borderColor: done ? Colors.border : `${color}66` }]}
          >
            <Text style={[styles.statTagText, { color: done ? Colors.text.muted : color }]}>
              {abbrev}
            </Text>
          </View>
          <Text style={[styles.xpValue, done && styles.xpValueDone]}>+{task.xpValue}</Text>
        </View>
      </View>
    </AccentCard>
  );
}

const styles = StyleSheet.create({
  rowTrial: {
    shadowColor: Colors.trial,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  checkboxDone: {
    backgroundColor: 'rgba(200,152,10,0.12)',
    borderColor: 'rgba(200,152,10,0.45)',
  },
  checkboxPending: {
    backgroundColor: 'transparent',
    borderColor: '#2a2c3a',
  },
  checkboxTrial: {
    borderColor: Colors.trialGlow,
  },
  checkboxDot: {
    width: 4,
    height: 4,
    backgroundColor: '#2a2c3a',
  },
  checkboxDotTrial: {
    backgroundColor: Colors.trial,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  typeLabel: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  name: {
    fontFamily: 'Cinzel_600SemiBold',
    fontSize: 13,
    lineHeight: 18,
    color: Colors.text.primary,
    letterSpacing: 0.26,
  },
  nameDone: {
    color: Colors.text.muted,
    textDecorationLine: 'line-through',
  },
  meta: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statTag: {
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  statTagText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    letterSpacing: 1,
  },
  xpValue: {
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 11,
    color: Colors.gold,
  },
  xpValueDone: {
    color: Colors.text.muted,
  },
});
