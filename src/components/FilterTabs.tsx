import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FilterType} from '../types';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZE} from '../constants/theme';

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
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
    {key: 'completed', label: 'Hoàn thành', icon: '✅'},
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
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.xs,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  tab: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: 4,
    borderRadius: BORDER_RADIUS.sm,
    minHeight: 60,
  },
  tabActive: {
    backgroundColor: COLORS.surface,
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    fontSize: FONT_SIZE.lg,
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  labelActive: {
    color: COLORS.text,
  },
  badge: {
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xs,
  },
  badgeActive: {
    backgroundColor: COLORS.primary,
  },
  badgeText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  badgeTextActive: {
    color: COLORS.surface,
  },
});
