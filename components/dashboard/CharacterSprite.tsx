import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../constants/colors';
import { ShareIcon } from '../ui/icons';

const SCREEN_PADDING = 20;
// Native crop of fighter-warrior-b.png is 742x602 — used to size the frame
// so "contain" doesn't letterbox the sprite with dead space.
const SPRITE_ASPECT = 742 / 602;
const MAX_SPRITE_WIDTH = 340;

// Metal-tier accents for the identity-plate title (vision v5 A4).
const TIER = {
  bronze: { color: Colors.tier.bronze, glow: 'rgba(160,98,42,0.45)', label: '#b87840' },
  iron: { color: Colors.tier.iron, glow: 'rgba(110,110,115,0.45)', label: '#9a9aa0' },
  steel: { color: Colors.tier.steel, glow: 'rgba(138,154,172,0.5)', label: '#b0c0d0' },
  gold: { color: Colors.tier.gold, glow: 'rgba(200,152,10,0.55)', label: Colors.gold },
  platinum: { color: Colors.tier.platinum, glow: 'rgba(79,209,197,0.5)', label: '#7ee0d6' },
  diamond: { color: Colors.tier.diamond, glow: 'rgba(79,195,247,0.5)', label: '#8ad8ff' },
  obsidian: { color: Colors.tier.obsidian, glow: 'rgba(107,91,149,0.55)', label: '#a898d0' },
} as const;

type SubClassTier = keyof typeof TIER;

interface CharacterSpriteProps {
  playerName: string;
  playerClass: string;
  subClass: string;
  subClassTier?: SubClassTier;
}

export function CharacterSprite({
  playerName,
  playerClass,
  subClass,
  subClassTier = 'steel',
}: CharacterSpriteProps) {
  const router = useRouter();
  const tier = TIER[subClassTier];
  const { width: screenWidth } = useWindowDimensions();
  const spriteWidth = Math.min(screenWidth * 0.94, MAX_SPRITE_WIDTH);
  const spriteHeight = spriteWidth / SPRITE_ASPECT;

  return (
    <View style={styles.container}>
      <View style={styles.nameBlock}>
        <Text style={styles.playerName}>{playerName.toUpperCase()}</Text>
        <LinearGradient
          colors={['transparent', 'rgba(200,152,10,0.25)', 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.nameRule}
        />
      </View>

      <View style={[styles.stage, { width: screenWidth, marginHorizontal: -SCREEN_PADDING }]}>
        <View style={styles.ambientGlow} />
        <View style={styles.spriteWrapper}>
          <Image
            source={require('../../assets/sprites/fighter-warrior-b.png')}
            style={[styles.sprite, { width: spriteWidth, height: spriteHeight }]}
            resizeMode="contain"
            accessibilityLabel={`${playerName} — ${playerClass} / ${subClass}`}
          />
          <LinearGradient
            colors={['transparent', Colors.bg]}
            style={[styles.spriteFade, { height: spriteHeight * 0.3 }]}
            pointerEvents="none"
          />
        </View>

        <Pressable
          onPress={() => router.push('/share')}
          accessibilityRole="button"
          accessibilityLabel="Share character card"
          hitSlop={10}
          style={({ pressed }) => [styles.shareButton, pressed && styles.shareButtonPressed]}
        >
          <ShareIcon color={Colors.bg} size={15} />
        </Pressable>
      </View>

      <View style={styles.identityPlate}>
        <View style={styles.classRow}>
          <ClassRule direction="left" />
          <Text style={styles.playerClass}>{playerClass}</Text>
          <ClassRule direction="right" />
        </View>

        <Pressable
          onPress={() => router.push('/rank')}
          accessibilityRole="button"
          accessibilityLabel={`View rank — ${subClass}`}
          hitSlop={8}
        >
          {({ pressed }) => (
            <View style={[styles.subClassRow, pressed && styles.subClassRowPressed]}>
              <TierMark color={tier.color} glow={tier.glow} />
              <Text style={[styles.subClass, { color: tier.label }]}>
                {subClass.toUpperCase()}
              </Text>
              <TierMark color={tier.color} glow={tier.glow} />
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}

function ClassRule({ direction }: { direction: 'left' | 'right' }) {
  return (
    <LinearGradient
      colors={
        direction === 'left'
          ? ['transparent', 'rgba(200,152,10,0.35)']
          : ['rgba(200,152,10,0.35)', 'transparent']
      }
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.classRule}
    />
  );
}

function TierMark({ color, glow }: { color: string; glow: string }) {
  return (
    <Svg width={9} height={9} viewBox="0 0 9 9" fill="none">
      <Path d="M4.5 0.7L8.3 4.5L4.5 8.3L0.7 4.5Z" stroke={color} strokeWidth={0.75} opacity={0.55} />
      <Path d="M4.5 2.5L6.5 4.5L4.5 6.5L2.5 4.5Z" fill={color} opacity={0.9} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 4,
  },
  nameBlock: {
    alignItems: 'center',
    marginBottom: 4,
    zIndex: 10,
  },
  playerName: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: 2.2,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  nameRule: {
    marginTop: 4,
    width: 80,
    height: 1,
  },
  stage: {
    alignItems: 'center',
    position: 'relative',
  },
  ambientGlow: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(200,152,10,0.04)',
    opacity: 0.5,
  },
  spriteWrapper: {
    zIndex: 10,
  },
  // Overlaid in the frame's corner rather than inline with the identity
  // plate, so it doesn't compete with or block the character art. Solid
  // gold fill (the app's signature accent) with a dark icon makes it read
  // as a real button against the busy hero art, rather than a faint
  // bordered ghost box that blended in.
  shareButton: {
    position: 'absolute',
    top: 6,
    right: SCREEN_PADDING,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gold,
    zIndex: 20,
    shadowColor: Colors.gold,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  shareButtonPressed: {
    opacity: 0.8,
    shadowOpacity: 0.75,
    shadowRadius: 12,
  },
  // No shadow/elevation here on purpose — Android's `elevation` shadow (and,
  // in some RN versions, iOS shadowRadius too) is computed from the layer's
  // rectangular bounding box, not the PNG's alpha silhouette. On an
  // irregularly-shaped cutout like this sprite that rendered as a visible
  // grey/dark box blurred into the transparent corners of the image frame —
  // i.e. the "discoloration halo" around the character.
  sprite: {},
  spriteFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  identityPlate: {
    alignItems: 'center',
    marginTop: 12,
    zIndex: 10,
  },
  classRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  playerClass: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 23,
    letterSpacing: 6.9,
    color: Colors.gold,
    textShadowColor: 'rgba(200,152,10,0.35)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  classRule: {
    width: 32,
    height: 1,
  },
  // Bordered chip — same soft gold border + minor glow as the Quest header
  // chip. Solid navy surface (not a translucent gold wash).
  subClassRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(200,152,10,0.32)',
    backgroundColor: Colors.surface,
    shadowColor: Colors.gold,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
  subClassRowPressed: {
    opacity: 0.7,
    backgroundColor: Colors.surface2,
    borderColor: 'rgba(200,152,10,0.55)',
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  subClass: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 2.4,
    opacity: 0.9,
  },
});
