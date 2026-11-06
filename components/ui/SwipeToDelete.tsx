import { ReactNode, useRef } from 'react';
import { Animated, PanResponder, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../constants/colors';

const DELETE_WIDTH = 72;
const OPEN_THRESHOLD = DELETE_WIDTH / 2;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

interface SwipeToDeleteProps {
  onDelete: () => void;
  deleteLabel: string;
  children: ReactNode;
}

// Lightweight swipe-left-to-reveal-delete built on core RN Animated +
// PanResponder — avoids pulling in gesture-handler/reanimated for one row.
export function SwipeToDelete({ onDelete, deleteLabel, children }: SwipeToDeleteProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const isOpen = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 8 && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.5,
      onPanResponderMove: (_, gesture) => {
        const base = isOpen.current ? -DELETE_WIDTH : 0;
        translateX.setValue(clamp(base + gesture.dx, -DELETE_WIDTH, 0));
      },
      onPanResponderRelease: (_, gesture) => {
        const base = isOpen.current ? -DELETE_WIDTH : 0;
        const finalValue = clamp(base + gesture.dx, -DELETE_WIDTH, 0);
        const shouldOpen = finalValue <= -OPEN_THRESHOLD;
        isOpen.current = shouldOpen;
        Animated.spring(translateX, {
          toValue: shouldOpen ? -DELETE_WIDTH : 0,
          useNativeDriver: true,
          bounciness: 4,
        }).start();
      },
    }),
  ).current;

  return (
    <View style={styles.wrapper}>
      <View style={styles.deletePanel}>
        <Pressable
          onPress={onDelete}
          accessibilityRole="button"
          accessibilityLabel={deleteLabel}
          style={styles.deleteButton}
          hitSlop={8}
        >
          <TrashIcon />
        </Pressable>
      </View>

      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.content, { transform: [{ translateX }] }]}
      >
        {children}
      </Animated.View>
    </View>
  );
}

function TrashIcon() {
  return (
    <Svg width={16} height={17} viewBox="0 0 16 17" fill="none">
      <Path
        d="M2 4.5H14M6.5 4.5V2.5H9.5V4.5M6 7.5V13M10 7.5V13M3.5 4.5L4 14.5H12L12.5 4.5"
        stroke={Colors.text.primary}
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  deletePanel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: DELETE_WIDTH,
    backgroundColor: Colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: Colors.bg,
  },
});
