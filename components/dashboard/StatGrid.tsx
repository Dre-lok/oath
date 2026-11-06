import { useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Svg, { Defs, LinearGradient, Polygon, Rect, Stop } from 'react-native-svg';

import { Colors, statColor } from '../../constants/colors';
import type { StatCategory } from '../../types/stats';
import { SectionHeader } from '../ui/SectionHeader';
import { StatDetailModal } from './StatDetailModal';

const SCREEN_PADDING = 20;
const CARD_GAP = 8;
const CARD_HEIGHT = 88;
const CUT_SIZE = 14;

export interface StatGridItem {
  id: StatCategory;
  name: string;
  shortName: string;
  rank: string;
  score: number;
  maxScore: number;
}

const DEFAULT_STATS: StatGridItem[] = [
  {
    id: 'strength',
    name: 'Strength',
    shortName: 'STR',
    rank: 'B+',
    score: 724,
    maxScore: 1000,
  },
  {
    id: 'discipline',
    name: 'Discipline',
    shortName: 'DIS',
    rank: 'A−',
    score: 851,
    maxScore: 1000,
  },
  {
    id: 'mind',
    name: 'Mind',
    shortName: 'MND',
    rank: 'C+',
    score: 483,
    maxScore: 1000,
  },
  {
    id: 'vitals',
    name: 'Vitals',
    shortName: 'VIT',
    rank: 'B',
    score: 612,
    maxScore: 1000,
  },
];

interface StatGridProps {
  stats?: StatGridItem[];
  // When provided, the grid drops its own horizontal padding and sizes
  // cards against this exact width instead of the screen width — used to
  // embed the grid inside another card (e.g. the Share screen).
  width?: number;
  // Hides the "ATTRIBUTES" section header — used on the Share card, which
  // has its own card framing and doesn't need the label repeated.
  showHeader?: boolean;
  // When false, cards render as static (no press / detail modal) — used on
  // the Share card so the grid is display-only.
  interactive?: boolean;
  // Punchier color wash / border / glow — used on the Share card so the
  // attribute tiles read as a focal beat against the flat card surface.
  emphasized?: boolean;
}

export function StatGrid({
  stats = DEFAULT_STATS,
  width,
  showHeader = true,
  interactive = true,
  emphasized = false,
}: StatGridProps) {
  const { width: screenWidth } = useWindowDimensions();
  const embedded = width !== undefined;
  // Must match the View that actually lays out the grid. If a parent bleeds
  // with negative margin but keeps the padded content width, sizing against
  // the outer width makes each card too wide to fit two-across → 1×4 stack.
  const availableWidth = embedded ? (width as number) : screenWidth - SCREEN_PADDING * 2;
  const cardWidth = (availableWidth - CARD_GAP) / 2;
  const [selectedId, setSelectedId] = useState<StatCategory | null>(null);
  const selectedStat = stats.find((s) => s.id === selectedId) ?? null;

  return (
    <View
      style={[
        styles.container,
        embedded && styles.containerEmbedded,
        embedded && { width: availableWidth },
      ]}
    >
      {showHeader && <SectionHeader label="ATTRIBUTES" />}

      <View style={styles.grid}>
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            stat={stat}
            width={cardWidth}
            interactive={interactive}
            emphasized={emphasized}
            onPress={() => setSelectedId(stat.id)}
          />
        ))}
      </View>

      {interactive && (
        <StatDetailModal stat={selectedStat} onClose={() => setSelectedId(null)} />
      )}
    </View>
  );
}

interface StatCardProps {
  stat: StatGridItem;
  width: number;
  interactive: boolean;
  emphasized: boolean;
  onPress: () => void;
}

