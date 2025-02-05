import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { Database } from '../../types/database';

type TaskInsert = Database['public']['Tables']['tasks']['Insert'];

interface TaskFormProps {
  onSubmit: (task: TaskInsert) => Promise<void>;
  loading?: boolean;
  initialValues?: Partial<TaskInsert>;
}

export function TaskForm({ onSubmit, loading = false, initialValues }: TaskFormProps) {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [priority, setPriority] = useState(String(initialValues?.priority || 1));
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    const priorityNum = parseInt(priority, 10);
    if (isNaN(priorityNum) || priorityNum < 1 || priorityNum > 5) {
      setError('Priority must be between 1 and 5');
      return;
    }

    try {
      await onSubmit({
        ...initialValues,
        title: title.trim(),
        description: description.trim(),
        priority: priorityNum,
      });
    } catch (err) {
      setError('Failed to save task');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={text => {
          setTitle(text);
          setError('');
        }}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />

      <TextInput
        label="Priority (1-5)"
        value={priority}
        onChangeText={text => {
          setPriority(text);
          setError('');
        }}
        mode="outlined"
        keyboardType="number-pad"
        style={styles.input}
      />

      {error ? (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      ) : null}

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        style={styles.button}
      >
        Save Task
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
}); 