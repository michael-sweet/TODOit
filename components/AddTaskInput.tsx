import { CustomThemeContext } from "@/constants/data";
import { Tasklist } from "@/types/tasklist";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useContext, useMemo, useRef, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard, BoxShadowValue } from "react-native";
import { Theme } from "@/types/theme";
import { DataDispatchContext } from "@/contexts/data";
import IconBtn from "./IconBtn";
import Animated, { FadeOut, LinearTransition, SlideInDown, SlideInLeft } from "react-native-reanimated";

type AddTaskInput = {
    tasklist: Tasklist,
    onTaskAdded: () => void
}

export default function AddTaskInput({ tasklist, onTaskAdded } : AddTaskInput) {
    const THEME = useContext(CustomThemeContext)
    const styles = useMemo(() => createStyles(THEME), [THEME])
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const dataDispatch = useContext(DataDispatchContext)
    const [expanded, setExpanded] = useState(false)
    const textInput = useRef<TextInput>(null)

    function AddNewTask() {
        if (newTaskTitle != '') {
            dataDispatch({
                type: 'add_task',
                tasklistUuid: tasklist.uuid,
                title: newTaskTitle
            })
            setNewTaskTitle('')
        }
        onTaskAdded()
    }

    function expand() {
        setExpanded(true)
        setTimeout(() => textInput.current?.focus(), 100)
    }

    function onBlur() {
        setTimeout(() => {
            setExpanded(false)
        }, 100);
    }

    return (
        <>
            {!expanded &&
                <View style={styles.container}>
                    <Animated.View layout={LinearTransition} entering={SlideInDown}>
                        <IconBtn name="add" size={92} onPress={expand} style={styles.shadow} />
                    </Animated.View>
                </View>
            }

            {expanded &&
                <View style={[styles.container, styles.shadow]}>
                    <View style={styles.containerInner}>

                        <TextInput
                            ref={textInput}
                            placeholder={"TODOit " + tasklist.title.toLowerCase() + "..."}
                            placeholderTextColor={THEME.text}
                            onChangeText={setNewTaskTitle}
                            value={newTaskTitle}
                            onSubmitEditing={AddNewTask}
                            blurOnSubmit={false}
                            onBlur={onBlur}
                            style={styles.input}
                        />

                        <TouchableOpacity onPress={AddNewTask} style={styles.button}>
                            <MaterialIcons name="add" size={24} style={styles.buttonIcon} />
                        </TouchableOpacity>

                    </View>
                </View>
            }
        </>
    )
}

const createStyles = (THEME: Theme) => StyleSheet.create({
    container: {
        marginHorizontal: 'auto',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: 15,
        left: 15,
        right: 15,
        borderRadius: 50,
        maxWidth: 750
    },
    containerInner: {
        flex: 1,
        flexDirection: 'row'
    },
    input: {
        backgroundColor: THEME.background,
        borderWidth: 1,
        flex: 1,
        width: '100%',
        height: 50,
        paddingHorizontal: 25,
        borderColor: THEME.primary,
        color: THEME.text,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        fontSize: 16,
        fontFamily: THEME.fontPrimary
    },
    button: {
        width: 50,
        height: 50,
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: THEME.primary
    },
    buttonIcon: {
        color: THEME.textInverted
    },
    shadow: {
        elevation: 5
    }
})