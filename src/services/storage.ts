import AsyncStorage from '@react-native-async-storage/async-storage';
import {Todo} from '../types';

const STORAGE_KEY = '@TodoApp:todos';

export const StorageService = {
  async saveTodos(todos: Todo[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  },

  async loadTodos(): Promise<Todo[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading todos:', error);
      return [];
    }
  },

  async clearTodos(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing todos:', error);
    }
  },
};
