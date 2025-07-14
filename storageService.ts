import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageService = {
  async setData(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error('Error saving to storage:', e);
    }
  },
  async getData(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (e) {
      console.error('Error retrieving from storage:', e);
      return null;
    }
  },
  async clearAll() {
    await AsyncStorage.clear();
  },
};
