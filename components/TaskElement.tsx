import { CustomThemeContext } from "@/constants/data";
import * as Types from "@/types/tasklist";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useContext, useMemo, useState } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import Animated, { SlideInDown, SlideOutRight } from 'react-native-reanimated';
import { Theme } from "@/types/theme";
import { DataDispatchContext } from "@/contexts/data";

export default function TaskElement({task} : {task:Types.Task}) {
    const THEME = useContext(CustomThemeContext)
    const dataDispatch = useContext(DataDispatchContext)
    const styles = useMemo(() => createStyles(THEME), [THEME])
    const [completed, setCompleted] = useState(false)
    return (
        <Animated.View
            style={[styles.taskCard, completed && {backgroundColor: THEME.success}]}
            entering={SlideInDown}
            exiting={SlideOutRight}
        >
            <View>
                <Pressable
                    style={styles.taskCardIconBtnContainer}
                    onPress={() => {
                        setCompleted(true)
                        setTimeout(() => {
                            dataDispatch({
                                type: 'complete_task',
                                uuid: task.uuid
                            })
                        }, 100);
                    }}>
                    <View style={styles.taskCardIconBtn}>
                        {completed && <MaterialIcons name='check' size={16} style={styles.taskCardIconBtnTextCompleted} />}
                        {!completed && <MaterialIcons name='check' size={16} style={styles.taskCardIconBtnText} />}
                    </View>
                </Pressable>
            </View>
            <View style={styles.taskCardTitleContainer}>
                <Text style={[styles.taskCardTitleText, completed && {color: THEME.textInverted}]}>
                    {task.title}
                </Text>
            </View>
        </Animated.View>
    )
}

const createStyles = (THEME: Theme) => StyleSheet.create({
    taskCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: THEME.backgroundSecondary,
        backgroundColor: THEME.background
    },
    taskCardTitleContainer: {
        flex: 1,
        paddingVertical: 25,
        paddingEnd: 25
    },
    taskCardTitleText: {
        color: THEME.text,
        lineHeight: 25
    },
    taskCardIconBtnContainer: {
        backgroundColor: '',
        padding: 25
    },
    taskCardIconBtn: {
        borderWidth: 2,
        borderColor: THEME.primary,
        borderRadius: 5,
        width: 25,
        height: 25,
        backgroundColor: THEME.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    taskCardIconBtnText: {
        color: THEME.backgroundSecondary
    },
    taskCardIconBtnTextCompleted: {
        color: THEME.text
    }
});
