import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../constants/colors';

const SCREEN_PADDING = 20;

export function OathDivider() {
  return (
    <View style={styles.container}>
      <View style={[styles.line, styles.lineLeft]} />
      <Svg width={10} height={10} viewBox="0 0 10 10" fill="none">
        <Path d="M5 1L9 5L5 9L1 5Z" stroke="rgba(200,152,10,0.25)" strokeWidth={0.8} />
        <Path d="M5 3L7 5L5 7L3 5Z" fill="rgba(200,152,10,0.12)" />
      </Svg>
      <View style={[styles.line, styles.lineRight]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SCREEN_PADDING,
    marginVertical: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  lineLeft: {
    marginRight: 8,
    opacity: 0.6,
  },
  lineRight: {
    marginLeft: 8,
    opacity: 0.6,
  },
});
