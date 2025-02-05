import React from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { TaskForm } from '../../../src/components/tasks/TaskForm';
import { useDatabase } from '../../../src/hooks/useDatabase';
import { useAuth } from '../../../src/contexts/AuthContext';
import { Database } from '../../../src/types/database';

type TaskInsert = Database['public']['Tables']['tasks']['Insert'];

export default function NewTaskScreen() {
  const { session } = useAuth();
  const { createTask, loading } = useDatabase();

  const handleSubmit = async (task: TaskInsert) => {
    if (!session?.user.id) return;

    try {
      await createTask({
        ...task,
        user_id: session.user.id,
      });
      router.back();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TaskForm onSubmit={handleSubmit} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 