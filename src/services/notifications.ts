import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const notificationService = {
  async registerForPushNotifications() {
    if (!Device.isDevice) {
      return false;
    }

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        return false;
      }

      const token = await Notifications.getExpoPushTokenAsync();
      return token.data;
    } catch (error) {
      console.error('Failed to get push token:', error);
      return false;
    }
  },

  async scheduleFocusReminder(taskTitle: string, duration: number) {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Focus Session Complete!',
        body: `You've completed your focus session for: ${taskTitle}`,
      },
      trigger: {
        seconds: duration * 60,
      },
    });
    return id;
  },

  async cancelNotification(id: string) {
    await Notifications.cancelScheduledNotificationAsync(id);
  },
}; 