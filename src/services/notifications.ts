import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import {Platform} from 'react-native';

export const NotificationService = {
  async requestPermission(): Promise<boolean> {
    try {
      const settings = await notifee.requestPermission();
      return settings.authorizationStatus >= 1;
    } catch (error) {
      console.error('Error requesting permission:', error);
      return false;
    }
  },

  async scheduleNotification(
    id: string,
    title: string,
    body: string,
    timestamp: number,
  ): Promise<void> {
    try {
      await notifee.requestPermission();

      const channelId = await notifee.createChannel({
        id: 'todo-reminders',
        name: 'Todo Reminders',
        importance: 4,
      });

      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp,
      };

      await notifee.createTriggerNotification(
        {
          id,
          title,
          body,
          android: {
            channelId,
            smallIcon: 'ic_launcher',
            pressAction: {
              id: 'default',
            },
          },
          ios: {
            sound: 'default',
          },
        },
        trigger,
      );
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  },

  async cancelNotification(id: string): Promise<void> {
    try {
      await notifee.cancelNotification(id);
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  },

  async cancelAllNotifications(): Promise<void> {
    try {
      await notifee.cancelAllNotifications();
    } catch (error) {
      console.error('Error canceling all notifications:', error);
    }
  },
};
