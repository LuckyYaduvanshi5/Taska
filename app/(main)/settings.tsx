import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Button, Portal, Dialog, TextInput } from 'react-native-paper';
import { SettingsSection } from '../../src/components/settings/SettingsSection';
import { SettingsItem } from '../../src/components/settings/SettingsItem';
import { useAuth } from '../../src/contexts/AuthContext';
import { useDatabase } from '../../src/hooks/useDatabase';
import { useTheme } from '../../src/contexts/ThemeContext';
import { notificationService } from '../../src/services/notifications';

export default function SettingsScreen() {
  const { session, signOut } = useAuth();
  const { updateUserProfile, loading } = useDatabase();
  const { themeType, setThemeType } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [showDurationDialog, setShowDurationDialog] = useState<'focus' | 'break' | null>(null);
  const [tempDuration, setTempDuration] = useState('');

  const handleUpdateDuration = async () => {
    const duration = parseInt(tempDuration, 10);
    if (isNaN(duration) || duration < 1) return;

    if (showDurationDialog === 'focus') {
      setFocusDuration(duration);
      // TODO: Update in database
    } else if (showDurationDialog === 'break') {
      setBreakDuration(duration);
      // TODO: Update in database
    }

    setShowDurationDialog(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const handleThemeChange = async () => {
    const newTheme = themeType === 'light' ? 'dark' : 'light';
    await setThemeType(newTheme);
  };

  const handleNotificationToggle = async (value: boolean) => {
    setNotifications(value);
    if (value) {
      const token = await notificationService.registerForPushNotifications();
      if (token && session?.user.id) {
        await updateUserPreferences(session.user.id, {
          notifications: true,
        });
      }
    } else if (session?.user.id) {
      await updateUserPreferences(session.user.id, {
        notifications: false,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SettingsSection title="Account">
        <SettingsItem
          title={session?.user.email || ''}
          description="Email"
          icon="email"
        />
      </SettingsSection>

      <SettingsSection title="Preferences">
        <SettingsItem
          title="Notifications"
          description="Enable push notifications"
          icon="bell"
          value={notifications}
          onValueChange={handleNotificationToggle}
        />
        <SettingsItem
          title="Theme"
          description={`Current: ${themeType}`}
          icon="theme-light-dark"
          onPress={handleThemeChange}
        />
      </SettingsSection>

      <SettingsSection title="Timer Settings">
        <SettingsItem
          title="Focus Duration"
          description={`${focusDuration} minutes`}
          icon="timer"
          onPress={() => {
            setTempDuration(focusDuration.toString());
            setShowDurationDialog('focus');
          }}
        />
        <SettingsItem
          title="Break Duration"
          description={`${breakDuration} minutes`}
          icon="timer-sand"
          onPress={() => {
            setTempDuration(breakDuration.toString());
            setShowDurationDialog('break');
          }}
        />
      </SettingsSection>

      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={handleSignOut} textColor="red">
          Sign Out
        </Button>
      </View>

      <Portal>
        <Dialog
          visible={showDurationDialog !== null}
          onDismiss={() => setShowDurationDialog(null)}
        >
          <Dialog.Title>
            Set {showDurationDialog === 'focus' ? 'Focus' : 'Break'} Duration
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Duration (minutes)"
              value={tempDuration}
              onChangeText={setTempDuration}
              keyboardType="number-pad"
              mode="outlined"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDurationDialog(null)}>Cancel</Button>
            <Button onPress={handleUpdateDuration}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    padding: 16,
  },
}); 