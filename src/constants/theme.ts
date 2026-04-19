export const COLORS = {
  primary: '#7C3AED',
  secondary: '#A78BFA',
  accent: '#EC4899',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  
  background: '#F9FAFB',
  surface: '#FFFFFF',
  surfaceLight: '#F3F4F6',
  surfaceDark: '#E5E7EB',
  
  text: '#111827',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  
  border: '#E5E7EB',
  shadow: '#000000',
  
  gradient: {
    primary: ['#7C3AED', '#A78BFA'],
    secondary: ['#EC4899', '#F472B6'],
    success: ['#10B981', '#34D399'],
    danger: ['#EF4444', '#F87171'],
    purple: ['#A78BFA', '#7C3AED'],
    ocean: ['#06B6D4', '#3B82F6'],
    sunset: ['#F59E0B', '#EF4444'],
  },
  
  category: {
    work: '#7C3AED',
    personal: '#10B981',
    shopping: '#F59E0B',
    health: '#EF4444',
    other: '#3B82F6',
  },
  
  priority: {
    low: '#9CA3AF',
    medium: '#F59E0B',
    high: '#EF4444',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const SHADOWS = {
  sm: {
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  xl: {
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 10,
  },
};
