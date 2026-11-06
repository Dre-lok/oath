import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';

interface ShareFooterLineProps {
  label: string;
  value: string;
}

// Flexible bottom slot — swap label/value for a streak count, "Est. [date]",
// or any other single stat without touching layout.
export function ShareFooterLine({ label, value }: ShareFooterLineProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  label: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.text.secondary,
  },
  value: {
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 13,
    letterSpacing: 1,
    color: Colors.gold,
  },
});
