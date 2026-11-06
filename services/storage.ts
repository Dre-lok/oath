import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageAdapter = {
  get: async <T>(key: string): Promise<T | null> => {
    const val = await AsyncStorage.getItem(key);
    return val ? (JSON.parse(val) as T) : null;
  },

  set: async <T>(key: string, value: T): Promise<void> => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  delete: async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
  },

  list: async (prefix: string): Promise<string[]> => {
    const keys = await AsyncStorage.getAllKeys();
    return keys.filter((k) => k.startsWith(prefix));
  },
};
