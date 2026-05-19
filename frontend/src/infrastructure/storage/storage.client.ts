import AsyncStorage from "@react-native-async-storage/async-storage";

export const storageClient = {
  async getItem(key: string) {
    return AsyncStorage.getItem(key);
  },

  async setItem(key: string, value: string) {
    return AsyncStorage.setItem(key, value);
  },

  async removeItem(key: string) {
    return AsyncStorage.removeItem(key);
  },
};