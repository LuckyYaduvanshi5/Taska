import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, FAB, Card, IconButton, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import { TaskService } from '../services/taskService';
import type { Task } from '../types/database';
import TaskModal from './task-modal';

export default function DashboardScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasksData = await TaskService.getTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = () => {
    loadTasks();
  };

  const handleCompleteTask = async (taskId: string, currentStatus: Task['status']) => {
    try {
      await TaskService.updateTask(taskId, {
        status: currentStatus === 'completed' ? 'todo' : 'completed'
      });
      loadTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return theme.colors.error;
      case 'medium':
        return theme.colors.tertiary;
      case 'low':
        return theme.colors.primary;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {loading ? (
          <Text>Loading tasks...</Text>
        ) : tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text variant="headlineSmall">No tasks yet</Text>
            <Text variant="bodyMedium" style={styles.emptyStateSubtitle}>
              Add your first task to get started
            </Text>
          </View>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} style={styles.taskCard}>
              <Card.Title
                title={task.title}
                subtitle={`${task.completed_pomodoros}/${task.estimated_pomodoros} pomodoros`}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="circle"
                    iconColor={getPriorityColor(task.priority)}
                  />
                )}
              />
              {task.description && (
                <Card.Content>
                  <Text variant="bodyMedium">{task.description}</Text>
                </Card.Content>
              )}
              <Card.Actions>
                <Link href={`/focus?taskId=${task.id}`} asChild>
                  <IconButton icon="timer" />
                </Link>
                <IconButton icon="pencil" onPress={() => {}} />
                <IconButton
                  icon="check"
                  iconColor={task.status === 'completed' ? theme.colors.primary : undefined}
                  onPress={() => handleCompleteTask(task.id, task.status)}
                />
              </Card.Actions>
            </Card>
          ))
        )}
      </ScrollView>

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => setModalVisible(true)}
      />

      <TaskModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onTaskCreated={handleTaskCreated}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateSubtitle: {
    opacity: 0.7,
    marginTop: 8,
  },
  taskCard: {
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 