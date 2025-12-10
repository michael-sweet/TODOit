import { CustomThemeContext } from "@/constants/data";
import { UndoContext, SetUndoContext } from "@/contexts/undo";
import { Theme } from "@/types/theme";
import { useContext, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

export default function Undo() {
    const undo = useContext(UndoContext)
    const setUndo = useContext(SetUndoContext)
    const THEME = useContext(CustomThemeContext)
    const styles = useMemo(() => createStyles(THEME), [THEME])
    const fling = Gesture.Fling().onEnd(() => runOnJS(setUndo)(null))

    if (!undo) {
        return
    }

    return (
        <GestureDetector gesture={fling}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{undo.title}</Text>
                </View>
                <TouchableOpacity onPress={() => undo.action()}>
                    <Text style={styles.button}>Undo</Text>
                </TouchableOpacity>
            </View>
        </GestureDetector>
    )
}

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 30,
        flex: 1,
        backgroundColor: theme.background,
        elevation: 5
    },
    textContainer: {
        padding: 15,
        flex: 1
    },
    text: {
        color: theme.text
    },
    button: {
        padding: 15,
        color: theme.primary
    }
})