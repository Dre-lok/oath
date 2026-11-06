import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';

interface SectionHeaderProps {
  label: string;
  onPress?: () => void;
}

export function SectionHeader({ label, onPress }: SectionHeaderProps) {
  if (!onPress) {
    return (
      <View style={styles.container}>
        <ScribeLine />
        <Text style={styles.label}>{label}</Text>
        <ScribeLine />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScribeLine />
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`Open ${label.toLowerCase()}`}
        hitSlop={8}
        // Bordered chip — gold border + soft idle glow reads as "this is a
        // button" without a hard yellow stroke looking out of place.
        style={({ pressed }) => [styles.chip, pressed && styles.chipPressed]}
      >
        <Text style={styles.label}>{label}</Text>
      </Pressable>
      <ScribeLine />
    </View>
  );
}

function ScribeLine() {
  return <View style={styles.scribeLine} />;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  // Solid navy surface fill with a soft gold border + minor idle glow —
  // "this is a button" without a hard yellow stroke looking bolted on.
  chip: {
    borderWidth: 1,
    borderColor: 'rgba(200,152,10,0.32)',
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 5,
    shadowColor: Colors.gold,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
  chipPressed: {
    opacity: 0.7,
    backgroundColor: Colors.surface2,
    borderColor: 'rgba(200,152,10,0.55)',
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  label: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.text.heading,
  },
  scribeLine: {
    flex: 1,
    maxWidth: 48,
    height: 1,
    backgroundColor: Colors.border,
    opacity: 0.8,
  },
});
