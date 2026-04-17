import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TodoCategory, Priority} from '../types';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, SHADOWS} from '../constants/theme';
import {CATEGORIES} from '../constants/categories';

interface AddTodoModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (text: string, category: TodoCategory, priority: Priority) => void;
}

export const AddTodoModal: React.FC<AddTodoModalProps> = ({
  visible,
  onClose,
  onAdd,
}) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<TodoCategory>('personal');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim(), category, priority);
      setText('');
      setCategory('personal');
      setPriority('medium');
      onClose();
    }
  };

  const handleCategorySelect = (cat: TodoCategory) => {
    setCategory(cat);
  };

  const handlePrioritySelect = (pri: Priority) => {
    setPriority(pri);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        
        <View style={styles.container}>
          <View style={styles.handle} />
          
          <Text style={styles.title}>Thêm việc mới</Text>

          <TextInput
            style={styles.input}
            placeholder="Nhập công việc cần làm..."
            placeholderTextColor={COLORS.textLight}
            value={text}
            onChangeText={setText}
            multiline
            autoFocus
          />

          <Text style={styles.sectionTitle}>Danh mục</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}>
            {(Object.keys(CATEGORIES) as TodoCategory[]).map(cat => {
              const config = CATEGORIES[cat];
              const isSelected = category === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => handleCategorySelect(cat)}
                  style={[
                    styles.categoryChip,
                    isSelected && {
                      backgroundColor: config.color,
                      ...SHADOWS.md,
                    },
                  ]}>
                  <Text style={styles.categoryIcon}>{config.icon}</Text>
                  <Text
                    style={[
                      styles.categoryLabel,
                      isSelected && styles.categoryLabelSelected,
                    ]}>
                    {config.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <Text style={styles.sectionTitle}>Độ ưu tiên</Text>
          <View style={styles.priorityContainer}>
            {(['low', 'medium', 'high'] as Priority[]).map(pri => {
              const isSelected = priority === pri;
              const labels = {low: 'Thấp', medium: 'Trung bình', high: 'Cao'};
              return (
                <TouchableOpacity
                  key={pri}
                  onPress={() => handlePrioritySelect(pri)}
                  style={[
                    styles.priorityChip,
                    isSelected && {
                      backgroundColor: COLORS.priority[pri],
                      ...SHADOWS.md,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.priorityLabel,
                      isSelected && styles.priorityLabelSelected,
                    ]}>
                    {labels[pri]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            onPress={handleAdd}
            disabled={!text.trim()}
            style={styles.addButtonWrapper}>
            <LinearGradient
              colors={text.trim() ? COLORS.gradient.primary : ['#DFE6E9', '#B2BEC3']}
              style={styles.addButton}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={styles.addButtonText}>✨ Thêm công việc</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    paddingBottom: SPACING.xxl,
    maxHeight: '80%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    alignSelf: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  input: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  categoryScroll: {
    marginBottom: SPACING.lg,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
  },
  categoryIcon: {
    fontSize: FONT_SIZE.lg,
    marginRight: SPACING.xs,
  },
  categoryLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  categoryLabelSelected: {
    color: COLORS.surface,
  },
  priorityContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.xl,
  },
  priorityChip: {
    flex: 1,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  priorityLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  priorityLabelSelected: {
    color: COLORS.surface,
  },
  addButtonWrapper: {
    marginTop: SPACING.md,
  },
  addButton: {
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    ...SHADOWS.lg,
  },
  addButtonText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
});
