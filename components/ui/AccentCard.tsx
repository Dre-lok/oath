import { ReactNode } from 'react';
import {
  AccessibilityRole,
  AccessibilityState,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface AccentCardProps {
  accentColor: string;
  fill: string;
  borderColor: string;
  onPress?: () => void;
  disabled?: boolean;
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  accessibilityState?: AccessibilityState;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

// Flat card chrome with a colored left accent bar — the replacement for the
// cut-corner treatment on list rows (that shape is reserved for Dashboard
// stat cards now).
export function AccentCard({
  accentColor,
  fill,
  borderColor,
  onPress,
  disabled,
  accessibilityRole,
  accessibilityLabel,
  accessibilityState,
  style,
  children,
}: AccentCardProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole={accessibilityRole ?? (onPress ? 'button' : undefined)}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      style={[styles.card, { backgroundColor: fill, borderColor }, style]}
    >
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    overflow: 'hidden',
  },
  accentBar: {
    width: 3,
  },
});
