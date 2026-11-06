import { useEffect, useRef } from 'react';
import { Animated, Modal, PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, statColor } from '../../constants/colors';
import { STAT_GRADE_HISTORY } from '../../constants/statHistory';
import { rgba } from '../../utils/color';
import type { StatGridItem } from './StatGrid';

const DISMISS_DISTANCE = 90;

interface StatDetailModalProps {
  stat: StatGridItem | null;
  onClose: () => void;
}

// Compact popover, not a full-screen sheet — dismissible via backdrop tap
// or a downward swipe (built on core Animated/PanResponder, matching the
// pattern used for swipe-to-delete on Quest Log rows).
export function StatDetailModal({ stat, onClose }: StatDetailModalProps) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (stat) translateY.setValue(0);
  }, [stat, translateY]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        gesture.dy > 6 && gesture.dy > Math.abs(gesture.dx),
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) translateY.setValue(gesture.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > DISMISS_DISTANCE) {
          onClose();
        } else {
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 6 }).start();
        }
      },
    }),
  ).current;

  if (!stat) return null;

  const color = statColor(stat.id);
  const history = STAT_GRADE_HISTORY[stat.id];
  const pct = Math.min(100, Math.round((stat.score / stat.maxScore) * 100));

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <View style={styles.root}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Dismiss stat detail"
        />

        <SafeAreaView edges={['bottom']} style={styles.sheetWrap} pointerEvents="box-none">
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.sheet,
              { borderColor: rgba(color, 0.3) },
              { transform: [{ translateY }] },
            ]}
          >
            <View style={styles.dragHandle} />

            <View style={styles.header}>
              <View style={[styles.accentBar, { backgroundColor: color }]} />
              <View style={styles.headerContent}>
                <View style={styles.headerTopRow}>
                  <Text style={[styles.abbrev, { color: rgba(color, 0.55) }]}>{stat.shortName}</Text>
                  <Text
                    style={[
                      styles.grade,
                      { color, textShadowColor: rgba(color, 0.4) },
                    ]}
                  >
                    {stat.rank}
                  </Text>
                </View>
                <View style={[styles.headerRule, { backgroundColor: rgba(color, 0.12) }]} />
                <Text style={styles.statName}>{stat.name.toUpperCase()}</Text>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: rgba(color, 0.15) }]} />

            <Text style={styles.sectionLabel}>GRADE HISTORY</Text>
            <View style={styles.historyList}>
              {history.map((entry) => (
                <Text key={`${entry.from}-${entry.to}-${entry.date}`} style={styles.historyLine}>
                  {entry.from} <Text style={{ color }}>→ {entry.to}</Text> · {entry.date}
                </Text>
              ))}
            </View>

            <View style={[styles.divider, { backgroundColor: rgba(color, 0.15) }]} />

            <Text style={styles.sectionLabel}>PROGRESS TO NEXT GRADE</Text>
            <View
              style={styles.track}
              accessibilityRole="progressbar"
              accessibilityLabel={`${stat.name} progress to next grade`}
              accessibilityValue={{ min: 0, max: stat.maxScore, now: stat.score }}
            >
              <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color, shadowColor: color }]} />
            </View>
            <Text style={styles.progressValues}>
              {stat.score.toLocaleString()} / {stat.maxScore.toLocaleString()}
            </Text>
          </Animated.View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgba(7,8,15,0.7)',
    justifyContent: 'flex-end',
  },
  sheetWrap: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sheet: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  dragHandle: {
    alignSelf: 'center',
    width: 32,
    height: 3,
    backgroundColor: Colors.border,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 12,
    marginBottom: 14,
  },
  accentBar: {
    width: 3,
  },
  headerContent: {
    flex: 1,
  },
  // Mirrors StatGrid's StatCard content exactly (abbrev + grade top row,
  // rule, stat name) so the modal reads as "the dashboard card, with more
  // information added" rather than a redesigned element.
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  abbrev: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 2.2,
  },
  grade: {
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 22,
    lineHeight: 22,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  headerRule: {
    height: 1,
    marginBottom: 8,
  },
  statName: {
    fontFamily: 'Cinzel_600SemiBold',
    fontSize: 14,
    lineHeight: 14,
    color: Colors.text.primary,
    letterSpacing: 0.56,
  },
  divider: {
    height: 1,
    marginBottom: 14,
  },
  sectionLabel: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    letterSpacing: 2.4,
    color: Colors.text.heading,
    marginBottom: 10,
  },
  historyList: {
    gap: 10,
    marginBottom: 14,
  },
  // Largest text in the modal after the header — every other label/value
  // below must stay smaller than this.
  historyLine: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.3,
    color: Colors.text.secondary,
  },
  track: {
    height: 4,
    backgroundColor: Colors.surface2,
    position: 'relative',
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    shadowOpacity: 0.55,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
  progressValues: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    color: Colors.text.secondary,
    marginTop: 8,
    textAlign: 'center',
  },
});
