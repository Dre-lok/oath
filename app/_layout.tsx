import {
  Cinzel_600SemiBold,
  Cinzel_700Bold,
  useFonts as useCinzelFonts,
} from '@expo-google-fonts/cinzel';
import {
  SpaceMono_400Regular,
  SpaceMono_700Bold,
  useFonts as useSpaceMonoFonts,
} from '@expo-google-fonts/space-mono';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { Colors } from '../constants/colors';
import { TaskStoreProvider } from '../hooks/useTaskStore';

export default function RootLayout() {
  const [cinzelLoaded] = useCinzelFonts({ Cinzel_600SemiBold, Cinzel_700Bold });
  const [monoLoaded] = useSpaceMonoFonts({
    SpaceMono_400Regular,
    SpaceMono_700Bold,
  });

  if (!cinzelLoaded || !monoLoaded) {
    return <View style={{ flex: 1, backgroundColor: Colors.bg }} />;
  }

  return (
    <TaskStoreProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.bg },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="log" />
        <Stack.Screen name="rank" />
        <Stack.Screen name="share" />
        <Stack.Screen name="task-editor" options={{ presentation: 'modal' }} />
      </Stack>
    </TaskStoreProvider>
  );
}
