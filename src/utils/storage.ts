import AsyncStorage from '@react-native-community/async-storage';

export const setStorageItem = async (key: string, data: any): Promise<void> => {
  return AsyncStorage.setItem(key, JSON.stringify(data));
};

export const removeStorageItem = async (key: string): Promise<void> => {
  return AsyncStorage.removeItem(key);
};

export const getStorageItem = async <T>(key: string): Promise<T | null> => {
  const item = await AsyncStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return null;
};
