import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../components/dashboard/AppHeader';
import { CharacterSprite } from '../components/dashboard/CharacterSprite';
import { QuestList } from '../components/dashboard/QuestList';
import { StatGrid } from '../components/dashboard/StatGrid';
import { XpBar } from '../components/dashboard/XpBar';
import { Colors } from '../constants/colors';
import { OathDivider } from '../components/ui/OathDivider';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader />

        <CharacterSprite
          playerName="Vex Draken"
          playerClass="WARRIOR"
          subClass="Veteran"
          subClassTier="steel"
        />

        <XpBar xpCurrent={3240} xpMax={5000} />

        <OathDivider />

        <StatGrid />

        <OathDivider />

        <QuestList />

        <View style={styles.homeIndicator} />
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
    flexGrow: 1,
    paddingBottom: 4,
  },
  homeIndicator: {
    alignSelf: 'center',
    width: 128,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2a2c3a',
    marginTop: 16,
    marginBottom: 8,
  },
});
