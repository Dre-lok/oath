import { StyleSheet, Text, View } from 'react-native';

import { Colors, statColor } from '../../constants/colors';
import { PRESET_TASKS } from '../../constants/presetTasks';
import { STAT_LABEL, STAT_ORDER } from '../../constants/statMeta';
import { TASK_TYPE_META } from '../../constants/taskTypeMeta';
import type { PresetTask } from '../../types/task';
import { rgba } from '../../utils/color';
import { AccentCard } from '../ui/AccentCard';

interface PresetTaskListProps {
  onSelect: (task: PresetTask) => void;
}

export function PresetTaskList({ onSelect }: PresetTaskListProps) {
  return (
    <View style={styles.container}>
      {STAT_ORDER.map((stat) => {
        const tasksForStat = PRESET_TASKS.filter((task) => task.stat === stat);
        if (tasksForStat.length === 0) return null;
        const color = statColor(stat);

        return (
          <View key={stat} style={styles.group}>
            <View style={styles.groupLabelRow}>
              <View style={[styles.groupMarker, { backgroundColor: color }]} />
              <Text style={[styles.groupLabel, { color }]}>{STAT_LABEL[stat].toUpperCase()}</Text>
            </View>

            <View style={styles.rows}>
              {tasksForStat.map((task) => (
                <PresetRow key={task.name} task={task} onPress={() => onSelect(task)} />
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}

interface PresetRowProps {
  task: PresetTask;
  onPress: () => void;
}

function PresetRow({ task, onPress }: PresetRowProps) {
  const typeMeta = TASK_TYPE_META[task.taskType];

  return (
    <AccentCard
      onPress={onPress}
      accessibilityLabel={`Add ${task.name} — +${task.xpValue} XP`}
      accentColor={typeMeta.color}
      fill={Colors.surface}
      borderColor="#1a1c28"
    >
      <View style={styles.rowContent}>
        <View style={styles.rowInfo}>
          <View style={[styles.typeBadge, { borderColor: rgba(typeMeta.color, 0.4) }]}>
            <Text style={[styles.typeBadgeText, { color: typeMeta.color }]}>{typeMeta.label}</Text>
          </View>
          <Text style={styles.rowName} numberOfLines={1}>
            {task.name}
          </Text>
        </View>
        <Text style={styles.xpValue}>+{task.xpValue}</Text>
      </View>
    </AccentCard>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
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
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    gap: 10,
  },
  rowInfo: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 10,
    gap: 10,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  typeBadgeText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 8,
    letterSpacing: 1,
  },
  rowName: {
    fontFamily: 'Cinzel_600SemiBold',
    fontSize: 13,
    color: Colors.text.primary,
    letterSpacing: 0.2,
  },
  xpValue: {
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 12,
    color: Colors.gold,
  },
});
