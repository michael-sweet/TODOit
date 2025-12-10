import { CustomThemeContext } from "@/constants/data"
import { Theme } from "@/types/theme"
import { RefObject, useContext, useMemo } from "react"
import { TextInput as TextInputBase, TextInputProps as TextInputPropsBase, StyleSheet, TextStyle, StyleProp } from "react-native"

export type TextInputProps = TextInputPropsBase & {
    textInputRef:RefObject<TextInputBase>
}
export default function TextInput({ textInputRef, ...params } : TextInputProps) {
    const THEME = useContext(CustomThemeContext)
    const styles = useMemo(() => createStyles(THEME), [THEME])
    return (
        <TextInputBase
            ref={textInputRef}
            style={styles.titleInput}
            cursorColor={THEME.primary}
            {...params}
        />
    )
}

const createStyles = (theme: Theme) => StyleSheet.create({
    titleInput: {
        color: theme.text,
        fontFamily: theme.fontSecondary,
        padding: 5,
        borderColor: theme.primary,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5
    }
})