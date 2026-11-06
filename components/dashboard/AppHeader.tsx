import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { OathLogo } from '../ui/OathLogo';

const SCREEN_PADDING = 20;

export function AppHeader() {
  return (
    <View style={styles.container}>
      <OathLogo />
      <Text style={styles.wordmark}>OATH</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 12,
  },
  wordmark: {
    fontFamily: 'Cinzel_600SemiBold',
    fontSize: 13,
    letterSpacing: 7,
    color: 'rgba(200,152,10,0.3)',
  },
});
