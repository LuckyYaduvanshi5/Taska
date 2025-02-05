import { useEffect } from 'react';
import { Stack, router, useSegments } from 'expo-router';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

function RootLayoutNav() {
  const { session, loading } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';
    const isAuthenticated = session !== null;

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to login if not authenticated and not in auth group
      router.replace('/auth/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to dashboard if authenticated and in auth group
      router.replace('/dashboard');
    }
  }, [session, loading, segments]);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="focus"
        options={{
          title: 'Focus Mode',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="auth"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider theme={MD3LightTheme}>
        <RootLayoutNav />
      </PaperProvider>
    </AuthProvider>
  );
} 