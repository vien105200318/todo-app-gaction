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
  Switch,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import {TodoCategory, Priority} from '../types';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, SHADOWS} from '../constants/theme';
import {CATEGORIES} from '../constants/categories';

interface AddTodoModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (
    text: string,
    category: TodoCategory,
    priority: Priority,
    dueDate?: number,
    reminder?: number,
    notes?: string,
  ) => void;
}

export const AddTodoModal: React.FC<AddTodoModalProps> = ({visible, onClose, onAdd}) => {
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

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(
        text.trim(),
        category,
        priority,
        hasDueDate ? dueDate.getTime() : undefined,
        hasReminder ? reminderDate.getTime() : undefined,
        notes.trim() || undefined,
      );
      // Reset form
      setText('');
      setNotes('');
      setCategory('personal');
      setPriority('medium');
      setHasDueDate(false);
      setHasReminder(false);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        <View style={styles.container}>
          <View style={styles.handle} />
          <Text style={styles.title}>Thêm việc mới</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput
              style={styles.input}
              placeholder="Nhập công việc..."
              placeholderTextColor={COLORS.textLight}
              value={text}
              onChangeText={setText}
              autoFocus
            />

            <TextInput
              style={[styles.input, {minHeight: 60}]}
              placeholder="Ghi chú..."
              placeholderTextColor={COLORS.textLight}
              value={notes}
              onChangeText={setNotes}
              multiline
            />

            <Text style={styles.sectionTitle}>Danh mục</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {(Object.keys(CATEGORIES) as TodoCategory[]).map(cat => {
                const config = CATEGORIES[cat];
                const isSelected = category === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setCategory(cat)}
                    style={[styles.chip, isSelected && {backgroundColor: config.color}]}>
                    <Text style={styles.chipIcon}>{config.icon}</Text>
                    <Text style={[styles.chipText, isSelected && {color: COLORS.surface}]}>{config.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Text style={styles.sectionTitle}>Độ ưu tiên</Text>
            <View style={styles.row}>
              {(['low', 'medium', 'high'] as Priority[]).map(pri => {
                const isSelected = priority === pri;
                const labels = {low: 'Thấp', medium: 'TB', high: 'Cao'};
                return (
                  <TouchableOpacity
                    key={pri}
                    onPress={() => setPriority(pri)}
                    style={[styles.chip, {flex: 1}, isSelected && {backgroundColor: COLORS.priority[pri]}]}>
                    <Text style={[styles.chipText, isSelected && {color: COLORS.surface}]}>{labels[pri]}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.switchRow}>
              <Text>📅 Hạn</Text>
              <Switch value={hasDueDate} onValueChange={setHasDueDate} />
            </View>
            {hasDueDate && (
              <TouchableOpacity style={styles.dateBtn} onPress={() => setShowDueDatePicker(true)}>
                <Text>{dueDate.toLocaleString('vi-VN')}</Text>
              </TouchableOpacity>
            )}

            <View style={styles.switchRow}>
              <Text>🔔 Nhắc</Text>
              <Switch value={hasReminder} onValueChange={setHasReminder} />
            </View>
            {hasReminder && (
              <TouchableOpacity style={styles.dateBtn} onPress={() => setShowReminderPicker(true)}>
                <Text>{reminderDate.toLocaleString('vi-VN')}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={handleAdd} disabled={!text.trim()}>
              <LinearGradient
                colors={text.trim() ? COLORS.gradient.primary : ['#DFE6E9', '#B2BEC3']}
                style={styles.addBtn}>
                <Text style={styles.addBtnText}>✨ Thêm</Text>
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
        />
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {flex: 1, justifyContent: 'flex-end'},
  backdrop: {...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)'},
  container: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    maxHeight: '85%',
  },
  handle: {width: 40, height: 4, backgroundColor: COLORS.border, borderRadius: 2, alignSelf: 'center', marginBottom: SPACING.md},
  title: {fontSize: FONT_SIZE.xl, fontWeight: 'bold', marginBottom: SPACING.md},
  input: {backgroundColor: COLORS.surfaceLight, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, marginBottom: SPACING.sm},
  sectionTitle: {fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.textSecondary, marginTop: SPACING.sm, marginBottom: SPACING.xs},
  chip: {backgroundColor: COLORS.surfaceLight, borderRadius: BORDER_RADIUS.full, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, marginRight: SPACING.xs, flexDirection: 'row', alignItems: 'center'},
  chipIcon: {fontSize: FONT_SIZE.md, marginRight: SPACING.xs},
  chipText: {fontSize: FONT_SIZE.sm, fontWeight: '600'},
  row: {flexDirection: 'row', marginBottom: SPACING.sm},
  switchRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACING.sm},
  dateBtn: {backgroundColor: COLORS.surfaceLight, padding: SPACING.md, borderRadius: BORDER_RADIUS.md, marginBottom: SPACING.sm},
  addBtn: {borderRadius: BORDER_RADIUS.md, padding: SPACING.md, alignItems: 'center', marginTop: SPACING.md},
  addBtnText: {fontSize: FONT_SIZE.md, fontWeight: 'bold', color: COLORS.surface},
});
