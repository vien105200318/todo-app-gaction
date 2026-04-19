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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Todo, TodoCategory, Priority} from '../types';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZE} from '../constants/theme';
import {CATEGORIES} from '../constants/categories';

interface EditTodoModalProps {
  visible: boolean;
  todo: Todo | null;
  onClose: () => void;
  onSave: (todo: Todo) => void;
}

export const EditTodoModal: React.FC<EditTodoModalProps> = ({visible, todo, onClose, onSave}) => {
  const [text, setText] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState<TodoCategory>('personal');
  const [priority, setPriority] = useState<Priority>('medium');

  useEffect(() => {
    if (todo) {
      setText(todo.text);
      setNotes(todo.notes || '');
      setCategory(todo.category);
      setPriority(todo.priority);
    }
  }, [todo]);

  const handleSave = () => {
    if (!todo || !text.trim()) return;
    onSave({...todo, text: text.trim(), notes: notes.trim(), category, priority});
    onClose();
  };

  if (!todo) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        <View style={styles.container}>
          <View style={styles.handle} />
          <Text style={styles.title}>Chỉnh sửa</Text>
          <ScrollView>
            <TextInput style={styles.input} value={text} onChangeText={setText} autoFocus />
            <TextInput style={[styles.input, {minHeight: 60}]} value={notes} onChangeText={setNotes} multiline placeholder="Ghi chú..." />
            
            <Text style={styles.label}>Danh mục</Text>
            <ScrollView horizontal>
              {(Object.keys(CATEGORIES) as TodoCategory[]).map(cat => {
                const config = CATEGORIES[cat];
                return (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setCategory(cat)}
                    style={[styles.chip, category === cat && {backgroundColor: config.color}]}>
                    <Text style={[styles.chipText, category === cat && {color: '#fff'}]}>{config.icon} {config.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Text style={styles.label}>Ưu tiên</Text>
            <View style={styles.row}>
              {(['low', 'medium', 'high'] as Priority[]).map(pri => (
                <TouchableOpacity
                  key={pri}
                  onPress={() => setPriority(pri)}
                  style={[styles.chip, {flex: 1}, priority === pri && {backgroundColor: COLORS.priority[pri]}]}>
                  <Text style={[styles.chipText, priority === pri && {color: '#fff'}]}>
                    {{low: 'Thấp', medium: 'TB', high: 'Cao'}[pri]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={handleSave}>
              <LinearGradient colors={COLORS.gradient.primary} style={styles.btn}>
                <Text style={styles.btnText}>💾 Lưu</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {flex: 1, justifyContent: 'flex-end'},
  backdrop: {...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)'},
  container: {backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '80%'},
  handle: {width: 40, height: 4, backgroundColor: '#ddd', borderRadius: 2, alignSelf: 'center', marginBottom: 16},
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 16},
  input: {backgroundColor: '#f5f5f5', borderRadius: 8, padding: 12, marginBottom: 8},
  label: {fontSize: 12, fontWeight: '600', color: '#666', marginTop: 8, marginBottom: 4},
  chip: {backgroundColor: '#f5f5f5', borderRadius: 20, padding: 8, paddingHorizontal: 12, marginRight: 8},
  chipText: {fontSize: 14, fontWeight: '600'},
  row: {flexDirection: 'row', marginBottom: 16},
  btn: {borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 16},
  btnText: {fontSize: 16, fontWeight: 'bold', color: '#fff'},
});
