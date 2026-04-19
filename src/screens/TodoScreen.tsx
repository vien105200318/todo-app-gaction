import React, {useState, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Todo, TodoCategory, Priority, FilterType} from '../types';
import {TodoItem} from '../components/TodoItem';
import {AddTodoModal} from '../components/AddTodoModal';
import {EditTodoModal} from '../components/EditTodoModal';
import {StatsCard} from '../components/StatsCard';
import {FilterTabs} from '../components/FilterTabs';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, SHADOWS} from '../constants/theme';
import {StorageService} from '../services/storage';
import {NotificationService} from '../services/notifications';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const isSmallScreen = SCREEN_WIDTH < 375;

export const TodoScreen: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load todos on mount
  useEffect(() => {
    loadTodos();
    requestNotificationPermission();
  }, []);

  // Save todos whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      StorageService.saveTodos(todos);
    }
  }, [todos]);

  const loadTodos = async () => {
    const loaded = await StorageService.loadTodos();
    setTodos(loaded);
  };

  const requestNotificationPermission = async () => {
    await NotificationService.requestPermission();
  };

  const addTodo = (
    text: string,
    category: TodoCategory,
    priority: Priority,
    dueDate?: number,
    reminder?: number,
    notes?: string,
  ) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      category,
      priority,
      completed: false,
      createdAt: Date.now(),
      dueDate,
      reminder,
      notes,
    };

    setTodos([newTodo, ...todos]);

    // Schedule notification if reminder is set
    if (reminder && reminder > Date.now()) {
      NotificationService.scheduleNotification(
        newTodo.id,
        '🔔 Nhắc nhở',
        text,
        reminder,
      );
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? Date.now() : undefined,
            }
          : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    Alert.alert('Xóa công việc', 'Bạn có chắc muốn xóa?', [
      {text: 'Hủy', style: 'cancel'},
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          setTodos(todos.filter(todo => todo.id !== id));
          NotificationService.cancelNotification(id);
        },
      },
    ]);
  };

  const editTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      setEditingTodo(todo);
      setEditModalVisible(true);
    }
  };

  const saveTodo = (updatedTodo: Todo) => {
    setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));

    // Update notification
    NotificationService.cancelNotification(updatedTodo.id);
    if (updatedTodo.reminder && updatedTodo.reminder > Date.now()) {
      NotificationService.scheduleNotification(
        updatedTodo.id,
        '🔔 Nhắc nhở',
        updatedTodo.text,
        updatedTodo.reminder,
      );
    }
  };

  const filteredTodos = useMemo(() => {
    let filtered = todos;

    // Apply search
    if (searchQuery.trim()) {
      filtered = filtered.filter(t =>
        t.text.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply filter
    const now = Date.now();
    const todayStart = new Date().setHours(0, 0, 0, 0);
    const todayEnd = new Date().setHours(23, 59, 59, 999);

    switch (filter) {
      case 'active':
        return filtered.filter(t => !t.completed);
      case 'completed':
        return filtered.filter(t => t.completed);
      case 'today':
        return filtered.filter(
          t =>
            !t.completed &&
            t.dueDate &&
            t.dueDate >= todayStart &&
            t.dueDate <= todayEnd,
        );
      case 'upcoming':
        return filtered.filter(t => !t.completed && t.dueDate && t.dueDate > todayEnd);
      default:
        return filtered;
    }
  }, [todos, filter, searchQuery]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    return {total, completed, active};
  }, [todos]);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>
        {filter === 'completed' ? '🎉' : searchQuery ? '�' : '�📝'}
      </Text>
      <Text style={styles.emptyTitle}>
        {searchQuery
          ? 'Không tìm thấy'
          : filter === 'completed'
          ? 'Chưa hoàn thành việc nào'
          : 'Chưa có công việc'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery ? 'Thử từ khóa khác' : 'Nhấn + để thêm mới'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Simple Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📝 Todo App</Text>
        <Text style={styles.dateText}>
          {new Date().toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: 'short',
          })}
        </Text>
      </View>

      {/* Stats */}
      <StatsCard total={stats.total} completed={stats.completed} active={stats.active} />

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Tìm kiếm..."
          placeholderTextColor={COLORS.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
            <Text>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filters */}
      <FilterTabs
        activeFilter={filter}
        onFilterChange={setFilter}
        counts={{
          all: todos.length,
          active: stats.active,
          completed: stats.completed,
          today: todos.filter(
            t =>
              !t.completed &&
              t.dueDate &&
              t.dueDate >= new Date().setHours(0, 0, 0, 0) &&
              t.dueDate <= new Date().setHours(23, 59, 59, 999),
          ).length,
          upcoming: todos.filter(
            t => !t.completed && t.dueDate && t.dueDate > new Date().setHours(23, 59, 59, 999),
          ).length,
        }}
      />

      {/* List */}
      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TodoItem
            todo={item}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fabWrapper}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.9}>
        <LinearGradient colors={COLORS.gradient.primary} style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Modals */}
      <AddTodoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addTodo}
      />

      <EditTodoModal
        visible={editModalVisible}
        todo={editingTodo}
        onClose={() => {
          setEditModalVisible(false);
          setEditingTodo(null);
        }}
        onSave={saveTodo}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  dateText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.sm,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    ...SHADOWS.sm,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
  },
  clearBtn: {
    padding: SPACING.xs,
  },
  listContent: {
    padding: SPACING.sm,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl * 2,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  fabWrapper: {
    position: 'absolute',
    right: SPACING.md,
    bottom: SPACING.lg,
    ...SHADOWS.lg,
  },
  fab: {
    width: isSmallScreen ? 56 : 64,
    height: isSmallScreen ? 56 : 64,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: {
    fontSize: isSmallScreen ? 28 : 32,
    color: COLORS.surface,
    fontWeight: '300',
  },
});
