import { SchedulableTriggerInputTypes } from "expo-notifications";
import { randomUUID } from 'expo-crypto';
import { Data } from "@/types/data";

export const DefaultData: Data = {
    tasklists: [
        {
            uuid: randomUUID(),
            title: 'Today',
            tasks: [
                {
                    uuid: randomUUID(),
                    title: 'Tap the box to mark completed!'
                },
                {
                    uuid: randomUUID(),
                    title: 'Swipe left and right to change list'
                },
                {
                    uuid: randomUUID(),
                    title: 'Configure notifications and more in settings'
                }
            ],
            notificationTriggers: [
                {
                    uuid: randomUUID(),
                    notification: {hour: 16, minute: 0, type: SchedulableTriggerInputTypes.DAILY}
                }
            ]
        },
        {
            uuid: randomUUID(),
            title: 'This Week',
            tasks: [],
            notificationTriggers: [
                {
                    uuid: randomUUID(),
                    notification: {hour: 6, minute: 0, weekday: 5, type: SchedulableTriggerInputTypes.WEEKLY}
                }
            ]
        },
        {
            uuid: randomUUID(),
            title: 'The Future',
            tasks: [],
            notificationTriggers: [
                {
                    uuid: randomUUID(),
                    notification: {hour: 6, minute: 0, day: 1, type: SchedulableTriggerInputTypes.MONTHLY}
                }
            ]
        }
    ],
    settings: {
        isPro: false
    }
}