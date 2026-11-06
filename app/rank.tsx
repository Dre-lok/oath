import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RankTierBox } from '../components/rank/RankTierBox';
import { ScreenHeader } from '../components/ui/ScreenHeader';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Colors } from '../constants/colors';
import { WARRIOR_RANKS } from '../constants/rankProgression';

const SCREEN_PADDING = 20;
const GRID_GAP = 12;
const COLUMNS = 3;

export default function RankScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const boxWidth = (screenWidth - SCREEN_PADDING * 2 - GRID_GAP * (COLUMNS - 1)) / COLUMNS;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="RANK" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader label="◇ WARRIOR PROGRESSION ◇" />

        <View style={styles.grid}>
          {WARRIOR_RANKS.map((tier) => (
            <RankTierBox key={tier.rank} tier={tier} width={boxWidth} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  content: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
    marginTop: 4,
  },
});
