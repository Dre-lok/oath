import Svg, { Path } from 'react-native-svg';

interface IconProps {
  color: string;
  size?: number;
}

// Classic "share" glyph — arrow out of an open box.
export function ShareIcon({ color, size = 14 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path d="M8 1.4V10" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Path
        d="M4.8 4.3L8 1.1L11.2 4.3"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.5 7.5V13.2C2.5 13.75 2.95 14.2 3.5 14.2H12.5C13.05 14.2 13.5 13.75 13.5 13.2V7.5"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Paired "save" glyph — arrow into a tray, mirrors ShareIcon's silhouette.
export function SaveIcon({ color, size = 14 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path d="M8 1.4V9.6" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Path
        d="M4.8 6.6L8 9.8L11.2 6.6"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.5 11.5V13.2C2.5 13.75 2.95 14.2 3.5 14.2H12.5C13.05 14.2 13.5 13.75 13.5 13.2V11.5"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
