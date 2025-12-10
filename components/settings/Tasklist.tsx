import * as Types from "@/types/tasklist";
import { useContext, useMemo } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { CustomThemeContext, Configuration } from '@/constants/data';
import { Theme } from "@/types/theme";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SetUndoContext } from "@/contexts/undo";
import Animated, { SlideInDown } from "react-native-reanimated";
import EditTitle from "./tasklist/EditTitle";
import Trigger from "./tasklist/notification/Trigger";
import { DataContext, DataDispatchContext } from "@/contexts/data";
import AddNotificationBtn from "./tasklist/notification/AddNotificationBtn";

type TaskSettingsPanelProps = {
    tasklist: Types.Tasklist
}

export default function TaskSettingsPanel({tasklist} : TaskSettingsPanelProps) {
    const THEME = useContext(CustomThemeContext)
    const styles = useMemo(() => createStyles(THEME), [THEME])
    const data = useContext(DataContext)
    const dataDispatch = useContext(DataDispatchContext)
    const setUndo = useContext(SetUndoContext)
    const configuration = Configuration(data.settings.isPro)

    const deleteTasklist = () => {
        setUndo({
            title: 'Deleted "' + tasklist.title + '"',
            action: () => dataDispatch({
                type: 'add_tasklist',
                position: data.tasklists.indexOf(tasklist),
                tasklist: tasklist
            })
        })
        dataDispatch({
            type: 'delete_tasklist',
            uuid: tasklist.uuid
        })
    }

    return (
        <Animated.View
            style={styles.panel}
            entering={SlideInDown}
        >

            <View>
                <EditTitle
                    initialTitle={tasklist.title}
                    onSubmit={title => dataDispatch({
                        type: 'set_tasklist_title',
                        title: title,
                        uuid: tasklist.uuid
                    })}
                />
            </View>

            <View style={styles.sectionSecondary}>
                <View style={styles.notificationsHeader}>
                    <Text style={styles.notificationsTitle}>Notifications</Text>
                    <AddNotificationBtn tasklist={tasklist} />
                </View>

                {tasklist.notificationTriggers.length > 0 &&
                    <View>
                        {tasklist.notificationTriggers.slice(0, configuration.maxNotifications).map((trigger, i) =>
                            <Trigger
                                key={i}
                                tasklist={tasklist}
                                trigger={trigger}
                            />
                        )}
                    </View>
                }
            </View>

            <View>
                <TouchableOpacity style={styles.deleteBtn} onPress={deleteTasklist}>
                    <MaterialIcons name='delete' size={18} style={styles.deleteBtnIcon} />
                    <Text style={styles.deleteBtnText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

const createStyles = (theme: Theme) => StyleSheet.create({
    panel: {
        backgroundColor: theme.background,
        borderRadius: 15,
        marginHorizontal: 15
    },
    sectionSecondary: {
        marginHorizontal: 15,
        borderRadius: 15,
        backgroundColor: theme.backgroundSecondary
    },
    notificationsTitle: {
        color: theme.textDisabled,
        fontFamily: theme.fontPrimaryBold,
        padding: 15
    },
    notificationsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 30
    },
    deleteBtn: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 20,
        gap: 15,
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    deleteBtnIcon: {
        textAlign: 'right',
        width: 30,
        color: theme.textDisabled,
    },
    deleteBtnText: {
        fontFamily: theme.fontPrimary,
        color: theme.textDisabled
    }
})