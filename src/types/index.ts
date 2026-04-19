export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: TodoCategory;
  priority: Priority;
  createdAt: number;
  completedAt?: number;
  notes?: string;
}

export type TodoCategory = 'work' | 'personal' | 'shopping' | 'health' | 'other';
export type Priority = 'low' | 'medium' | 'high';
export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'date' | 'priority' | 'category';

export interface CategoryConfig {
  icon: string;
  color: string;
  label: string;
}