function StatCard({ stat, width, interactive, emphasized, onPress }: StatCardProps) {
  const color = statColor(stat.id);
  const rgb = hexToRgb(color);
  const pct = Math.round((stat.score / stat.maxScore) * 100);
  const borderColor = emphasized ? `rgba(${rgb}, 0.55)` : `rgba(${rgb}, 0.2)`;
  const cardPoints = `0,0 ${width - CUT_SIZE},0 ${width},${CUT_SIZE} ${width},${CARD_HEIGHT} 0,${CARD_HEIGHT}`;
  const cornerPoints = `${width - CUT_SIZE},0 ${width},0 ${width},${CUT_SIZE}`;
  const gradientId = `accent-${stat.id}${emphasized ? '-em' : ''}`;
  const washId = `wash-${stat.id}`;
  const accentWidth = emphasized ? 4 : 3;

  return (
    <Pressable
      onPress={interactive ? onPress : undefined}
      disabled={!interactive}
      accessibilityRole={interactive ? 'button' : 'none'}
      accessibilityLabel={
        interactive ? `View ${stat.name} details — grade ${stat.rank}` : `${stat.name} — grade ${stat.rank}`
      }
      style={({ pressed }) => [
        styles.card,
        { width, height: CARD_HEIGHT },
        emphasized && {
          shadowColor: color,
          shadowOpacity: 0.55,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 0 },
          elevation: 6,
        },
        interactive && pressed && styles.cardPressed,
      ]}
    >
      <Svg width={width} height={CARD_HEIGHT} style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity="1" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </LinearGradient>
          {emphasized && (
            <LinearGradient id={washId} x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={color} stopOpacity="0.22" />
              <Stop offset="0.55" stopColor={color} stopOpacity="0.06" />
              <Stop offset="1" stopColor={Colors.surface} stopOpacity="0" />
            </LinearGradient>
          )}
        </Defs>
        <Polygon
          points={cardPoints}
          fill={Colors.surface}
          stroke={borderColor}
          strokeWidth={emphasized ? 1.5 : 1}
        />
        {emphasized && <Polygon points={cardPoints} fill={`url(#${washId})`} />}
        <Polygon
          points={cornerPoints}
          fill={emphasized ? `rgba(${rgb}, 0.45)` : `rgba(${rgb}, 0.15)`}
        />
        <Rect
          x={0}
          y={0}
          width={accentWidth}
          height={CARD_HEIGHT}
          fill={`url(#${gradientId})`}
        />
      </Svg>

      <View style={styles.cardContent}>
        <View style={styles.topRow}>
          <Text
            style={[
              styles.abbrev,
              { color: emphasized ? `rgba(${rgb}, 0.85)` : `rgba(${rgb}, 0.55)` },
            ]}
          >
            {stat.shortName}
          </Text>
          <Text
            style={[
              styles.grade,
              emphasized && styles.gradeEmphasized,
              {
                color,
                textShadowColor: emphasized ? `rgba(${rgb}, 0.85)` : `rgba(${rgb}, 0.4)`,
              },
            ]}
          >
            {stat.rank}
          </Text>
        </View>

        <View
          style={[
            styles.rule,
            {
              backgroundColor: emphasized ? `rgba(${rgb}, 0.35)` : `rgba(${rgb}, 0.12)`,
            },
          ]}
        />

        <Text style={styles.statName}>{stat.name.toUpperCase()}</Text>

        <View
          style={styles.progressTrack}
          accessibilityRole="progressbar"
          accessibilityLabel={`${stat.name} progress`}
          accessibilityValue={{ min: 0, max: stat.maxScore, now: stat.score }}
        >
          <View
            style={[
              styles.progressFill,
              emphasized && styles.progressFillEmphasized,
              {
                width: `${pct}%`,
                backgroundColor: color,
                shadowColor: color,
              },
            ]}
          />
        </View>
      </View>
    </Pressable>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: SCREEN_PADDING,
  },
  containerEmbedded: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CARD_GAP,
    width: '100%',
  },
  card: {
    position: 'relative',
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.85,
  },
  cardContent: {
    flex: 1,
    paddingTop: 14,
    paddingHorizontal: 14,
    paddingBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingLeft: 8,
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
  gradeEmphasized: {
    textShadowRadius: 22,
  },
  rule: {
    height: 1,
    marginBottom: 8,
    marginLeft: 8,
  },
  statName: {
    fontFamily: 'Cinzel_600SemiBold',
    fontSize: 14,
    lineHeight: 14,
    color: Colors.text.primary,
    letterSpacing: 0.56,
    marginBottom: 12,
    paddingLeft: 8,
  },
  progressTrack: {
    height: 3,
    backgroundColor: Colors.surface2,
  },
  progressFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
  progressFillEmphasized: {
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 4,
  },
});
