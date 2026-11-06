import Svg, { Circle, Path } from 'react-native-svg';

import { Colors } from '../../constants/colors';

export function OathLogo() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M9 1L16 4.5V9.5C16 13 12.8 16.2 9 17C5.2 16.2 2 13 2 9.5V4.5L9 1Z"
        fill={Colors.goldGlow}
        stroke={Colors.gold}
        strokeWidth={0.8}
      />
      <Path
        d="M9 5L12.5 6.8V9.5C12.5 11.5 10.9 13.3 9 13.8C7.1 13.3 5.5 11.5 5.5 9.5V6.8L9 5Z"
        fill="rgba(200,152,10,0.2)"
      />
      <Circle cx={9} cy={9.5} r={1.5} fill={Colors.gold} opacity={0.7} />
    </Svg>
  );
}
