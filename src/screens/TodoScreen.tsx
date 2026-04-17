import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Todo, TodoCategory, Priority, FilterType} from '../types';
import {TodoItem} from '../components/TodoItem';
import {AddTodoModal} from '../components/AddTodoModal';
import {StatsCard} from '../components/StatsCard';
import {FilterTabs} from '../components/FilterTabs';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, SHADOWS} from '../constants/theme';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const isSmallScreen = SCREEN_WIDTH < 375;

export const TodoScreen: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = (text: string, category: TodoCategory, priority: Priority) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      category,
      priority,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
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
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    return {total, completed, active};
  }, [todos]);

  const handleAddPress = () => {
    setModalVisible(true);
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>
        {filter === 'completed' ? '🎉' : '📝'}
      </Text>
      <Text style={styles.emptyTitle}>
        {filter === 'completed'
          ? 'Chưa có việc nào hoàn thành'
          : 'Chưa có công việc nào'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {filter === 'completed'
          ? 'Hoàn thành công việc để xem ở đây'
          : 'Nhấn nút + để thêm công việc mới'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
        
        {/* Header with gradient */}
        <LinearGradient
          colors={COLORS.gradient.primary}
          style={styles.header}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>Xin chào! 👋</Text>
              <Text style={styles.title}>Công việc</Text>
              <Text style={styles.subtitle}>hôm nay</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>
                {new Date().toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: 'short',
                })}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Card */}
        <StatsCard
          total={stats.total}
          completed={stats.completed}
          active={stats.active}
        />

        {/* Filter Tabs */}
        <FilterTabs
          activeFilter={filter}
          onFilterChange={setFilter}
          counts={{
            all: todos.length,
            active: stats.active,
            completed: stats.completed,
          }}
        />

        {/* Todo List */}
        <FlatList
          data={filteredTodos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TodoItem
              todo={item}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
        />

        {/* Floating Add Button */}
        <TouchableOpacity
          style={styles.fabWrapper}
          onPress={handleAddPress}
          activeOpacity={0.9}>
          <LinearGradient
            colors={COLORS.gradient.primary}
            style={styles.fab}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <Text style={styles.fabIcon}>+</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Add Todo Modal */}
        <AddTodoModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAdd={addTodo}
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
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.md,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
    marginRight: SPACING.md,
  },
  greeting: {
    fontSize: isSmallScreen ? FONT_SIZE.sm : FONT_SIZE.md,
    color: COLORS.surface,
    opacity: 0.9,
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: isSmallScreen ? FONT_SIZE.xxl : FONT_SIZE.xxxl,
    fontWeight: 'bold',
    color: COLORS.surface,
    lineHeight: isSmallScreen ? FONT_SIZE.xxl + 4 : FONT_SIZE.xxxl + 4,
  },
  subtitle: {
    fontSize: isSmallScreen ? FONT_SIZE.xxl : FONT_SIZE.xxxl,
    fontWeight: 'bold',
    color: COLORS.surface,
    lineHeight: isSmallScreen ? FONT_SIZE.xxl + 4 : FONT_SIZE.xxxl + 4,
  },
  dateContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    minWidth: 50,
  },
  dateText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.surface,
    fontWeight: '600',
    textAlign: 'center',
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
