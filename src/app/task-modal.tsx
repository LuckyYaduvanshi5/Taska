import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Modal, Portal, TextInput, Button, Text, SegmentedButtons } from 'react-native-paper';
import { TaskService } from '../services/taskService';
import type { TaskPriority } from '../types/database';

interface TaskModalProps {
  visible: boolean;
  onDismiss: () => void;
  onTaskCreated: () => void;
}

export default function TaskModal({ visible, onDismiss, onTaskCreated }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [estimatedPomodoros, setEstimatedPomodoros] = useState('1');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setLoading(true);
    try {
      await TaskService.createTask({
        title: title.trim(),
        description: description.trim(),
        priority,
        estimated_pomodoros: parseInt(estimatedPomodoros, 10),
      });
      onTaskCreated();
      handleDismiss();
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setEstimatedPomodoros('1');
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleDismiss}
        contentContainerStyle={styles.container}
      >
        <ScrollView>
          <Text variant="titleLarge" style={styles.title}>Add New Task</Text>
          
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          
          <TextInput
            label="Description (optional)"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            style={styles.input}
          />
          
          <Text variant="bodyMedium" style={styles.label}>Priority</Text>
          <SegmentedButtons
            value={priority}
            onValueChange={setPriority as (value: string) => void}
            buttons={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
            style={styles.segmentedButton}
          />
          
          <TextInput
            label="Estimated Pomodoros"
            value={estimatedPomodoros}
            onChangeText={value => {
              const number = parseInt(value, 10);
              if (!isNaN(number) && number > 0) {
                setEstimatedPomodoros(value);
              }
            }}
            keyboardType="number-pad"
            style={styles.input}
          />

          <View style={styles.buttons}>
            <Button
              mode="outlined"
              onPress={handleDismiss}
              style={styles.button}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={loading}
              disabled={!title.trim() || loading}
              style={styles.button}
            >
              Create
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    maxHeight: '80%',
  },
  title: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  segmentedButton: {
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    minWidth: 100,
  },
}); 