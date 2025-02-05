import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

interface ProductivityChartProps {
  data: {
    dates: string[];
    focusTime: number[];
    tasksCompleted: number[];
  };
}

export function ProductivityChart({ data }: ProductivityChartProps) {
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const screenWidth = Dimensions.get('window').width - 32;

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>
        Focus Time (minutes)
      </Text>
      <LineChart
        data={{
          labels: data.dates,
          datasets: [{ data: data.focusTime }],
        }}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      <Text variant="titleMedium" style={[styles.title, styles.topMargin]}>
        Tasks Completed
      </Text>
      <LineChart
        data={{
          labels: data.dates,
          datasets: [{ data: data.tasksCompleted }],
        }}
        width={screenWidth}
        height={220}
        chartConfig={{
          ...chartConfig,
          color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`,
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
  },
  topMargin: {
    marginTop: 24,
  },
}); 