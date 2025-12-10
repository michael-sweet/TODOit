import { CustomThemeContext } from "@/constants/data"
import { Theme } from "@/types/theme"
import { useContext, useMemo } from "react"
import { StyleSheet, Text, View } from "react-native"

export default function Logo() {
    const THEME = useContext(CustomThemeContext)
    const styles = useMemo(() => createStyles(THEME), [THEME])
    return (
        <View style={styles.logo}>
            <Text style={styles.logoText1}>TODO</Text>
            <Text style={styles.logoText2}>it</Text>
        </View>
    )
}

const createStyles = (THEME: Theme) => StyleSheet.create({
    logo: {
        flexDirection: 'row'
    },
    logoText1: {
        color: THEME.primary,
        fontSize: 36
    },
    logoText2: {
        fontSize: 36,
        color: THEME.text
    }
})