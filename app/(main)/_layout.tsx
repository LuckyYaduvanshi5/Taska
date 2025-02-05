import React from 'react';
import { Stack } from 'expo-router';
import { Appbar } from 'react-native-paper';
import { useAuth } from '../../src/contexts/AuthContext';
import { router } from 'expo-router';

export default function MainLayout() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  return (
    <Stack
      screenOptions={{
        header: ({ route, options }) => (
          <Appbar.Header>
            <Appbar.Content title={options.title || route.name} />
            <Appbar.Action icon="logout" onPress={handleSignOut} />
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
        }}
      />
      <Stack.Screen
        name="tasks"
        options={{
          title: 'Tasks',
        }}
      />
      <Stack.Screen
        name="focus"
        options={{
          title: 'Focus Mode',
        }}
      />
      <Stack.Screen
        name="analytics"
        options={{
          title: 'Analytics',
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Stack>
  );
} 