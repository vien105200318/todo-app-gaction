import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Todo} from '../types';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, SHADOWS} from '../constants/theme';
import {CATEGORIES} from '../constants/categories';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const isSmallScreen = SCREEN_WIDTH < 375;

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const category = CATEGORIES[todo.category];
  const priorityColor = COLORS.priority[todo.priority];

  const isOverdue = todo.dueDate && todo.dueDate < Date.now() && !todo.completed;
  const isDueToday =
    todo.dueDate &&
    todo.dueDate >= new Date().setHours(0, 0, 0, 0) &&
    todo.dueDate <= new Date().setHours(23, 59, 59, 999);

  const formatDueDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date().setHours(0, 0, 0, 0);
    const tomorrow = today + 86400000;

    if (timestamp >= today && timestamp < today + 86400000) {
      return `Hôm nay ${date.toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit'})}`;
    } else if (timestamp >= tomorrow && timestamp < tomorrow + 86400000) {
      return `Ngày mai ${date.toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit'})}`;
    }
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity
      onLongPress={() => onEdit(todo.id)}
      activeOpacity={0.7}
      style={styles.wrapper}>
      <View style={[styles.container, isOverdue && styles.overdueContainer]}>
        <View style={[styles.priorityBar, {backgroundColor: priorityColor}]} />

        <TouchableOpacity
          style={[styles.checkbox, {borderColor: category.color}]}
          onPress={() => onToggle(todo.id)}>
          {todo.completed && (
            <View style={[styles.checkboxInner, {backgroundColor: category.color}]} />
          )}
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={[styles.categoryText, {color: category.color}]}>
              {category.label}
            </Text>
            {todo.reminder && !todo.completed && (
              <Text style={styles.reminderIcon}>🔔</Text>
            )}
          </View>

          <Text style={[styles.text, todo.completed && styles.completedText]} numberOfLines={2}>
            {todo.text}
          </Text>

          {todo.dueDate && (
            <Text
              style={[
                styles.dueDate,
                isOverdue && styles.overdueDueDate,
                isDueToday && styles.todayDueDate,
              ]}>
              {isOverdue ? '⚠️ ' : isDueToday ? '📅 ' : '📆 '}
              {formatDueDate(todo.dueDate)}
            </Text>
          )}

          {todo.notes && (
            <Text style={styles.notes} numberOfLines={1}>
              📝 {todo.notes}
            </Text>
          )}
        </View>

        {todo.completed && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedBadgeText}>✓</Text>
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(todo.id)} style={styles.actionBtn}>
            <Text style={styles.actionIcon}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(todo.id)} style={styles.actionBtn}>
            <Text style={styles.actionIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.sm,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.sm,
    ...SHADOWS.md,
    overflow: 'hidden',
  },
  overdueContainer: {
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  priorityBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 2,
    marginLeft: SPACING.xs,
    marginRight: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: BORDER_RADIUS.full,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  categoryIcon: {
    fontSize: isSmallScreen ? FONT_SIZE.sm : FONT_SIZE.md,
    marginRight: SPACING.xs,
  },
  categoryText: {
    fontSize: isSmallScreen ? 10 : FONT_SIZE.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  reminderIcon: {
    fontSize: FONT_SIZE.xs,
    marginLeft: SPACING.xs,
  },
  text: {
    fontSize: isSmallScreen ? FONT_SIZE.sm : FONT_SIZE.md,
    color: COLORS.text,
    fontWeight: '500',
    lineHeight: 20,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: COLORS.textLight,
  },
  dueDate: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  overdueDueDate: {
    color: COLORS.danger,
    fontWeight: 'bold',
  },
  todayDueDate: {
    color: COLORS.warning,
    fontWeight: '600',
  },
  notes: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginTop: SPACING.xs,
  },
  completedBadge: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.xs,
  },
  completedBadgeText: {
    color: COLORS.surface,
    fontSize: FONT_SIZE.sm,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    marginLeft: SPACING.xs,
  },
  actionBtn: {
    padding: SPACING.xs,
  },
  actionIcon: {
    fontSize: isSmallScreen ? FONT_SIZE.md : FONT_SIZE.lg,
  },
});
