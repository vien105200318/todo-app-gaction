import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, SHADOWS} from '../constants/theme';

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
    <LinearGradient
      colors={COLORS.gradient.primary}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.content}>
        <View style={styles.mainStat}>
          <Text style={styles.mainNumber}>{completionRate}%</Text>
          <Text style={styles.mainLabel}>Hoàn thành</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{total}</Text>
            <Text style={styles.statLabel}>Tổng</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{active}</Text>
            <Text style={styles.statLabel}>Đang làm</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{completed}</Text>
            <Text style={styles.statLabel}>Xong</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    ...SHADOWS.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainStat: {
    flex: 1,
  },
  mainNumber: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  mainLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.surface,
    opacity: 0.9,
    marginTop: SPACING.xs,
  },
  divider: {
    width: 1,
    height: 60,
    backgroundColor: COLORS.surface,
    opacity: 0.3,
    marginHorizontal: SPACING.lg,
  },
  statsRow: {
    flex: 1,
  },
  stat: {
    marginBottom: SPACING.sm,
  },
  statNumber: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  statLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.surface,
    opacity: 0.8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
