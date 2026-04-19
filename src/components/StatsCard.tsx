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
    padding: isSmallScreen ? SPACING.md : SPACING.lg,
    marginHorizontal: SPACING.sm,
    marginBottom: SPACING.md,
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
    fontSize: isSmallScreen ? FONT_SIZE.xxl : FONT_SIZE.xxxl,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  mainLabel: {
    fontSize: isSmallScreen ? FONT_SIZE.sm : FONT_SIZE.md,
    color: COLORS.surface,
    opacity: 0.9,
    marginTop: SPACING.xs,
  },
  divider: {
    width: 1,
    height: isSmallScreen ? 50 : 60,
    backgroundColor: COLORS.surface,
    opacity: 0.3,
    marginHorizontal: isSmallScreen ? SPACING.md : SPACING.lg,
  },
  statsRow: {
    flex: 1,
  },
  stat: {
    marginBottom: SPACING.xs,
  },
  statNumber: {
    fontSize: isSmallScreen ? FONT_SIZE.lg : FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.surface,
    opacity: 0.8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: BORDER_RADIUS.full,
    marginTop: SPACING.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.full,
  },
});
