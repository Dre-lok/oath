import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';

interface SegmentedToggleOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedToggleProps<T extends string> {
  options: SegmentedToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
}: SegmentedToggleProps<T>) {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={option.label}
            style={[styles.segment, active && styles.segmentActive]}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    padding: 3,
    gap: 3,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  segmentActive: {
    backgroundColor: 'rgba(200,152,10,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(200,152,10,0.4)',
  },
  label: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.text.secondary,
  },
  labelActive: {
    color: Colors.gold,
    fontFamily: 'SpaceMono_700Bold',
  },
});
