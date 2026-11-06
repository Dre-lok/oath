import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';
import type { RankTier } from '../../constants/rankProgression';
import { rgba } from '../../utils/color';
import { RankBadgeIcon } from './RankBadgeIcon';

const ICON_SIZE = 34;

interface RankTierBoxProps {
  tier: RankTier;
  width: number;
}

// Static, non-tappable tier card — all the info a badge-plus-popover would
// have required a tap for lives directly on the box instead.
export function RankTierBox({ tier, width }: RankTierBoxProps) {
  const { rank, title, metalTier, metalColor, xpThreshold, status } = tier;
  const locked = status === 'locked';
  const current = status === 'current';
  const color = locked ? Colors.text.muted : metalColor;

  return (
    <View
      style={[
        styles.box,
        { width, borderColor: current ? rgba(Colors.gold, 0.5) : rgba(color, locked ? 0.2 : 0.35) },
        current && styles.boxGlow,
        locked && styles.boxLocked,
      ]}
    >
      <RankBadgeIcon rank={rank} color={color} filled={!locked} size={ICON_SIZE} />
      <Text style={styles.title} numberOfLines={1}>
        {title.toUpperCase()}
      </Text>
      <Text style={[styles.metalTag, { color }]} numberOfLines={1}>
        {metalTier.toUpperCase()}
      </Text>
      {!locked ? (
        <Text style={styles.xp}>{xpThreshold.toLocaleString()} XP</Text>
      ) : (
        <Text style={styles.lockedLabel}>LOCKED</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 6,
    gap: 4,
  },
  boxLocked: {
    opacity: 0.45,
  },
  boxGlow: {
    shadowColor: Colors.gold,
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  title: {
    fontFamily: 'Cinzel_600SemiBold',
    fontSize: 11,
    letterSpacing: 0.4,
    color: Colors.text.primary,
    marginTop: 6,
  },
  metalTag: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 8,
    letterSpacing: 1.2,
  },
  xp: {
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 10,
    color: Colors.gold,
    marginTop: 2,
  },
  lockedLabel: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 8,
    letterSpacing: 1.2,
    color: Colors.text.muted,
    marginTop: 2,
  },
});
