import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, SegmentedButtons } from 'react-native-paper';
import { ProductivityChart } from '../../src/components/analytics/ProductivityChart';
import { StatsSummary } from '../../src/components/analytics/StatsSummary';
import { useDatabase } from '../../src/hooks/useDatabase';
import { useAuth } from '../../src/contexts/AuthContext';
import { LoadingScreen } from '../../src/components/common/LoadingScreen';
import { format, subDays } from 'date-fns';

export default function AnalyticsScreen() {
  const { session } = useAuth();
  const { loading } = useDatabase();
  const [timeRange, setTimeRange] = useState('week');

  const [analyticsData, setAnalyticsData] = useState({
    dates: [] as string[],
    focusTime: [] as number[],
    tasksCompleted: [] as number[],
    totalFocusTime: 0,
    totalTasksCompleted: 0,
    averageProductivity: 0,
    streak: 0,
  });

  useEffect(() => {
    if (session?.user.id) {
      loadAnalytics();
    }
  }, [session, timeRange]);

  const loadAnalytics = async () => {
    // TODO: Implement actual data fetching
    // This is mock data for demonstration
    const days = timeRange === 'week' ? 7 : 30;
    const mockData = {
      dates: Array.from({ length: days }, (_, i) =>
        format(subDays(new Date(), days - 1 - i), 'MM/dd')
      ),
      focusTime: Array.from({ length: days }, () =>
        Math.floor(Math.random() * 180 + 60)
      ),
      tasksCompleted: Array.from({ length: days }, () =>
        Math.floor(Math.random() * 8 + 2)
      ),
    };

    setAnalyticsData({
      ...mockData,
      totalFocusTime: mockData.focusTime.reduce((a, b) => a + b, 0),
      totalTasksCompleted: mockData.tasksCompleted.reduce((a, b) => a + b, 0),
      averageProductivity: 85,
      streak: 5,
    });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          Analytics
        </Text>
        <SegmentedButtons
          value={timeRange}
          onValueChange={setTimeRange}
          buttons={[
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
          ]}
        />
      </View>

      <StatsSummary
        totalFocusTime={analyticsData.totalFocusTime}
        tasksCompleted={analyticsData.totalTasksCompleted}
        averageProductivity={analyticsData.averageProductivity}
        streak={analyticsData.streak}
      />

      <ProductivityChart
        data={{
          dates: analyticsData.dates,
          focusTime: analyticsData.focusTime,
          tasksCompleted: analyticsData.tasksCompleted,
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    gap: 16,
  },
  title: {
    marginBottom: 8,
  },
}); 