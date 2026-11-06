import { LinearGradient } from 'expo-linear-gradient';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Colors } from '../../constants/colors';

const SCREEN_PADDING = 20;

interface XpBarProps {
  xpCurrent: number;
  xpMax: number;
  // Lets embedding contexts (e.g. the Share card) override the bar's own
  // horizontal padding so it lines up with a differently-padded container.
  style?: StyleProp<ViewStyle>;
  // Hides the "EXPERIENCE" label and the numeric values, leaving just the
  // track — used on the Share card where the bar alone is enough.
  showLabels?: boolean;
}

export function XpBar({ xpCurrent, xpMax, style, showLabels = true }: XpBarProps) {
  const xpPercent = Math.round((xpCurrent / xpMax) * 100);

  return (
    <View style={[styles.container, style]}>
      {showLabels && <Text style={styles.label}>EXPERIENCE</Text>}

      <View
        style={styles.track}
        accessibilityRole="progressbar"
        accessibilityLabel="Experience points"
        accessibilityValue={{ min: 0, max: xpMax, now: xpCurrent }}
      >
        {[25, 50, 75].map((tick) => (
          <View key={tick} style={[styles.tick, { left: `${tick}%` }]} />
        ))}
        <View style={[styles.fillWrap, { width: `${xpPercent}%` }]}>
          <LinearGradient
            colors={[Colors.goldDim, Colors.gold]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.fill}
          />
        </View>
      </View>

      {showLabels && (
        <Text style={styles.values}>
          {xpCurrent.toLocaleString()} / {xpMax.toLocaleString()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 8,
    paddingBottom: 16,
    alignItems: 'center',
  },
  label: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    letterSpacing: 2.7,
    color: Colors.text.secondary,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  track: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.surface2,
    borderRadius: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  tick: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(7,8,15,0.8)',
    zIndex: 2,
  },
  fillWrap: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: 1,
    overflow: 'hidden',
    shadowColor: Colors.gold,
    shadowOpacity: 0.55,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
  fill: {
    flex: 1,
  },
  values: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    color: 'rgba(200,152,10,0.7)',
    marginTop: 8,
    textAlign: 'center',
  },
});
