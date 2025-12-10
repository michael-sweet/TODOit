import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Configuration } from '@/constants/data';
import { parseTrigger } from 'expo-notifications/build/scheduleNotificationAsync';
import { Data } from '@/types/data';

export default function Schedule(data:Data) {
    const configuration = Configuration(data.settings.isPro)
    registerForPushNotificationsAsync().then(async () => {
        await Notifications.cancelAllScheduledNotificationsAsync();
        data.tasklists.slice(0, configuration.maxTasklists).forEach((tasklist) => {
            if (tasklist.tasks.length > 0) {
                tasklist.notificationTriggers.slice(0, configuration.maxNotifications).forEach((notificationTrigger) => {
                    Notifications.scheduleNotificationAsync({
                        content: {
                            title: tasklist.title + ' (' + tasklist.tasks.length + ')',
                            body: tasklist.tasks.map(task => task.title).join(', '),
                            priority: Notifications.AndroidNotificationPriority.HIGH
                        },
                        trigger: {...parseTrigger(notificationTrigger.notification), channelId: 'default'} as Notifications.SchedulableNotificationTriggerInput
                    });
                });
            }
        });
    });
}

async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'Notifications',
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [80, 240, 80, 240]
        });
    }

    const status = await Notifications.getPermissionsAsync();
    if (!status.granted && status.canAskAgain) {
        await Notifications.requestPermissionsAsync();
    }
}
