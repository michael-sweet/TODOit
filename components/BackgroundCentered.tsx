import { CustomThemeContext } from "@/constants/data";
import { Theme } from "@/types/theme";
import { ReactNode, useContext, useMemo } from "react";
import { StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export function BackgroundCentered({ children } : { children:ReactNode }) {
    const THEME = useContext(CustomThemeContext)
    const styles = useMemo(() => createStyles(THEME), [THEME])

    return (
        <Animated.View style={styles.container} entering={FadeIn}>
            {children}
        </Animated.View>
    )
}


const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        margin: 15
    }
})