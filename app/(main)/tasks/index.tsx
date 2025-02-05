import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { router } from 'expo-router';
import { TaskList } from '../../../src/components/tasks/TaskList';
import { LoadingScreen } from '../../../src/components/common/LoadingScreen';
import { useDatabase } from '../../../src/hooks/useDatabase';
import { useAuth } from '../../../src/contexts/AuthContext';
import { Database } from '../../../src/types/database';

type Task = Database['public']['Tables']['tasks']['Row'];

export default function TasksScreen() {
  const { session } = useAuth();
  const { getTasks, loading, error } = useDatabase();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (session?.user.id) {
      loadTasks();
    }
  }, [session]);

  const loadTasks = async () => {
    if (session?.user.id) {
      const fetchedTasks = await getTasks(session.user.id);
      setTasks(fetchedTasks);
    }
  };

  const handleTaskPress = (task: Task) => {
    router.push(`/tasks/${task.id}`);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <TaskList tasks={tasks} onTaskPress={handleTaskPress} />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/tasks/new')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 