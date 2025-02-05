import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

interface StatsSummaryProps {
  totalFocusTime: number;
  tasksCompleted: number;
  averageProductivity: number;
  streak: number;
}

export function StatsSummary({
  totalFocusTime,
  tasksCompleted,
  averageProductivity,
  streak,
}: StatsSummaryProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">{Math.round(totalFocusTime / 60)}</Text>
            <Text variant="bodyMedium">Hours Focused</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">{tasksCompleted}</Text>
            <Text variant="bodyMedium">Tasks Done</Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.row}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">{averageProductivity}%</Text>
            <Text variant="bodyMedium">Productivity</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">{streak}</Text>
            <Text variant="bodyMedium">Day Streak</Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    marginHorizontal: 4,
  },
}); 