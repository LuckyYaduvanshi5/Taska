import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // Prevent going back between auth screens
        gestureEnabled: false,
      }}
    >
      <Stack.Screen 
        name="index"
        redirect={true}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="signup"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 