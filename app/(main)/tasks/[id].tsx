import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Button, Text, Card, Chip, Portal, Dialog } from 'react-native-paper';
import { useDatabase } from '../../../src/hooks/useDatabase';
import { LoadingScreen } from '../../../src/components/common/LoadingScreen';
import { Database } from '../../../src/types/database';
import { useLoadingState } from '../../../src/hooks/useLoadingState';
import { Toast } from '../../../src/components/common/Toast';

type Task = Database['public']['Tables']['tasks']['Row'];

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const { getTasks, updateTask, deleteTask, loading } = useDatabase();
  const { loading: loadingState, error, wrapPromise, clearError } = useLoadingState();
  const [task, setTask] = useState<Task | null>(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  useEffect(() => {
    loadTask();
  }, [id]);

  const loadTask = async () => {
    if (!session?.user.id) return;

    try {
      await wrapPromise(async () => {
        const tasks = await getTasks(session.user.id);
        const foundTask = tasks.find(t => t.id === id);
        if (foundTask) {
          setTask(foundTask);
        } else {
          throw new Error('Task not found');
        }
      });
    } catch (error) {
      // Error is already handled by wrapPromise
      router.back();
    }
  };

  const handleStatusChange = async (newStatus: Task['status']) => {
    if (!task) return;

    try {
      await updateTask(task.id, { status: newStatus });
      loadTask();
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleDelete = async () => {
    if (!task) return;

    try {
      await deleteTask(task.id);
      router.back();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  if (loading || !task) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">{task.title}</Text>
            <Text variant="bodyMedium" style={styles.description}>
              {task.description}
            </Text>

            <View style={styles.chipContainer}>
              <Chip icon="flag" style={styles.chip}>
                Priority: {task.priority}
              </Chip>
              <Chip icon="clock" style={styles.chip}>
                {task.status}
              </Chip>
            </View>

            {task.tags && task.tags.length > 0 && (
              <View style={styles.tagContainer}>
                {task.tags.map((tag, index) => (
                  <Chip key={index} style={styles.tag}>
                    {tag}
                  </Chip>
                ))}
              </View>
            )}
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          {task.status !== 'completed' && (
            <Button
              mode="contained"
              onPress={() => handleStatusChange('completed')}
              style={styles.button}
            >
              Mark as Completed
            </Button>
          )}

          <Button
            mode="contained-tonal"
            onPress={() => router.push(`/focus/${task.id}`)}
            style={styles.button}
          >
            Start Focus Session
          </Button>

          <Button
            mode="outlined"
            onPress={() => setDeleteDialogVisible(true)}
            style={styles.button}
            textColor="red"
          >
            Delete Task
          </Button>
        </View>
      </ScrollView>

      <Portal>
        <Dialog
          visible={deleteDialogVisible}
          onDismiss={() => setDeleteDialogVisible(false)}
        >
          <Dialog.Title>Delete Task</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this task?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleDelete} textColor="red">
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Toast
        visible={!!error}
        message={error?.message || 'An error occurred'}
        type="error"
        onDismiss={clearError}
      />
    </>
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
  description: {
    marginTop: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    marginTop: 16,
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  tag: {
    marginRight: 4,
    marginBottom: 4,
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    marginBottom: 8,
  },
}); 