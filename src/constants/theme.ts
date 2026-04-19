export const COLORS = {
  primary: '#6C5CE7',
  secondary: '#A29BFE',
  accent: '#FD79A8',
  success: '#00B894',
  warning: '#FDCB6E',
  danger: '#FF7675',
  
  background: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceLight: '#F1F3F5',
  
  text: '#2D3436',
  textSecondary: '#636E72',
  textLight: '#B2BEC3',
  
  border: '#DFE6E9',
  shadow: '#000000',
  
  gradient: {
    primary: ['#6C5CE7', '#A29BFE'],
    success: ['#00B894', '#55EFC4'],
    danger: ['#FF7675', '#FD79A8'],
    purple: ['#A29BFE', '#6C5CE7'],
  },
  
  category: {
    work: '#6C5CE7',
    personal: '#00B894',
    shopping: '#FDCB6E',
    health: '#FF7675',
    other: '#74B9FF',
  },
  
  priority: {
    low: '#B2BEC3',
    medium: '#FDCB6E',
    high: '#FF7675',
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};
