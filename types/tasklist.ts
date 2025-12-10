import { randomUUID } from "expo-crypto"
import { SchedulableNotificationTriggerInput, SchedulableTriggerInputTypes } from "expo-notifications"

export type Tasklist = {
    uuid: string,
    title: string,
    tasks: Task[],
    notificationTriggers: NotificationTrigger[]
}

export const DefaultTasklist:() => Tasklist = () => {
    return {
        uuid: randomUUID(),
        title: '',
        tasks: [],
        notificationTriggers: [
            {
                uuid: randomUUID(),
                notification: {
                    type: SchedulableTriggerInputTypes.DAILY,
                    hour: 12,
                    minute: 0
                }
            }
        ]
    }
}

export type Task = {
    uuid: string,
    title: string
}

export type NotificationTrigger = {
    uuid: string,
    notification: SchedulableNotificationTriggerInput
}

export type TasklistAction =
    | AddTaskAction
    | CompleteTaskAction
    | AddTasklistAction
    | DeleteTasklistAction
    | SetTasklistTitleAction
    | AddTasklistNotificationAction
    | DeleteTasklistNotificationAction
    | SetTasklistNotificationTypeAction
    | SetTasklistNotificationDayAction
    | SetTasklistNotificationWeekdayAction
    | SetTasklistNotificationTimeAction

export type TasklistNotificationAction =
    | SetTasklistNotificationTypeAction
    | SetTasklistNotificationDayAction
    | SetTasklistNotificationWeekdayAction
    | SetTasklistNotificationTimeAction

type AddTaskAction = {
    type: 'add_task',
    title: string,
    tasklistUuid: string
}

type CompleteTaskAction = {
    type: 'complete_task',
    uuid: string
}

type AddTasklistAction = {
    type: 'add_tasklist',
    tasklist: Tasklist,
    position?: number
}

type DeleteTasklistAction = {
    type: 'delete_tasklist',
    uuid: string
}

type SetTasklistTitleAction = {
    type: 'set_tasklist_title',
    uuid: string,
    title: string
}

type AddTasklistNotificationAction = {
    type: 'add_tasklist_notification',
    uuid: string
}

type DeleteTasklistNotificationAction = {
    type: 'delete_tasklist_notification',
    uuid: string,
    tasklistUuid: string
}

type SetTasklistNotificationTypeAction = {
    type: 'set_tasklist_notification_type',
    tasklistUuid: string,
    notificationUuid: string,
    triggerType: SchedulableTriggerInputTypes
}

type SetTasklistNotificationDayAction = {
    type: 'set_tasklist_notification_day',
    tasklistUuid: string,
    notificationUuid: string,
    day: number
}

type SetTasklistNotificationWeekdayAction = {
    type: 'set_tasklist_notification_weekday',
    tasklistUuid: string,
    notificationUuid: string,
    weekday: number
}

type SetTasklistNotificationTimeAction = {
    type: 'set_tasklist_notification_time',
    tasklistUuid: string,
    notificationUuid: string,
    hour: number,
    minute: number
}
