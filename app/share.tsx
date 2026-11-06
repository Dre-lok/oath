import { ReactNode, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ViewShot, { ViewShotRef } from 'react-native-view-shot';

import { StatGrid } from '../components/dashboard/StatGrid';
import { XpBar } from '../components/dashboard/XpBar';
import { ShareAvatar } from '../components/share/ShareAvatar';
import { ShareFooterLine } from '../components/share/ShareFooterLine';
import { ShareRankTitle } from '../components/share/ShareRankTitle';
import { ScreenHeader } from '../components/ui/ScreenHeader';
import { SaveIcon, ShareIcon } from '../components/ui/icons';
import { Colors } from '../constants/colors';

const SCREEN_PADDING = 20;
const CARD_PADDING = 20;

type SharingModule = typeof import('expo-sharing');
type MediaLibraryModule = typeof import('expo-media-library');

// expo-sharing / expo-media-library ship native modules that aren't present
// in every runtime (Expo Go, web preview, etc.) — importing them statically
// makes the *whole app* crash on load if the native module is missing,
// because Expo Router eagerly evaluates every route file. Loading them
// lazily and catching the failure here means a missing module just disables
// the corresponding action instead of taking down the app.
function loadSharing(): SharingModule | null {
  try {
    return require('expo-sharing');
  } catch {
    return null;
  }
}

function loadMediaLibrary(): MediaLibraryModule | null {
  try {
    return require('expo-media-library');
  } catch {
    return null;
  }
}

type Feedback = 'saved' | 'unavailable' | 'error' | null;

export default function ShareScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = screenWidth - SCREEN_PADDING * 2;
  const contentWidth = cardWidth - CARD_PADDING * 2;

  const viewShotRef = useRef<ViewShotRef>(null);
  const [busy, setBusy] = useState<'share' | 'save' | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const flashFeedback = (state: Feedback) => {
    setFeedback(state);
    setTimeout(() => setFeedback(null), 2400);
  };

  const handleShare = async () => {
    if (!viewShotRef.current || busy) return;
    setBusy('share');
    try {
      const sharing = loadSharing();
      if (!sharing) {
        flashFeedback('unavailable');
        return;
      }
      const uri = await viewShotRef.current.capture();
      const available = await sharing.isAvailableAsync();
      if (available) {
        await sharing.shareAsync(uri);
      } else {
        flashFeedback('unavailable');
      }
    } catch (err) {
      console.warn('Share failed', err);
      flashFeedback('error');
    } finally {
      setBusy(null);
    }
  };

  const handleSave = async () => {
    if (!viewShotRef.current || busy) return;
    setBusy('save');
    try {
      const mediaLibrary = loadMediaLibrary();
      if (!mediaLibrary) {
        flashFeedback('unavailable');
        return;
      }
      const uri = await viewShotRef.current.capture();
      const { status } = await mediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        await mediaLibrary.saveToLibraryAsync(uri);
        flashFeedback('saved');
      } else {
        flashFeedback('unavailable');
      }
    } catch (err) {
      console.warn('Save failed', err);
      flashFeedback('error');
    } finally {
      setBusy(null);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="SHARE CARD" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Only this ViewShot region is captured — action buttons and
            feedback text below live outside it. */}
        <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }} collapsable={false}>
          <View style={[styles.card, { width: cardWidth }]} collapsable={false}>
            <ShareAvatar width={contentWidth} />
            <ShareRankTitle playerClass="WARRIOR" subClass="Veteran" metalTier="Steel" />
            <XpBar xpCurrent={3240} xpMax={5000} style={styles.xpBarEmbedded} showLabels={false} />
            {/* Size against the padded content width (not the outer card).
                Matching the outer width while the parent still had CARD_PADDING
                made each cell too wide for two-across → left-aligned 1×4 stack. */}
            <StatGrid
              width={contentWidth}
              showHeader={false}
              interactive={false}
              emphasized
            />
            <ShareFooterLine label="EST." value="Day 47" />
          </View>
        </ViewShot>

        <View style={styles.actions}>
          <ActionButton
            icon={<ShareIcon color={Colors.gold} size={15} />}
            label="SHARE"
            busy={busy === 'share'}
            onPress={handleShare}
          />
          <ActionButton
            icon={<SaveIcon color={Colors.gold} size={15} />}
            label="SAVE"
            busy={busy === 'save'}
            onPress={handleSave}
          />
        </View>

        {feedback && (
          <Text style={[styles.feedback, feedback !== 'saved' && styles.feedbackError]}>
            {feedback === 'saved' && 'SAVED TO PHOTOS'}
            {feedback === 'unavailable' && 'REQUIRES A DEVELOPMENT BUILD'}
            {feedback === 'error' && 'SOMETHING WENT WRONG'}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  busy?: boolean;
  onPress: () => void;
}

function ActionButton({ icon, label, busy, onPress }: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={busy}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.actionButton,
        pressed && styles.actionButtonPressed,
        busy && styles.actionButtonBusy,
      ]}
    >
      {icon}
      <Text style={styles.actionLabel}>{busy ? '···' : label}</Text>
    </Pressable>
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
  card: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: CARD_PADDING,
    paddingHorizontal: CARD_PADDING,
  },
  xpBarEmbedded: {
    paddingHorizontal: 0,
    paddingTop: 10,
    paddingBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  // Subtler than a hard gold stroke: dim border + soft idle glow (same
  // vocabulary as the Quest chip / rank-title button).
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(200,152,10,0.32)',
    backgroundColor: Colors.surface,
    shadowColor: Colors.gold,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  actionButtonPressed: {
    opacity: 0.75,
    borderColor: 'rgba(200,152,10,0.55)',
    backgroundColor: Colors.surface2,
    shadowOpacity: 0.55,
    shadowRadius: 14,
  },
  actionButtonBusy: {
    opacity: 0.5,
  },
  actionLabel: {
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 12,
    letterSpacing: 2,
    color: Colors.gold,
  },
  feedback: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.text.secondary,
    marginTop: 14,
    textAlign: 'center',
  },
  feedbackError: {
    color: Colors.danger,
  },
});
