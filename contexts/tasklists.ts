import { Action } from '@/types/data';
import { TasklistNotificationAction, Tasklist } from '@/types/tasklist';
import { randomUUID } from 'expo-crypto';
import { SchedulableNotificationTriggerInput, SchedulableTriggerInputTypes } from 'expo-notifications';
import { parseTrigger } from 'expo-notifications/build/scheduleNotificationAsync';

export function TasklistReducer(tasklists:Tasklist[], action:Action) : Tasklist[] {
    switch (action.type) {

        case 'add_task':
            return tasklists.map(x => {
                if (x.uuid == action.tasklistUuid) {
                    return {
                        ...x,
                        tasks: [
                            ...x.tasks,
                            {
                                uuid: randomUUID(),
                                title: action.title
                            }
                        ]
                    }
                }
                return x
            })

        case 'complete_task':
            return tasklists.map(x => {
                return {
                    ...x,
                    tasks: x.tasks.filter(
                        x => x.uuid != action.uuid
                    )
                }
            })

        case 'add_tasklist':
            if (action.position != undefined && action.position < tasklists.length) {
                return tasklists.reduce((prev:Tasklist[], tasklist:Tasklist, i:number) => {
                    if (action.position == i) {
                        return [
                            ...prev,
                            action.tasklist,
                            tasklist
                        ]
                    }
                    return [
                        ...prev,
                        tasklist
                    ]
                }, [])
            }
            return [
                ...tasklists,
                action.tasklist
            ]

        case 'delete_tasklist':
            return tasklists.filter(
                tasklist => tasklist.uuid != action.uuid
            )

        case 'set_tasklist_title':
            return tasklists.map(tasklist => {
                if (tasklist.uuid == action.uuid) {
                    return {
                        ...tasklist,
                        title: action.title
                    }
                }
                return tasklist
            })

        case 'add_tasklist_notification':
            return tasklists.map(tasklist => {
                if (tasklist.uuid == action.uuid) {
                    return {
                        ...tasklist,
                        notificationTriggers: [
                            ...tasklist.notificationTriggers,
                            {
                                uuid: randomUUID(),
                                enabled: true,
                                notification: defaultNotification
                            }
                        ]
                    }
                }
                return tasklist
            })

        case 'delete_tasklist_notification':
            return tasklists.map(tasklist => {
                if (tasklist.uuid == action.tasklistUuid) {
                    return {
                        ...tasklist,
                        notificationTriggers: tasklist.notificationTriggers.filter(trigger => {
                            return trigger.uuid != action.uuid
                        })
                    }
                }
                return tasklist
            })

        case 'set_tasklist_notification_type':
        case 'set_tasklist_notification_day':
        case 'set_tasklist_notification_weekday':
        case 'set_tasklist_notification_time':
            return setTasklistNotification(tasklists, action)

    }

    return tasklists
}

const defaultNotification:SchedulableNotificationTriggerInput  = {
    hour: 12,
    minute: 0,
    type: SchedulableTriggerInputTypes.DAILY
}

const defaultNotificationValues  = {
    hour: 12,
    minute: 0,
    day: 1,
    weekday: 1,
    type: SchedulableTriggerInputTypes.DAILY
}

type dateTimeParams = {
    day?: number,
    weekday?: number,
    hour?: number,
    minute?: number
}

type tasklistNotificationActions = TasklistNotificationAction & dateTimeParams

function setTasklistNotification (tasklists:Tasklist[], action: tasklistNotificationActions): Tasklist[] {
    return tasklists.map(tasklist => {
        if (tasklist.uuid == action.tasklistUuid) {
            return {
                ...tasklist,
                notificationTriggers: tasklist.notificationTriggers.map(trigger => {
                    if (trigger.uuid == action.notificationUuid) {
                        let params:dateTimeParams = {
                            day: action.day,
                            weekday: action.weekday,
                            hour: action.hour,
                            minute: action.minute
                        }
                        params = Object.keys(params).reduce((prev, curr) => params[curr as keyof dateTimeParams] !== undefined ? { ...prev, [curr]: params[curr as keyof dateTimeParams] } : prev, {})
                        if (action.type == 'set_tasklist_notification_type') {
                            return {
                                ...trigger,
                                notification: {...parseTrigger({
                                    ...defaultNotificationValues,
                                    ...trigger.notification,
                                    ...params,
                                    type: action.triggerType
                                } as SchedulableNotificationTriggerInput)} as SchedulableNotificationTriggerInput
                            }
                        } else {
                            return {
                                ...trigger,
                                notification: {...parseTrigger({
                                    ...defaultNotificationValues,
                                    ...trigger.notification,
                                    ...params
                                } as SchedulableNotificationTriggerInput)} as SchedulableNotificationTriggerInput
                            }
                        }
                    }
                    return trigger
                })
            }
        }
        return tasklist
    })
}