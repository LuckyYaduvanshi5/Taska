import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style="auto" />
      
      <View style={styles.content}>
        <Text variant="displayLarge" style={styles.title}>
          Taska
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Your personal productivity companion
        </Text>
        
        <View style={styles.features}>
          <Text variant="titleMedium" style={styles.featureText}>
            • Manage your tasks efficiently
          </Text>
          <Text variant="titleMedium" style={styles.featureText}>
            • Stay focused with Pomodoro timer
          </Text>
          <Text variant="titleMedium" style={styles.featureText}>
            • Track your productivity
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Link href="/dashboard" asChild>
          <Button mode="contained" style={styles.button}>
            Get Started
          </Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 48,
    opacity: 0.7,
  },
  features: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
  featureText: {
    marginBottom: 16,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  button: {
    paddingVertical: 8,
  },
}); 