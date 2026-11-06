import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, statColor } from '../../constants/colors';
import { STAT_ABBREV, STAT_ORDER } from '../../constants/statMeta';
import type { StatCategory } from '../../types/stats';
import { rgba } from '../../utils/color';

interface StatPickerProps {
  value: StatCategory | null;
  onChange: (stat: StatCategory) => void;
}

export function StatPicker({ value, onChange }: StatPickerProps) {
  return (
    <View style={styles.row}>
      {STAT_ORDER.map((stat) => {
        const color = statColor(stat);
        const selected = value === stat;

        return (
          <Pressable
            key={stat}
            onPress={() => onChange(stat)}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            accessibilityLabel={stat}
            style={[
              styles.chip,
              { borderColor: selected ? color : Colors.border },
              selected && { backgroundColor: rgba(color, 0.12) },
            ]}
          >
            <View style={[styles.dot, { backgroundColor: color }]} />
            <Text style={[styles.chipText, { color: selected ? color : Colors.text.secondary }]}>
              {STAT_ABBREV[stat]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    paddingVertical: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  chipText: {
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 11,
    letterSpacing: 1.4,
  },
});
