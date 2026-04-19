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
      <View style={[styles.container, isOverdue && styles.overdueContainer, todo.completed && styles.completedContainer]}>
        {/* Priority Indicator */}
        <View style={[styles.priorityBar, {backgroundColor: priorityColor}]} />

        {/* Checkbox */}
        <TouchableOpacity
          style={[styles.checkbox, {borderColor: todo.completed ? category.color : COLORS.border}]}
          onPress={() => onToggle(todo.id)}
          activeOpacity={0.7}>
          {todo.completed && (
            <LinearGradient
              colors={[category.color, category.color + 'CC']}
              style={styles.checkboxInner}>
              <Text style={styles.checkIcon}>✓</Text>
            </LinearGradient>
          )}
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.content}>
          {/* Category Badge */}
          <View style={styles.headerRow}>
            <View style={[styles.categoryBadge, {backgroundColor: category.color + '15'}]}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[styles.categoryText, {color: category.color}]}>
                {category.label}
              </Text>
            </View>
            {todo.reminder && !todo.completed && (
              <View style={styles.reminderBadge}>
                <Text style={styles.reminderIcon}>🔔</Text>
              </View>
            )}
          </View>

          {/* Todo Text */}
          <Text style={[styles.text, todo.completed && styles.completedText]} numberOfLines={2}>
            {todo.text}
          </Text>

          {/* Due Date */}
          {todo.dueDate && (
            <View
              style={[
                styles.dueDateContainer,
                isOverdue && styles.overdueDueDateContainer,
                isDueToday && styles.todayDueDateContainer,
              ]}>
              <Text style={styles.dueDateIcon}>
                {isOverdue ? '⚠️' : isDueToday ? '📅' : '📆'}
              </Text>
              <Text
                style={[
                  styles.dueDate,
                  isOverdue && styles.overdueDueDate,
                  isDueToday && styles.todayDueDate,
                ]}>
                {formatDueDate(todo.dueDate)}
              </Text>
            </View>
          )}

          {/* Notes */}
          {todo.notes && (
            <Text style={styles.notes} numberOfLines={1}>
              💭 {todo.notes}
            </Text>
          )}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(todo.id)} style={styles.actionBtn}>
            <View style={styles.actionBtnInner}>
              <Text style={styles.actionIcon}>✏️</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(todo.id)} style={styles.actionBtn}>
            <View style={[styles.actionBtnInner, styles.deleteBtn]}>
              <Text style={styles.actionIcon}>🗑️</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.md,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  overdueContainer: {
    borderColor: COLORS.danger,
    backgroundColor: '#FEF2F2',
  },
  completedContainer: {
    opacity: 0.7,
    backgroundColor: COLORS.surfaceLight,
  },
  priorityBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 2.5,
    marginLeft: SPACING.xs,
    marginRight: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: COLORS.surface,
    fontSize: FONT_SIZE.sm,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  categoryIcon: {
    fontSize: FONT_SIZE.sm,
    marginRight: SPACING.xs,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  reminderBadge: {
    marginLeft: SPACING.sm,
  },
  reminderIcon: {
    fontSize: FONT_SIZE.sm,
  },
  text: {
    fontSize: isSmallScreen ? FONT_SIZE.sm : FONT_SIZE.md,
    color: COLORS.text,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: SPACING.xs,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: COLORS.textLight,
    fontWeight: '400',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
    marginTop: SPACING.xs,
  },
  overdueDueDateContainer: {
    backgroundColor: '#FEE2E2',
  },
  todayDueDateContainer: {
    backgroundColor: '#FEF3C7',
  },
  dueDateIcon: {
    fontSize: FONT_SIZE.xs,
    marginRight: SPACING.xs,
  },
  dueDate: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  overdueDueDate: {
    color: COLORS.danger,
    fontWeight: 'bold',
  },
  todayDueDate: {
    color: COLORS.warning,
    fontWeight: 'bold',
  },
  notes: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginTop: SPACING.sm,
    paddingLeft: SPACING.sm,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.border,
  },
  actions: {
    flexDirection: 'column',
    marginLeft: SPACING.sm,
    gap: SPACING.xs,
  },
  actionBtn: {
    padding: SPACING.xs,
  },
  actionBtnInner: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    backgroundColor: '#FEE2E2',
  },
  actionIcon: {
    fontSize: FONT_SIZE.md,
  },
});
