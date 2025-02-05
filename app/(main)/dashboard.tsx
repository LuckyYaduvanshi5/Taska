import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, FAB } from 'react-native-paper';
import { useAuth } from '../../src/contexts/AuthContext';
import { TaskList } from '../../src/components/tasks/TaskList';
import { TaskStats } from '../../src/components/dashboard/TaskStats';
import { FocusTimer } from '../../src/components/dashboard/FocusTimer';
import { router } from 'expo-router';

export default function DashboardScreen() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text variant="headlineMedium" style={styles.title}>Dashboard</Text>
        
        <TaskStats />
        
        <Card style={styles.section}>
          <Card.Content>
            <Text variant="titleMedium">Current Focus</Text>
            <FocusTimer />
          </Card.Content>
        </Card>

        <Card style={styles.section}>
          <Card.Content>
            <Text variant="titleMedium">Today's Tasks</Text>
            <TaskList />
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          router.push('/(main)/tasks/create');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 