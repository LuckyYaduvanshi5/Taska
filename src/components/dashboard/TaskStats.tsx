import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

export function TaskStats() {
  // TODO: Fetch these stats from your backend
  const stats = {
    completed: 0,
    total: 0,
    focusTime: 0,
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Tasks</Text>
          <Text variant="displaySmall">{stats.completed}/{stats.total}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Focus Time</Text>
          <Text variant="displaySmall">{stats.focusTime}m</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    margin: 4,
  },
}); 