import React, {useState, useEffect} from 'react';
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
  Switch,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import {Todo, TodoCategory, Priority} from '../types';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, SHADOWS} from '../constants/theme';
import {CATEGORIES} from '../constants/categories';

interface EditTodoModalProps {
  visible: boolean;
  todo: Todo | null;
  onClose: () => void;
  onSave: (todo: Todo) => void;
}

export const EditTodoModal: React.FC<EditTodoModalProps> = ({
  visible,
  todo,
  onClose,
  onSave,
}) => {
  const [text, setText] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState<TodoCategory>('personal');
  const [priority, setPriority] = useState<Priority>('medium');
  const [hasDueDate, setHasDueDate] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [hasReminder, setHasReminder] = useState(false);
  const [reminderDate, setReminderDate] = useState(new Date());
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  const [showReminderPicker, setShowReminderPicker] = useState(false);

  useEffect(() => {
    if (todo) {
      setText(todo.text);
      setNotes(todo.notes || '');
      setCategory(todo.category);
      setPriority(todo.priority);
      setHasDueDate(!!todo.dueDate);
      setDueDate(todo.dueDate ? new Date(todo.dueDate) : new Date());
      setHasReminder(!!todo.reminder);
      setReminderDate(todo.reminder ? new Date(todo.reminder) : new Date());
    }
  }, [todo]);

  const handleSave = () => {
    if (!todo || !text.trim()) return;

    const updatedTodo: Todo = {
      ...todo,
      text: text.trim(),
      notes: notes.trim(),
      category,
      priority,
      dueDate: hasDueDate ? dueDate.getTime() : undefined,
      reminder: hasReminder ? reminderDate.getTime() : undefined,
    };

    onSave(updatedTodo);
    onClose();
  };

  if (!todo) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        <View style={styles.container}>
          <View style={styles.handle} />

          <Text style={styles.title}>Chỉnh sửa công việc</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput
              style={styles.input}
              placeholder="Tên công việc..."
              placeholderTextColor={COLORS.textLight}
              value={text}
              onChangeText={setText}
              autoFocus
            />

            <TextInput
              style={[styles.input, styles.notesInput]}
              placeholder="Ghi chú (tùy chọn)..."
              placeholderTextColor={COLORS.textLight}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />

            <Text style={styles.sectionTitle}>Danh mục</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {(Object.keys(CATEGORIES) as TodoCategory[]).map(cat => {
                const config = CATEGORIES[cat];
                const isSelected = category === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setCategory(cat)}
                    style={[styles.categoryChip, isSelected && {backgroundColor: config.color, ...SHADOWS.md}]}>
                    <Text style={styles.categoryIcon}>{config.icon}</Text>
                    <Text style={[styles.categoryLabel, isSelected && styles.categoryLabelSelected]}>
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
                    onPress={() => setPriority(pri)}
                    style={[styles.priorityChip, isSelected && {backgroundColor: COLORS.priority[pri], ...SHADOWS.md}]}>
                    <Text style={[styles.priorityLabel, isSelected && styles.priorityLabelSelected]}>
                      {labels[pri]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.dateSection}>
              <View style={styles.dateRow}>
                <Text style={styles.dateLabel}>📅 Hạn hoàn thành</Text>
                <Switch value={hasDueDate} onValueChange={setHasDueDate} />
              </View>
              {hasDueDate && (
                <TouchableOpacity style={styles.dateButton} onPress={() => setShowDueDatePicker(true)}>
                  <Text style={styles.dateButtonText}>
                    {dueDate.toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.dateSection}>
              <View style={styles.dateRow}>
                <Text style={styles.dateLabel}>🔔 Nhắc nhở</Text>
                <Switch value={hasReminder} onValueChange={setHasReminder} />
              </View>
              {hasReminder && (
                <TouchableOpacity style={styles.dateButton} onPress={() => setShowReminderPicker(true)}>
                  <Text style={styles.dateButtonText}>
                    {reminderDate.toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity onPress={handleSave} disabled={!text.trim()} style={styles.saveButtonWrapper}>
              <LinearGradient
                colors={text.trim() ? COLORS.gradient.primary : ['#DFE6E9', '#B2BEC3']}
                style={styles.saveButton}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={styles.saveButtonText}>💾 Lưu thay đổi</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <DatePicker
          modal
          open={showDueDatePicker}
          date={dueDate}
          onConfirm={date => {
            setDueDate(date);
            setShowDueDatePicker(false);
          }}
          onCancel={() => setShowDueDatePicker(false)}
          minimumDate={new Date()}
          locale="vi"
        />

        <DatePicker
          modal
          open={showReminderPicker}
          date={reminderDate}
          onConfirm={date => {
            setReminderDate(date);
            setShowReminderPicker(false);
          }}
          onCancel={() => setShowReminderPicker(false)}
          minimumDate={new Date()}
          locale="vi"
        />
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
    maxHeight: '90%',
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
    marginBottom: SPACING.md,
  },
  notesInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    marginTop: SPACING.sm,
    letterSpacing: 0.5,
  },
  categoryScroll: {
    marginBottom: SPACING.md,
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
    marginBottom: SPACING.md,
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
  dateSection: {
    marginBottom: SPACING.md,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  dateLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    fontWeight: '600',
  },
  dateButton: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
  dateButtonText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
    textAlign: 'center',
  },
  saveButtonWrapper: {
    marginTop: SPACING.lg,
  },
  saveButton: {
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    ...SHADOWS.lg,
  },
  saveButtonText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
});
