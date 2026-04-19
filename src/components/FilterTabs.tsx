import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {FilterType} from '../types';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZE} from '../constants/theme';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const isSmallScreen = SCREEN_WIDTH < 375;

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
    today: number;
    upcoming: number;
  };
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  activeFilter,
  onFilterChange,
  counts,
}) => {
  const filters: {key: FilterType; label: string; icon: string}[] = [
    {key: 'all', label: 'Tất cả', icon: '📋'},
    {key: 'active', label: 'Đang làm', icon: '⏳'},
    {key: 'completed', label: 'Xong', icon: '✅'},
    {key: 'today', label: 'Hôm nay', icon: '📅'},
    {key: 'upcoming', label: 'Sắp tới', icon: '📆'},
  ];

  const handleFilterPress = (filter: FilterType) => {
    onFilterChange(filter);
  };

  return (
    <View style={styles.container}>
      {filters.map(filter => {
        const isActive = activeFilter === filter.key;
        const count = counts[filter.key];

        return (
          <TouchableOpacity
            key={filter.key}
            onPress={() => handleFilterPress(filter.key)}
            style={[
              styles.tab,
              isActive && styles.tabActive,
            ]}>
            <Text style={styles.icon}>{filter.icon}</Text>
            <Text
              style={[
                styles.label,
                isActive && styles.labelActive,
              ]}
              numberOfLines={1}>
              {filter.label}
            </Text>
            <View
              style={[
                styles.badge,
                isActive && styles.badgeActive,
              ]}>
              <Text
                style={[
                  styles.badgeText,
                  isActive && styles.badgeTextActive,
                ]}>
                {count}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xs,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  tab: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: 2,
    borderRadius: BORDER_RADIUS.md,
    minHeight: isSmallScreen ? 60 : 65,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.md,
  },
  icon: {
    fontSize: isSmallScreen ? FONT_SIZE.lg : FONT_SIZE.xl,
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: isSmallScreen ? 10 : FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  labelActive: {
    color: COLORS.surface,
    fontWeight: '700',
  },
  badge: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.full,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xs,
  },
  badgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  badgeText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  badgeTextActive: {
    color: COLORS.surface,
    fontWeight: 'bold',
  },
});
