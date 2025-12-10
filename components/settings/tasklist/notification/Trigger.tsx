import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { parseTrigger } from "expo-notifications/build/scheduleNotificationAsync";
import { SchedulableTriggerInputTypes } from "expo-notifications";
import React, { useContext, useMemo } from "react";
import { CustomThemeContext } from "@/constants/data";
import { Theme } from "@/types/theme";
import { Tasklist, NotificationTrigger as NotificationTriggerType } from "@/types/tasklist";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import NotificationTriggerDaySelection from "./DaySelection";
import NotificationTriggerTimeSelection from "./HourSelection";
import NotificationTriggerTypeSelection from "./TypeSelection";
import NotificationTriggerWeekdaySelection from "./WeekdaySelection";
import { DataDispatchContext } from "@/contexts/data";

export type Time = {hour:number, minute:number}

type props = {
    tasklist: Tasklist,
    trigger: NotificationTriggerType
}

export default function Trigger({ tasklist, trigger } : props) {
    const notificationTrigger = parseTrigger(trigger.notification)
    const type = notificationTrigger ? notificationTrigger.type : SchedulableTriggerInputTypes.DAILY
    const THEME = useContext(CustomThemeContext)
    const styles = useMemo(() => createStyles(THEME), [THEME])
    const dataDispatch = useContext(DataDispatchContext)

    const output = (children?:React.ReactNode) => (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => dataDispatch({
                    type: 'delete_tasklist_notification',
                    tasklistUuid: tasklist.uuid,
                    uuid: trigger.uuid
                })}
            >
                <MaterialIcons name='close' size={18} style={{color: THEME.textDisabled}} />
            </TouchableOpacity>
            <View style={styles.selectionContainer}>
                <View style={styles.selectionPartContainer}>
                    <Text style={styles.text}>Every</Text>
                    <NotificationTriggerTypeSelection
                        type={type}
                        onValueChange={type => dataDispatch({
                            type: 'set_tasklist_notification_type',
                            triggerType: type,
                            tasklistUuid: tasklist.uuid,
                            notificationUuid: trigger.uuid
                        })}
                    />
                </View>
                {children}
            </View>
        </View>
    )

    if (notificationTrigger) {
        switch (notificationTrigger.type) {
            case SchedulableTriggerInputTypes.DAILY:
                return output(
                    <View style={styles.selectionPartContainer}>
                        <Text style={styles.text}>at</Text>
                        <NotificationTriggerTimeSelection
                            time={{hour:notificationTrigger.hour, minute:notificationTrigger.minute}}
                            onValueChange={time => dataDispatch({
                                type: 'set_tasklist_notification_time',
                                hour: time.hour,
                                minute: time.minute,
                                tasklistUuid: tasklist.uuid,
                                notificationUuid: trigger.uuid
                            })}
                        />
                    </View>
                )
            case SchedulableTriggerInputTypes.WEEKLY:
                return output(
                    <>
                        <View style={styles.selectionPartContainer}>
                            <Text style={styles.text}>on</Text>
                            <NotificationTriggerWeekdaySelection
                                day={notificationTrigger.weekday}
                                onValueChange={weekday => dataDispatch({
                                    type: 'set_tasklist_notification_weekday',
                                    weekday: weekday,
                                    tasklistUuid: tasklist.uuid,
                                    notificationUuid: trigger.uuid
                                })}
                            />
                        </View>

                        <View style={styles.selectionPartContainer}>
                            <Text style={styles.text}>at</Text>
                            <NotificationTriggerTimeSelection
                                time={{hour:notificationTrigger.hour, minute:notificationTrigger.minute}}
                                onValueChange={time => dataDispatch({
                                    type: 'set_tasklist_notification_time',
                                    hour: time.hour,
                                    minute: time.minute,
                                    tasklistUuid: tasklist.uuid,
                                    notificationUuid: trigger.uuid
                                })}
                            />
                        </View>
                    </>
                )
            case SchedulableTriggerInputTypes.MONTHLY:
                return output(
                    <>
                        <View style={styles.selectionPartContainer}>
                            <Text style={styles.text}>on</Text>
                            <NotificationTriggerDaySelection
                                day={notificationTrigger.day}
                                onValueChange={day => dataDispatch({
                                    type: 'set_tasklist_notification_day',
                                    day: day,
                                    tasklistUuid: tasklist.uuid,
                                    notificationUuid: trigger.uuid
                                })}
                            />
                        </View>

                        <View style={styles.selectionPartContainer}>
                            <Text style={styles.text}>at</Text>
                            <NotificationTriggerTimeSelection
                                time={{hour:notificationTrigger.hour, minute:notificationTrigger.minute}}
                                onValueChange={time => dataDispatch({
                                    type: 'set_tasklist_notification_time',
                                    hour: time.hour,
                                    minute: time.minute,
                                    tasklistUuid: tasklist.uuid,
                                    notificationUuid: trigger.uuid
                                })}
                            />
                        </View>
                    </>
                )
        }
    }
}

const createStyles = (THEME: Theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    selectionContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 5,
        alignItems: 'baseline',
        flexWrap: 'wrap',
        paddingEnd: 15
    },
    selectionPartContainer: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'baseline'
    },
    text: {
        color: THEME.textDisabled,
        fontFamily: THEME.fontPrimary,
        fontSize: 14
    },
    button: {
        paddingHorizontal: 15,
        width: 45,
        paddingVertical: 5
    }
})