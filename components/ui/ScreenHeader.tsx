import { useRouter } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../constants/colors';

const SCREEN_PADDING = 20;
const SIDE_SLOT = 32;

interface ScreenHeaderProps {
  title: string;
  action?: ReactNode;
  // When set, replaces the default router.back() — used when a screen has
  // an intermediate state (e.g. custom-task form) that should dismiss first.
  onBack?: () => void;
}

export function ScreenHeader({ title, action, onBack }: ScreenHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.side}>
        <Pressable
          onPress={() => (onBack ? onBack() : router.back())}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={10}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Svg width={8} height={13} viewBox="0 0 8 13" fill="none">
            <Path
              d="M7 1L1 6.5L7 12"
              stroke={Colors.gold}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>
      </View>

      <Text style={styles.title} numberOfLines={1} pointerEvents="none">
        {title}
      </Text>

      <View style={[styles.side, styles.sideEnd]}>{action}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 12,
    paddingBottom: 16,
  },
  side: {
    width: SIDE_SLOT,
    height: SIDE_SLOT,
    zIndex: 1,
  },
  sideEnd: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  backButton: {
    width: SIDE_SLOT,
    height: SIDE_SLOT,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pressed: {
    opacity: 0.6,
  },
  // Absolutely centered in the header so the back button / action slot
  // never nudge the label off true screen center.
  title: {
    position: 'absolute',
    left: SCREEN_PADDING + SIDE_SLOT,
    right: SCREEN_PADDING + SIDE_SLOT,
    top: 12,
    height: SIDE_SLOT,
    lineHeight: SIDE_SLOT,
    textAlign: 'center',
    fontFamily: 'Cinzel_700Bold',
    fontSize: 16,
    letterSpacing: 3,
    color: Colors.text.primary,
    includeFontPadding: false,
  },
});
