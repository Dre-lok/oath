import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';

interface ShareRankTitleProps {
  playerClass: string;
  // Class title at the current metal tier (e.g. Veteran) — vision v5 §A6b.
  subClass: string;
  // Universal metal tier (e.g. Steel) — vision v5 §A4.
  metalTier?: string;
}

// Dual rank label: CLASS · METAL TITLE — metal + class title are the two
// parallel skins on the same XP scale (vision v5 A4 / A6b).
export function ShareRankTitle({ playerClass, subClass, metalTier }: ShareRankTitleProps) {
  const titleLine = metalTier
    ? `${metalTier.toUpperCase()} ${subClass.toUpperCase()}`
    : subClass.toUpperCase();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {playerClass.toUpperCase()}
        <Text style={styles.dash}> — </Text>
        {titleLine}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 2,
  },
  title: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 17,
    letterSpacing: 2.5,
    color: Colors.gold,
    textShadowColor: 'rgba(200,152,10,0.35)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 14,
    textAlign: 'center',
  },
  dash: {
    color: Colors.text.secondary,
  },
});
