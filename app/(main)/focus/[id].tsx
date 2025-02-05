import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Text, Card } from 'react-native-paper';
import { Timer } from '../../../src/components/focus/Timer';
import { useDatabase } from '../../../src/hooks/useDatabase';
import { useAuth } from '../../../src/contexts/AuthContext';
import { LoadingScreen } from '../../../src/components/common/LoadingScreen';
import { Database } from '../../../src/types/database';
import { notificationService } from '../../../src/services/notifications';

type Task = Database['public']['Tables']['tasks']['Row'];

export default function FocusScreen() {
  const { id } = useLocalSearchParams();
  const { session } = useAuth();
  const { getTasks, createFocusSession, loading } = useDatabase();
  const [task, setTask] = useState<Task | null>(null);
  const [notificationId, setNotificationId] = useState<string | null>(null);

  useEffect(() => {
    loadTask();
  }, [id]);

  const loadTask = async () => {
    if (!session?.user.id) return;

    try {
      const tasks = await getTasks(session.user.id);
      const foundTask = tasks.find(t => t.id === id);
      if (foundTask) {
        setTask(foundTask);
      }
    } catch (error) {
      console.error('Failed to load task:', error);
    }
  };

  const handleComplete = async () => {
    if (!task || !session?.user.id) return;

    if (notificationId) {
      await notificationService.cancelNotification(notificationId);
    }

    try {
      await createFocusSession({
        user_id: session.user.id,
        task_id: task.id,
        duration: 25, // Default focus duration
        completed: true,
      });
      router.push('/focus/summary');
    } catch (error) {
      console.error('Failed to save focus session:', error);
    }
  };

  const handleStart = async () => {
    if (!task) return;
    
    const id = await notificationService.scheduleFocusReminder(
      task.title,
      25
    );
    setNotificationId(id);
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading || !task) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            Focus Session
          </Text>
          <Text variant="bodyLarge" style={styles.taskTitle}>
            {task.title}
          </Text>
          {task.description && (
            <Text variant="bodyMedium" style={styles.description}>
              {task.description}
            </Text>
          )}
        </Card.Content>
      </Card>

      <Timer
        duration={25} // Default 25 minutes
        onComplete={handleComplete}
        onCancel={handleCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    margin: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    textAlign: 'center',
    opacity: 0.7,
  },
}); 