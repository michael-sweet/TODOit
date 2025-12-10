import { CustomThemeContext } from "@/constants/data";
import { Theme } from "@/types/theme";
import { ReactNode, useContext, useMemo } from "react";
import { StyleSheet, Text } from "react-native";

export function BackgroundText({ children } : { children:ReactNode }) {
    const THEME = useContext(CustomThemeContext)
    const styles = useMemo(() => createStyles(THEME), [THEME])

    return (
        <Text style={styles.text}>{children}</Text>
    )
}


const createStyles = (theme: Theme) => StyleSheet.create({
    text: {
        color: theme.textDisabled
    }
})