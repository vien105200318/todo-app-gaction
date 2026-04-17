import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Pressable} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {Todo} from '../types';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, SHADOWS} from '../constants/theme';
import {CATEGORIES} from '../constants/categories';
import {haptics} from '../utils/haptics';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const checkScale = useSharedValue(todo.completed ? 1 : 0);

  useEffect(() => {
    checkScale.value = withSpring(todo.completed ? 1 : 0);
  }, [todo.completed, checkScale]);

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = e.translationX < 0 ? e.translationX : 0;
    })
    .onEnd(() => {
      if (translateX.value < -100) {
        translateX.value = withTiming(-200);
        opacity.value = withTiming(0, {duration: 300}, () => {
          runOnJS(onDelete)(todo.id);
          runOnJS(haptics.success)();
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const longPressGesture = Gesture.LongPress()
    .minDuration(500)
    .onStart(() => {
      runOnJS(haptics.heavy)();
      scale.value = withSpring(0.95);
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      if (onEdit) {
        runOnJS(onEdit)(todo.id);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {scale: scale.value},
    ],
    opacity: opacity.value,
  }));

  const deleteButtonStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -100], [0, 1]),
  }));

  const checkboxAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: checkScale.value}],
  }));

  const category = CATEGORIES[todo.category];
  const priorityColor = COLORS.priority[todo.priority];

  const handleToggle = () => {
    haptics.light();
    onToggle(todo.id);
  };

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.deleteButton, deleteButtonStyle]}>
        <LinearGradient
          colors={COLORS.gradient.danger}
          style={styles.deleteGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={styles.deleteText}>🗑️ Xóa</Text>
        </LinearGradient>
      </Animated.View>

      <GestureDetector gesture={Gesture.Simultaneous(panGesture, longPressGesture)}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <View style={[styles.priorityBar, {backgroundColor: priorityColor}]} />
          
          <Pressable
            style={[styles.checkbox, {borderColor: category.color}]}
            onPress={handleToggle}>
            <Animated.View
              style={[
                styles.checkboxInner,
                {backgroundColor: category.color},
                checkboxAnimatedStyle,
              ]}
            />
          </Pressable>

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
        </Animated.View>
      </GestureDetector>
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
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.lg,
  },
  deleteText: {
    color: COLORS.surface,
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
  },
});
