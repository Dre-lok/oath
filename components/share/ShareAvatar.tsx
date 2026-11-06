import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { Colors } from '../../constants/colors';

const SPRITE = require('../../assets/sprites/fighter-warrior-b.png');

// Same native crop ratio as the Dashboard's CharacterSprite.
const SPRITE_ASPECT = 742 / 602;

interface ShareAvatarProps {
  width: number;
}

export function ShareAvatar({ width }: ShareAvatarProps) {
  const height = width / SPRITE_ASPECT;
  const [failed, setFailed] = useState(false);

  return (
    // collapsable={false}: Android optimizes empty-looking views out of the
    // native hierarchy; ViewShot then captures a blank frame for the sprite.
    <View style={[styles.stage, { width, height }]} collapsable={false}>
      <View style={[styles.ambientGlow, styles.noPointer]} />
      {!failed && (
        <View style={styles.spriteWrapper} collapsable={false}>
          <Image
            source={SPRITE}
            style={{ width, height }}
            resizeMode="contain"
            fadeDuration={0}
            onError={() => setFailed(true)}
            accessibilityLabel="Character portrait"
          />
        </View>
      )}
      <LinearGradient
        colors={['transparent', Colors.surface]}
        style={[styles.fade, { height: height * 0.26 }, styles.noPointer]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  ambientGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(200,152,10,0.05)',
  },
  noPointer: {
    pointerEvents: 'none',
  },
  spriteWrapper: {
    zIndex: 10,
  },
  fade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 11,
  },
});
