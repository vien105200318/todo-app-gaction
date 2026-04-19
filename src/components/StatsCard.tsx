import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, SHADOWS} from '../constants/theme';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const isSmallScreen = SCREEN_WIDTH < 375;

interface StatsCardProps {
  total: number;
  completed: number;
  active: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  total,
  completed,
  active,
}) => {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={COLORS.gradient.primary}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={styles.content}>
          <View style={styles.mainStat}>
            <View style={styles.percentageCircle}>
              <Text style={styles.mainNumber}>{completionRate}%</Text>
            </View>
            <Text style={styles.mainLabel}>Hoàn thành</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, {backgroundColor: 'rgba(255,255,255,0.25)'}]}>
                <Text style={styles.statIcon}>📋</Text>
              </View>
              <Text style={styles.statNumber}>{total}</Text>
              <Text style={styles.statLabel}>Tổng</Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, {backgroundColor: 'rgba(255,255,255,0.25)'}]}>
                <Text style={styles.statIcon}>⏳</Text>
              </View>
              <Text style={styles.statNumber}>{active}</Text>
              <Text style={styles.statLabel}>Đang làm</Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, {backgroundColor: 'rgba(255,255,255,0.25)'}]}>
                <Text style={styles.statIcon}>✅</Text>
              </View>
              <Text style={styles.statNumber}>{completed}</Text>
              <Text style={styles.statLabel}>Hoàn thành</Text>
            </View>
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {width: `${completionRate}%`},
            ]}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...SHADOWS.lg,
  },
  gradient: {
    borderRadius: BORDER_RADIUS.xl,
    padding: isSmallScreen ? SPACING.md : SPACING.lg,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainStat: {
    alignItems: 'center',
  },
  percentageCircle: {
    width: isSmallScreen ? 80 : 90,
    height: isSmallScreen ? 80 : 90,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  mainNumber: {
    fontSize: isSmallScreen ? FONT_SIZE.xl : FONT_SIZE.xxl,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  mainLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.surface,
    opacity: 0.95,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  statIcon: {
    fontSize: FONT_SIZE.lg,
  },
  statNumber: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.surface,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.surface,
    opacity: 0.9,
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: BORDER_RADIUS.full,
    marginTop: SPACING.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.full,
  },
});
