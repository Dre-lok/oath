import Svg, { Circle, Polygon } from 'react-native-svg';

interface RankBadgeIconProps {
  rank: number;
  color: string;
  filled: boolean;
  size: number;
}

// Geometric placeholder badge — a faceted star/gem polygon that gains more
// points (and extra concentric detail) as rank increases, so higher tiers
// read as visibly more ornate even without real illustrated art.
export function RankBadgeIcon({ rank, color, filled, size }: RankBadgeIconProps) {
  const cx = size / 2;
  const cy = size / 2;
  const outerRadius = size / 2 - 3;
  const spikes = 3 + rank; // 4 (rank 1) → 10 (rank 7)
  const innerRatio = 0.62 - (rank - 1) * 0.033; // blunter early, sharper late
  const innerRadius = outerRadius * innerRatio;

  const fillProps = filled
    ? { fill: color, fillOpacity: 0.85 }
    : { fill: 'transparent', fillOpacity: 0 };

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Polygon
        points={starPoints(cx, cy, spikes, outerRadius, innerRadius)}
        {...fillProps}
        stroke={color}
        strokeWidth={filled ? 1.4 : 1.2}
        strokeOpacity={filled ? 1 : 0.7}
        strokeLinejoin="round"
      />

      {rank >= 4 && (
        <Polygon
          points={starPoints(cx, cy, spikes, outerRadius * 0.56, innerRadius * 0.56)}
          fill={filled ? color : 'transparent'}
          fillOpacity={filled ? 0.35 : 0}
          stroke={color}
          strokeWidth={0.8}
          strokeOpacity={filled ? 0.55 : 0.4}
          strokeLinejoin="round"
        />
      )}

      {rank >= 6 && (
        <Circle
          cx={cx}
          cy={cy}
          r={size * 0.07}
          fill={filled ? color : 'transparent'}
          stroke={color}
          strokeWidth={filled ? 0 : 0.8}
          strokeOpacity={0.6}
        />
      )}
    </Svg>
  );
}

function starPoints(
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number,
): string {
  const points: string[] = [];
  const step = Math.PI / spikes;
  let rotation = -Math.PI / 2;

  for (let i = 0; i < spikes; i++) {
    points.push(`${(cx + Math.cos(rotation) * outerRadius).toFixed(2)},${(cy + Math.sin(rotation) * outerRadius).toFixed(2)}`);
    rotation += step;
    points.push(`${(cx + Math.cos(rotation) * innerRadius).toFixed(2)},${(cy + Math.sin(rotation) * innerRadius).toFixed(2)}`);
    rotation += step;
  }

  return points.join(' ');
}
