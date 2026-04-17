import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Todo} from '../types';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, SHADOWS} from '../constants/theme';
import {CATEGORIES} from '../constants/categories';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
}) => {
  const category = CATEGORIES[todo.category];
  const priorityColor = COLORS.priority[todo.priority];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={[styles.priorityBar, {backgroundColor: priorityColor}]} />
        
        <TouchableOpacity
          style={[styles.checkbox, {borderColor: category.color}]}
          onPress={() => onToggle(todo.id)}>
          {todo.completed && (
            <View
              style={[
                styles.checkboxInner,
                {backgroundColor: category.color},
              ]}
            />
          )}
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={[styles.categoryText, {color: category.color}]}>
              {category.label}
            </Text>
          </View>
          
          <Text
            style={[
              styles.text,
              todo.completed && styles.completedText,
            ]}
            numberOfLines={2}>
            {todo.text}
          </Text>
          
          <Text style={styles.timestamp}>
            {new Date(todo.createdAt).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>

        {todo.completed && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedBadgeText}>✓</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => onDelete(todo.id)}
          style={styles.deleteButton}>
          <Text style={styles.deleteText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginLeft: SPACING.sm,
    marginRight: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 16,
    height: 16,
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
    fontSize: FONT_SIZE.md,
    marginRight: SPACING.xs,
  },
  categoryText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  text: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    fontWeight: '500',
    lineHeight: 22,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: COLORS.textLight,
  },
  timestamp: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  completedBadge: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  completedBadgeText: {
    color: COLORS.surface,
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: SPACING.sm,
    marginLeft: SPACING.xs,
  },
  deleteText: {
    fontSize: FONT_SIZE.lg,
  },
});
