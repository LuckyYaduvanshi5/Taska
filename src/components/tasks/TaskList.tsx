import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Text, IconButton } from 'react-native-paper';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../contexts/AuthContext';

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'completed';
  priority: number;
};

export function TaskList() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { session } = useAuth();
  
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', session?.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const toggleTask = async (taskId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
      
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId);

      if (error) throw error;
      
      await fetchTasks(); // Refresh the list
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.empty}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  if (tasks.length === 0) {
    return (
      <View style={styles.empty}>
        <Text>No tasks for today</Text>
      </View>
    );
  }

  return (
    <View>
      {tasks.map(task => (
        <List.Item
          key={task.id}
          title={task.title}
          description={task.description}
          left={props => (
            <IconButton
              icon={task.status === 'completed' ? 'checkbox-marked' : 'checkbox-blank-outline'}
              onPress={() => toggleTask(task.id, task.status)}
            />
          )}
          right={props => (
            <IconButton
              icon="dots-vertical"
              onPress={() => {
                // TODO: Implement task options menu
              }}
            />
          )}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    padding: 16,
    alignItems: 'center',
  },
}); 