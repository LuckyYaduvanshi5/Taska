import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function FocusSummaryScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Great Job! 🎉
      </Text>
      
      <Text variant="bodyLarge" style={styles.subtitle}>
        You've completed your focus session
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => router.push('/(main)/dashboard')}
          style={styles.button}
        >
          Back to Dashboard
        </Button>
        
        <Button
          mode="outlined"
          onPress={() => router.back()}
          style={styles.button}
        >
          Start Another Session
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 32,
    opacity: 0.7,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginBottom: 8,
  },
}); 