import {CategoryConfig, TodoCategory} from '../types';
import {COLORS} from './theme';

export const CATEGORIES: Record<TodoCategory, CategoryConfig> = {
  work: {
    icon: '💼',
    color: COLORS.category.work,
    label: 'Công việc',
  },
  personal: {
    icon: '👤',
    color: COLORS.category.personal,
    label: 'Cá nhân',
  },
  shopping: {
    icon: '🛒',
    color: COLORS.category.shopping,
    label: 'Mua sắm',
  },
  health: {
    icon: '💪',
    color: COLORS.category.health,
    label: 'Sức khỏe',
  },
  other: {
    icon: '📌',
    color: COLORS.category.other,
    label: 'Khác',
  },
};
