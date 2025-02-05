import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Portal, Modal } from 'react-native-paper';
import { router } from 'expo-router';
import { supabase } from '../../../src/services/supabase';
import { useAuth } from '../../../src/contexts/AuthContext';

export default function CreateTaskModal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { session } = useAuth();

  const handleCreate = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { error: insertError } = await supabase
        .from('tasks')
        .insert({
          user_id: session?.user.id,
          title: title.trim(),
          description: description.trim(),
          status: 'pending',
          priority: 1,
        });

      if (insertError) throw insertError;
      
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <Modal
        visible={true}
        onDismiss={() => router.back()}
        contentContainerStyle={styles.container}
      >
        <Text variant="headlineSmall" style={styles.title}>Create New Task</Text>
        
        {error && <Text style={styles.error}>{error}</Text>}
        
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
        
        <View style={styles.buttons}>
          <Button 
            mode="outlined" 
            onPress={() => router.back()}
            style={styles.button}
          >
            Cancel
          </Button>
          
          <Button
            mode="contained"
            onPress={handleCreate}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Create
          </Button>
        </View>
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
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
}); 